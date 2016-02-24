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
			/*
			$.each(lConfig.Processes, function(aIndexProc, aProcess) {
				var lProcess = lPE.createProcess(aProcess.Name);
				$.each(aProcess.Steps, function(aIndexStep, aStep) {
					var lStep = lProcess.createStep(aStep.Name);
					var lStepTarget = ($.grep(lConfig.Steps, function(aStepTarget) { return aStepTarget.Name === aStep.Name; }))[0];
					lStep.setSemanticObject(lStepTarget.SemanticObject);
					lStep.setAction(lStepTarget.Action);
					$.each(aStep.Parameters, function(aIndexParam, aParam)  {
						lStep.setParameter(aParam.ParamName, aParam.ParamValue);                         
					});
					$.each(aStep.DataFlows, function(aIndexParam, aParam)  {
						lStep.addFillData(aParam.Direction, aParam.SourcePath, aParam.TargetPath);
					});
					lProcess.addStep(lStep);
				});
				lPE.addProcess(lProcess);
			});
			*/
			var lSteps = {};
			for (var li = 0; li < lConfig.Steps.length; li++) {
				lSteps[lConfig.Steps[li].Name] = lConfig.Steps[li];
			}
			for (var lPi = 0; lPi < lConfig.Processes.length; lPi++) {
				var lCP = lConfig.Processes[lPi];
				var lProcess = lPE.createProcess(lCP.Name);
				for (var lPs = 0; lPs < lCP.Steps.length; lPs++) {
					var lCS = lCP.Steps[lPs];
					var lStep = lProcess.createStep(lCS.Name);
					lStep.setSemanticObject(lSteps[lCS.Name].SemanticObject);
					lStep.setAction(lSteps[lCS.Name].Action);
					for (li = 0; li < lCS.Parameters.length; li++) {
						lStep.setParameter(lCS.Parameters[li].ParamName, lCS.Parameters[li].ParamValue);
					}
					for (li = 0; li < lCS.DataFlows.length; li++) {
						lStep.addFillData(lCS.DataFlows[li].Direction, lCS.DataFlows[li].SourcePath, lCS.DataFlows[li].TargetPath);
					}
					lProcess.addStep(lStep);
				}
				lPE.addProcess(lProcess);
			}
		}
	};
});