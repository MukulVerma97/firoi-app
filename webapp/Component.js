sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";
  return UIComponent.extend("com.infy.aim.Component", {
    metadata: {
      manifest: "json",
    },
    init: function () {
      // UI component is the base class, here we call base class constructor

      UIComponent.prototype.init.apply(this);

      // get the router object
      // var oRouter = this.getRouter();

      // // call initalize -- it will look manifest json for configuration
      this.getRouter().initialize();
      // oRouter.initialize();
    },

    destory: function () {},
  });
});
