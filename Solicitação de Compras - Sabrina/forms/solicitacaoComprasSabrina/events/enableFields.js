function enableFields(form) {
    var atividadeAtual = getValue("WKNumState");
    var historicoIndex = form.getChildrenIndexes("itensTabela");
    
    if(atividadeAtual != 1 && atividadeAtual != 0) {
    
    for(var i = 0; i < (historicoIndex.length + 1); i++) {
        form.setEnabled(("produto___" + i), false);
        form.setEnabled(("CentroCusto2___" + i), false);
        form.setEnabled(("necessidade___" + i), false);
        form.setEnabled(("quantidade___" + i), false);
    } 
        form.setEnabled("dataVencimento",false);
        form.setEnabled("filial",false);
        form.setEnabled("depto",false);
        form.setEnabled("centroCusto",false);
        form.setEnabled("pagamento",false);
        form.setEnabled("email",false);
        form.setEnabled("telefone",false);
        form.setEnabled("ramal",false);
        form.setEnabled("cep",false);
        form.setEnabled("cnpj",false);
        form.setEnabled("banco",false);
        form.setEnabled("agencia",false);
        form.setEnabled("tipoConta",false);
        form.setEnabled("conta",false);
        form.setEnabled("informacoes",false);
        form.setEnabled("produto",false);
        form.setEnabled("descricao",false);
        form.setEnabled("unMedida",false);
        form.setEnabled("vlUnit",false);
        form.setEnabled("vlTotal",false);
        form.setEnabled("numeroNF",false);
        form.setEnabled("dataReferencia",false);
        form.setEnabled("valorNF",false);
    }
}
