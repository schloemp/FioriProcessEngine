(function() {
	"use strict";
	jQuery.sap.declare("fpe.pe.ProcessStep");
	fpe.pe.ProcessStep = function(aName) {
		this.name = aName;
		this.target = {
			semanticObject: undefined,
			action: "Display"
		};
		this.params = {};
		this.dataContainer = {};
		this.fillParams = [];
		this.fillDatas = [];
		this.processEngine = undefined;
		this.process = undefined;
	};
	fpe.pe.ProcessStep.prototype = {
		name: undefined,
		target: {
			semanticObject: undefined,
			action: "Display"
		},
		params: {},
		dataContainer: {},
		fillParams: [], // { from: "NameInData", to: "Paramname"}
		fillDatas: [], // { from: "Paramname", to: "NameInData"}
		processEngine: undefined,
		process: undefined,
		init: function() {
			return this;
		},
		setTarget: function(aTarget) {
			this.target = aTarget;
			return this;
		},
		getTarget: function() {
			return this.target;
		},
		setSemanticObject: function(aName) {
			this.target.semanticObject = aName;
			return this;
		},
		getSemanticObject: function() {
			return this.target.semanticObject;
		},
		setAction: function(aAction) {
			this.target.action = aAction;
			return this;
		},
		getAction: function() {
			return this.target.action;
		},
		setParameter: function(aName, aValue) {
			this.params[aName] = aValue;
			return this;
		},
		getParameter: function(aName) {
			return this.params[aName];
		},
		hasCrossApplicationNavigation: function() {
			return this.processEngine.hasCrossApplicationNavigation();
		},
		getCrossApplicationNavigation: function() {
			return this.processEngine.getCrossApplicationNavigation();
		},
		fillParamsFromDataContainer: function(aDataContainer) {
			for (var i = 0; i < this.fillParams.length; i++) {
				var lFP = this.fillParams[i];
				this.setParameter(lFP.to, aDataContainer[lFP.from]);
			}
			this.setParameter("PEStep",this.process.steps.indexOf(this));
		},
		_replaceVariables: function(aText, aObject) {
			if (typeof(aObject) === "object") {
				for (var n in aObject) {
					var lValue = aObject[n];
					aText = aText.replace("{" + n + "}", lValue);
				}
			}
			return aText;
		},
		_setValue: function(aSrc, aSrcName, aDst, aDstName) {
			var lValue = aSrc[aSrcName];
			if (aSrcName.indexOf("{") >= 0) {
				lValue = this._replaceVariables(aSrcName, aSrc);
			}
			aDst[aDstName] = lValue;
		},
		fillDataContainer: function(aDataContainer) {
			for (var i = 0; i < this.fillDatas.length; i++) {
				var lFP = this.fillDatas[i];
				if (lFP.direction === "Out") {
					//aDataContainer[lFP.to] = this.dataContainer[lFP.from];
					this._setValue(this.dataContainer,lFP.from,aDataContainer,lFP.to);
				}
			}
		},
		fillStepContainer: function(aDataContainer) {
			for (var i = 0; i < this.fillDatas.length; i++) {
				var lFP = this.fillDatas[i];
				if (lFP.direction === "In") {
					//this.dataContainer[lFP.to] = aDataContainer[lFP.from];
					this._setValue(aDataContainer,lFP.from,this.dataContainer,lFP.to);
				}
			}
		},
		addFillData: function(aDirection, aSource, aTarget) {
			this.fillDatas.push({
				direction: aDirection,
				from: aSource,
				to: aTarget
			});
		},
		addFillParam: function(aSource, aTarget) {
			this.fillParams.push({
				from: aSource,
				to: aTarget
			});
		},
		execute: function(aDataContainer) {
			if (this.hasCrossApplicationNavigation()) {
				this.fillStepContainer(aDataContainer);
				this.fillParamsFromDataContainer(aDataContainer);
				this.getCrossApplicationNavigation().toExternal({
					target: this.target,
					params: this.params
				});
				return true;
			} else {
				jQuery.sap.log.info("Service 'CrossApplicationNavigation' not found!");
				return false;
			}
		},
		getCurrentStepContainer: function() {
			return this.dataContainer;
		}
	};
})();