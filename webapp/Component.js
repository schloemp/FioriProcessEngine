sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"fpe/model/models",
	"fpe/InitPE"
], function(UIComponent, Device, JSONModel, models, InitPE) {
	"use strict";

	return UIComponent.extend("fpe.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the config model
			var oConfigModel = models.createConfigModel(this.getMetadata());
			this.setModel(oConfigModel, "config");
			oConfigModel.attachRequestCompleted(function() {
				InitPE.init(oConfigModel);
			}, InitPE);
			this.getRouter().initialize();
		    this.getRouter().attachRouteMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(aEvent) {
			var lConfig = aEvent.getParameter("config");
			var lTarget = aEvent.getParameter("targetControl");
			var lView = aEvent.getParameter("view");

			if (lView) {
				if (lTarget instanceof sap.m.NavContainer && lConfig.targetAggregation === "pages") {
					lTarget.to(lView.getId());
				} else {
					if (lTarget instanceof sap.m.SplitContainer) {
						if (lConfig.targetAggregation === "masterPages") {
							lTarget.toMaster(lView.getId());
						} else {
							jQuery.sap.log.info("show detail");
							lTarget.toDetail(lView.getId());
						}
					}
				}
			}
		}
	});

});