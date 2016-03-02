sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("fpe.controller.Home", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf fpe.view.Home
		 */
		onInit: function() {
			this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(aEvent) {
			var lConfig = aEvent.getParameter("config");
			if (lConfig.controlId === "PEHome" && lConfig.controlAggregation === "pages") {
				var lVName = "";
				if (lConfig.name === "ConfigSteps") {
					lVName = "fpe.view.PEConfigurationSteps";
				} else if (lConfig.name === "ConfigProcesses") {
					lVName = "fpe.view.PEConfigurationProcesses";
				} else if (lConfig.name === "Launcher") {
					lVName = "fpe.view.Launcher";
				} else if (lConfig.name === "Home") {
					lVName = "fpe.view.HomeChoose";
				}
				var lNC = this.getView().byId("PEHome");
				var lPages = lNC.getPages();
				for (var i = 0; i < lPages.length; i++) {
					if (lPages[i].getViewName) {
						var lName = lPages[i].getViewName();
						if (lName === lVName) {
							lNC.to(lPages[i]);
							break;
						}
					} else if (lVName === "") {
						lNC.to(lPages[i]);
						break;
					}
				}
			}
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf fpe.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf fpe.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf fpe.view.Home
		 */
		//	onExit: function() {
		//
		//	}
		/**
		 *@memberOf fpe.controller.Home
		 */
		onLauncherPress: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("Launcher");
		},
		/**
		 *@memberOf fpe.controller.Home
		 */
		onConfigStepsPress: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("ConfigSteps");
		},
		/**
		 *@memberOf fpe.controller.Home
		 */
		onConfigProcesses: function() {
			//This code was generated by the layout editor.
			this.getRouter().navTo("ConfigProcesses");
		}
	});
});