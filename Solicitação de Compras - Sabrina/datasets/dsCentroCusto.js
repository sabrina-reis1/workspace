function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("IdCentroCusto");
	ds.addColumn("CentroCusto");

    ds.addRow(["114", "Informática"]);
    ds.addRow(["113", "Marketing"]);
    ds.addRow(["112", "Design"]);

    return ds;
}