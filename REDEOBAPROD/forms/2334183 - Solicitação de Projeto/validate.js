var beforeSendValidate = function (numState, nextState) {

  if (numState == 15 || numState == 57) {
    let campos_obrigatorios = []
    let opex = $("#txt_opex_capex").val()
    opex != 'Opex' ? campos_obrigatorios.push({nome: "Orçamento", campo: "txt_orcamento" }, { nome: "Contrato", campo: "txt_num_contrato" }) : ""
    
    campos_obrigatorios.push(
      { nome: "Nome do Serviço", campo: "txt_nome_servico" },
      { nome: "Valor", campo: "txt_valor_solicitacao" },
      { nome: "Justificativa", campo: "txt_justificativa" },
      { nome: "Observações", campo: "txt_observacoes" }
    )

    let tabelaAnexos = $("#tabelaAnexos tbody tr").not(":first")
    let aprovacao = $("#aprovacaoResposta").val()
    if (tabelaAnexos.length > 0) {
      for (let x = 0; x < tabelaAnexos.length; x++) {
        let idCampo = tabelaAnexos[x].children[5].children[0].id

        campos_obrigatorios.push(
          { nome: (x + 1) + '° descrição do anexo', campo: idCampo }
        )
      }
    }

    let emptyFields = validateForm(campos_obrigatorios)
    
    if (emptyFields.length > 0) {
      messageThrow(emptyFields)
    } else {
      if ($("#txt_observacoes").val() != '' && aprovacao != 'sim') {
        setHistorico(numState);
      }
    }
  }

  if ($("#txt_obs_aprovador").val() != '' && ![43, 46, 49, 52].includes(numState)) {
    setHistorico(numState);
  }else if([43, 46, 49, 52].includes(numState) && $("#txt_obs_aprovador").val() != '' && aprovacao != 'sim'){
    setHistorico(numState);
  }
  $('#totalAnexos').val()

  if (numState == 15) {
    let tbAnexos = $("#tabelaAnexos").children()[1].children.length - 1
    let anexos = parent.ECM.attachmentTable.getData().length
    if (tbAnexos != anexos) {
      throw 'O anexo não foi inserido!'

    }
  }
  if (numState == 43) {
    let tbAnexos = $("#tabelaAnexos").children()[1].children.length - 1
    let tbAnexosGerente = $("#tbAnexosGerente").children()[1].children.length - 1
    let anexos = parent.ECM.attachmentTable.getData().length
    if ((tbAnexos + tbAnexosGerente) != anexos) {
      throw 'O anexo não foi inserido!'

    }
  }

};

function setHistorico(state) {
  var estado = parseInt(state)
  var picture = $("#login_user").val();

  const states = [
    {
      id: "solicitacao",
      fotoUser: picture,
      state: 15,
      idObs: "#txt_observacoes",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "aprovacao1",
      fotoUser: picture,
      state: 43,
      idObs: "#txt_obs_aprovador",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "aprovacao2",
      fotoUser: picture,
      state: 46,
      idObs: "#txt_obs_aprovador",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "aprovacao3",
      fotoUser: picture,
      state: 49,
      idObs: "#txt_obs_aprovador",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "revisao",
      fotoUser: picture,
      state: 57,
      idObs: "#txt_observacoes",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "aprovacaoPacoteiro",
      fotoUser: picture,
      state: 52,
      idObs: "#txt_obs_aprovador",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    },
    {
      id: "fim",
      fotoUser: picture,
      state: [9, 11, 7, 14, 65],
      idObs: "#txt_obs_aprovador",
      name: "#hd_nomeUser",
      role: "#hd_funcaoUser",
    }
  ];

  states.forEach((s) => {
    if (
      Array.isArray(s.state) ? s.state.includes(state) : s.state === state
    ) {
      if (s.idObs.trim() != "") {
        let id = wdkAddChild("tbChat");
        let src = `/social/api/rest/social/image/profile/${s.fotoUser}/X_SMALL_PICTURE`;
        let date = new Date();
        date =
          (date.getDay() < 10 ? ("0" + date.getDay()) : date.getDay()) + "/" +
          (date.getMonth() < 10 ? ("0" + date.getMonth()) : date.getMonth()) + "/" +
          date.getFullYear() + " " +
          (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());

        //seta valores nos campos (alguns são hiddens pois não são gravados no banco então estou usando hiddens para guardar as informações)
        $(`#srcFoto___${id}`).val(src);
        $(`#txt_chat___${id}`).val($(s.idObs).val());
        $(`#valueTitleNome___${id}`).val($(s.name).val());
        $(`#valueSpanDate___${id}`).val(date)
        $(`#valueSpanFuncao___${id}`).val($(s.role).val());
      }
    }
  });
}

function validateForm(fields) {
  if (fields.length > 0) {
    let emptyFields = fields.filter(field => ['', undefined].includes($(`#${field.campo}`).val()))
    return emptyFields
  }
}

function messageThrow(emptyFields) {
  if (emptyFields.length > 0) {
    let message = `<h2>Campo(s) obrigatório(s) não preenchidos!</h2>`
    emptyFields.map(field => {
      message += `<p> <b>Campo:</b> ${field.nome}</p>`
    })

    throw message
  }
}