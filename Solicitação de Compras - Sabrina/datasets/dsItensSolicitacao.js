function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("IdProduto");
	ds.addColumn("descricao");
	ds.addColumn("unMedida");
	ds.addColumn("vlUnit");
	ds.addColumn("centrodeCusto");
	

	ds.addRow(["01021", "Servico de Informatica", "UN", "2500", "Informática"]);
	ds.addRow(["01022", "Servico para o RH", "UN", "30000", "Marketing"]);
	ds.addRow(["01023", "Reparos tecnicos", "UN", "1000", "Design"]);

	return ds;
}