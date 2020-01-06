sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("com.acc.academia.controller.Object", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.acc.academia.view.Object
		 */
		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("Object").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched : function (oEvent) {
				var id = oEvent.getParameter("arguments").id;
			
		},
		onBack : function(){
		
			UIComponent.getRouterFor(this).navTo("Inicial");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.acc.academia.view.Object
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.acc.academia.view.Object
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.acc.academia.view.Object
		 */
		//	onExit: function() {
		//
		//	}

	});

});
