(function() {
	"use strict";
	jQuery.sap.declare("fpe.pe.Process");
	jQuery.sap.require("fpe.pe.ProcessStep");
	fpe.pe.Process = function(aName) {
		this.name = aName;
		this.steps = [];
		this.currentStep = undefined;
		this.currentStepIndex = -1;
		this.dataContainer = {};
	};
	fpe.pe.Process.prototype = {
		name: undefined,
		steps: [],
		currentStep: undefined,
		currentStepIndex: -1,
		dataContainer: {},
		processEngine: undefined,
		_startHash: undefined,
		_startHistoryLength: undefined,
		_started: false,
		init: function() {},
		createStep: function(aName) {
			var lS = new fpe.pe.ProcessStep(aName);
			lS.processEngine = this.processEngine;
			lS.process = this;
			return lS;
		},
		addStep: function(aStep) {
			aStep.processEngine = this.processEngine;
			aStep.process = this;
			this.steps.push(aStep);
			return aStep;
		},
		execute: function() {
			this._startHash = window.location.hash;
			this._startHistoryLength = window.history.length;
			this._started = true;
			if (this.currentStepIndex < 0 && this.steps.length > 0) {
				this.currentStepIndex = 0;
				this.currentStep = this.steps[this.currentStepIndex];
			}
			if (!this.currentStep) {
				jQuery.sap.log.info("Process '" + this.name + "' step not found!");
				return false;
			}
			return this.currentStep.execute(this.dataContainer);
		},
		executeNext: function() {
			if (this.currentStepIndex < 0) {
				return this.execute(this.dataContainer);
			}
			if (this.currentStep) {
				this.currentStep.fillDataContainer(this.dataContainer);
			}
			this.currentStepIndex = this.currentStepIndex + 1;
			if (this.currentStepIndex < this.steps.length) {
				this.currentStep = this.steps[this.currentStepIndex];
				return this.currentStep.execute(this.dataContainer);
			} else {
				this.currentStepIndex = -1;
				jQuery.sap.log.info("Process '" + this.name + "' finished.");
				return false;
			}
		},
		setDataContainer: function(aDataContainer) {
			this.dataContainer = aDataContainer;
		},
		getCurrentStepContainer : function() {
			if (this.currentStep) {
				return this.currentStep.getCurrentStepContainer();
			} else {
				return undefined;
			}
		}
	};
})();