function defineStructure() {

}

function onSync(lastSyncDate) {

}



function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();

    ds.addColumn("login");
    ds.addColumn("solicitante");

    var filtroGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "solicitanteSabrina", "solicitanteSabrina", ConstraintType.MUST);

    var datasetGrupo = DatasetFactory.getDataset("colleagueGroup", null, new Array(filtroGrupo), null);

    for (var i = 0; i < datasetGrupo.rowsCount; i++) {
        var colabGrupo = datasetGrupo.getValue(i, "colleagueGroupPK.colleagueId");

        var datasetColaborador = DatasetFactory.getDataset("colleague", null, null, null);

        for (var j = 0; j < datasetColaborador.rowsCount; j++) {
            var colabCol = datasetColaborador.getValue(j, "colleaguePK.colleagueId");
            var colabNome = datasetColaborador.getValue(j, "colleagueName");
            if (colabCol == colabGrupo) {
                ds.addRow(new Array(colabCol, colabNome));
            }
        }
    }
    return ds;
}

function onMobileSync(user) {

}