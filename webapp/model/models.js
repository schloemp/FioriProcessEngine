sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createConfigModel: function() {
			var oConfig = this.getMetadata().getConfig();
			var sNamespace = this.getMetadata().getManisfestEntry("sap.app").id;
			var oConfigModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.processConfigLocal));
			return oConfigModel;
		}
		

	};

});