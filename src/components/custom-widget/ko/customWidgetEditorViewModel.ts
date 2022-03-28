import * as ko from "knockout";
import template from "./customWidgetEditorView.html";
import { WidgetEditor } from "@paperbits/common/widgets";
import { Component, Event, OnMounted, Param } from "@paperbits/common/ko/decorators";
import { SizeStylePluginConfig } from "@paperbits/styles/plugins";
import { CustomWidgetModel } from "../customWidgetModel";
import { widgetEditorSelector } from "..";
import { StyleHelper } from "@paperbits/styles";
import { ViewManager } from "@paperbits/common/ui";
import { EventManager, Events } from "@paperbits/common/events";
import { buildWidgetSource } from "./utils";
import { ISettingsProvider } from "@paperbits/common/configuration";
// tslint:disable-next-line:no-implicit-dependencies
import fallbackUi from "!!url-loader!./fallbackUi.html";

@Component({
    selector: widgetEditorSelector,
    template: template
})
export class CustomWidgetEditorViewModel implements WidgetEditor<CustomWidgetModel> {
    public readonly sizeStyleConfig: ko.Observable<SizeStylePluginConfig>;
    public readonly customInputValue: ko.Observable<string>;
    public readonly src: ko.Observable<string>;
    /**
     * Signals that the widgets' source is being overridden (for local development). Optionally holds URL to overrides' config files.
     */
    public readonly override: ko.Observable<string | boolean>;

    constructor(
        private readonly viewManager: ViewManager,
        private readonly eventManager: EventManager,
        private readonly settingsProvider: ISettingsProvider,
    ) {
        this.sizeStyleConfig = ko.observable();
        this.customInputValue = ko.observable();
        this.src = ko.observable("");
        this.override = ko.observable();
    }

    @Param()
    public model: CustomWidgetModel;

    @Event()
    public onChange: (model: CustomWidgetModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.customInputValue(this.model.customInputValue);
        this.updateResponsiveObservables();

        window.addEventListener("message", event => {
            if (typeof event.data === "object" && "customInputValueChangedMSAPIM" in event.data) {
                const data = JSON.parse(this.customInputValue()).data ?? {};
                const valueObj = event.data.customInputValueChangedMSAPIM;
                data[valueObj.key] = valueObj.value;
                this.customInputValue(JSON.stringify({data}));
            }
        });

        this.customInputValue.subscribe(this.applyChanges);
        this.eventManager.addEventListener(Events.ViewportChange, this.updateResponsiveObservables);

        const environment = await this.settingsProvider.getSetting<string>("environment");
        const widgetSource = buildWidgetSource(this.model, "editor.html", environment);
        const response = await fetch(widgetSource.src);
        this.src(response.ok ? widgetSource.src : fallbackUi); // TODO check if prod or dev
        this.override(widgetSource.override);
    }

    private updateResponsiveObservables(): void {
        if (!this.model.styles) {
            return;
        }

        const viewport = this.viewManager.getViewport();
        const sizeStyleConfig = StyleHelper.getPluginConfigForLocalStyles(this.model.styles, "size", viewport);
        this.sizeStyleConfig(sizeStyleConfig);
    }

    private applyChanges(): void {
        this.model.customInputValue = this.customInputValue();
        this.onChange(this.model);
    }

    /**
     * Updates widget sizing styles.
     */
    public onSizeUpdate(sizeStyles: SizeStylePluginConfig): void {
        const viewport = this.viewManager.getViewport();
        StyleHelper.setPluginConfigForLocalStyles(this.model.styles, "size", sizeStyles, viewport);
        this.onChange(this.model);
    }
}