(function() {
	"use strict";
	jQuery.sap.declare("fpe.pe.ProcessEngine");
	jQuery.sap.require("fpe.pe.Process");
	fpe.pe.ProcessEngine = function() {
		fpe.pe.ProcessEngine.initialize();
	};
	fpe.pe.ProcessEngine._initialized = false;
	fpe.pe.ProcessEngine.initialize = function() {
		if (!fpe.pe.ProcessEngine._initialized) {
			fpe.pe.ProcessEngine._initialized = true;
			jQuery.sap.declare("sap.ushell.services.ProcessEngine");
			sap.ushell.services.ProcessEngine = fpe.pe.ProcessEngine;
			jQuery.sap.declare("sap.ushell.adapters.fiori.ProcessEngineAdapter");
			sap.ushell.adapters.fiori.ProcessEngineAdapter = function(aSystem, aParameter, aConfig) {
				jQuery.sap.log.info("ProcessEngineAdapter: System=" + aSystem + "," + aParameter + "," + aConfig);
			};
		}
	};
	fpe.pe.ProcessEngine.prototype = {
		processes: {},
		processStack: [],
		currentProcess: undefined,
		finishTarget: {
			semanticObject: "Master",
			action: "Display"
		},
		init: function() {},
		createProcess: function(aName) {
			var lP = new fpe.pe.Process(aName);
			lP.processEngine = this;
			return lP;
		},
		addProcess: function(aProcess) {
			aProcess.processEngine = this;
			this.processes[aProcess.name] = aProcess;
			return aProcess;
		},
		getProcess: function(aName) {
			return this.processes[aName];
		},
		isFinished: function() {
			return this.currentProcess ? false : true;
		},
		hasCrossApplicationNavigation: function() {
			return sap.ushell && sap.ushell.Container && sap.ushell.Container.getService && sap.ushell.Container.getService(
				"CrossApplicationNavigation");
		},
		getCrossApplicationNavigation: function() {
			if (this.hasCrossApplicationNavigation()) {
				return sap.ushell.Container.getService("CrossApplicationNavigation");
			}
			return undefined;
		},
		_checkProcessStack: function(aDone) {
			if (!aDone) {
				if (this.processStack.length > 0) {
					this.currentProcess = this.currentProcess.pop();
				} else {
					if (this.hasCrossApplicationNavigation()) {
						this.getCrossApplicationNavigation().toExternal({
							target: this.finishTarget
						});
					}
					this.currentProcess = null;
				}
			}
			return aDone;
		},
		executeNext: function() {
			var aDone;
			if (this.currentProcess) {
				aDone = this.currentProcess.executeNext();
			} else {
				aDone = false;
			}
			return this._checkProcessStack(aDone);
		},
		startProcess: function(aName) {
			this.init(); // be sure we are initialized
			if (this.currentProcess) { // if we are already in a process, put it on stack
				this.processStack.push(this.currentProcess);
			}
			this.currentProcess = this.getProcess(aName);
			return this.executeNext();
		}
	};
})();