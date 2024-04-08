function validateForm(form){
    var numeroDeAnexos = form.getValue("totalAnexos")
    
    var atividadeAtual = form.getValue("numAtividade")
    var campos_obrigatorios = []

    var tabelaAnexos = form.getChildrenIndexes("tabelaAnexos");
    var tabelaAnexosGerente = form.getChildrenIndexes("tabelaAnexosGerente");
    var aprovacao = form.getValue("aprovacaoResposta")
    // if(atividadeAtual == 0 || atividadeAtual == 15){
    //     campos_obrigatorios = []
    //     campos_obrigatorios.push(
    //         {nome: "Orçamento", campo: "txt_orcamento"},
    //         {nome: "Contrato", campo: "txt_num_contrato"},
    //         // {nome: "Centro de Custo", campo: "txt_centro_custo"},
    //         // {nome: "Natureza da Operação", campo: "txt_natureza_operacao"},
    //         {nome: "Nome do Serviço", campo: "txt_nome_servico"},
    //         {nome: "Valor", campo: "txt_valor_solicitacao"},
    //         {nome: "Justificativa", campo: "txt_justificativa"},
    //         {nome: "Observações", campo: "txt_observacoes"}
    //     )

    //     if(tabelaAnexos.length > 0){
    //         for (let x = 0; x < tabelaAnexos.length; x++) {
    //             campo_obr.push(
    //                 {nome: x+'° descrição do anexo', campo: 'txt_descricao_arquivo___' + tabelaAnexos[x]}
    //             )
    //         }
    //     }
    // }

    if(atividadeAtual == 46 || atividadeAtual == 49 || atividadeAtual == 43){
        campos_obrigatorios = []
        if (aprovacao != 'sim') {
            campos_obrigatorios.push(
                {nome: "Observações", campo: "txt_obs_aprovador"}
            )
        }
    }

    // if(atividadeAtual == 15 || atividadeAtual == 43){
    //     if((tabelaAnexos.length + tabelaAnexosGerente.length) != attachments.size()){
    //        throw 'O anexo não foi inserido!'
    //     }
    //     log.info('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA =======> '+ tabelaAnexos.length + '+' + tabelaAnexosGerente.length)
    // }
   

    if(atividadeAtual == 57){
        campos_obrigatorios = []
        campos_obrigatorios.push(
            {nome: "Observações", campo: "txt_observacoes"}
        )
    }
	
    for(var i = 0; i < campos_obrigatorios.length; i++) {
        msgValida(form, campos_obrigatorios[i]);
    }

    function msgValida(form, campo){
        if(form.getValue(campo.campo) == null || form.getValue(campo.campo).trim().length() == 0){
            throw "Campo de preenchimento obrigatório [" + campo.nome + "] \n";
        }
    }

    var niveis = form.getValue('nivel_aprovacao')
    var centroCusto = form.getValue("txt_centro_custo")
    var naturezaOp = form.getValue("txt_natureza_operacao")
    var err = ""
    var aprov1 = form.getValue("aprov1")
    var aprov2 = form.getValue("aprov2")
    var aprov3 = form.getValue("aprov3")
    var pacoteiro = form.getValue("pacoteiro")

    if(centroCusto == "0"){
        if(err != "") throw "\nCentro de Custo não pode estar vazio\n"
    } 
    if(naturezaOp == "0"){
        if(err != "") throw "\nNatureza da Operação não pode estar vazio\n"
    } 
    if(aprov1 == "" || aprov2 == "" || aprov3 == ""){
        var aprovMsg1= "Aprovador nivel 1 não cadastrado!\n "
        var aprovMsg2= "Aprovador nivel 2 não cadastrado!\n "
        var aprovMsg3= "Aprovador nivel 3 não cadastrado!\n "
        var pacoteiro= "Pacoteiro não cadastrado!\n "

        if(niveis == "nv1"){
            if(aprov1 == ''){err += aprovMsg1}
            if(pacoteiro == ''){err += pacoteiro}
        } else if(niveis == 'nv2'){
            if(aprov1 == ''){err += aprovMsg1}
            if(aprov2 == ''){err += aprovMsg2}
            if(pacoteiro == ''){err += pacoteiro}
        } else if(niveis == "nv3"){
            if(aprov1 == ''){err += aprovMsg1}
            if(aprov2 == ''){err += aprovMsg2}
            if(aprov3 == ''){err += aprovMsg3}
            if(pacoteiro == ''){err += pacoteiro}
        }
        
        if(err != "") throw "\n" + err + "\nPor favor, contate a equipe de cadastro\n"
    }

}