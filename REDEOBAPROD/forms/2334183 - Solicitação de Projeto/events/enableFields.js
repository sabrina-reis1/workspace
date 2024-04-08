function enableFields(form){ 
    
    var atividade = getValue("WKNumState");
    var historicoIndex = form.getChildrenIndexes("tbChat");
    
    for(var i = 0; i < (historicoIndex.length + 1); i++) {
        form.setEnabled(("txt_chat___"+i), false)
    }

    if(atividade == 15 || atividade == 0){
    
        form.setEnabled("txt_chapa_solicitante", false)
        form.setEnabled("txt_solicitante", false)
        form.setEnabled("txt_data_solicitacao", false)
        form.setEnabled("txt_hora_solicitacao", false)
        form.setEnabled("txt_filial_solicitante", false)
        form.setEnabled("txt_email_solicitante", false)
        form.setEnabled("txt_funcao_solicitante", false)
        form.setEnabled("txt_tipo_atendimento", false)
        form.setEnabled("txt_tarefa", false)
    }

    if(atividade != 15){
        var count = form.getChildrenIndexes("tbAnexos");

        for(var i = 0; i < (count.length + 1); i++) {
            form.setEnabled(("txt_descricao_arquivo___"+i), false)
        }

        form.setEnabled("txt_orcamento", false)
        form.setEnabled("txt_num_contrato", false)
        form.setEnabled("txt_centro_custo", false)
        form.setEnabled("txt_natureza_operacao", false)
        form.setEnabled("txt_nome_servico", false)
        form.setEnabled("txt_tamanho_projeto", false)
        form.setEnabled("txt_valor_solicitacao", false)
        form.setEnabled("txt_opex_capex", false)
        form.setEnabled("txt_justificativa", false)
    }
    if(atividade != 43){
        var countGerente = form.getChildrenIndexes("tbAnexosGerente");

        for(var i = 0; i < (countGerente.length + 1); i++) {
            form.setEnabled(("txt_descricao_arquivo_gerente___"+i), false)
        }
    }
    if(atividade == 57){
        form.setEnabled("txt_orcamento", true)
        form.setEnabled("txt_num_contrato", true)
        form.setEnabled("txt_centro_custo", true)
        form.setEnabled("txt_natureza_operacao", true)
        form.setEnabled("txt_nome_servico", true)
        form.setEnabled("txt_tamanho_projeto", true)
        form.setEnabled("txt_valor_solicitacao", true)
        form.setEnabled("txt_opex_capex", true)
        form.setEnabled("txt_justificativa", true)
        for(var i = 0; i < (count.length + 1); i++) {
            form.setEnabled(("txt_descricao_arquivo___"+i), true)
        }
    }
}