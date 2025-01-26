sap.ui.define(
  ["com/infy/aim/controller/BaseController", "sap/ui/core/routing/History"],
  function (BaseController, History) {
    "use strict";

    return BaseController.extend("com.infy.aim.controller.View3", {
      onInit: function () {},
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
