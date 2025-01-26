sap.ui.define(
  [
    "com/infy/aim/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast", // Importing MessageToast for user feedback
  ],
  function (BaseController, Filter, FilterOperator, MessageToast) {
    "use strict";
    return BaseController.extend("com.infy.aim.controller.View1", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      onNext: function (mymarvelId) {
        this.oRouter.navTo("hero", {
          marvelHeroes: mymarvelId,
        });

        // var oCurrentView = this.getView();
        // var oAppCon = oCurrentView.getParent();
        // oAppCon.to("idView2");
      },
      onSearch: function (oEvent) {
        var searchValue = oEvent.getParameter("query");

        if (!searchValue) {
          searchValue = oEvent.getParameter("newValue");
        }
        console.log(searchValue);

        var oFilter = new Filter(
          "heroName",
          FilterOperator.StartsWith,
          searchValue
        );
        var oFilter2 = new Filter(
          "movieName",
          FilterOperator.StartsWith,
          searchValue
        );

        var combinedFilter = new Filter({
          filters: [oFilter, oFilter2],
          and: false,
        });

        this.getView()
          .byId("idMyList")
          .getBinding("items")
          .filter(combinedFilter);
      },
      onItemDelete: function (oEvent) {
        var oGetItem = oEvent.getParameter("listItem");
        console.log(oGetItem.getTitle());
        var oList = oEvent.getSource();
        oList.removeItem(oGetItem);
        MessageToast.show("Item deleted successfully!"); // User feedback
      },
      onItemsDelete: function () {
        var oList = this.getView().byId("idMyList");
        var aSelectedItems = oList.getSelectedItems();
        aSelectedItems.forEach((element) => {
          oList.removeItem(element);
        });
        MessageToast.show("Selected items deleted successfully!"); // User feedback
      },
      onItemSelect: function (oEvent) {
        var sPath = oEvent.getParameter("listItem").getBindingContextPath();
        var myId = sPath.split("/")[sPath.split("/").length - 1];
        // console.log(myId);
        // var oAppCon = this.getView().getParent().getParent();
        //var oV2 = oAppCon.getDetailPage("idView2");
        //oV2.bindElement(sPath);

        this.onNext(myId);
      },
    });
  }
);
