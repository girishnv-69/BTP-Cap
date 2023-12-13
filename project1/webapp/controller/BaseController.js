sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/ui/model/Filter",
    "sap/m/Button",
    "com/project1/utils/URLConstants",
    "sap/ui/core/routing/History",
    "sap/ui/core/Element",
    "sap/ui/core/Fragment",
    "sap/m/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/Sorter",
    "sap/ui/Device",
    'sap/m/MessageBox'
], function (Controller,JSONModel,Dialog,Filter,Button, URLConstants,History,Element,Fragment,library,Spreadsheet,Sorter,Device,MessageBox) {
    "use strict";
    return Controller.extend(
        "com.project1.controller.BaseController",
        {
          onInit: function () {
            //console.log("test")
          },
          getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
          },
          /**
           * Convenience method for getting the view model by name.
           * @public
           * @param {string} [sName] the model name
           * @returns {sap.ui.model.Model} the model instance
           */
          getModel: function (sName) {
            return this.getView().getModel(sName);
          },
 
          /**
           * Convenience method for setting the view model.
           * @public
           * @param {sap.ui.model.Model} oModel the model instance
           * @param {string} sName the model name
           * @returns {sap.ui.mvc.View} the view instance
           */
          setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
          },
 
          /**
           * Getter for the resource bundle.
           * @public
           * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
           */
          getResourceBundle: function (text) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(text);
          },
 
          showLoading: function (status) {
            this.getView().setBusy(status);
          },
          
      
          restMethodGet: function (url) {
            let that = this;
            url = 'http://localhost:8080/employees';
            var deferred = $.Deferred();
           
              $.ajax({
                type: "GET",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                },
                url: url,
                contentType: "application/json",
                //headers: { "my-token": token },
                success: function (response) {
                  deferred.resolve(response);
                },
                error: function (xhr) {
                  deferred.reject(xhr); //.responseJSON.message);
                  if (xhr && xhr.status == "401") {
                   
                  }
                },
              });
           
            return deferred.promise();
          },
         
        }
      );
});