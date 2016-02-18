sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("fpe.controller.Launcher", {
		onStartTest : function() {
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			lPE.startProcess("MeterReadingCorrection");
		}
	});

});