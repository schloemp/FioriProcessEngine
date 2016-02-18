sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"fpe/model/models"
], function(UIComponent, Device, JSONModel, models) {
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
			 
			var oConfig = this.getMetadata().getConfig();
			var sNamespace = this.getMetadata().getManisfestEntry("sap.app").id;
			var oConfigModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.processConfigLocal));
			this.setModel(oConfigModel, "config");
		}
	});

});