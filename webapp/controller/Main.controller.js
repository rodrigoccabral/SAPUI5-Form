/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function (Controller, MessageToast, JSONModel, UIComponent, MessageBox, Filter, FilterOperator) {
	"use strict";

		return Controller.extend("com.acc.academia.controller.Main", {
			id : 1,
			onInit: function () {
			var oModel = new JSONModel();
			this.getView().byId("packTabela").setModel(oModel);
			this.getView().byId("packTabela");
			},
		//	************************Função de adicionar funcionários****************
		//	************************************************************************
			onAdd: function () {

			// Pega os valores de input do primeiro painel
			var ComCode = this.getView().byId("inputEmp").getValue();
			var Plant = this.getView().byId("inputCnpj").getValue();
			if (ComCode === "" && Plant === "") {
				alert("Atenção! As informações da empresa não podem ser nulas");
			}

			// Pega os valores de input do segundo painel
			var nomeemp = this.getView().byId("inputEmp").getValue();
			var cnpj = this.getView().byId("inputCnpj").getValue();
			var nome = this.getView().byId("inNome").getValue();
			var sobrenome = this.getView().byId("inSobrenome").getValue();
			var dataNasc = this.getView().byId("inDatanasc").getValue();
			var profissao = this.getView().byId("inProfissao").getValue();
			if (nome !== "" && sobrenome !== "" && dataNasc !== "" && profissao !== "") {
		
			// Coloca essas informações num array e faz um binding na tabela
			var itemRow = {
				id : this.id,
				Nomeempfun: nomeemp,
				Cnpjfun: cnpj,
				Nomefun: nome,
				Sobrenomefun: sobrenome,
				Datanascimentofun: dataNasc,
				Profissaofun: profissao
			};
			this.id++;

			// Pega o modelo pra minha tabela que se chama packTabela
			var oModel = this.getView().byId("packTabela").getModel();
			
			var itemData = oModel.getProperty("/data");

			// Caso o formato dos inputs estejam corretos
			if (typeof itemData !== "undefined" && itemData !== null && itemData.length > 0) {
			// Empurra os itens do array pra proxima coluna usando o comando push
			itemData.push(itemRow);
			} else {
			// Caso o formato não estiver certo
			itemData = [];
			// anexa linha vazia
			itemData.push(itemRow);
			}
			// Set Model
			oModel.setData({
			data: itemData
			});

			// Limpar os campos de inputs
			this.getView().byId("inputEmp").setValue("");
			this.getView().byId("inputCnpj").setValue("");
			this.getView().byId("inNome").setValue("");
			this.getView().byId("inSobrenome").setValue("");
			this.getView().byId("inDatanasc").setValue("");
			this.getView().byId("inProfissao").setValue("");

			} else {
				alert("Atenção! As informações do funcionário não podem ser nulas");
			}
			
		//*****Inicio da exportação das informações para o banco de dados********
			var sServiceUrl = "/academia/public/com/acc/academia/xsodata/projetoacademia.xsodata/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			var that = this;
			
			var oDataModel = {};
			
			oDataModel.COD = 1;
			oDataModel.NOMEDAEMPRESA = "Organizacao";
			oDataModel.CNPJ = 123;
			oDataModel.NOME = "João";
			oDataModel.SOBRENOME = "Augusto";
			oDataModel.DATANASC = null;
			oDataModel.PROFISSAO = "Engenheiro";
		
			oModel.create("/Perfil", oDataModel, {
					async: true,
					success : function(oData, response){
						sap.m.MessageBox.success("Sucesso");
						that._refreshTable();
					},
					error : function(oResponseError){
						sap.m.MessageBox.error("A quantidade de Registros exportados é muito alta." + 
								" \n\nPor favor, tente realizar um novo filtro!");
					}
				});
		},
		//	*********************Fim da função adicionar funcionário***************
		//	***********************************************************************
		
		//	************************Função deletar funcionário*********************
		//	***********************************************************************
			onPressOpenDialog3: function () {
			var oTable = this.getView().byId("packTabela");
			var oModel2 = oTable.getModel();
			var aRows = oModel2.getData().data;
			var aContexts = oTable.getSelectedContexts();
			// Loop pra linha selecionada voltar		
			for (var i = aContexts.length - 1; i >= 0; i--) {
			// Linha selecionada
			var oThisObj = aContexts[i].getObject();

			// $.map() -> é usado pra mudar valores de arrays
			// Aqui tenta encontrar o index da linha selecionada
			var index = $.map(aRows, function (obj, index) {
			if (obj === oThisObj) {
			return index;
			}
			});
			// O metodo splice() adiciona/remove itens de uma array
			// Aqui é deletado a linha index selecionada
			aRows.splice(index, 1);
			}
			// Setar o modelo com o dado atualizado
			oModel2.setData({
			data: aRows
			});
			// Resetar a seleção da tabela
			oTable.removeSelections(true);
		},
		//	*******************Fim da função deletar funcionário*******************
		//	***********************************************************************

		//	************************Função de procurar*****************************
		//	***********************************************************************
			handleStudentSearch: function (oEvent) {
			var oStudentList = this.getView().byId("packTabela");
			var oItemsBinding = oStudentList.getBinding("items");

			var sValue = oEvent.oSource.getValue();

			if (sValue === "" || sValue === null || sValue === undefined) {
			oItemsBinding.filter([]);
			return;
			}
			var oNameempFilter = new sap.ui.model.Filter("Nomeempfun", sap.ui.model.FilterOperator.Contains, sValue);
			var oNcnpjFilter = new sap.ui.model.Filter("Nomecnpjfun", sap.ui.model.FilterOperator.Contains, sValue);
			var oNameFilter = new sap.ui.model.Filter("Nomefun", sap.ui.model.FilterOperator.Contains, sValue);
			var oDOBFilter = new sap.ui.model.Filter("Sobrenomefun", sap.ui.model.FilterOperator.Contains, sValue);
			var oSobrenomeFilter = new sap.ui.model.Filter("Datanascimentofun", sap.ui.model.FilterOperator.Contains, sValue);
			var oProfissaoFilter = new sap.ui.model.Filter("Profissaofun", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter = new sap.ui.model.Filter([oNameempFilter, oNcnpjFilter, oNameFilter, oDOBFilter, oSobrenomeFilter, oProfissaoFilter], false);

			oItemsBinding.filter(oFilter);
			}, 
		//	************************Fim da função procurar*************************
		//	***********************************************************************
		
		//	******************Inicio da chamada do dialog salvar página************
		//	***********************************************************************
			onPressOpenDialogsave: function () {
			var oView = this.getView();
			var oDialog = oView.byId("myDialog");

			// create dialog lazily
			if (!oDialog) {
			// create dialog via fragment factory
			oDialog = sap.ui.xmlfragment(oView.getId(), "com.acc.academia.view.fragment.Dialoggravar", this);
			oView.addDependent(oDialog);
			}
			oDialog.setEscapeHandler(function () {
			oDialog.close();
			oDialog.destroy();
			});
			oDialog.open();
			},
			onMyDialogSelect: function() {
		    var oDialog = this.getView().byId("myDialog");
		    oDialog.close();
		    oDialog.destroy();		    
			},
		//	******************Fim da chamada do dialog salvar página***************
		//	***********************************************************************
		
		//	*********************Início da chamada do dialog editar****************
		//	***********************************************************************
			onPressOpenDialog2: function (oEvent) {
			var oView = this.getView();
			var oDialog2 = oView.byId("myDialog2");
			
			// create dialog lazily
			if (!oDialog2) {
			// create dialog via fragment factory
			oDialog2 = sap.ui.xmlfragment(oView.getId(), "com.acc.academia.view.fragment.Dialogeditar", this);
			oView.addDependent(oDialog2);
			}
			oDialog2.setEscapeHandler(function () {
			oDialog2.close();
			oDialog2.destroy();
			});
			oDialog2.open();
			},
			onPressCloseDialog2 : function() {
		    var oDialog2 = this.getView().byId("myDialog2");
		    oDialog2.close();
		    oDialog2.destroy();		    
			},
			onMyDialogSelect2: function() {
		    var oDialog2 = this.getView().byId("myDialog2");
		    oDialog2.close();
		    oDialog2.destroy();		    
			},
		//	******************Fim da chamada do dialog editar**********************
		//	***********************************************************************
		
		//	*****************Início da chamada do dialog ajuda*********************
		//	***********************************************************************
			onPressOpenDialogajuda: function () {
			var oView = this.getView();
			var oDialog2 = oView.byId("myDialogajuda");

			// create dialog lazily
			if (!oDialog2) {
				// create dialog via fragment factory
			oDialog2 = sap.ui.xmlfragment(oView.getId(), "com.acc.academia.view.fragment.Dialogajuda", this);
			oView.addDependent(oDialog2);
			}
			oDialog2.setEscapeHandler(function () {
			oDialog2.close();
			oDialog2.destroy();
			});
			oDialog2.open();
			},
			onMyDialogSelectajuda: function() {
		    var oDialog2 = this.getView().byId("myDialogajuda");
		    oDialog2.close();
		    oDialog2.destroy();		    
			},
		//	******************Fim da chamada do dialog ajuda***********************
		//	***********************************************************************
		
		//	******************Virar a página***************************************
		//	***********************************************************************
			_showObject: function(oItem) {
			
			var cells = oItem.getCells();
			var objIdentifier = cells[0];
			var idVal = objIdentifier.getTitle();
			
			UIComponent.getRouterFor(this).navTo("Object", {
				id: idVal
			});
		},
			onPress: function(oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		}
		//	******************Fim do virar a página********************************
		//	***********************************************************************
	});
});