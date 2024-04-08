var MyWidget = SuperWidget.extend({
  //variáveis da widget
  variavelNumerica: null,
  variavelCaracter: null,
  turmasRemovidas : [],
  modulosRemovidos : [],
  pagamentosRemovidos : [],
  //dataPagamentosRemovidos : [],

  //método iniciado quando a widget é carregada
  init: function () {},

  //BIND de eventos
  bindings: {
    local: {
      execute: ["click_executeAction"]
    },
    global: {}
  },

  executeAction: function (htmlElement, event) {}
});

var indexModulo = 1;

function adicionarModulo() {
  const id = Array.from($("#lista_produtos1 div")).length + 1;
  const indexAtual = indexModulo;

  $("#lista_produtos1").append(
    `
      <div class="modulo-container">
      <input type="hidden" id="hd_documentIdModulo___${indexModulo}">
        <div class='row' id="alvo1___${indexModulo}">
            <div class='col-md-2'>
              <label for='idModulo'>ID Módulo</label>
              <input type='number' class='form-control' id='idModulo___${indexModulo}' name='idModulo___${indexModulo}' maxlength="4">
            </div>
            <div class='col-md-9'>
              <label for='nomeModulo'>Nome do Módulo</label>
              <input type='text' class='form-control' id='nomeModulo___${indexModulo}' name='nomeModulo___${indexModulo}' placeholder="Escreva o módulo do curso"/>
             </div>
            <div class="col-md-1">
              <div onclick="limpar1(this)" style="position: absolute; right: 105px; margin-top: 25%; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="Cadastro" class="panel-icon"></div>
            </div>
        </div>
      </div>
    `
  );

  indexModulo++;
  return indexAtual;
}

var indexTurma = 1;

function adicionarTurma() {
  const id = Array.from($("#lista_produtos div")).length + 1;
  const indexAtual = indexTurma;

  $("#lista_produtos").append(
    `
    <div class="turma-container">
      <input type="hidden" id="hd_documentIdTurma___${indexTurma}">
        <div class="card" id="alvo___${indexTurma}" style="margin-top: 20px;">
            <div class="card-body" style="position: relative; border-radius: 10px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                <div class='row'>
                    <div class='col-md-5'>
                        <label for='nomeTurma'>Nome da turma</label>
                        <input type='text' class='form-control' id='nomeTurma___${indexTurma}' name='nomeTurma___${indexTurma}' />
                    </div>
                    <div class='col-md-3'>
                        <label for='horarioAulaInicio'>Horário de Início</label>
                        <input type='time' class='form-control' id='horarioAulaInicio___${indexTurma}' name='horarioAulaInicio___${indexTurma}' />
                    </div>
                    <div class='col-md-3'>
                        <label for='horarioAulaFim'>Horário de Término</label>
                        <input type='time' class='form-control' id='horarioAulaFim___${indexTurma}' name='horarioAulaFim___${indexTurma}' />
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-4'>
                        <label for='dataInicio'>Data de início</label>
                        <input type='date' class='form-control' id='dataInicio___${indexTurma}' name='dataInicio___${indexTurma}' />
                    </div>
                    <div class='col-md-4'>
                        <label for='dataTermino'>Data de término</label>
                        <input type='date' class='form-control' id='dataTermino___${indexTurma}' name='dataTermino___${indexTurma}' />
                    </div>
                    <div class='col-md-3'>
                      <label for='idTurma'>ID Turma</label>
                      <input type='number' class='form-control' id='idTurma___${indexTurma}' name='idTurma___${indexTurma}'/>
                    </div>
                </div>
                <div onclick="limpar(this)" style=" position: absolute; right: 25px; top: 45%; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="Cadastro" class="panel-icon"></div>
            </div>
        </div>
      </div>
    `
  );

  indexTurma++;
  return indexAtual;
}

var indexPagamento = 1;

function adicionarPagamento() {
  const id = Array.from($("#lista_produtos2 div")).length + 1;
  const indexAtual = indexPagamento;

  $("#lista_produtos2").append(
    `
    <div class="pagamento-container">
      <input type="hidden" id="hd_documentIdPagamento___${indexPagamento}"/>
      <div class="row" id="alvo2___${indexPagamento}">
        <div class="col-md-2">
          <label for='idPagamento'>ID Pagamento</label>
          <input type='number' class='form-control' id='idPagamento___${indexPagamento}' name="idPagamento___${indexPagamento}">
        </div>
        <div class="col-md-9">
          <label for='formaPagamento'>Forma de Pagamento</label>
          <input type='text' class='form-control' id='formaPagamento___${indexPagamento}' name='formaPagamento___${indexPagamento}'>
        </div>
        <div class="col-md-1">
          <div onclick="limparPagamento(this)" style="position: absolute; right: 105px; margin-top: 25%; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="Cadastro" class="panel-icon"></div>
        </div>
      </div>
    </div>
    `
  );

  indexPagamento++;
  return indexAtual;
}

/*var indexDataPagamento = 1;

function adicionarDataPagamento() {
  const id = Array.from($("#lista_produtos3 div")).length + 1;
  const indexAtual = indexPagamento;

  $("#lista_produtos3").append(
    `
    <div class="dataPagamento-container">
      <input type="hidden" id="hd_documentIdDataPagamento___${indexDataPagamento}"/>
      <div class="row" id="alvo3___${indexDataPagamento}">
        <div class="col-md-2">
          <label for='idDataPagamento'>ID Data Pagamento</label>
          <input type='number' class='form-control' id='idDataPagamento___${indexDataPagamento}' name="idDataPagamento___${indexDataPagamento}">
        </div>
        <div class="col-md-9">
          <label for='dataPagamento'>Data de Pagamento</label>
          <input type='text' class='form-control' id='dataPagamento___${indexDataPagamento}' name='dataPagamento___${indexDataPagamento}'>
        </div>
        <div class="col-md-1">
          <div onclick="limparDataPagamento(this)" style="position: absolute; right: 105px; margin-top: 20%; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="Cadastro" class="panel-icon"></div>
        </div>
      </div>
    </div>
    `
  );

  indexDataPagamento++;
  return indexAtual;
}*/

//turma
function limpar(lixeira) {
  MyWidget.turmasRemovidas.push($(lixeira.parentElement.parentElement.parentElement).find("[id*=hd_documentIdTurma___]").val())
  lixeira.parentElement.parentElement.parentElement.remove();
}

function limpar1(lixeira1) {
  MyWidget.modulosRemovidos.push($(lixeira1.parentElement.parentElement.parentElement).find("[id*=hd_documentIdModulo___]").val())
  lixeira1.parentElement.parentElement.parentElement.remove();
}

function limparPagamento(lixeira2) {
  MyWidget.pagamentosRemovidos.push($(lixeira2.parentElement.parentElement.parentElement).find("[id*=hd_documentIdPagamento___]").val())
  lixeira2.parentElement.parentElement.parentElement.remove();
}

/*function limparDataPagamento(lixeira3) {
  MyWidget.dataPagamentosRemovidos.push($(lixeira3.parentElement.parentElement.parentElement).find("[id*=hd_documentIdDataPagamento___]").val())
  lixeira3.parentElement.parentElement.parentElement.remove();
}*/

class Ged {
  /*
    
        Classe que obtém o método de salvar e deletar um registro de formulário no GED
    
        No método save, recebe a estrutura do formData, sendo ele:
        formData = {
            "parentDocumentId": 1767533, // código do formulario que receberá a informação
            "version": 1000, //versão do formulário
            "inheritSecurity": true, // Consta que ele herda a segurança do pai
            "formData": [ 
                {
                    "name": "campo que receberá a informação",
                    "value": "valor que será inserido"
                }
            ]
        }
        O formData deve ser enviado como stringify
    
        No método delete, recebe apenas o Id do documento que será excluído
    
    */

  constructor(parentDocumentId, formData, documentId) {
    this.parentDocumentId = parentDocumentId;
    this.formData = formData;
    this.documentId = documentId;
  }

  getFormData() {
    return JSON.stringify({
      parentDocumentId: this.parentDocumentId,
      version: 1000,
      inheritSecurity: true,
      formData: this.formData
    });
  }

  save() {
    $.ajax({
      async: false,
      url: "/api/public/2.0/cards/create",
      type: "POST",
      contentType: "application/json",
      Accept: "text/html",
      data: this.getFormData(),
      success: function (data) {
        console.log(data);
      },
      error: function (data, errorThrown, status) {
        console.log("Deu erro!");
      }
    });
  }

  delete() {
    $.ajax({
      async: false,
      url: "/api/public/2.0/cardindexes/delete/" + this.documentId,
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json"
      },
      success: function (data) {
        console.log(data);
        console.log("Excluído com sucesso");
      },
      error: function (data, errorThrown, status) {
        console.log("Deu erro!");
      }
    });
  }
}

function salvarCurso() {

  const validarCampo = validarCampos()

  if(validarCampo == true) {
    const dadosCurso = {
      id: $("#idCurso").val(),
      nomeCurso: $("#nomeCurso").val(),
      cargaHoraria: $("#cargaHoraria").val(),
      valorCurso: $("#valorCurso").val(),
      valorMatricula: $("#valorMatricula").val(),
      parcelas: $("#parcelas").val(),
      valorMensal: $("#valorMensal").val()
    };
  
    const tableModulo = $("#lista_produtos1")[0].children;
  
    let arrayModulos = [];
    for (let index = 0; index < tableModulo.length; index++) {
      const indiceTabela = tableModulo[index].children[0].id.split("___")[1];
      arrayModulos.push({
        nomeModulo: $(`#nomeModulo___${indiceTabela}`).val(),
        idModulo: $(`#idModulo___${indiceTabela}`).val(),
        documentId : $(`#hd_documentIdModulo___${indiceTabela}`).val()
      });
    }

    const tablePagamento = $("#lista_produtos2")[0].children;
  
    let arrayPagamento = [];
    for (let index = 0; index < tablePagamento.length; index++) {
      const indiceTabela = tablePagamento[index].children[0].id.split("___")[1];
      arrayPagamento.push({
        formasPagamento: $(`#formaPagamento___${indiceTabela}`).val(),
        idPagamento: $(`#idPagamento___${indiceTabela}`).val(),
        documentId : $(`#hd_documentIdPagamento___${indiceTabela}`).val()
      });
    }

    //const tableDataPagamento = $("#lista_produtos3")[0].children;
  
    /*let arrayDataPagamento = [];
    for (let index = 0; index < tableDataPagamento.length; index++) {
      const indiceTabela = tableDataPagamento[index].children[0].id.split("___")[1];
      arrayDataPagamento.push({
        dataPagamento: $(`#dataPagamento___${indiceTabela}`).val(),
        idDataPagamento: $(`#idDataPagamento___${indiceTabela}`).val(),
        documentId : $(`#hd_documentIdDataPagamento___${indiceTabela}`).val()
      });
    }*/
  
    const tableTurma = $("#lista_produtos")[0].children;
  
    let arrayTurmas = [];
    for (let index = 0; index < tableTurma.length; index++) {
      const indiceTabelaTurma = tableTurma[index].children[0].id.split("___")[1];
      arrayTurmas.push({
        nomeTurma: $(`#nomeTurma___${indiceTabelaTurma}`).val(),
        horarioAulaInicio: $(`#horarioAulaInicio___${indiceTabelaTurma}`).val(),
        horarioAulaFim: $(`#horarioAulaFim___${indiceTabelaTurma}`).val(),
        dataInicio: $(`#dataInicio___${indiceTabelaTurma}`).val(),
        dataTermino: $(`#dataTermino___${indiceTabelaTurma}`).val(),
        idTurma: $(`#idTurma___${indiceTabelaTurma}`).val(),
        documentId : $(`#hd_documentIdTurma___${indiceTabelaTurma}`).val()
      });
    }
  
    const formData = [
      {
        name: "idCurso", //cadastro de curso
        value: dadosCurso.id //widget
      },
      {
        name: "nomeCurso",
        value: dadosCurso.nomeCurso
      },
      {
        name: "cargaHoraria",
        value: dadosCurso.cargaHoraria
      },
      {
        name: "valorCurso",
        value: dadosCurso.valorCurso
      },
      {
        name: "valorMatricula",
        value: dadosCurso.valorMatricula
      },
      {
        name: "parcelas",
        value: dadosCurso.parcelas
      },
      {
        name: "valorMensal",
        value: dadosCurso.valorMensal
      }
    ];
  
    const documentIds = {
      curso : $("#hd_documentIdCurso").val()
    }
    const instanceGed = new Ged(2668, formData, documentIds.curso);
    
    if(documentIds.curso != "") {
      instanceGed.delete()
    }
    instanceGed.save();
  
    MyWidget.modulosRemovidos.forEach(element => {
      const instanceModulosRemovidos = new Ged (null, null, element)
      instanceModulosRemovidos.delete()
    });


    arrayModulos.forEach((modulo, index) => {
      let formDataModulo = [
        {
          name: "nomeModulo", //cadastro de curso
          value: modulo.nomeModulo //widget
        },
        {
          name: "idCurso", //cadastro de curso
          value: dadosCurso.id //widget
        },
        {
          name: "idModulo", //cadastro de curso
          value: modulo.idModulo //widget
        }
      ];
  
      const instanceSaveModulo = new Ged(2680, formDataModulo, modulo.documentId); //
      if(documentIds.modulo != "") {
        instanceSaveModulo.delete()
      }
      instanceSaveModulo.save();
    });

    MyWidget.pagamentosRemovidos.forEach(element => {
      const instancePagamentosRemovidos = new Ged (null, null, element)
      instancePagamentosRemovidos.delete()
    });
  
    arrayPagamento.forEach((pagamento, index) => {
      let formDataPagamento = [
        {
          name: "formaPagamento", //cadastro de curso
          value: pagamento.formasPagamento //widget
        },
        {
          name: "idCurso", //cadastro de curso
          value: dadosCurso.id //widget
        },
        {
          name: "idPagamento", //cadastro de curso
          value: pagamento.idPagamento //widget
        }
      ];
  
      const instanceSavePagamento = new Ged(3395, formDataPagamento, pagamento.documentId); //
      if(documentIds.pagamento != "") {
        instanceSavePagamento.delete()
      }
      instanceSavePagamento.save();
    });

    
    /*MyWidget.dataPagamentosRemovidos.forEach(element => {
      const instanceDataPagamentosRemovidos = new Ged (null, null, element)
      instanceDataPagamentosRemovidos.delete()
    });
  
    arrayDataPagamento.forEach((dataPagamento, index) => {
      let formDataDePagamento = [
        {
          name: "dataPagamento", //cadastro de curso
          value: dataPagamento.dataPagamento //widget
        },
        {
          name: "idCurso", //cadastro de curso
          value: dadosCurso.id //widget
        },
        {
          name: "idDataPagamento", //cadastro de curso
          value: dataPagamento.idDataPagamento //widget
        }
      ];
  
      const instanceSaveDataPagamento = new Ged(3741, formDataDePagamento, dataPagamento.documentId); //
      if(documentIds.dataPagamento != "") {
        instanceSaveDataPagamento.delete()
      }
      instanceSaveDataPagamento.save();
    });*/

    MyWidget.turmasRemovidas.forEach(element => {
      const instanceturmasRemovidas = new Ged (null, null, element)
      instanceturmasRemovidas.delete()
    });
    arrayTurmas.forEach((turma, index) => {
      let formDataTurma = [
        {
          name: "nomeTurma", //cadastro de curso
          value: turma.nomeTurma //widget
        },
        {
          name: "idCurso", //cadastro de curso
          value: dadosCurso.id //widget
        },
        {
          name: "horarioAulaInicio", //cadastro de curso
          value: turma.horarioAulaInicio //widget
        },
        {
          name: "horarioAulaFim", //cadastro de curso
          value: turma.horarioAulaFim //widget
        },
        {
          name: "dataInicio", //cadastro de curso
          value: turma.dataInicio //widget
        },
        {
          name: "dataTermino", //cadastro de curso
          value: turma.dataTermino //widget
        },
        {
          name: "idTurma", //cadastro de curso
          value: turma.idTurma //widget
        }
      ];
  
      const instanceSaveTurma = new Ged(2669, formDataTurma, turma.documentId); 
      //
      if(documentIds.turma != "") {
        instanceSaveTurma.delete()
      }
  
        instanceSaveTurma.save();
  
      estruturaCadastro();
    });
  
    // Limpar os campos após salvar as informações
    $("#idCurso").val("");
    $("#nomeCurso").val("");
    $("#cargaHoraria").val("");
    $("#valorCurso").val("");
    $("#valorMatricula").val("");
    $("#parcelas").val("");
    $("#valorMensal").val("");
    $("#hd_edit").val("false")
    // Limpar campos nas turmas
    $(".turma-container").remove();
  
    // Limpar campos nos módulos
    $(".modulo-container").remove();
  
    $(".pagamento-container").remove();
    $(".dataPagamento-container").remove();
  
    $("hd_documentIdCurso").val(""),
    $("hd_documentIdTurma").val(""),
    $("hd_documentIdModulo").val("")
    $("hd_documentIdPagamento").val("")
    //$("hd_documentIdDataPagamento").val("")
  
    MyWidget.turmasRemovidas = [];
    MyWidget.modulosRemovidos = [];
    MyWidget.pagamentosRemovidos = [];
    //MyWidget.dataPagamentosRemovidos = [];
  }
}
    
function getCursos(documentId) {
  let registros = [];
  let constraints = [];

  if (documentId) {
    constraints.push(
      DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST)
    )
  }
  
  let cursos = DatasetFactory.getDataset("ds_cadastroCursoMFX", null, constraints, null).values;

  cursos.forEach((curso) => {
    let turmas = DatasetFactory.getDataset(
      "ds_cadastroTurmaAcademy",
      null,
      [
        DatasetFactory.createConstraint(
          "idCurso",
          curso.idCurso,
          curso.idCurso,
          ConstraintType.MUST
        )
      ],
      null
    ).values;
    let modulos = DatasetFactory.getDataset(
      "ds_cadastraModuloAcademyMFX",
      null,
      [
        DatasetFactory.createConstraint(
          "idCurso",
          curso.idCurso,
          curso.idCurso,
          ConstraintType.MUST
        )
      ],
      null
    ).values;

    let pagamentos = DatasetFactory.getDataset(
      "ds_cadastroPagamentoAcademyMFX",
      null,
      [
        DatasetFactory.createConstraint(
          "idCurso",
          curso.idCurso,
          curso.idCurso,
          ConstraintType.MUST
        )
      ],
      null
    ).values;

    /*let dataPagamentos = DatasetFactory.getDataset(
      "ds_cadastro_data_pagamento_mfx_academy",
      null,
      [
        DatasetFactory.createConstraint(
          "idCurso",
          curso.idCurso,
          curso.idCurso,
          ConstraintType.MUST
        )
      ],
      null
    ).values;*/

    let arrayTurmas = [];
    let arrayModulos = [];
    let arrayPagamentos = [];
    //let arrayDataPagamentos = [];

    if (turmas.length > 0) {
      turmas.forEach((turma) => {
        arrayTurmas.push({
          nomeTurma: turma.nomeTurma,
          horarioAulaInicio: turma.horarioAulaInicio,
          horarioAulaFim: turma.horarioAulaFim,
          dataInicio: turma.dataInicio,
          dataTermino: turma.dataTermino,
          idTurma: turma.idTurma,
          idCurso: turma.idCurso,
          documentId : turma.documentid
        });
      });
    }

    /*if (dataPagamentos.length > 0) {
      turmas.forEach((dataPagamento) => {
        arrayDataPagamentos.push({
          dataPagamento: dataPagamento.dataPagamento,
          idDataPagamento: dataPagamento.idDataPagamento,
          idCurso: dataPagamento.idCurso,
          documentId : dataPagamento.documentid
        });
      });
    }*/

    if (modulos.length > 0) {
      modulos.forEach((modulo) => {
        arrayModulos.push({
          nomeModulo: modulo.nomeModulo,
          idModulo: modulo.idModulo,
          idCurso: modulo.idCurso,
          documentId : modulo.documentid
        });
      });
    }

    if (pagamentos.length > 0) {
      pagamentos.forEach((pagamento) => {
        arrayPagamentos.push({
          formasPagamento: pagamento.formaPagamento,
          idPagamento: pagamento.idPagamento,
          idCurso: pagamento.idCurso,
          documentId : pagamento.documentid
        });
      });
    }

    registros.push({
      nomeCurso: curso.nomeCurso,
      idCurso: curso.idCurso,
      cargaHoraria: curso.cargaHoraria,
      valorCurso: curso.valorCurso,
      valorMatricula: curso.valorMatricula,
      quantidadeParcelas: curso.parcelas,
      valorMensal: curso.valorMensal,
      documentId : curso.documentid,
      turmas: arrayTurmas,
      modulos: arrayModulos,
      pagamentos : arrayPagamentos
    });
  });

  return registros;
}

function estruturaCadastro() {
  $("#buscarCurso").html('');
  const registros = getCursos();
  let html = "";
  let count = 1;
  $("[id*=accordion___]").remove()
  //<a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion___${count}" href="#collapseOne___${count}">

  registros.forEach((registro, index) => {
    html += `
    <div class="panel-group clean-collapse" id="accordion___${count}">
    <div class="panel panel-default" style="margin-bottom: 20px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
          <div class="panel-heading">
              <h4 class="panel-title">
               <a class="collapse-icon" data-toggle="collapse" data-parent="#accordion___${count}" href="#collapseOne___${count}">
                  <div class='row'>
                        <div class='col-md-2'>
                        <input type="hidden" id="hd_documentIdCurso___${index}" value="${registro.documentId}">

                          <div class="card-header-title linhas">Nome do Curso</div>
                          <div class="card-header-info linhas nome_curso">${registro.nomeCurso}</div>
                        </div>
                        <div class='col-md-2'>
                          <div class="card-header-title">Valor do Curso</div>
                          <div class="card-header-info">${registro.valorCurso}</div>
                        </div>
                        <div class='col-md-2'>
                          <div class="card-header-title">Carga horária</div>
                          <div class="card-header-info">${registro.cargaHoraria} horas</div>
                        </div>
                        <div class='col-md-2'>
                          <div class="card-header-title">Qt. Turmas</div>
                          <div class="card-header-info" >${registro.turmas.length}</div>
                        </div>
                        <div class="col-md-4">
                        <div style="display: flex;flex-direction: row;margin-right: 20px;margin-top: 8px;justify-content: flex-end;">
                            <div onclick="remover(this, event)" style="/* position: absolute; */right:calc(100vw - 2240px);top: 7px;background-color: transparent;">
                                <img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="lixeira" class="panel-icon">
                            </div>            
                            <div onclick="editar(this, event)" style="/* position: absolute; *//* right: calc(100vw - 2135px); */top: 7px;background-color: transparent;">
                                <img src="/cadastro_curso_mfx_academy/resources/images/akar-icons_edit.png" alt="editar" class="panel-icon">
                            </div>
                        </div>
                      </div>
                      </div>
                  </a>
              </h4>
             
          </div>

          <div id="collapseOne___${count}" class="panel-collapse collapse">
            <div class="panel-body" style="margin-bottom: 20px;">
              <div class="row">
                <div class='col-md-3'>
                <label>Turmas</label>
                </div>
                <div class='col-md-3'>
                    <label>Data de início/Data de Término</label>
                </div>
                <div class='col-md-3'>
                    <label>Horário de Aula</label>
                </div>
              </div>
            `
          registro.turmas.forEach((turma, idTurma) => {
            var dateInicio = new Date(turma.dataInicio);
            var dateTermino = new Date(turma.dataTermino);

          html += `
                
                <div class='row'>
                  <input type="hidden" id="hd_documentIdTurma___${idTurma}" value="${turma.documentId}">
                  <div class='col-md-3'>
                      <div class="card-header-info">${turma.nomeTurma}</div>
                  </div>
                  <div class='col-md-3'>
                      <div class="card-header-info">${dateInicio.toISOString().split('T')[0].split('-').reverse().join('/')} - ${dateTermino.toISOString().split('T')[0].split('-').reverse().join('/')}</div>
                  </div>
                  <div class='col-md-3'>
                      <div class="card-header-info">${turma.horarioAulaInicio} - ${turma.horarioAulaFim}</div>
                  </div>
                </div>
                
             `})

          html+=`
          <div class='row'>
                        <div class='col-md-3'>
                            <label>Formas de Pagamento</label>
                        </div>
                        <div class='col-md-3'>
                            <label>Qt de Parcelas/Valor Mensal</label>
                        </div>
                        <div class='col-md-3'>
                            <label>Módulos</label>
                        </div>
          </div>
          <div class='row'>
              <div class='col-md-3'>`

                registro.pagamentos.forEach((pagamento, idPagamento) => {
                  html += 
                    `
                    <div class="card-header-info"> <input type="hidden" id="hd_documentIdPagamento___${idPagamento}" value="${pagamento.documentId}">
                    ${pagamento.formasPagamento}</div>
                `})
                html+=`
                 </div>
                  <div class='col-md-3'>
                      <div class="card-header-info">${registro.quantidadeParcelas} parcelas de R$ ${registro.valorMensal}</div>
                  </div>
                  <div class='col-md-3'>`
                  
                  registro.modulos.forEach((modulo, idModulo) => {
                    html += 
                      `
                      <div class="card-header-info"> <input type="hidden" id="hd_documentIdModulo___${idModulo}" value="${modulo.documentId}">
                      ${modulo.nomeModulo}</div>
                  `})
                  html+=`
                  </div>
              </div>
        </div>
    </div>
  </div>
`
      count++;
  });

  $("#buscarCurso").html(html);
}

/*function expandCollapse(element){
  const div = $(element.parentElement.parentElement.parentElement).find('.collapse')[0]
  const divHead = element.parentElement.parentElement.parentElement

  if($(div).is(':hidden')) {
      ElementUtils.setClass(divHead, 'td-close', 'td-open')
      ElementUtils.collapse(div, 'down', 'smooth')
      $(element).css('transform', 'rotate(0deg)')
  }else {
      ElementUtils.setClass(divHead, 'td-open', 'td-close')
      ElementUtils.collapse(div, 'up', 'smooth')
      $(element).css('transform', 'rotate(180deg)')
  }
}*/

$(document).ready(function () {
  
  $("#parcelas").on("change", (e) => {
    var valorCurso = parseFloat($("#valorCurso").val());
    var parcelas = parseInt($("#parcelas").val());

    if(parcelas != "") {
      $("#valorMensal").val((valorCurso / parcelas).toFixed(2).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    }
    else if(parcelas == "" || parcelas == 0) {
      $("#valorMensal").val("");
    }
    
  });

  estruturaCadastro();
});

function editar(e, event) {
  event.stopPropagation();
  $("#hd_edit").val("true")
  const documentIdCurso = $(e).parent().parent().parent().find("[id*=hd_documentIdCurso]").val();

  var dataCurso = getCursos(documentIdCurso);

  if(dataCurso.length > 0) {
    $("#hd_documentIdCurso").val(documentIdCurso)
    $("#idCurso").val(dataCurso[0].idCurso)
    $("#nomeCurso").val(dataCurso[0].nomeCurso)
    $("#cargaHoraria").val(dataCurso[0].cargaHoraria)
    $("#valorCurso").val(dataCurso[0].valorCurso)
    $("#valorMatricula").val(dataCurso[0].valorMatricula)
    $("#parcelas").val(parseInt(dataCurso[0].quantidadeParcelas))
    $("#valorMensal").val(dataCurso[0].valorMensal)

    dataCurso[0].turmas.forEach(element => {
      var id = adicionarTurma();
      $(`#hd_documentIdTurma___${id}`).val(element.documentId);
      $(`#nomeTurma___${id}`).val(element.nomeTurma);
      $(`#horarioAulaInicio___${id}`).val(element.horarioAulaInicio);
      $(`#horarioAulaFim___${id}`).val(element.horarioAulaFim);
      $(`#dataInicio___${id}`).val(element.dataInicio);
      $(`#dataTermino___${id}`).val(element.dataTermino);
      $(`#idTurma___${id}`).val(element.idTurma);
    });

    dataCurso[0].modulos.forEach(element => {
      var idModulo = adicionarModulo();

      $(`#hd_documentIdModulo___${idModulo}`).val(element.documentId);
      $(`#nomeModulo___${idModulo}`).val(element.nomeModulo);
      $(`#idModulo___${idModulo}`).val(element.idModulo);
    });

    dataCurso[0].pagamentos.forEach(element => {
      var idPagamento = adicionarPagamento();

      $(`#hd_documentIdPagamento___${idPagamento}`).val(element.documentId);
      $(`#formaPagamento___${idPagamento}`).val(element.formasPagamento);
      $(`#idPagamento___${idPagamento}`).val(element.idPagamento);
      $(`#dataPagamento___${idPagamento}`).val(element.dataPagamento);
    });
  }

  //modulos
 
  $('html, body').animate({ scrollTop: 0 }, 1000);
}

function remover(e, event) {
  event.stopPropagation();
  const documentIdCurso = $(e).parent().parent().parent().find("[id*=hd_documentIdCurso]").val();
  const documentIdTurma = $(e).parent().parent().parent().parent().parent().parent().parent().find("[id*=hd_documentIdTurma]").val();
  const documentIdModulo = $(e).parent().parent().parent().parent().parent().parent().parent().find("[id*=hd_documentIdModulo]").val();
  const documentIdPagamento = $(e).parent().parent().parent().parent().parent().parent().parent().find("[id*=hd_documentIdPagamento]").val();

  const instanceCurso = new Ged (null, null, documentIdCurso);
  const instanceTurma = new Ged (null, null, documentIdTurma);
  const instanceModulo = new Ged (null, null, documentIdModulo);
  const instancePagamento = new Ged (null, null, documentIdPagamento);

  instanceCurso.delete();
  instanceTurma.delete();
  instanceModulo.delete();
  instancePagamento.delete();

  estruturaCadastro();
}

function search(valueSearch) {
  if(valueSearch != ''){
    
    $(`.nome_curso:contains("${valueSearch.trim()}")`).parent().parent().parent().parent().parent().show()
    $(`.nome_curso:not(:contains("${valueSearch.trim()}"))`).parent().parent().parent().parent().parent().hide()

  }

  else {
    $(`.nome_curso`).parent().parent().parent().parent().parent().show()
  }
}

function validarCampos() {
  let returnValidate = true;
  if($("#hd_edit").val() != "true") {
    let constCodigo = DatasetFactory.createConstraint("idCurso", $("#idCurso").val().trim(), $("#idCurso").val().trim(), ConstraintType.MUST)
    let dtsCurso = DatasetFactory.getDataset("ds_cadastroCursoMFX", null, [constCodigo], null).values

    if(dtsCurso.length > 0) {
      FLUIGC.toast({
        message: "ID de Curso já cadastrado.",
        type: "danger",
      
      });
      
      setTimeout(() => { $("#toaster").remove() }, 3500)
      returnValidate = false;

    }
  }
  
  let inputs = [];

  $("#idCurso").val().trim() == "" ? inputs.push($("#idCurso")) : null
  $("#nomeCurso").val().trim() == "" ? inputs.push($("#nomeCurso")) : null
  $("#cargaHoraria").val().trim() == "" ? inputs.push(("#cargaHoraria")) : null
  $("#valorCurso").val().trim() == "" ? inputs.push($("#valorCurso")) : null
  $("#valorMatricula").val().trim() == "" ? inputs.push($("#valorMatricula")) : null
  $("#parcelas").val().trim() == "" ? inputs.push($("#parcelas")) : null
  $("#valorMensal").val().trim() == "" ? inputs.push( $("#valorMensal")) : null

  //turma
  Array.from($(".turma-container")).forEach(element => {

    if($("#hd_edit").val() != "true") {
      let constCodigoTurma = DatasetFactory.createConstraint("idTurma",  $(element).find(`[id*=idTurma___]`).val().trim(),  $(element).find(`[id*=idTurma___]`).val().trim(), ConstraintType.MUST)
      let dtsTurma = DatasetFactory.getDataset("ds_cadastroTurmaAcademy", null, [constCodigoTurma], null).values

      if(dtsTurma.length > 0) {
        FLUIGC.toast({
          message: "ID de Turma já cadastrado.",
          type: "danger",
        
        });
        
        setTimeout(() => { $("#toaster").remove() }, 3000)
      }
    }

    $(element).find(`[id*=nomeTurma___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=nomeTurma___]`)) : null
    $(element).find(`[id*=idTurma___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=idTurma___]`)) : null
    $(element).find(`[id*=horarioAulaInicio___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=horarioAulaInicio___]`)) : null
    $(element).find(`[id*=horarioAulaFim___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=horarioAulaFim___]`)) : null
    $(element).find(`[id*=dataInicio___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=dataInicio___]`)) : null
    $(element).find(`[id*=dataTermino___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=dataTermino___]`)) : null

  });
  
  //modulo
  Array.from($(".modulo-container")).forEach(element => {
    if($("#hd_edit").val() != "true") {
      let constCodigoModulo = DatasetFactory.createConstraint("idModulo",  $(element).find(`[id*=idModulo___]`).val().trim(),  $(element).find(`[id*=idModulo___]`).val().trim(), ConstraintType.MUST)
      let dtsTurma = DatasetFactory.getDataset("ds_cadastraModuloAcademyMFX", null, [constCodigoModulo], null).values

      if(dtsTurma.length > 0) {
        FLUIGC.toast({
          message: "ID de módulo já cadastrado.",
          type: "danger",
        
        });
        
        setTimeout(() => { $("#toaster").remove() }, 3000)
        returnValidate = false;
      }
    }

    $(element).find(`[id*=nomeModulo___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=nomeModulo___]`)) : null
    $(element).find(`[id*=idModulo___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=idModulo___]`)) : null
  });

  //pagamento
  Array.from($(".pagamento-container")).forEach(element => {
    if($("#hd_edit").val() != "true") {
      let constCodigoPagamento = DatasetFactory.createConstraint("idPagamento",  $(element).find(`[id*=idPagamento___]`).val().trim(),  $(element).find(`[id*=idPagamento___]`).val().trim(), ConstraintType.MUST)
      let dtsPagamento = DatasetFactory.getDataset("ds_cadastroPagamentoAcademyMFX", null, [constCodigoPagamento], null).values

      if(dtsPagamento.length > 0) {
        FLUIGC.toast({
          message: "ID de pagamento já cadastrado.",
          type: "danger",
        
        });
        
        setTimeout(() => { $("#toaster").remove() }, 3000)
        returnValidate = false;
      }
    }

    $(element).find(`[id*=formaPagamento___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=formaPagamento___]`)) : null
    $(element).find(`[id*=idPagamento___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=idPagamento___]`)) : null
    //$(element).find(`[id*=dataPagamento___]`).val().trim() == "" ? inputs.push($(element).find(`[id*=dataPagamento___]`)) : null
  });

  // Verifique se os campos estão vazios
  if (inputs.length > 0) {
    // Exiba uma mensagem de erro
  
    FLUIGC.toast({
      message: "Por favor, preencha todos os campos antes de salvar.",
      type: "danger",
    
    });
    
    setTimeout(() => { $("#toaster").remove() }, 3000)
    inputs.forEach(element => {
      $(element).parent().addClass("has-error")
    });
    returnValidate = false;
  }

  return returnValidate; 
}

const mascaraMoeda = (event) => {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat)
}

const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}