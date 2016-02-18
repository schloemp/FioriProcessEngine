sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"fpe/pe/ProcessEngine"
], function(Controller) {
	"use strict";

	return Controller.extend("fpe.controller.Launcher", {
		onInit : function() {
			fpe.pe.ProcessEngine.initialize();
		    var lPE = sap.ushell.Container.getService("ProcessEngine");
		    var lP = lPE.createProcess("MeterReadingCorrection");
		    var lS = lP.createStep("EnterMRKey");
		    lS.setSemanticObject("EnterMRKey");
		    lP.addStep(lS);
		    lPE.addProcess(lP);
		},
		onStartTest : function() {
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			lPE.startProcess("MeterReadingCorrection");
		}
	});

});