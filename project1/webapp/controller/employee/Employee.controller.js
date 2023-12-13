sap.ui.define([
    "com/project1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "com/project1/utils/URLConstants",
    "sap/ui/core/Core",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    'sap/ui/export/Spreadsheet',
    'sap/m/Token'
 
], function (BaseController, JSONModel, MessageToast, URLConstants, Core, MessageBox, Fragment,Spreadsheet, Token) {
    "use strict";
    var that = this;
    return BaseController.extend("com.project1.controller.employee.Employee", {
 
        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();
 
            this.oRouter.getRoute("emp-table").attachMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
          this.fetchemp();
 
        },
        // onPressHome: function () {
        //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //     oRouter.navTo("dashboard")
        // },
 
        fetchemp: async function () {
            try {
                var that = this;
                this.showLoading(true);
                let path = URLConstants.URL.Employee_all;
                let obj = await this.restMethodGet(path);
                this.getView().setModel(new JSONModel(obj), "employeeMdl");
                this.showLoading(false);
            }
            catch (ex) {
                that.showLoading(false);
                // this.errorHandling(ex);
            }
        },
        
 
    });
});