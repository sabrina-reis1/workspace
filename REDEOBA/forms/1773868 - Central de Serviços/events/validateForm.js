function validateForm(form){

    var atividadeAtual = getValue("WKNumState");
    var campo_obr = []
    var indexes_transfere = form.getChildrenIndexes("transferir_solic");
    var indexes_chat = form.getChildrenIndexes("chat");
    if(atividadeAtual == 0 || atividadeAtual == 3){
        campo_obr.push(
            {nome: 'Tipo de Atendimento', campo:'ztxt_tarefa_tipoAtend'}, 
            {nome: 'Selecione sua Tarefa', campo: 'ztxt_tarefa_slTarefa'},
            {nome:'Detalhamento da sua solicitação', campo:'txta_tarefa_detalhe'}
            //{nome:'Adicione o novo usuário da solicitação', campo:'ztxt_tarefa_chapaFunc'}
        )
    }else if(atividadeAtual == 4){
        campo_obr.push(
            {nome: 'Categoria', campo: 'ztxt_tarefa_categoria'},
            {nome: 'Tipo de Atendimento', campo:'ztxt_tarefa_tipoAtend'},
            {nome: 'Selecione sua Tarefa', campo: 'ztxt_tarefa_slTarefa'},
            {nome: 'Grupo de Atendimento', campo: 'ztxt_tarefa_nivel'},
            {nome: 'Prioridade', campo:'sl_tarefa_prioridade'},
            {nome: 'Analista', campo:'ztxt_tarefa_analista'}
        )
    }else if(atividadeAtual == 6){
        if (form.getValue('hd_solic_salva') == 'nao') {
            campo_obr.push(
                {nome: 'Próxima Atividade', campo:'hd_transfere_solic'},
                {nome: 'Status', campo: 'sl_tarefa_status'}
            )
		}else{campo_obr.push(
            {nome: 'Status', campo: 'sl_tarefa_status'}
        )
        }
        if(indexes_transfere.length > 0){
            for (var i = 0; i < indexes_transfere.length; i++) {//percorrendo os indices e setando seu valor
				campo_obr.push({nome: 'Novo Tipo de Atendimento', campo:'ztxt_tarefa_novotp___' + indexes_transfere[i]}, 
                {nome: 'Nova Tarefa',campo:'ztxt_tarefa_novaTarefa___' + indexes_transfere[i]}, 
                {nome: 'Novo Analista', campo: 'ztxt_tarefa_transfSolic___' + indexes_transfere[i]}, 
                {nome: 'Detalhamento', campo: 'txta_tarefa_detalhetr___' + indexes_transfere[i]}, 
                {nome: 'Nova Categoria', campo:'ztxt_tarefa_novoCateg___' + indexes_transfere[i]}, 
                {nome: 'Novo Grupo de Atendimento', campo:'ztxt_tarefa_novoNiv___' + indexes_transfere[i]});
			}
        }

        if(indexes_chat.length > 0){
            for (let x = 0; x < indexes_chat.length; x++) {
                campo_obr.push(
                    {nome: 'Chat', campo: 'txta_tarefa_chat___' + indexes_chat[x]}
                )
            }
        }
    }else if(atividadeAtual == 10){
        if (form.getValue('hd_solic_salva') == 'nao'){
            campo_obr.push(
                {nome: 'Próxima Atividade', campo:'hd_transfere_solic'},
                {nome: 'Status', campo: 'sl_tarefa_status'}
            )
        }else{
            campo_obr.push(
                {nome: 'Status', campo: 'sl_tarefa_status'}
            )
        }
        if(indexes_transfere.length > 0){
            for (var c = 0; c < indexes_transfere.length; c++) {//percorrendo os indices e setando seu valor
				campo_obr.push({nome: 'Novo Tipo de Atendimento', campo:'ztxt_tarefa_novotp___' + indexes_transfere[c]}, 
                {nome: 'Nova Tarefa',campo:'ztxt_tarefa_novaTarefa___' + indexes_transfere[c]}, 
                {nome: 'Novo Analista', campo: 'ztxt_tarefa_transfSolic___' + indexes_transfere[c]}, 
                {nome: 'Detalhamento', campo: 'txta_tarefa_detalhetr___' + indexes_transfere[c]}, 
                {nome: 'Nova Categoria', campo:'ztxt_tarefa_novoCateg___' + indexes_transfere[c]}, 
                {nome: 'Novo Grupo de Atendimento', campo:'ztxt_tarefa_novoNiv___' + indexes_transfere[c]});
			}
        }
        if(indexes_chat.length > 0){
            for (let x = 0; x < indexes_chat.length; x++) {
                campo_obr.push(
                    {nome: 'Chat', campo: 'txta_tarefa_chat___' + indexes_chat[x]}
                )
            }
        }
    }else if(atividadeAtual == 8){
        campo_obr.push(
            {nome: 'Status', campo: 'sl_tarefa_status'}
        )
        if(indexes_chat.length > 0){
            for (let x = 0; x < indexes_chat.length; x++) {
                campo_obr.push(
                    {nome: 'Chat', campo: 'txta_tarefa_chat___' + indexes_chat[x]}
                )
            }
        }
    }else if(atividadeAtual == 12){
        campo_obr.push(
            {nome: 'Avaliação do Atendimento', campo: 'hd_avaliacao_atendimento'}
        )
    }

    for (var i = 0; i < campo_obr.length; i++) {
		msgvalida(form, campo_obr[i]);
	}

	function msgvalida(form, campo) {
		if (form.getValue(campo.campo) == null || form.getValue(campo.campo).trim().length() == 0) {
			throw "Campo de preenchimento obrigatório [" + campo.nome + "]";
		}
	}
}