import * as Constants from "./constants";
import "./bindingHandlers/codeEditor";
import "./bindingHandlers/copyToClipboard";
import { UnsavedChangesRouteGuard } from "./routing/unsavedChangesRouteGuard";
import { MapiObjectStorage, MapiBlobStorage } from "./persistence";
import { DefaultAuthenticator } from "./components/defaultAuthenticator";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { ConsoleLogger } from "@paperbits/common/logging";
import { DefaultSessionManager } from "@paperbits/common/persistence/defaultSessionManager";
import { HistoryRouteHandler } from "@paperbits/common/routing";
import { RoleBasedSecurityDesignModule } from "@paperbits/core/security/roleBasedSecurity.design.module";
import { ListOfApisModule } from "./components/apis/list-of-apis/ko/listOfApis.module";
import { ListOfApisEditorModule } from "./components/apis/list-of-apis/ko/listOfApisEditor.module";
import { DetailsOfApiModule } from "./components/apis/details-of-api/ko/detailsOfApi.module";
import { DetailsOfApiEditorModule } from "./components/apis/details-of-api/ko/detailsOfApiEditor.module";
import {ApiDetailsPageModule} from "./components/template-pages/api-details-page/ko/apiDetailsPage.module";
import { ApiDetailsPageEditorModule } from "./components/template-pages/api-details-page/ko/apiDetailsPageEditor.module";
import { ProductDetailsPageModule } from "./components/template-pages/product-details-page/ko/productDetailsPage.module";
import { ProductDetailsPageEditorModule } from "./components/template-pages/product-details-page/ko/productDetailsPageEditor.module";
import { HistoryOfApiModule } from "./components/apis/history-of-api/ko/historyOfApi.module";
import { HistoryOfApiEditorModule } from "./components/apis/history-of-api/ko/historyOfApiEditor.module";
import { SigninModule } from "./components/users/signin/signin.module";
import { SigninDesignModule } from "./components/users/signin/signin.design.module";
import { SigninSocialModule } from "./components/users/signin-social/signinSocial.module";
import { SignupSocialModule } from "./components/users/signup-social/signupSocial.module";
import { SigninSocialEditorModule } from "./components/users/signin-social/signinSocial.design.module";
import { SignupSocialDesignModule } from "./components/users/signup-social/signupSocial.design.module";
import { SignupModule } from "./components/users/signup/signup.module";
import { SignupDesignModule } from "./components/users/signup/signup.design.module";
import { ProfileModule } from "./components/users/profile/profile.module";
import { ProfileDesignModule } from "./components/users/profile/profile.design.module";
import { SubscriptionsModule } from "./components/users/subscriptions/subscriptions.module";
import { SubscriptionsDesignModule } from "./components/users/subscriptions/subscriptions.design.module";
import { ProductDetailsModule } from "./components/products/product-details/productDetails.module";
import { ProductDetailsDesignModule } from "./components/products/product-details/productDetails.design.module";
import { MapiClient, IdentityService } from "./services";
import { SetupModule } from "./components/setup/setup.module";
import { ContentModule } from "./components/content";
import { CustomWidgetListModule } from "./components/custom-widget-list";
import { OperationListModule } from "./components/operations/operation-list/ko/operationList.module";
import { OperationListEditorModule } from "./components/operations/operation-list/ko/operationListEditor.module";
import { OperationDetailsDesignModule } from "./components/operations/operation-details/operationDetails.design.module";
import { ProductListModule } from "./components/products/product-list/ko/productList.module";
import { ProductListEditorModule } from "./components/products/product-list/ko/productListEditor.module";
import { ProductSubscribeModule } from "./components/products/product-subscribe/ko/productSubscribe.module";
import { ProductSubscribeEditorModule } from "./components/products/product-subscribe/ko/productSubscribeEditor.module";
import { ProductApisModule } from "./components/products/product-apis/ko/productApis.module";
import { ProductApisEditorModule } from "./components/products/product-apis/ko/productApisEditor.module";
import { ProductSubscriptionsEditorModule } from "./components/products/product-subscriptions/ko/productSubscriptionsEditor.module";
import { ProductSubscriptionsModule } from "./components/products/product-subscriptions/ko/productSubscriptions.module";
import { App } from "./components/app/app";
import { ReportsModule } from "./components/reports/ko/reports.module";
import { ReportsEditorModule } from "./components/reports/ko/reportsEditor.module";
import { ResetPasswordModule } from "./components/users/reset-password/resetPassword.module";
import { ResetPasswordDesignModule } from "./components/users/reset-password/resetPassword.design.module";
import { ConfirmPasswordModule } from "./components/users/confirm-password/ko/confirmPassword.module";
import { ConfirmPasswordEditorModule } from "./components/users/confirm-password/ko/confirmPasswordEditor.module";
import { HelpModule } from "./components/help";
import { ChangePasswordModule } from "./components/users/change-password/ko/changePassword.module";
import { ChangePasswordEditorModule } from "./components/users/change-password/ko/changePasswordEditor.module";
import { TenantService } from "./services/tenantService";
import { ValidationSummaryModule } from "./components/users/validation-summary/validationSummary.module";
import { ValidationSummaryDesignModule } from "./components/users/validation-summary/validationSummary.design.module";
import { BackendService } from "./services/backendService";
import { StaticRoleService } from "./services/roleService";
import { ProvisionService } from "./services/provisioningService";
import { PolicyService } from "./services/policyService";
import { OAuthService } from "./services/oauthService";
import { OldContentRouteGuard } from "./routing/oldContentRouteGuard";
import { AccessTokenRefrsher } from "./authentication/accessTokenRefresher";
import { ApiProductsModule } from "./components/apis/api-products/ko/apiProducts.module";
import { ApiProductsEditorModule } from "./components/apis/api-products/ko/apiProductsEditor.module";
import { RuntimeConfigurator } from "./services/runtimeConfigurator";
import { CustomHtmlDesignModule } from "./components/custom-html/customHtml.design.module";
import { CustomWidgetDesignModule } from "./components/custom-widget/customWidget.design.module";
import { CodeEditor } from "./components/code-editor/code-editor";
import { ApiDetailsPageModel } from "./components/template-pages/api-details-page/apiDetailsPageModel";

export class ApimDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new SetupModule());
        injector.bindModule(new ListOfApisModule());
        injector.bindModule(new ListOfApisEditorModule());
        injector.bindModule(new ApiProductsModule());
        injector.bindModule(new ApiProductsEditorModule());
        injector.bindModule(new DetailsOfApiModule());
        injector.bindModule(new DetailsOfApiEditorModule());
        injector.bindModule(new ApiDetailsPageModule());
        injector.bindModule(new ApiDetailsPageEditorModule());
        injector.bindModule(new ProductDetailsPageModule());
        injector.bindModule(new ProductDetailsPageEditorModule());
        injector.bindModule(new HistoryOfApiModule());
        injector.bindModule(new HistoryOfApiEditorModule());
        injector.bindModule(new SigninModule());
        injector.bindModule(new SigninDesignModule());
        injector.bindModule(new SigninSocialModule());
        injector.bindModule(new SignupSocialModule());
        injector.bindModule(new SigninSocialEditorModule());
        injector.bindModule(new SignupSocialDesignModule());
        injector.bindModule(new SignupModule());
        injector.bindModule(new SignupDesignModule());
        injector.bindModule(new ProfileModule());
        injector.bindModule(new ProfileDesignModule());
        injector.bindModule(new SubscriptionsModule());
        injector.bindModule(new SubscriptionsDesignModule());
        injector.bindModule(new ProductListModule());
        injector.bindModule(new ProductListEditorModule());
        injector.bindModule(new ProductApisModule());
        injector.bindModule(new ProductApisEditorModule());
        injector.bindModule(new ProductSubscriptionsModule());
        injector.bindModule(new ProductSubscriptionsEditorModule());
        injector.bindModule(new ProductDetailsModule());
        injector.bindModule(new ProductDetailsDesignModule());
        injector.bindModule(new ProductSubscribeModule());
        injector.bindModule(new ProductSubscribeEditorModule());
        injector.bindModule(new OperationListModule());
        injector.bindModule(new OperationListEditorModule());
        injector.bindModule(new OperationDetailsDesignModule());
        injector.bindModule(new ReportsModule());
        injector.bindModule(new ReportsEditorModule());
        injector.bindModule(new ResetPasswordModule());
        injector.bindModule(new ResetPasswordDesignModule());
        injector.bindModule(new ConfirmPasswordModule());
        injector.bindModule(new ConfirmPasswordEditorModule());
        injector.bindModule(new ChangePasswordModule());
        injector.bindModule(new ChangePasswordEditorModule());
        injector.bindModule(new ValidationSummaryDesignModule());
        injector.bindModule(new ValidationSummaryModule());
        injector.bindModule(new CustomHtmlDesignModule());
        injector.bindModule(new CustomWidgetDesignModule());
        injector.bindModule(new RoleBasedSecurityDesignModule());
        injector.bindSingleton("app", App);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindSingleton("tenantService", TenantService);
        injector.bindSingleton("backendService", BackendService);
        injector.bindSingleton("roleService", StaticRoleService);
        injector.bindSingleton("provisioningService", ProvisionService);
        injector.bindSingleton("identityService", IdentityService);
        injector.bindSingleton("policyService", PolicyService);
        injector.bindSingleton("mapiClient", MapiClient);
        injector.bindSingleton("authenticator", DefaultAuthenticator);
        injector.bindSingleton("objectStorage", MapiObjectStorage);
        injector.bindSingleton("blobStorage", MapiBlobStorage);
        injector.bindToCollection("routeGuards", OldContentRouteGuard);
        injector.bindToCollection("routeGuards", UnsavedChangesRouteGuard);
        injector.bindInstance("reservedPermalinks", Constants.reservedPermalinks);
        injector.bindSingleton("oauthService", OAuthService);
        injector.bindToCollection("autostart", HistoryRouteHandler);
        injector.bindToCollection("autostart", AccessTokenRefrsher);
        injector.bindToCollection("autostart", RuntimeConfigurator);
        injector.bindSingleton("sessionManager", DefaultSessionManager);
        injector.bind("CodeEditor", CodeEditor);
        injector.bindModule(new CustomWidgetListModule()); // needs "blobStorage"
        injector.bindModule(new ContentModule());
        injector.bindModule(new HelpModule());
    }
}