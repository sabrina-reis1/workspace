function enableFields(form){ 

    var atividadeAtual = getValue("WKNumState");
    var desabilita = []
    var indexes = form.getChildrenIndexes("transferir_solic");

    if(atividadeAtual == 4){
        desabilita.push('ztxt_tarefa_chapaFunc')
    }else if(atividadeAtual == 6){//Análise do suporte
        desabilita.push('sl_tarefa_tiposolic', 'ztxt_tarefa_categoria', 'ztxt_tarefa_tipoAtend', 'ztxt_tarefa_slTarefa', 
        'sl_tarefa_prioridade', 'ztxt_tarefa_analista', 'txta_tarefa_detalhe', 'ztxt_tarefa_chapaFunc', 'ztxt_tarefa_nivel', 'txt_tarefa_tiposolic', 'sl_tarefa_tpSolic')
        if(indexes.length > 0){
            for (var i = 0; i < indexes.length; i++) {//percorrendo os indices e setando seu valor
				desabilita.push('ztxt_tarefa_novotp___' + indexes[i], 'ztxt_tarefa_novaTarefa___' + indexes[i], 'ztxt_tarefa_transfSolic___' + indexes[i], 'txta_tarefa_detalhetr___' + indexes[i], 'ztxt_tarefa_novoCateg___' + indexes[i], 'ztxt_tarefa_novoNiv___' + indexes[i]);
			}
        }
    } else if(atividadeAtual == 10 || atividadeAtual == 16){//
        desabilita.push('sl_tarefa_tiposolic','ztxt_tarefa_categoria', 'ztxt_tarefa_tipoAtend', 'ztxt_tarefa_slTarefa', 
        'sl_tarefa_prioridade', 'ztxt_tarefa_analista','txta_tarefa_detalhe', 'ztxt_tarefa_chapaFunc', 'ztxt_tarefa_nivel', 'sl_tarefa_tpSolic')

        //var indexes = form.getChildrenIndexes("transferir_solic");
        if(indexes.length > 0){
            for (var i = 0; i < indexes.length; i++) {//percorrendo os indices e setando seu valor
				desabilita.push('ztxt_tarefa_novotp___' + indexes[i], 'ztxt_tarefa_novaTarefa___' + indexes[i], 'ztxt_tarefa_transfSolic___' + indexes[i], 'txta_tarefa_detalhetr___' + indexes[i], 'ztxt_tarefa_novoCateg___' + indexes[i], 'ztxt_tarefa_novoNiv___' + indexes[i]);
			}
        }
    } else if(atividadeAtual == 8){//
        desabilita.push('sl_tarefa_tiposolic','ztxt_tarefa_categoria', 'ztxt_tarefa_tipoAtend', 'ztxt_tarefa_slTarefa', 
        'sl_tarefa_prioridade', 'ztxt_tarefa_analista', 'sl_tarefa_proxAtividade',
        'ztxt_tarefa_transfSolic' ,'txta_tarefa_detalhe', 'ztxt_tarefa_chapaFunc', 'sl_tarefa_status', 'ztxt_tarefa_nivel', 'sl_tarefa_tpSolic')
        if(indexes.length > 0){
            for (var i = 0; i < indexes.length; i++) {//percorrendo os indices e setando seu valor
				desabilita.push('ztxt_tarefa_novotp___' + indexes[i], 'ztxt_tarefa_novaTarefa___' + indexes[i], 'ztxt_tarefa_transfSolic___' + indexes[i], 'txta_tarefa_detalhetr___' + indexes[i], 'ztxt_tarefa_novoCateg___' + indexes[i], 'ztxt_tarefa_novoNiv___' + indexes[i]);
			}
        }
    }
    else if(atividadeAtual == 12){
        desabilita.push('sl_tarefa_tiposolic','ztxt_tarefa_categoria', 'ztxt_tarefa_tipoAtend', 'ztxt_tarefa_slTarefa', 
        'sl_tarefa_prioridade', 'ztxt_tarefa_analista', 'sl_tarefa_proxAtividade', 'sl_tarefa_tpSolic',
        'ztxt_tarefa_transfSolic' ,'txta_tarefa_detalhe', 'ztxt_tarefa_chapaFunc', 'sl_tarefa_status', 'ztxt_tarefa_nivel')
        if(indexes.length > 0){
            for (var i = 0; i < indexes.length; i++) {//percorrendo os indices e setando seu valor
				desabilita.push('ztxt_tarefa_novotp___' + indexes[i], 'ztxt_tarefa_novaTarefa___' + indexes[i], 'ztxt_tarefa_transfSolic___' + indexes[i], 'txta_tarefa_detalhetr___' + indexes[i], 'ztxt_tarefa_novoCateg___' + indexes[i], 'ztxt_tarefa_novoNiv___' + indexes[i]);
			}
        }
    }

    for(var i = 0; i < desabilita.length; i++){
        form.setEnabled(desabilita[i], false);
    }
}