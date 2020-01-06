function initModel() {
	var sUrl = "/academia/public/com/acc/academia/xsodata/projetoacademia.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}