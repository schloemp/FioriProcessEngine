sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("fpe.controller.PEConfigurationSteps", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onSelectionChanged : function(aEvent) {
			var lItem = aEvent.getParameter("listItem");
			var lDetail = this.getView().byId("StepDetail");
			lDetail.setBindingContext(lItem.getBindingContext("config"),"config");
		}
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf fpe.view.PEConfigurationSteps
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf fpe.view.PEConfigurationSteps
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf fpe.view.PEConfigurationSteps
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf fpe.view.PEConfigurationSteps
		 */
		//	onExit: function() {
		//
		//	}

	});

});