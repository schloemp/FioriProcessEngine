sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"fpe/InitPE"
], function(Controller, JSONModel, InitPE) {
	"use strict";
	return Controller.extend("fpe.controller.Launcher", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onInit: function() {
			var lInputModel = new JSONModel({
				ProcessName: undefined
			});
			this.getView().setModel(lInputModel, "input");
		},
		onStartTest: function() {
			InitPE.init(this.getView().getModel("config"));
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			var lProcessName = this.getView().getModel("input").getProperty("/ProcessName");
			if (lProcessName) {
				lPE.startProcess(lProcessName, {
					CustomerName: this.CustomerName,
					CustomerAddress: this.CustomerAddress
				});
			} else {
				sap.m.MessageToast.show("No Process");
			}
		},
		/**
		 *@memberOf fpe.controller.Launcher
		 */
		onSelectionChanged: function(aEvent) {
			if (aEvent.getParameter("selected")) {
				var lItem = aEvent.getParameter("listItem");
				this.CustomerName = lItem.getTitle();
				this.CustomerAddress = lItem.getDescription();
			} else {
				this.CustomerName = undefined;
				this.CustomerAddress = undefined;
			}
		},
		/**
		 *@memberOf fpe.controller.Launcher
		 */
		onConfigSteps: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("ConfigSteps");
		},
		onConfigProcesses: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("ConfigProcesses");
		},
		/**
		 *@memberOf fpe.controller.Launcher
		 */
		onNavPress: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("Home");
		}
	});
});