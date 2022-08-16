import { ViewManager } from "@paperbits/common/ui";
import { OVERRIDE_PORT_KEY, OVERRIDE_DEFAULT_PORT } from "@azure/api-management-custom-widgets-scaffolder";
import { BLOB_ROOT, BLOB_CONFIGS_FOLDER, APIM_CONFIG_FILE_NAME } from "@azure/api-management-custom-widgets-tools";
import * as Constants from "../../constants";
import { MapiBlobStorage } from "../../persistence";
import { TCustomWidgetConfig } from "../custom-widget";

export async function loadCustomWidgetConfigs(
    blobStorage: MapiBlobStorage,
    viewManager: ViewManager,
): Promise<TCustomWidgetConfig[]> {
    const overridesPromises = [];
    const sourcesSession = Object.keys(window.sessionStorage)
        .filter((key: string) => key.startsWith(Constants.overrideConfigSessionKeyPrefix))
        .map(key => window.sessionStorage.getItem(key));
    const sourcesSearchParams = new URLSearchParams(window.location.search)
        .getAll(OVERRIDE_PORT_KEY)
        .map(port => new URL("http://localhost:" + (isNaN(parseInt(port)) ? OVERRIDE_DEFAULT_PORT : port)).href);
    const sources = [...new Set([...sourcesSession, ...sourcesSearchParams])];
    if (sources.length) {
        sources.forEach(source => {
            try {
                const url = new URL(source);
                overridesPromises.push(fetch(url.href + APIM_CONFIG_FILE_NAME));
            } catch (e) {
                console.warn(source, e);
            }
        });
    }

    const configsNames = await blobStorage.listBlobs(`${BLOB_ROOT}/${BLOB_CONFIGS_FOLDER}/`);
    const configsUint8s = await Promise.all(configsNames.map(blobName => blobStorage.downloadBlob(blobName)));
    const configs: TCustomWidgetConfig[] = configsUint8s.map(uint8 => JSON.parse(new TextDecoder().decode(uint8)));

    const promisesToJson = async promises => Promise.all(await Promise.all(promises).then(r => r.map(e => e.json())));
    const overrides: TCustomWidgetConfig[] = await promisesToJson(overridesPromises);

    const configurations: Record<string, TCustomWidgetConfig> = {};

    configs.forEach(config => configurations[config.name] = config);
    overrides.forEach((override, i) => {
        const href = new URL(sources[i]).href;
        window.sessionStorage.setItem(Constants.overrideConfigSessionKeyPrefix + override.name, href);
        const widgetSource = {...override, override: href ?? true};
        configurations[override.name] = widgetSource

        const sessionStorageKey = Constants.overrideToastSessionKeyPrefix + override.name
        if (window.sessionStorage.getItem(sessionStorageKey)) return

        let message = `Custom widget "${override.displayName}" URL is overridden`;
        if (typeof widgetSource.override === "string") message += ` with ${widgetSource.override}`;
        const toast = viewManager.addToast(override.displayName, message, [{
            title: "Got it",
            action: async () => {
                window.sessionStorage.setItem(sessionStorageKey, "true");
                viewManager.removeToast(toast);
            }
        }]);
    });

    return Object.values(configurations);
}
