sap.ui.define([
	"fpe/pe/ProcessEngine"
], function(ProcessEngine) {
	"use strict";

	return {

		init: function(oModel) {
			ProcessEngine.initialize();
			var lConfig = oModel.getData();
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			
			// parse configuration and initialize process engine
			$.each(lConfig.Processes, function(aIndexProc, aProcess) {
				var lProcess = lPE.createProcess(aProcess.Name);
				$.each(aProcess.Steps, function(aIndexStep, aStep) {
					var lStep = lProcess.createStep(aStep.Name);
					var lStepTarget = ($.grep(lConfig.Steps, function(aStepTarget) { return aStepTarget.Name === aStep.Name; }))[0];
					lStep.setSemanticObject(lStepTarget.SemanticObject);
					lProcess.addStep(lStep);
				});
				lPE.addProcess(lProcess);
			});
		}
	};
});