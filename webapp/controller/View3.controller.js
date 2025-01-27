sap.ui.define(
  ["com/infy/aim/controller/BaseController", "sap/ui/core/routing/History"],
  function (BaseController, History) {
    "use strict";

    return BaseController.extend("com.infy.aim.controller.View3", {
      onInit: function () {
this.oRouter = this.getOwnerComponent().getRouter();
this.oRouter.getRoute("ironman").attachMatched(this.herculis,this);

       },


       herculis:function(oEvent){
       debugger;
        var superId = oEvent.getParameter("arguments").superheroes;
        console.log(superId);
        var sPath = "/superheroes/" + superId;
        console.log(sPath);
        this.getView().bindElement(sPath);
     

       },
      onBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("marvels", {}, true /*no history*/);
        }
      },
    });
  }
);
