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
			this.setModel(models.createConfigModel(this.getMetadata()), "config");
			InitPE.init(this.getModel("config"));
		}
	});

});