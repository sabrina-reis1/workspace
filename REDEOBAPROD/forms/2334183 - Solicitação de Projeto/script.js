let numAtividade = $('#numAtividade').val()


$(document).ready(function () {
  getCurrentUserData()
  $("#txt_valor_solicitacao").on('change', function (){
    let value = parseInt($("#txt_valor_solicitacao").val())
    if(value < 20000){
      $("#nivel_aprovacao").val('nv1')
    } else if(value >= 20000 && value <= 100000){
      $("#nivel_aprovacao").val('nv2')
    } else {
      $("#nivel_aprovacao").val('nv3')
    }
  })

    if(numAtividade == "15"){
      carregarDadosAutomatico()
      //getDadosSolicitante()
      // const dataSolicServ = $("#hd_data_central_servico").val()
      // const splitDate = dataSolicServ.split(" - ")[0].split("/")

      // const newDate = new Date(splitDate[2], splitDate[1], splitDate[0])
      // $("#txt_data_solic").val(newDate)
    } else {
      $("#txt_obs_aprovador").val("")
    }
    loadingChat(numAtividade)
    verificaAnexos()

    $('#aprovacaoResposta').val('');
 

    let states = [
        { id: "solicitacao", divs: ["solicitacao"], state: ["15", "0"] },
        {
            id: "aprovacao1",
            divs: ["solicitacao", "aprovacao1"],
            state: '43',
        },
        { 
            id: "aprovacao2", 
            divs: ["solicitacao", "aprovacao1", 'aprovacao2'], 
            state: "46" 
        },
        { 
            id: "aprovacao3", 
            divs: ["solicitacao", "aprovacao1", 'aprovacao2', 'aprovacao3'], 
            state: "49" 
        },
        { 
          id: "aprovacaoPacoteiro", 
          divs: ["solicitacao", "aprovacao1", 'aprovacao2', 'aprovacao3', 'aprovacaoPacoteiro'], 
          state: "52" 
        },
        {
          id: "revisao",
          divs: ["revisao"],
          state: "57"
        },
        {
          id: "projetoAprovado",
          divs: ["projetoAprovado"],
          state: ["65"]
        },
        {
            id: "projetoReprovado",
            divs: ["projetoReprovado"],
            state: ["9", "11", "7", '14']
        }, 
    ];

    states.forEach((s) => {
        if (
            Array.isArray(s.state)
                ? s.state.includes(numAtividade)
                : s.state === numAtividade
        ) {
      
            s.divs.forEach((element) => {$(`#${element}`).removeClass('hide');});
            s.divs.forEach((element, index) => {     
              if(index != (s.divs.length - 1)){
                $(`#${element}`).removeClass("progress-bar-warning")
                $(`#${element}`).addClass("progress-bar-success")
              }else{
                $(`#${element}`).addClass("progress-bar-warning")
                if(numAtividade == '65'){
                  $(`#${element}`).removeClass("progress-bar-warning")
                  $(`#${element}`).addClass("progress-bar-success")
                }
                if(numAtividade == '7' || numAtividade == '9' || numAtividade == '11' || numAtividade == '14'){
                  $(`#${element}`).removeClass("progress-bar-warning")
                  $(`#${element}`).addClass("progress-bar-danger")
                }
              }
            })
        }
    });

    $($(".btnRemoveAnexo")[0].parentElement).hide()
    $($(".btnDownloadAnexo")[0].parentElement).hide()
    $($(".btnRemoveAnexoGerente")[0].parentElement).hide()
    $($(".btnDownloadAnexoGerente")[0].parentElement).hide()
    $($("#cabecalhoTabelaAnexosGerente")[0].children[0].children[2]).addClass('hide')
    $($("#cabecalhoTabelaAnexosGerente")[0].children[0].children[3]).addClass('hide')
    
})

$("#txt_opex_capex").on("change", function(){
  let tipo = $("#txt_opex_capex").val()
  console.log(tipo);

  if(tipo == "Opex"){
    $("#txt_orcamento").attr('disabled', 'disabled')
  } else {
    $("#txt_orcamento").removeAttr('disabled')
  }
})

let modalAprovacao;

function salvaRespostaAprovador(res) {
    $('#aprovacaoResposta').val(res);
    let textoAcao;

    switch(res){
      case 'sim':
        textoAcao = "<p>Você tem certeza que deseja <strong>APROVAR</strong> essa solicitação?</p>"
        break;
      case 'nao':
        textoAcao = "<p>Você tem certeza que deseja <strong>REPROVAR</strong> essa solicitação?</p>"
        break;
      case 'revisar':
        textoAcao = "<p>Você tem certeza que encaminhar a solicitação para <strong>REVISÃO</strong>?</p>"
        break;
    }

    modalAprovacao = FLUIGC.modal({
      title: '',
      content: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          ${textoAcao}
          <div>
            <button type="button" class="btn btn-success btn-lg" onclick="respostaAprovador('sim')">Sim</button>
            <button type="button" class="btn btn-danger btn-lg" onclick="respostaAprovador('nao')">Não</button>
          </div>
        </div>
      `,
      id: 'fluig-modal',
      autoClose: true
    }, function(err, data) {
      if(err) {
        // do error handling
      } else {
        // do something with data
      }
    });
}
function respostaAprovador(res){
  let aprovacao = $("#aprovacaoResposta").val()
  if(res == 'sim'){
    if($("#txt_obs_aprovador").val() == "" && aprovacao != "sim"){
      modalAprovacao.remove()
      FLUIGC.toast({
        title: '',
        message: 'O campo de observações não pode estar vazio!',
        type: 'danger'
      });
    }else {
      window.parent.$('button[data-send]').first().click()
    }
  } else {
    $("#aprovacaoResposta").val("")
    modalAprovacao.remove()
  }
}

// function getDadosSolicitante() {
//   var user_code = getUsuario();

//   $("#hd_mat_solic").val(user_code);
//   var mail = getMail(user_code)
//   var chapa = getChapa(mail[0])

//   var c1 = DatasetFactory.createConstraint('CHAPA', chapa, chapa, ConstraintType.MUST)
//   var dados = DatasetFactory.getDataset('dts_getDadosCabecalho_MFX', null, [c1], null).values
//   var filial = DatasetFactory.getDataset('dts_getFilialConsinco_MFX', null, [c1], null).values
//   if (dados.length > 0) {
//       $("#txt_funcao_solicitante").val(dados[0]["FUNCAO"]);
//       $("#txt_solicitante").val(dados[0]["NOME"]);
//       $("#txt_chapa_solicitante").val(dados[0]["CHAPA"]);
//       $("#txt_tarefa_filial").val(dados[0]["NOMEFANTASIA"])
//       $("#txt_email_solicitante").val(mail[0]);
//   } else {
//       FLUIGC.modal({
//           title: 'Usuário não encontrado no RM:',
//           content: '<p>Contate a equipe de TI ou busque seu usuário no switch de "Solicitação para outro funcionário"</p>',
//           id: 'modal_user',
//           size: 'large',
//           actions: [{
//               'label': 'Ok',
//               'bind': 'data-ok-req',
//               'classType': 'btn btn-warning btn-block',
//               'autoClose': true
//           }]
//       }, function (err, data) {
//           if (err) {
//               // do error handling
//           } else {
//               // do something with data
//           }
//       });
//   }
// }

function getMail(userCode){
var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userCode, userCode, ConstraintType.MUST)
  var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values
return [colleague[0].mail, colleague[0].login]
}

// function getChapa(mail){
// var dsChapa = DatasetFactory.getDataset("dsGetChapaAD", ['a', mail], null, null).values
// var objeto = JSON.parse(dsChapa[0].retorno);
// return objeto.onPremisesSamAccountName
// }

function carregarDadosAutomatico(){
    
    let data = new Date()
    data = (data.getDate() < 10 ? ("0"+data.getDate()) : data.getDate()) + "/" + 
           (data.getMonth() < 10 ? ("0"+data.getMonth()) : data.getMonth()) + "/" +
           data.getFullYear()
    
    let hora = new Date().getHours();
    let minuto = new Date().getMinutes();
    let horaAtual = (hora < 10 ? ("0"+hora) : hora) + ":" + (minuto < 10 ? ("0"+minuto) : minuto)

    if(
        $('#_txt_data_solicitacao').val() == "" &&
        $("#_txt_hora_solicitacao").val() == ""
    ){
        $('#_txt_data_solicitacao').val(data)
        $("#_txt_hora_solicitacao").val(horaAtual)
        $('#txt_data_solicitacao').val(data)
        $("#txt_hora_solicitacao").val(horaAtual)
    }
    
    var user_code = getUsuario();
    var mail = getMail(user_code)
    
    var chapa = getChapa(mail[0])
    var c1 = DatasetFactory.createConstraint('CHAPA', chapa, chapa, ConstraintType.MUST)
    var dados = DatasetFactory.getDataset('dts_getDadosCabecalho_MFX', null, [c1], null).values
    var filial = DatasetFactory.getDataset('dts_getFilialConsinco_MFX', null, [c1], null).values
    if(dados.length > 0){
      $("#txt_funcao_solicitante").val(dados[0]["FUNCAO"]);
      $("#_txt_funcao_solicitante").val(dados[0]["FUNCAO"]);
      $("#txt_solicitante").val(dados[0]["NOME"]);
      $("#_txt_solicitante").val(dados[0]["NOME"]);
      $("#txt_chapa_solicitante").val(dados[0]["CHAPA"]);
      $("#_txt_chapa_solicitante").val(dados[0]["CHAPA"]);
      $("#txt_tarefa_filial").val(dados[0]["NOMEFANTASIA"])
      $("#_txt_tarefa_filial").val(dados[0]["NOMEFANTASIA"])
      $("#txt_email_solicitante").val(mail[0]);
      $("#_txt_email_solicitante").val(mail[0]);
      
      if (filial != undefined || filial.length > 0) {
        $('#_txt_filial_solicitante').val(filial[0]['FANTASIA'])
        $('#txt_filial_solicitante').val(filial[0]['FANTASIA'])
          
      }
    }else{
        FLUIGC.modal({
            title: 'Usuário não encontrado no RM:',
            content: '<p>Contate a equipe de TI</p>',
            id: 'modal_user',
            size: 'large',
            actions: [{
                'label': 'Ok',
                'bind': 'data-ok-req',
                'classType': 'btn btn-warning btn-block',
                'autoClose': true
            }]
        }, function (err, data) {
            if (err) {
                // do error handling
            } else {
                // do something with data
            }
        });
    }
}
function getChapa(mail){
    var dsChapa = DatasetFactory.getDataset("dsGetChapaAD", ['a', mail], null, null).values
    var objeto = JSON.parse(dsChapa[0].retorno);
    return objeto.onPremisesSamAccountName
}

function getCurrentUserData(){
  var mail = $('#hd_userEmail').val()
  var chapa = getChapa(mail)
  var c1 = DatasetFactory.createConstraint('CHAPA', chapa, chapa, ConstraintType.MUST)
  var dados = DatasetFactory.getDataset('dts_getDadosCabecalho_MFX', null, [c1], null).values

  $("#hd_nomeUser").val(dados[0]['NOME'])
  $("#hd_funcaoUser").val(dados[0]['FUNCAO'])
}


function loadingChat(state) {
    const states = [
        {
            id: "solicitacao",
            state: ["16", "0"],
          },
          {
            id: "aprovacao1",
            state: '43',
          },
          {
            id: "aprovacao2",
            state: "46",
          },
          {
            id: "aprovacao3",
            state: "49",
          },
          {
            id: "aprovacao4",
            state: "52",
          },
          {
            id: "revisao",
            state: "57",
          },
          {
            id: "fim",
            state: ["9", "11", "7", "14"],
          },
          {
            id: "projetoAprovado",
            state: ["65"],
          }
    ];

    states.forEach((s) => {
      if (Array.isArray(s.state) ? s.state.includes(state) : s.state === state) {
        let tr = $("#tbChat tbody tr");
        tr.toArray().forEach((line, index) => {
          if (index > 0) {
            let id = line.children[0].children[0].children[1].id.split("___")[1];
            let src = $(line.children[0].children[0].children[1]).val();
            let name = $(`#valueTitleNome___${id}`).val();
            let spanRole = $(line.children[0].children[1].children[3]).val();
            let spanDate = $(line.children[1].children[2]).val();
  
            $($(`#srcFoto___${id}`).siblings()[0]).attr("src", src);
            $($(`#valueTitleNome___${id}`).siblings()[0]).text(name);
            $($(`#valueSpanFuncao___${id}`).siblings()[2]).text(spanRole);
            $($(`#valueSpanDate___${id}`).siblings()[0]).text(spanDate);
          }
        });
      }
    });
}

function verificaAnexos(){
    var elementosTabela = $('#tabelaAnexos').children()[1].children.length

    if(elementosTabela == 1){
      $('#cabecalhoTabelaAnexos').hide()
    } else if(elementosTabela > 1){
      $('#cabecalhoTabelaAnexos').show()
    }
}

function removeAnexoButton(element){
  let el = element.parentElement.parentElement
  console.log(el);
  fnWdkRemoveChild(el) 
}

function addAnexo(res){
  var elementosTabela = $('#tabelaAnexos').children()[1].children.length - 1
  let anexos = parent.ECM.attachmentTable.getData().length;
  
  if(res == 'gerente'){
    wdkAddChild('tbAnexosGerente')
  } else {
    if(anexos == elementosTabela){
      wdkAddChild('tbAnexos')
    }
  }
}

function anexarArquivo(el, tipo){  
  if(tipo == 'gerente'){
    let id = el.id.split("___")[1]
    JSInterface.showCamera(`anexo_adicional___${id}`)
    $($("#btn_add_anexo___"+id)[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo_gerente]').val(`anexo_adicional___${id}`)
    $($("#btn_add_anexo___"+id)[0].parentElement).hide()
    $($("#btn_remove_anexo___"+id)[0].parentElement).show()
    window.parent.$('#tab-attachments').first().click()
    
  } else {
    let id = el.id.split("___")[1]
    JSInterface.showCamera(`anexo___${id}`)
    $($("#btn_add_anexo___"+id)[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo___]').val(`anexo___${id}`)
    $($("#btn_add_anexo___"+id)[0].parentElement).hide()
    $($("#btn_remove_anexo___"+id)[0].parentElement).show()
    window.parent.$('#tab-attachments').first().click()

  }
}

function removeAnexo(el){
  let id = el.id.split("___")[1]
  if(id == undefined){
    let name = $(`#${el.parentElement.parentElement.children[4].id}`).val()
    try{
      let attachments = parent.ECM.attachmentTable.getData()
      attachments.forEach((attachment, index) =>{
        if(attachment.description.indexOf(`${name}`) != -1){
          parent.WKFViewAttachment.removeAttach([index])
          fnWdkRemoveChild(el.parentElement.parentElement) 
        }
      })
    }catch(error){
        console.log(error)
    }
  } else {
    let name = $($("#btn_add_anexo___"+id)[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo___]').val()
    try{
      let attachments = parent.ECM.attachmentTable.getData()
      attachments.forEach((attachment, index) =>{
        if(attachment.description.indexOf(`${name}`) != -1){
          parent.WKFViewAttachment.removeAttach([index])
        }
      })
    }catch(error){
        console.log(error)
    }
  }
  $($("#btn_remove_anexo___"+id)[0].parentElement).hide()
  $($("#btn_add_anexo___"+id)[0].parentElement).show()
}

function anexoDownload(el, tipo){
  if(tipo == "gerente"){
    let name = $($(el)[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo_gerente___]').val()
    try{
      let attachments = parent.ECM.attachmentTable.getData()
  
      attachments.forEach((attachment, index) =>{
        if(attachment.description.indexOf(`${name}`) != -1){
          parent.WKFViewAttachment.downloadAttach([index])
        }
      })
    }catch(error){
        console.log(error)
    }
  }else{
    let name = $($(el)[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo___]').val()
    try{
      let attachments = parent.ECM.attachmentTable.getData()
  
      attachments.forEach((attachment, index) =>{
        if(attachment.description.indexOf(`${name}`) != -1){
          parent.WKFViewAttachment.downloadAttach([index])
        }
      })
    }catch(error){
        console.log(error)
    }
  }
}

// $($("#btn_add_anexo___5")[0].parentElement.parentElement).find('[id*=nome_arquivo_anexo___]').val()

let indexesAnexos = $(".btnAnexo")
let tbAnexosGerente = $("#tbAnexosGerente").children()[1].children.length - 1

if(numAtividade == '43'){
  for(let i = 0; i < indexesAnexos.length; i++) {
    $($(".btnAnexo")[i].parentElement).css('display', 'none')
    $($(".btnRemoveAnexo")[i].parentElement).css('display', 'none')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[0]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[2]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[3]).addClass('hide')
    $(".removeButtonTable").hide()
  }
} 
if(numAtividade == "46" || numAtividade == '49' || numAtividade == '52' || numAtividade == '14' || numAtividade == "65" || numAtividade == '7' || numAtividade == '9' || numAtividade == '11' || numAtividade == '14'){
  for(let i = 1; i < indexesAnexos.length; i++) {
    $($(".btnAnexo")[i].parentElement).css('display', 'none')
    $($(".btnRemoveAnexo")[i].parentElement).css('display', 'none')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[0]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[2]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[3]).addClass('hide')
    $(".removeButtonTable").hide()
    $("#btnAddAnexo").hide()
  }
  for(let i = 0; i <= tbAnexosGerente; i++) {
    $($(".btnAnexoGerente")[i].parentElement).css('display', 'none')
    $($(".btnRemoveAnexoGerente")[i].parentElement).css('display', 'none')
    $($("#cabecalhoTabelaAnexosGerente")[0].children[0].children[0]).addClass('hide')
    $($("#cabecalhoTabelaAnexosGerente")[0].children[0].children[2]).addClass('hide')
    $($("#cabecalhoTabelaAnexosGerente")[0].children[0].children[3]).addClass('hide')
    $(".removeButtonTableGerente").hide()
    $("#btnAddAnexoGerente").hide()
    
  }
  
}

if(numAtividade == "57"){
  $("#txt_observacoes").val('')
  for(let i = 0; i < indexesAnexos.length; i++){
    $($(".btnAnexo")[i].parentElement).css('display', 'none')
    $($(".btnRemoveAnexo")[i].parentElement).css('display', 'none')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[0]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[2]).addClass('hide')
    $($("#cabecalhoTabelaAnexos")[0].children[0].children[3]).addClass('hide')
    $(".removeButtonTable").hide()
    $("#btnAddAnexo").hide()
  }
}




function setSelectedZoomItem(selectedItem) {
  if((selectedItem.inputId == 'txt_centro_custo')){
    $("#aprov1").val("")
    $("#aprov2").val("")
    $("#aprov3").val("")
    //let cod_CC = $('#txt_centro_custo').val()[0]
    const centroCusto = selectedItem.CENTROCUSTO
    let c1 = DatasetFactory.createConstraint("codcusto", centroCusto, centroCusto, ConstraintType.MUST)
    let ds = DatasetFactory.getDataset("dts_getHierarquiaPagNotas_MFX", null, [c1], null)
    
    if(ds.values.length != 0){
      console.log(ds.values[0]);
      getAprov(ds.values[0])
    }else{
      FLUIGC.toast({
        title: '',
        message: 'Centro de custo não cadastrado!',
        type: 'warning'
      });
    }
  }


  if(selectedItem.inputId == 'txt_natureza_operacao'){
    let cod_CC = $('#txt_natureza_operacao').val()[0]

    let c1 = DatasetFactory.createConstraint("CODNATUREZA", cod_CC.split(" - ")[0], cod_CC.split(" - ")[0], ConstraintType.MUST)
    let ds = DatasetFactory.getDataset("dts_buscaNatureza_MFX", null, [c1], null)
    console.log(ds);

    if(ds.values.length != 0){
      for(let i = 0; i < ds.values.length; i++){
        if(ds.values[i].CODNATUREZA == cod_CC.split(" - ")[0]){
          if(ds.values[i].PACOTEIRO != "null"){
            let pacConst = DatasetFactory.createConstraint("colleagueName", ds.values[i].PACOTEIRO, ds.values[i].PACOTEIRO, ConstraintType.MUST)
            let pacoteiro =  DatasetFactory.getDataset("colleague", null, [pacConst], null)

            $("#pacoteiro").val(pacoteiro.values[0]["colleaguePK.colleagueId"])
          }else{
            $("#pacoteiro").val("Sem cadastro")
            FLUIGC.toast({
              title: '',
              message: 'Pacoteiro da natureza da operação não cadastrado!',
              type: 'warning'
            });
          }
        }
      }
    }else{
      FLUIGC.toast({
        title: '',
        message: 'Natureza da operação não cadastrada!',
        type: 'warning'
      });
    }
  }
}
function removedZoomItem(removedItem){
  if((removedItem.inputId == 'txt_centro_custo')){
    $("#aprov1").val('')
    $("#aprov2").val('')
    $("#aprov3").val('')
  }
  if((removedItem.inputId == 'txt_natureza_operacao')){
    $('#txt_natureza_operacao').val('')
  }
}

function getAprov(obj){
  let data = obj

  if(data != undefined){
    
    if(data.LOGINSUBST_APROV1 != 'null'){
      let ap1 = getMatricula(data.LOGINSUBST_APROV1)
      $("#aprov1").val(ap1.values[0]["colleaguePK.colleagueId"])
    } else {
      if(data.LOGINAPROV1 != 'null'){
        let aprovador1 =  getMatricula(data.LOGINAPROV1)
        $("#aprov1").val(aprovador1.values[0]["colleaguePK.colleagueId"])
      } 

    }

    if(data.LOGINSUBST_APROV2 != 'null'){
      let ap2 = getMatricula(data.LOGINSUBST_APROV2)
      $("#aprov2").val(ap2.values[0]["colleaguePK.colleagueId"])
    } else {
      if(data.LOGINAPROV2 != 'null'){
        let aprovador2 =  getMatricula(data.LOGINAPROV2)
        $("#aprov2").val(aprovador2.values[0]["colleaguePK.colleagueId"])
      } 
    }

    if(data.LOGINSUBST_APROV3 != 'null'){
      let ap3 = getMatricula(data.LOGINSUBST_APROV3)
      $("#aprov3").val(ap3.values[0]["colleaguePK.colleagueId"])
    } else {
      if(data.LOGINAPROV3 != 'null'){
        let aprovador3 = getMatricula(data.LOGINAPROV3)
        $("#aprov3").val(aprovador3.values[0]["colleaguePK.colleagueId"])
      } 
    }
  }

  function getMatricula(login){
    let c1 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST)
    let aprovador =  DatasetFactory.getDataset("colleague", null, [c1], null)
    return aprovador
  }
}