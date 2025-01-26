sap.ui.define(
  [
    "com/infy/aim/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, MessageBox, MessageToast, Fragment) {
    "use strict";
    return BaseController.extend("com.infy.aim.controller.View2", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("hero").attachMatched(this.herculis, this);
      },
      herculis: function (oEvent) {
        var heroId = oEvent.getParameter("arguments").marvelHeroes;
        console.log(heroId);
        var sPath = "/marvelHeroes/" + heroId;
        console.log(sPath);
        this.getView().bindElement(sPath);
        console.log(this.getView().bindElement(sPath));
      },
      // Route Match habdler function

      onBack: function () {
        this.getView().getParent().to("idView1");
      },

      onSave: function () {
        var oResourceModel = this.getView().getModel("i18n");
        var oBundle = oResourceModel.getResourceBundle();
        var msgSuccess = oBundle.getText("msgSuccess", ["23"]);
        var msgError = oBundle.getText("msgError");

        MessageBox.confirm("Do you want to save ?", {
          title: "Confirmation", // default
          onClose: function (status) {
            if (status === "OK") {
              MessageToast.show(msgSuccess);
            } else {
              MessageBox.error(msgError);
            }
          }, // default
        });
      },

      onCancel: function () {},

      oPopupSupplier: null,

      onFilter: function () {
        // Beacuse we cannot acess this variable as controller object
        //inside callbacks/promises, so we create copy
        var that = this;
        if (!this.oPopupSupplier) {
          Fragment.load({
            name: "com.infy.aim.fragments.popup",
            id: "supplier",
            controller: this,
          }).then(function (oFragment) {
            // inside promise & call back function , we cannot acess the this pointer
            // controller object , so we need to create a local variable for controller object
            // outside promise/callback

            that.oPopupSupplier = oFragment;

            that.oPopupSupplier.setTitle("Marvels");

            // Grant the access to the fragment from the view to the model
            that.getView().addDependent(that.oPopupSupplier);

            // 4th binding syntax aggreation binding

            that.oPopupSupplier.bindAggregation("items", {
              path: "/superheroes",
              template: new sap.m.ObjectListItem({
                title: "{name}",
                intro: "{power/0}",
                number: "{stats/strength}",
              }),
            });

            that.oPopupSupplier.open();
          });
        } else {
          this.oPopupSupplier.open();
        }

        //MessageBox.alert("this functionality is under maintence");
      },

      realName: null,
      oField: null,

      onF4Help: function (oEvent) {
        var that = this;
        this.oField = oEvent.getSource();
        if (!this.realName) {
          Fragment.load({
            name: "com.infy.aim.fragments.popup",
            id: "superheroes",
            controller: this,
          }).then(function (oFragment) {
            // inside promise & call back function , we cannot acess the this pointer
            // controller object , so we need to create a local variable for controller object
            // outside promise/callback

            that.realName = oFragment;

            that.realName.setTitle("Hero Name");

            // Grant the access to the fragment from the view to the model
            that.getView().addDependent(that.realName);

            // 4th binding syntax aggreation binding

            that.realName.bindAggregation("items", {
              path: "/marvelSeries",
              template: new sap.m.ObjectListItem({
                title: "{heroName}",
                intro: "{weapon}",
                number: "{rating}",
              }),
            });

            that.realName.open();
          });
        } else {
          this.realName.open();
        }

        //MessageBox.alert(" this functionality is not working");
      },

      onConfirmPopup: function (oEvent) {
        var sId = oEvent.getSource().getId();
        if (sId.indexOf("superheroes") != -1) {
          // Get selected item object from event confirm
          var oSelectedItemObject = oEvent.getParameter("selectedItem");
          // Extract the data from the item
          var sText = oSelectedItemObject.getTitle();
          // set to the input field
          this.oField.setValue(sText);
        }
      },

      onItemPress: function (oEvent) {
        var spath = oEvent.getParameter("listItem").getBindingContextPath();

        var sIndex = spath.split("/")[spath.split("/").length - 1];

        console.log(sIndex);

        this.oRouter.navTo("ironman", {
          superheroes: sIndex,
        });

        //MessageBox.confirm("on item press working");
      },
    });
  }
);
