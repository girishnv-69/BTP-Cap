sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var ownerComponent = this.getOwnerComponent();
                this.oRouter = this.getOwnerComponent().getRouter();
                 this.getEmployees();
             
            },
            getemployees: async function () {
                try {
                    var path = URLConstants.URL.Employeeall
                    let obj = await this.restMethodGet(path);
                    this.getView().setModel(new JSONModel(obj), "userDataMdl");
                }
                catch (e) {
                    return e
                }
            },
            restMethodGet:function(url){
                url = URLConstants.URL.app_endPoint + url;
                var deferred = $.Deferred();
     
                $.ajax({
                    type:"GET",
                    url:url,
                    contentType:"application/json",
                    success:function(response){
                        deferred.resolve(response);
                    },
                    error:function(xhr){
                        deferred.reject(xhr);
                    }
                });
                return deferred.promise();
            }
   
        });
    });
