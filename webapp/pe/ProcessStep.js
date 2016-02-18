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
	};
	fpe.pe.ProcessStep.prototype = {
		name: undefined,
		target: {
			semanticObject: undefined,
			action: "Display"
		},
		params: {},
		fillParams: [], // { from: "NameInData", to: "Paramname"}
		fillDatas: [], // { from: "Paramname", to: "NameInData"}
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
		},
		fillParamsToDataContainer: function(aDataContainer) {
			for (var i = 0; i < this.fillDatas.length; i++) {
				var lFP = this.fillDatas[i];
				aDataContainer[lFP.to] = this.getParameter(lFP.from);
			}
		},
		execute: function(aDataContainer) {
			if (this.hasCrossApplicationNavigation()) {
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
		}
	};
})();