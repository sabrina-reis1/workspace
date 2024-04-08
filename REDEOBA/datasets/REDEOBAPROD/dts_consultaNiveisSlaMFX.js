function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var datasource = '/jdbc/AppDS' //aponta para o serviço cadastrado no fluig
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(datasource);
    var created = false;

    // var campos;
    var filtro;
    var query;
    // ml de niveis em prod => ML0018692
    // ml de niveis em homol => ML0017245
    var myQuery = "SELECT DOCUMENTID, TXT_ID_CATEGORIA, TXT_NOME_CATEGORIA, TXT_ID_TIPOATEND, TXT_NOME_TIPOATEND, TXT_GRUPO_NIVEL, TXT_PRAZO_CONCLUSAO, d.VERSAO_ATIVA " +
    "FROM ML0018692 MLSLA " +
    "INNER JOIN DOCUMENTO d ON d.NR_DOCUMENTO = MLSLA.DOCUMENTID " +
    "WHERE TXT_ID_CATEGORIA IS NOT NULL AND d.VERSAO_ATIVA != '0' AND MLSLA.VERSION = (SELECT max(VERSION) FROM ML0018692 mlb4 WHERE mlb4.DOCUMENTID = MLSLA.DOCUMENTID)"

    if(constraints != null){
        if(constraints[0].fieldName == 'IDTPATEND'){
            filtro = constraints[0].initialValue.trim();
            myQuery = myQuery + "AND MLSLA.TXT_ID_TIPOATEND = '" + filtro +"' ORDER BY 6"
        }
        if (constraints[0].fieldName == 'FILTRA_NIVEIS') {
            query = constraints[0].initialValue.trim();
            myQuery = myQuery + query + " ORDER BY 6"
        }
    }else{
        myQuery = myQuery + "ORDER BY 6"
    }
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (erro) {
        
    } finally {
        if(rs != null){
            rs.close()
        }
        if(stmt != null){
            stmt.close();
        }
        if(conn != null){
            conn.close();
        }
    }
    return newDataset;

}function onMobileSync(user) {

}