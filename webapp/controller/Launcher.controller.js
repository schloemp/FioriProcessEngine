sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("fpe.controller.Launcher", {
		onInit: function() {
			var lInputModel = new JSONModel({
				ProcessName: undefined
			});
			this.getView().setModel(lInputModel, "input");
		},
		onStartTest: function() {
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			var lProcessName = this.getView().getModel("input").getProperty("/ProcessName");
			if (lProcessName) {
				lPE.startProcess(lProcessName, {
					CustomerName: this.CustomerName
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
			} else {
				this.CustomerName = undefined;
			}
		}
	});
});