sap.ui.define([
	"fpe/pe/ProcessEngine"
], function(ProcessEngine) {
	"use strict";

	return {

		init: function(oModel) {
			ProcessEngine.initialize();
			var lConfig = oModel.getData();
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			//TODO create steps and processes
		    var lP = lPE.createProcess("MeterReadingCorrection");
		    var lS = lP.createStep("EnterMRKey");
		    lS.setSemanticObject("EnterMRKey");
		    lP.addStep(lS);
		    lPE.addProcess(lP);
		}
		
	};

});