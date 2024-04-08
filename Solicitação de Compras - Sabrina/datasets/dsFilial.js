function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();

    ds.addColumn("IdFilial");
    ds.addColumn("Filial");

    ds.addRow(["1", "Matriz"]);
    ds.addRow(["2", "Santo Andre"]);
    ds.addRow(["3", "Maua"]);

    return ds;
}

