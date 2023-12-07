/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library'
], function(UIComponent, JSONModel, fioriLibrary) {
	'use strict';

	return UIComponent.extend('com.project1.Component', {

		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oModel,
				oRouter;

			UIComponent.prototype.init.apply(this, arguments);

			// this.getRouter().initialize();
			oModel = new JSONModel();
			this.setModel(oModel);
// enable routing
			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched: function(oEvent) {
			var oModel = this.getModel(),
				sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
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
				var oView = this.getRootControl().getContent()[0].getPages().find(e => e.getProperty("viewName") == "com.lighthouse.view.AppUnified");
				var oFCL = oView.byId("fcl")
				if (!oFCL) {
					oView.attachAfterInit(function (oEvent) {
						resolve(oEvent.getSource().byId('flexibleColumnLayout'));
					}, this);
					return;
				}
				resolve(oFCL);

			}.bind(this));
		}
	});
});