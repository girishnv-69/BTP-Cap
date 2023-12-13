sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/project1/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	'sap/m/IllustrationPool',
	'sap/f/FlexibleColumnLayoutSemanticHelper',
	'sap/f/library',
	"sap/ui/core/IconPool"
],
function (UIComponent, Device, models,JSONModel, ResourceModel, IllustrationPool, FlexibleColumnLayoutSemanticHelper, fioriLibrary, IconPool) {
	"use strict";

	return UIComponent.extend("com.project1.Component",{
		metadata: {
			manifest: "json"
		},
		init: function () {
			let oModel,
				oRouter;

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			oModel = new JSONModel();
			this.setModel(oModel);

			// enable routing
			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			//this model is used to display common data
			let cModel = new JSONModel();
			this.setModel(cModel, "masterDataMdl");

			//Common Errors Model
			this.setModel(new JSONModel(), "errors");

			this.setModel(new JSONModel(), "sideNavigation")

			//this model is used to set page title globally and changing it in the runtime based on the selected page
			var pageTitleModel = new JSONModel({ pageTitle: "Home" });
			this.setModel(pageTitleModel, "pageTitleModel");

			var oSettingsModel = new JSONModel({ navigatedItem: "" });
			this.setModel(oSettingsModel, 'settings');

			var oTntSet = {
				setFamily: "tnt",
				setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")
			};

			// register tnt illustration set
			IllustrationPool.registerIllustrationSet(oTntSet, false);

			//Icon Register
			this.iconPoolRegister()
		},

		_onBeforeRouteMatched: function (oEvent) {
			var oModel = this.getModel(),
				sLayout = oEvent.getParameters().arguments.layout,
				oNextUIState;

			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			if (!sLayout) {
				this.getHelper().then(function (oHelper) {
					oNextUIState = oHelper.getNextUIState(0);
					oModel.setProperty("/layout", oNextUIState.layout);
				});
				return;
			}

			oModel.setProperty("/layout", sLayout);
		},
		getHelper: function () {
			return this._getFcl().then(function (oFCL) {
				var oSettings = {
					defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
				};
				return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
			});
		},
		_getFcl: function () {
			return new Promise(function (resolve, reject) {
				var oView = this.getRootControl().getContent()[0]?.getPages().find(e => e.getProperty("viewName") == "com.payroll.payrollapp.view.AppUnified");
				var oFCL = oView?.byId("fcl")
				if (!oFCL) {
					oView?.attachAfterInit(function (oEvent) {
						resolve(oEvent.getSource().byId('flexibleColumnLayout'));
					}, this);
					return;
				}
				resolve(oFCL);

			}.bind(this));
		},
		iconPoolRegister: function () {
			var b = [];
			var c = {};
			//Fiori Theme font family and URI
			var t = {
				fontFamily: "SAP-icons-TNT",
				fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
			};
			//Registering to the icon pool
			IconPool.registerFont(t);
			b.push(IconPool.fontLoaded("SAP-icons-TNT"));
			c["SAP-icons-TNT"] = t;
			//SAP Business Suite Theme font family and URI
			var B = {
				fontFamily: "BusinessSuiteInAppSymbols",
				fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
			};
			//Registering to the icon pool
			IconPool.registerFont(B);
			b.push(IconPool.fontLoaded("BusinessSuiteInAppSymbols"));
			c["BusinessSuiteInAppSymbols"] = B;
		},
		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
}
);