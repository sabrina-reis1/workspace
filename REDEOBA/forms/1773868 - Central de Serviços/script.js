$(document).ready(function () {
    $("#hd_solic_salva").val('nao');
    $('#workflowActions ul#optionList > li > a[data-save]', parent.document).on('click', function () {
        $("#hd_solic_salva").val('sim');
    });
    $('#workflow-detail-card ul#optionList > li > a[data-save]', parent.document).on('click', function () {
        $("#hd_solic_salva").val('sim');
    });
    if (FORM_MODE == 'VIEW') {
        $('.fluigicon-trash').hide()
        $("#rt_tarefa_avalia").css('pointer-events', 'none');
    }
    FLUIGC.switcher.init('#swt_tarefa_outroFunc')
    estrelaAvalia();
    var novo_solic = $('#ztxt_tarefa_chapaFunc').val()
    novo_solic != '' ? FLUIGC.switcher.setTrue('#swt_tarefa_outroFunc') : FLUIGC.switcher.setFalse('#swt_tarefa_outroFunc')
    var state = getWKNumState();
    var tabela = $('#transferir_solic tbody tr').length
    if (state == 0) {
        $('#col_atendimento').hide()
        $('#col_tarefa').hide()
        $('#col_tiposolic').hide()
    }
    if (state == 0 || state == 3) {
        $('#btn_salvar').hide()
        var data = getDataAtual()
        $("#txt_tarefa_data").val(data);
        $('#hd_data_solicitacao').val(data)

        let dataHidden = new Date();
        const dia = String(dataHidden.getDate()).padStart(2, '0');
        const mes = String(dataHidden.getMonth() + 1).padStart(2, '0');
        const ano = dataHidden.getFullYear();
        const dataFormatada = ano + "-" + mes + "-" + dia


        $("#hd_data").val(dataFormatada)

        getDadosSolicitante()
    }
    else if (state == 4) {
        FLUIGC.switcher.disable('#swt_tarefa_outroFunc')
        var cod_tpAtendimento = $('#hd_cod_tipoAtendimento').val()
        setTimeout(function () {
            reloadZoomFilterValues('ztxt_tarefa_nivel', 'IDTPATEND,' + cod_tpAtendimento)
        }, 500)

        tabela > 1 ? $('#transfere_solic').show() : $('#transfere_solic').hide()
        $('#sl_tarefa_status').val('3')
    }
    else if (state == 6 || state == 10) {
        var tem_classificacao = $('#hd_valida_classificacao').val()
        if (tem_classificacao == 'nao') {
            var grupo_classifica = $('#hd_matricula_analista').val().split(':')[2]
            $('#_ztxt_tarefa_nivel').val(grupo_classifica)
        }
        $('#sl_tarefa_proxAtividade').val('select')
        $('#hd_transfere_solic').val('')
    }
    else if (state == 16) {

        if ($('#hd_avaliacao_atendimento').val() != '') {
            var star = parseInt($('#hd_avaliacao_atendimento').val())
            for (var p = 0; p <= star; p++) {
                var star_icon = $('.fluigicon')[p]
                star_icon.setAttribute('class', 'fa icon-xl selected fluigicon fluigicon-star')
            }
            star_icon.click()
        }

        var data_final = $('#hd_fim_solicitacao').val()
        var data_solicitacao = splitDate($('#hd_data_solicitacao').val())
        var data_final_solic = splitDate(data_final)

        var tempo_solic = (new Date(data_final_solic) - new Date(data_solicitacao));
        var hora_diferenca = Math.floor(tempo_solic / 36e5);
        var min_diferenca = Math.round(((tempo_solic % 86400000) % 3600000) / 60000);
        var totalHoras = hora_diferenca + 'h ' + min_diferenca + 'm';
        if (hora_diferenca >= 8) {
            var dias = Math.trunc(hora_diferenca / 24)//Arredondamento

            dias == 0 ? $('#conta_dias').text(totalHoras) : dias == 1 ? $('#conta_dias').text(dias + ' dia') : $('#conta_dias').text(dias + ' dias')
        } else {
            $('#conta_dias').text(totalHoras);
        }
        $("#title-days").text('Duração do chamado')
        $('.red-content').css('background', 'linear-gradient(89deg, rgba(95,245,183,1) 0%, rgb(53 230 225) 83%)')
        $('#dias_abertos').show()

    }
    if (state == 6 || state == 8 || state == 10 || state == 12 || state == 16) {
        FLUIGC.switcher.disable('#swt_tarefa_outroFunc')
        tabela > 1 ? $('.transfere_solic').show() : $('.transfere_solic').hide()
        $('#btn_transfere').hide()

        var table = $('#chat tbody tr').length
        for (var index = 1; index < table; index++) {
            $('#td_infoUser').show()
            $('#th_infoUser').show()
            $('#txta_tarefa_chat___' + index).attr('readonly', true)
            var src_img = $('#hd_email_usuario___' + index).val()
            var nome_user = $('#hd_nome_usuario___' + index).val()
            var hora_envio = $('#hd_hora_envio___' + index).val()

            var brother_img = $('#hd_email_usuario___' + index).siblings()[0]
            var brother_name = $('#hd_nome_usuario___' + index).siblings()[0]
            var brother_hour = $('#hd_hora_envio___' + index).siblings()[0]
            brother_img.setAttribute('src', '/social/api/rest/social/image/profile/' + src_img + '/X_SMALL_PICTURE')
            brother_name.innerText = nome_user
            brother_hour.innerText = hora_envio
        }
    }

    if (state == 8 || state == 10) {
        $('#hd_valida_chat').val('')
    }
    if (state == 6 || state == 8 || state == 10) {
        contaDias()
    }
})

function splitDate(date) {
    var data_hidden = date.split(' - ')
    var dias_hidden = data_hidden[0]
    var horas_hidden = data_hidden[1]
    var novo_dia = dias_hidden.split('/')[0]
    var novo_mes = dias_hidden.split('/')[1]
    var novo_ano = dias_hidden.split('/')[2]
    var nova_hora = horas_hidden.split(':')[0]
    var novo_min = horas_hidden.split(':')[1]

    return novo_ano + '/' + novo_mes + '/' + novo_dia + ' ' + nova_hora + ':' + novo_min
}

var beforeSendValidate = function (numState, nextState) {
    if (nextState == 4) {
        if (!campoObrigatorio()) {
            throw 'Campo obrigatório vazio! <br>Preencha o campo de Chapa do Funcionário'
        }
    }

    if (nextState == 10 && numState == 8) {
        $('#hd_indice_chat').val('') //Esvazia o hidden validador que adiciona o chat, tornando-o obrigatório
        var valida_chat = $('#hd_valida_chat').val()
        if (valida_chat == '') {
            var chat_obr = iniciarConversa('chat')
        }
    } else if (nextState == 12 && numState == 8) {
        var conteudo_chat = $('#chat tbody tr').last()[0].children[0].children[1].children[0].value
        if (conteudo_chat == '') {
            $('#chat tbody tr').last().remove()
        }
    }
    if (nextState == 18) {
        var dtaEnt = $('#hd_dta_entrada').val()
        var dataSaida = getDataAtual()
        var dataEntrada = new Date(splitDate(dtaEnt))
        var dataSaida = new Date(splitDate(dataSaida))

        var milissegundos_restantes = dataSaida - dataEntrada
        var minutos_corridos = Math.floor(milissegundos_restantes / 1000 / 60)

        if ($('#hd_dta_saida').val() == '') {
            var sla_nivel_atual = $('#hd_sla_nivel').val()
            if (sla_nivel_atual != '') {
                var tempo_restante = parseInt(sla_nivel_atual) - minutos_corridos
                $("#hd_sla_rest").val(tempo_restante)
            } else {
                $("#hd_sla_rest").val('')
            }
            $('#hd_dta_saida').val(dataSaida)//Campo de controle para passagem da primeira interação do nível
            $('#hd_tempoCorrido_nivel').val(minutos_corridos)
        }

        var proxAtividade = $('#hd_transfere_solic').val()
        if (proxAtividade == 'suporte') {
            //Pega horário de entrada e subtrai com o horário de saída
            var tabela_transf = $('#transferir_solic tbody tr');
            var id_row_nivel = tabela_transf[tabela_transf.length - 2].children[5].childNodes[5].id //id da row que vai antes da nova linha de transferência
            var sla_row_restante = tabela_transf[tabela_transf.length - 2].children[5].childNodes[5].value //sla restante da row que vai antes da nova linha de transferência
            var sla_row_total = tabela_transf[tabela_transf.length - 2].children[5].childNodes[7].value // sla total da linha anterior do sla
            var sla_selecionado;
            sla_row_restante != '' ? sla_selecionado = sla_row_restante : sla_selecionado = sla_row_total

            if (sla_selecionado != '') {
                var novoSlaPaifilho = parseFloat(sla_selecionado) - minutos_corridos
                $('#' + id_row_nivel).val(novoSlaPaifilho)
                $('#hd_tempo_corrido___' + id_row_nivel.split('___')[1]).val(minutos_corridos)
            } else {
                $('#' + id_row_nivel).val('')
                $('#hd_tempo_corrido___' + id_row_nivel.split('___')[1]).val(minutos_corridos)
            }

            /* Chamado: ##1533409 */
            for (let [key, value] of novos_dados_solicitacao.entries()){
                $(`#${key}`).val(value);
            }

            //Inicia validação da paixfilho e do campo de 
            var novo_analista = $('#hd_mat_analista_transf').val();
            var nova_classificacao = $('#hd_classificacao_transf').val()
            var nova_gestao = $('#hd_gestao_transf').val()

            $('#hd_matricula_analista').val(novo_analista)
            $("#hd_email_analista").val(emailTransferencia) /* Chamado: ##1533409 */
            $('#hd_papel_classifica').val('Pool:Group:' + nova_classificacao)
            $('#hd_cod_gestorCateg').val(nova_gestao)
            var nivel_atual = $('#hd_nivel_atual').val()
            var tpAtendimento_atual = $('#hd_tpAtendimento_atual').val()
            var primeiro_nivel = $('#ztxt_tarefa_nivel').val()
            var primeiro_tpAtend = $('#ztxt_tarefa_tipoAtend').val()
            var restante_sla;
            //var paifilho = tabela_transf.filter( linha_pai_filho => linha_pai_filho.cells[5].children[3].value == 120)

            var arrAuxiliar = []
            for (var x = 1; x < tabela_transf.length - 1; x++) {
                //var index = tabela_transf[x].children[1].childNodes[1].id.split('___')[1]

                var nivel_paifilho = tabela_transf[x].cells[5].children[0].value
                var tpAtend_paifilho = tabela_transf[x].cells[2].children[0].value

                if (nivel_atual == nivel_paifilho && tpAtendimento_atual == tpAtend_paifilho) {
                    arrAuxiliar.push({
                        nome_nivel: tabela_transf[x].cells[5].children[0].value,
                        restante_sla_aux: tabela_transf[x].cells[5].children[2].value,
                        sla_total: tabela_transf[x].cells[5].children[3].id
                    })
                }
            }

            if (arrAuxiliar.length > 0) {
                var id_lastRow = tabela_transf.last()[0].children[1].childNodes[1].id.split('___')[1]
                var index_aux = arrAuxiliar.length - 1
                var sla_restante_aux = arrAuxiliar[index_aux].restante_sla_aux
                $('#hd_resta_sla___' + id_lastRow).val(sla_restante_aux)
                restante_sla = sla_restante_aux
            } else {
                var index_tabela = tabela_transf.last()[0].children[1].childNodes[1].id.split('___')[1]
                if (nivel_atual == primeiro_nivel && tpAtendimento_atual == primeiro_tpAtend) {
                    restante_sla = $('#hd_sla_rest').val()
                    $('#hd_resta_sla___' + index_tabela).val(restante_sla)
                }
                else {
                    restante_sla = $('#hd_sla_selecionado___' + index_tabela).val()
                }
            }

            if (restante_sla != '') {
                var data = new Date();
                var dia = String(data.getDate()).padStart(2, '0');
                var mes = String(data.getMonth() + 1).padStart(2, '0');
                var ano = data.getFullYear();
                var horas = data.getHours();
                var minutos = data.getMinutes() + parseInt(restante_sla);

                var dataAtual = new Date(ano, mes - 1, dia, horas, minutos);
                $('#hd_sla').val(restante_sla)
                $("#hd_sla_total").val(restante_sla)
                var dia_sla = String(dataAtual.getDate()).padStart(2, '0')
                var mes_sla = String(dataAtual.getMonth() + 1).padStart(2, '0')
                var ano_sla = dataAtual.getFullYear()

                var data_sla = dia_sla + "/" + mes_sla + "/" + ano_sla
                //console.log('Data SLA = ' + data_sla);
                $("#hd_prazo_conclusao").val(data_sla);
            } else {
                $('#hd_sla').val('')
                $("#hd_sla_total").val('')
                $("#hd_prazo_conclusao").val('');
            }
        } else if (proxAtividade == 'avalia_atendimento') {
            $('#sl_tarefa_status').val('5')
        }
    }
    if (nextState == 12) {
        $('#sl_tarefa_status').val('5')
        $('#sl_tarefa_proxAtividade').val('avalia_atendimento')
    }
    if (nextState == 16) {
        var data_final = getDataAtual()
        $('#hd_fim_solicitacao').val(data_final)
    }
}

function deleteLinha(row) {
    var indice_chat = row.parentNode.parentNode.children[5].children[2].value
    $('#row_chat___' + indice_chat).remove()
    var remove = fnWdkRemoveChild(row);
    $("#sl_tarefa_proxAtividade").attr('disabled', false)
    $('#sl_tarefa_proxAtividade').val('select')
    setTimeout(function () {
        $('.transfere_solic').hide('smooth')
    }, 1000)
    $('#btn_transfere').show()
}

function apresentaCampos(id) {
    var check = id.checked
    check == true ? $('.new_solic').show('smooth') : $('.new_solic').hide('smooth')
}

function contaDias() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();

    var horas = data.getHours();
    var minutos = data.getMinutes();
    var dataAtual = new Date(ano, mes - 1, dia, horas, minutos);

    var data_solicitacao

    FORM_MODE == 'VIEW' ? data_solicitacao = $('#txt_tarefa_data').text() : data_solicitacao = $('#txt_tarefa_data').val()

    var data_solic = splitDate(data_solicitacao)

    var dataSolic = new Date(data_solic);

    //var diaDiferenca = Math.abs( dataAtual.getTime() - dataSolic.getTime())//pega o valor absoluto, independente de quem seja o menor

    var tempo_total = (dataAtual - dataSolic);
    var hora_diferenca = Math.floor(tempo_total / 36e5);
    var min_diferenca = Math.round(((tempo_total % 86400000) % 3600000) / 60000);
    var totalHoras = hora_diferenca + 'h ' + min_diferenca + 'm';
    var sla = $('#hd_sla_total').val();
    if (hora_diferenca >= 8) {
        var dias = Math.trunc(hora_diferenca / 24)//Arredondamento
        dias == 0 ? $('#conta_dias').text(totalHoras) : dias == 1 ? $('#conta_dias').text(dias + ' dia') : $('#conta_dias').text(dias + ' dias')

        horaDiferenca(hora_diferenca, sla)
    } else {
        horaDiferenca(hora_diferenca, sla)
        $('#conta_dias').text(totalHoras);
    }

    function horaDiferenca(horaDif, slaDif) {
        var sla_diferenca = parseFloat(slaDif) / 60
        if (horaDif <= (sla_diferenca / 2)) {
            $('.red-content').css('background-color', '#46C243')
        } if (horaDif >= (sla_diferenca / 2)) {
            $('.red-content').css('background-color', '##FFC107')
        } if (horaDif >= sla_diferenca) {
            $('.red-content').css('background-color', 'rgb(255, 0, 0)')
        }
    }

}

// function getUserObaTarefa() {
//     var user_code = getUsuario();
//     //user_code = 'hq4gjqjx6x9gl2bt1560169781141'

//     $("#hd_mat_solic").val(user_code);
//     var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user_code, user_code, ConstraintType.MUST)
//     var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values
//     var dsChapa = DatasetFactory.getDataset("dsGetChapaAD", ['a', colleague[0].mail], null, null).values
//     var objeto = JSON.parse(dsChapa[0].retorno);

//     var Const_att = DatasetFactory.createConstraint("Oba_tarefas", objeto.onPremisesSamAccountName, objeto.onPremisesSamAccountName, ConstraintType.MUST)
//     var dataset = DatasetFactory.getDataset("getPfunc_MFX", null, [Const_att], null).values
//     if (dataset.length > 0) {
//         /*          sequsuario = row["SEQUSUARIO"];
//                 $("#sequsuario").val(sequsuario);*/

//         $("#txt_tarefa_funcao").val(dataset[0]["FUNCAO"]);
//         $("#txt_tarefa_nome").val(dataset[0]["FULL_NAME"]);
//         $("#txt_tarefa_chapa").val(dataset[0]["CHAPA"]);
//         $("#txt_tarefa_secao").val(dataset[0]["SECAO"]);
//         $("#txt_tarefa_filial").val(dados[0]["NOMEFANTASIA"])
//         $("#txt_tarefa_email").val(colleague[0].mail);
//         $("#hd_login_solic").val(colleague[0].login);
//     } else {
//         FLUIGC.modal({
//             title: 'Usuário não encontrado no RM:',
//             content: '<p>Contate a equipe de TI ou busque seu usuário no switch de "Solicitação para outro funcionário"</p>',
//             id: 'modal_user',
//             size: 'large',
//             actions: [{
//                 'label': 'Ok',
//                 'bind': 'data-ok-req',
//                 'classType': 'btn btn-warning btn-block',
//                 'autoClose': true
//             }]
//         }, function (err, data) {
//             if (err) {
//                 // do error handling
//             } else {
//                 // do something with data
//             }
//         });

//         $('#txt_tarefa_nomeFunc').addClass('cp_obrigatorio')
//         //$('.new_solic').show('smooth')
//         FLUIGC.switcher.setTrue('#swt_tarefa_outroFunc')
//         FLUIGC.switcher.disable('#swt_tarefa_outroFunc')
//     }
// }

function getDadosSolicitante() {
    var user_code = getUsuario();

    $("#hd_mat_solic").val(user_code);
    var mail = getMail(user_code)
    var chapa = getChapa(mail[0])

    var c1 = DatasetFactory.createConstraint('CHAPA', chapa, chapa, ConstraintType.MUST)
    var dados = DatasetFactory.getDataset('dts_getDadosCabecalho_MFX', null, [c1], null).values
    var filial = DatasetFactory.getDataset('dts_getFilialConsinco_MFX', null, [c1], null).values
    if (dados.length > 0) {
        /*          sequsuario = row["SEQUSUARIO"];
                $("#sequsuario").val(sequsuario);*/

        $("#txt_tarefa_funcao").val(dados[0]["FUNCAO"]);
        $("#txt_tarefa_nome").val(dados[0]["NOME"]);
        $("#txt_tarefa_chapa").val(dados[0]["CHAPA"]);
        $("#txt_tarefa_secao").val(dados[0]["SECAO"]);
        $("#txt_tarefa_filial").val(filial[0]["FANTASIA"])
        $("#txt_tarefa_email").val(mail[0]);
        $("#hd_login_solic").val(mail[1]);
    } else {
        FLUIGC.modal({
            title: 'Usuário não encontrado no RM:',
            content: '<p>Contate a equipe de TI ou busque seu usuário no switch de "Solicitação para outro funcionário"</p>',
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

        $('#txt_tarefa_nomeFunc').addClass('cp_obrigatorio')
        //$('.new_solic').show('smooth')
        FLUIGC.switcher.setTrue('#swt_tarefa_outroFunc')
        FLUIGC.switcher.disable('#swt_tarefa_outroFunc')
    }
}
function getMail(userCode){
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userCode, userCode, ConstraintType.MUST)
    var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values
    return [colleague[0].mail, colleague[0].login]
}

function getChapa(mail){
    var dsChapa = DatasetFactory.getDataset("dsGetChapaAD", ['a', mail], null, null).values
    var objeto = JSON.parse(dsChapa[0].retorno);
    return objeto.onPremisesSamAccountName
}

let emailAtual = "", emailTransferencia = "";
let novos_dados_solicitacao = new Map();

function setSelectedZoomItem(selectedItem) {
    var index = selectedItem.inputId.split('___')[1]
    var atividade = getWKNumState();
    if (selectedItem.inputId == 'ztxt_tarefa_categoria') {
        var id_categ = selectedItem['TXT_ID_CATEGORIA'];
        var cod_gestor = selectedItem['GRUPO_GESTOR']
        reloadZoomFilterValues('ztxt_tarefa_tipoAtend', 'IDCATEG,' + id_categ)
        $('#hd_cod_categoria').val(id_categ);
        $('#hd_cod_gestorCateg').val(cod_gestor)
        $('#col_atendimento').show('smooth')
        window['ztxt_tarefa_tipoAtend'].disable(false)
    }

    if (selectedItem.inputId == 'ztxt_tarefa_tipoAtend') {
        $('#col_tarefa').show('smooth')
        $('#col_tiposolic').show('smooth')

        var id = selectedItem['TXT_ID_TIPOATEND']
        var tpAtendimento = selectedItem['TXT_TIPO_ATENDIMENTO']
        var codigo_classificacao = selectedItem['TXT_GRUPO_CLASSIFICA']

        if (codigo_classificacao == "Sem classificador") {
            $('#hd_valida_classificacao').val('nao')
            var idTpAtend = DatasetFactory.createConstraint('IDTPATEND', id, id, ConstraintType.MUST);
            var nivel_atendimento = DatasetFactory.getDataset('dts_consultaNiveisSlaMFX', null, [idTpAtend], null).values
            var grupo_responsavel = nivel_atendimento[0]['TXT_GRUPO_NIVEL']
            var prazo_conclusao = nivel_atendimento[0]['TXT_PRAZO_CONCLUSAO']

            if (prazo_conclusao == 'Sem') {
                $("#hd_prazo_conclusao").val('');
                $('#hd_sla_nivel').val('')
                $('#hd_sla').val('')
                $("#hd_sla_total").val('')
            } else {
                var data_sla = new Date();
                var diaSla = String(data_sla.getDate()).padStart(2, '0');
                var mesSla = String(data_sla.getMonth() + 1).padStart(2, '0');
                var anoSla = data_sla.getFullYear();
                var slaMin = parseInt(prazo_conclusao) * 60;
                var horasSla = data_sla.getHours();
                var minutosSla = data_sla.getMinutes() + slaMin;
                $('#hd_sla_nivel').val(slaMin)

                var dataAtual = new Date(anoSla, mesSla - 1, diaSla, horasSla, minutosSla);
                $('#hd_sla').val(slaMin)
                $("#hd_sla_total").val(slaMin)
                var dia_sla = String(dataAtual.getDate()).padStart(2, '0')
                var mes_sla = String(dataAtual.getMonth() + 1).padStart(2, '0')
                var ano_sla = dataAtual.getFullYear()

                var data_sla = dia_sla + "/" + mes_sla + "/" + ano_sla
                $("#hd_prazo_conclusao").val(data_sla);
            }

            $('#hd_matricula_analista').val('Pool:Group:' + grupo_responsavel)
            $('#hd_papel_classifica').val('')
        } else {
            $('#hd_valida_classificacao').val('sim')
            $('#hd_papel_classifica').val('Pool:Group:' + codigo_classificacao)
            $('#hd_cod_tipoAtendimento').val(id)
            $('#hd_matricula_analista').val('')
            $("#hd_prazo_conclusao").val('')
            $('#hd_sla_nivel').val('')
            $('#hd_sla').val('')
            $("#hd_sla_total").val('')
        }
        reloadZoomFilterValues('ztxt_tarefa_slTarefa', 'IDTPATEND,' + id)
        if (atividade == 4) {
            reloadZoomFilterValues('ztxt_tarefa_nivel', 'IDTPATEND,' + id)
        }
        $('#hd_tpAtendimento_atual').val(tpAtendimento)
        window['ztxt_tarefa_categoria'].disable(true)
        window['ztxt_tarefa_slTarefa'].disable(false)
    }
    if (selectedItem.inputId == 'ztxt_tarefa_slTarefa') {
        var tipoSolicitacao = selectedItem['SL_TAREFA_TIPOSOLIC']
        $('#txt_tarefa_tiposolic').val(tipoSolicitacao)
        window['ztxt_tarefa_tipoAtend'].disable(true)
    }

    if (selectedItem.inputId == 'ztxt_tarefa_nivel') {
        var cod_gp = selectedItem['id']
        reloadZoomFilterValues('ztxt_tarefa_analista', 'ANALISTA,' + cod_gp)
        var sla = selectedItem['TXT_PRAZO_CONCLUSAO']
        if (sla == 'Sem') {
            $("#hd_prazo_conclusao").val('');
            $('#hd_sla_nivel').val('')
            $('#hd_sla').val('')
            $("#hd_sla_total").val('')
        } else {
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            var slaMinutos = parseInt(sla) * 60;
            var horas = data.getHours();
            var minutos = data.getMinutes() + slaMinutos;
            $('#hd_sla_nivel').val(slaMinutos)

            var dataAtual = new Date(ano, mes - 1, dia, horas, minutos);
            $('#hd_sla').val(slaMinutos)
            $("#hd_sla_total").val(slaMinutos)
            var dia_sla = String(dataAtual.getDate()).padStart(2, '0')
            var mes_sla = String(dataAtual.getMonth() + 1).padStart(2, '0')
            var ano_sla = dataAtual.getFullYear()

            var data_sla = dia_sla + "/" + mes_sla + "/" + ano_sla
            $("#hd_prazo_conclusao").val(data_sla);
        }
    }

    if (selectedItem.inputId == 'ztxt_tarefa_analista') {
        var matricula = selectedItem['MATRICULA']
        $('#hd_matricula_analista').val(matricula);

        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST)
        var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values

        var loginUser = colleague[0]['login']
        $('#hd_email_analista').val(loginUser)

        //Variáveis de campos
        var cHiddenNomeAnalista = 'hd_tarefa_nomeAnalista';

        //Variáveis de valores
        var cValorNomeAnalista = selectedItem['NOME'];

        $('#' + cHiddenNomeAnalista).val(cValorNomeAnalista);
    }

    if (selectedItem.inputId == 'ztxt_tarefa_chapaFunc') {
        var nome_solic = selectedItem['FULL_NAME']
        var funcao_solic = selectedItem['FUNCAO']
        var secao_solic = selectedItem['SECAO']
        var email_solic = selectedItem['EMAIL']

        $('#txt_tarefa_nomeFunc').val(nome_solic)
        $('#txt_tarefa_funcaoFunc').val(funcao_solic)
        $('#txt_tarefa_secaoFunc').val(secao_solic)
        $('#txt_tarefa_emailFunc').val(email_solic)
    }

    if (selectedItem.inputId == 'ztxt_tarefa_novoCateg___' + index) {
        var id_categoria = selectedItem['TXT_ID_CATEGORIA'];
        var desc_categoria = selectedItem['CATEGORIA'];
        reloadZoomFilterValues('ztxt_tarefa_novotp___' + index, 'IDCATEG,' + id_categoria)
        window['ztxt_tarefa_novotp___' + index].disable(false)
        $('#transId_categoria___' + index).val(id_categoria)

        /* Chamado: ##1533409 */
        var cod_gestorCateg = selectedItem['GRUPO_GESTOR']
        $('#hd_gestao_transf').val(cod_gestorCateg)
        $('#_ztxt_tarefa_categoria').val(desc_categoria);

        novos_dados_solicitacao.set("ztxt_tarefa_categoria",desc_categoria)
        /* ================= */
    }
    if (selectedItem.inputId == 'ztxt_tarefa_novotp___' + index) {
        var id_tpAtend = selectedItem['TXT_ID_TIPOATEND']
        var id_categoria = $('#transId_categoria___' + index).val()
        var novoTpAtend = selectedItem['TIPO_ATENDIMENTO']
        var codigo_classificacao = selectedItem['TXT_GRUPO_CLASSIFICA']

        $('#hd_tpAtendimento_atual').val(novoTpAtend)
        $('#hd_classificacao_transf').val(codigo_classificacao)
        $('#hd_cod_tipoAtendimento').val(id_tpAtend)
        var constraintTarefa = 'FILTRA_TAREFAS,' + " AND mlTrf.TXT_ID_TIPOATEND = '" + id_tpAtend + "' AND mlTrf.TXT_ID_CATEGORIA = '" + id_categoria + "'"
        var constraintNiv = 'FILTRA_NIVEIS,' + " AND MLSLA.TXT_ID_TIPOATEND = '" + id_tpAtend + "' AND MLSLA.TXT_ID_CATEGORIA = '" + id_categoria + "'"
        reloadZoomFilterValues('ztxt_tarefa_novaTarefa___' + index, constraintTarefa)
        reloadZoomFilterValues('ztxt_tarefa_novoNiv___' + index, constraintNiv)
        //reloadZoomFilterValues('ztxt_tarefa_novaTarefa___' + index, 'IDTPATEND,' + id_tpAtend)
        //reloadZoomFilterValues('ztxt_tarefa_novoNiv___' + index, 'IDTPATEND,' + id_tpAtend)
        window['ztxt_tarefa_novaTarefa___' + index].disable(false)
        window['ztxt_tarefa_novoCateg___' + index].disable(true)

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_tipoAtend",novoTpAtend)
    }

    if (selectedItem.inputId == 'ztxt_tarefa_novaTarefa___' + index) {
        var tipoSolicitacao = selectedItem['SL_TAREFA_TIPOSOLIC']
        $('#txt_tarefa_ntiposolic___' + index).val(tipoSolicitacao)
        window['ztxt_tarefa_novoNiv___' + index].disable(false)
        window['ztxt_tarefa_novotp___' + index].disable(true)

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_slTarefa",selectedItem['TXT_TAREFA'])
        novos_dados_solicitacao.set("txt_tarefa_tiposolic",tipoSolicitacao)
    }
    if (selectedItem.inputId == 'ztxt_tarefa_novoNiv___' + index) {
        var cod_gp_id = selectedItem['id']
        $('#hd_nivel_atual').val(cod_gp_id)
        reloadZoomFilterValues('ztxt_tarefa_transfSolic___' + index, 'ANALISTA,' + cod_gp_id)
        var sla = selectedItem['TXT_PRAZO_CONCLUSAO']

        if (sla == 'Sem') {
            $('#hd_sla_selecionado___' + index).val('')
        } else {
            var slaMinutos = parseInt(sla) * 60;
            $('#hd_sla_selecionado___' + index).val(slaMinutos)
        }

        var adicionaChat = wdkAddChild('chat')
        $('#txt_index_chat___' + index).val(adicionaChat);
        $('#btn_salvar___' + adicionaChat).show()
        var usuarioLogado = getUsuario();
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", usuarioLogado, usuarioLogado, ConstraintType.MUST)
        var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values

        var tipo_atendimento = selectedItem['TXT_NOME_TIPOATEND']
        var loginUser = colleague[0]['login']
        var nomeUser = colleague[0]['colleagueName']
        $('#hd_email_usuario___' + adicionaChat).val(loginUser)
        $('#hd_nome_usuario___' + adicionaChat).val(nomeUser)

        $('#td_infoUser___' + adicionaChat).hide()
        $('#txta_tarefa_chat___' + adicionaChat).val('Chamado transferido para o Tipo de Atendimento ' + tipo_atendimento + ' e para o Grupo de Atendimento ' + cod_gp_id)
        $('#btn_salvar___' + adicionaChat).click()
        window['ztxt_tarefa_transfSolic___' + index].disable(false)
        window['ztxt_tarefa_novaTarefa___' + index].disable(true)

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_nivel",selectedItem['TXT_GRUPO_NIVEL'])
    }

    if (selectedItem.inputId == 'ztxt_tarefa_transfSolic___' + index) {
        emailAtual = $('#hd_email_analista').val();

        /* Chamado: ##1533409 */
        var matriculaUser = selectedItem['MATRICULA']
        $('#hd_mat_analista_transf').val(matriculaUser);

        try{
            var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matriculaUser, matriculaUser, ConstraintType.MUST)
            var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values
            
            emailTransferencia = colleague[0]['login'];
        }
        catch(err){
            emailTransferencia = $("#hd_email_analista").val();
        }
        /* ============ */ 
        FLUIGC.toast({
            title: 'Transferência de solicitação: ',
            message: 'Novo analista adicionado com sucesso',
            type: 'success'
        });
        window['ztxt_tarefa_novoNiv___' + index].disable(true);

        //Variáveis de campos
        var cAnalista = 'ztxt_tarefa_analista';

        //Variáveis de valores
        var cValorNomeNovoAnalista = selectedItem['NOME'];

        $('#' + cAnalista).val(cValorNomeNovoAnalista);

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_analista",cValorNomeNovoAnalista)
    }
}

function removedZoomItem(removedItem) {
    var index = removedItem.inputId.split('___')[1]
    var atividade = getWKNumState();
    if (removedItem.inputId == 'ztxt_tarefa_categoria') {
        window['ztxt_tarefa_tipoAtend'].disable(true)
        window['ztxt_tarefa_tipoAtend'].clear()
        window['ztxt_tarefa_slTarefa'].clear()
        if (atividade == 4) {
            window['ztxt_tarefa_nivel'].clear()
            window['ztxt_tarefa_analista'].clear()
        }
    }

    if (removedItem.inputId == 'ztxt_tarefa_tipoAtend') {
        window['ztxt_tarefa_slTarefa'].clear()
        window['ztxt_tarefa_slTarefa'].disable(true)
        window['ztxt_tarefa_categoria'].disable(false)
        $('#hd_papel_classifica').val('')
        $('hd_papel_grupo_analista').val('')
        if (atividade == 4) {
            var id_categoria = $('#hd_cod_categoria').val()
            reloadZoomFilterValues('ztxt_tarefa_tipoAtend', 'IDCATEG,' + id_categoria)
            window['ztxt_tarefa_nivel'].clear()
            window['ztxt_tarefa_analista'].clear()
        }
    }

    if (removedItem.inputId == 'ztxt_tarefa_slTarefa') {
        $('#txt_tarefa_tiposolic').val('')
        if (atividade == 4) {
            var id_tpAtend = $('#hd_cod_tipoAtendimento').val()
            reloadZoomFilterValues('ztxt_tarefa_slTarefa', 'IDTPATEND,' + id_tpAtend)
        }
        window['ztxt_tarefa_tipoAtend'].disable(false)
    }

    if (removedItem.inputId == 'ztxt_tarefa_chapaFunc') {
        $('#txt_tarefa_nomeFunc').val('')
        $('#txt_tarefa_funcaoFunc').val('')
        $('#txt_tarefa_secaoFunc').val('')
        $('#txt_tarefa_emailFunc').val('')
    }

    if (removedItem.inputId == 'ztxt_tarefa_novoCateg___' + index) {
        window['ztxt_tarefa_novotp___' + index].disable(true)
        $('#transId_categoria___' + index).val('');

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_categoria","")
    }
    if (removedItem.inputId == 'ztxt_tarefa_novotp___' + index) {
        window['ztxt_tarefa_novaTarefa___' + index].disable(true)
        window['ztxt_tarefa_novoCateg___' + index].disable(false)
        $('#hd_cod_tipoAtendimento').val('')

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_tipoAtend","")
    }
    if (removedItem.inputId == 'ztxt_tarefa_novaTarefa___' + index) {
        window['ztxt_tarefa_novoNiv___' + index].disable(true)
        window['ztxt_tarefa_novotp___' + index].disable(false)
        $('#txt_tarefa_ntiposolic___' + index).val('')

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_slTarefa","")
        novos_dados_solicitacao.set("txt_tarefa_tiposolic","")
    }
    if (removedItem.inputId == 'ztxt_tarefa_novoNiv___' + index) {
        var removeId = $('#txt_index_chat___' + index).val();
        $('#row_chat___' + removeId).remove()
        window['ztxt_tarefa_transfSolic___' + index].disable(true)
        window['ztxt_tarefa_novaTarefa___' + index].disable(false)
        $('#hd_nivel_atual').val('')

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_nivel", "")
    }
    if (removedItem.inputId == 'ztxt_tarefa_transfSolic___' + index) {
        window['ztxt_tarefa_novoNiv___' + index].disable(false)

        //Variáveis de campos
        var cAnalista = 'ztxt_tarefa_analista';

        //Variáveis de valores
        var cHiddenNomeAnalista = 'hd_tarefa_nomeAnalista';

        $('#' + cAnalista).val(cHiddenNomeAnalista);

        /* Chamado: ##1533409 */
        novos_dados_solicitacao.set("ztxt_tarefa_analista", "")
    }
}

//var id_chat = 0
function iniciarConversa(tablename) {
    $('#inicio_conversa').hide()
    var iniciaChat = wdkAddChild(tablename)
    var state = getWKNumState()
    var state = getWKNumState()

    state == 8 ? $("#btn_envia_solic_suporte___" + iniciaChat).show() : $('#btn_salvar___' + iniciaChat).show()

    var usuarioLogado = getUsuario();
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", usuarioLogado, usuarioLogado, ConstraintType.MUST)
    var colleague = DatasetFactory.getDataset("colleague", null, [c1], null).values

    var loginUser = colleague[0]['login']
    var nomeUser = colleague[0]['colleagueName']
    $('#hd_email_usuario___' + iniciaChat).val(loginUser)
    $('#hd_nome_usuario___' + iniciaChat).val(nomeUser)
    $('#td_infoUser___' + iniciaChat).hide()
    $('#hd_valida_chat').val('enviou')
    $('#hd_indice_chat').val('')

    return iniciaChat
}

function salvaChat(id, acao) {
    var index = id.split('___')[1]
    $('#txta_tarefa_chat___' + index).attr('readonly', true)
    $('#btn_salvar___' + index).hide()
    $('#btn_editar___' + index).show()
    $('#mensagem_enviada___' + index).show()
    $('#th_infoUser').show()
    $('#td_infoUser___' + index).show()

    var login_usuario = $('#hd_email_usuario___' + index).val()
    $('#foto_usuario___' + index).attr('src', '/social/api/rest/social/image/profile/' + login_usuario + '/X_SMALL_PICTURE')
    var nome_usuario = $('#hd_nome_usuario___' + index).val()
    $('#nome_usuario___' + index).text(nome_usuario);

    var dataAtual = getDataAtual()
    $('#hora_envio___' + index).text(dataAtual)
    $('#hd_hora_envio___' + index).val(dataAtual)

    var temMsg = false
    if (acao == 'enviar') {
        var mensagem = $("#txta_tarefa_chat___" + index).val()
        if(mensagem != '') {
            temMsg = true
            $('#txta_tarefa_chat___' + index).attr('readonly', true)
            $('#btn_editar___' + index).show()
            $("#btn_envia_solic_suporte___" + index).hide()
            window.parent.$('button[data-send]').first().click()
        }{
            if(!temMsg){
                FLUIGC.toast({
                    title: '<h3>Erro ao enviar solicitação!</h3>',
                    message: '<p>Adicione uma mensagem no chat para enviar solicitação.</p>'
                    ,type: 'warning'
                });
                $("#btn_envia_solic_suporte___" + index).show()
            }
        }
    }else{
        $('#btn_salvar___' + index).hide()
        $('#txta_tarefa_chat___' + index).attr('readonly', true)
        $('#btn_editar___' + index).show()
    }
}

function editaChat(id) {
    var indexEdit = id.split('___')[1]
    $('#txta_tarefa_chat___' + indexEdit).attr('readonly', false)
    $('#btn_salvar___' + indexEdit).show()
    $('#btn_editar___' + indexEdit).hide()

    var state = getWKNumState()
    state == 8 ? $("#btn_envia_solic_suporte___" + indexEdit).show() : $('#btn_salvar___' + indexEdit).show()
}

function proxAtividade() {
    var selected = $('#sl_tarefa_proxAtividade option:selected').val();
    //var indice_chat = $('#hd_indice_chat').val()
    var conteudo_chat = $('#chat tbody tr').last()[0].children[0].children[1].children[0].value
    if (selected == 'suporte') {
        $('#hd_transfere_solic').val(selected)
        $('.transfere_solic').show('smooth')
        $('#btn_transfere').show()
        var id_transferencia = $('#transfere_solic').val()
        if (id_transferencia == '') {
            FLUIGC.toast({
                title: 'Transferência de solicitação: ',
                message: 'Adicione um analista para transferir a solicitação',
                type: 'warning'
            });
        }
        transfereSolic('transferir_solic')
        if (conteudo_chat == '') {
            if ($('#chat tbody tr').length > 1) {
                $('#chat tbody tr').last().remove()
                $('#hd_indice_chat').val('')
                $('#hd_valida_chat').val('')
                $('#inicio_conversa').show()
            }
        }
    }
    else if (selected == 'retorno_solic') {
        var valida_hidden = $('#hd_valida_chat').val()
        $('#hd_transfere_solic').val(selected)
        $('.transfere_solic').hide('slow')
        if (valida_hidden == '') {
            var indice = iniciarConversa('chat')
            $('#hd_indice_chat').val(indice)
        }
    }
    else if (selected == 'avalia_atendimento') {
        $('#hd_transfere_solic').val(selected)
        $('.transfere_solic').hide('smooth')
        if (conteudo_chat == '') {
            if ($('#chat tbody tr').length > 1) {
                $('#chat tbody tr').last().remove()
                $('#hd_indice_chat').val('')
                $('#hd_valida_chat').val('')
                $('#inicio_conversa').show()
            }
        }
    }else if(selected == 'solicita_projeto'){
        $('#hd_transfere_solic').val(selected)
        $('.transfere_solic').hide('smooth')
        if (conteudo_chat == '') {
            if ($('#chat tbody tr').length > 1) {
                $('#chat tbody tr').last().remove()
                $('#hd_indice_chat').val('')
                $('#hd_valida_chat').val('')
                $('#inicio_conversa').show()
            }
        }
    } else {
        $('#hd_transfere_solic').val('')
        if (conteudo_chat == '') {
            if ($('#chat tbody tr').length > 1) {
                $('#chat tbody tr').last().remove()
                $('#hd_indice_chat').val('')
                $('#hd_valida_chat').val('')
                $('#inicio_conversa').show()
            }
        }
    }
}

function transfereSolic(tablename) {
    var index = wdkAddChild(tablename)
    $('#btn_transfere').hide()
    var dataTransferencia = getDataAtual()
    //$('#hd_data_solicitacao').val(dataTransferencia)

    window['ztxt_tarefa_novotp___' + index].disable(true)
    window['ztxt_tarefa_novaTarefa___' + index].disable(true)
    window['ztxt_tarefa_novoNiv___' + index].disable(true)
    window['ztxt_tarefa_transfSolic___' + index].disable(true)
    $("#sl_tarefa_proxAtividade").attr('disabled', true)
}

function campoObrigatorio() {
    var campo_obr_preenchido = true;
    if (campo_obr_preenchido) {
        $('.cp_obrigatorio').each(function (e) {
            if ($(this).is(':visible')) {
                if (this.type == 'text') {
                    if (this.value.trim() == "") {
                        // FLUIGC.toast({
                        //     title: 'Campo obrigatório vazio! <br>',
                        //     message: 'Preencha todos os campos',
                        //     type: 'danger'
                        // });
                        campo_obr_preenchido = false;
                        return false;
                    }
                }
            }
            else {
                if (this.value == '0' || this.value == '') {
                    campo_obr_preenchido = false;
                    return false;
                }
            }
        })
    }

    return campo_obr_preenchido;
}

function getDataAtual() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;

    var horas = data.getHours();
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var horarioAtual = horas + ":" + minutos

    return dataAtual + ' - ' + horarioAtual
}

function estrelaAvalia() {
    var starsCallback = FLUIGC.stars("#rt_tarefa_avalia", {
        stars: 5,
        sizeClass: 'icon-xl',
        color: '#FFC107',
        text: ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo']
    });

    starsCallback.on("click", function (obj) {
        var pos = $(this).index();
        var array = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo'];
        $('#hd_avaliacao_atendimento').val(pos + 1)
        posicaoStar(pos, array)
    });

    starsCallback.on("mouseover", function (obj) {
        var posicao = $(this).index();
        var opt = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo'];
        posicaoStar(posicao, opt)
    })

    function posicaoStar(pos, arr) {
        if (arr[pos] == 'Péssimo') {
            $('#pessimo').show()
            $('#regular').hide()
            $('#ruim').hide()
            $('#bom').hide()
            $('#otimo').hide()
        }
        else if (arr[pos] == 'Ruim') {
            $('#ruim').show()
            $('#pessimo').hide()
            $('#regular').hide()
            $('#bom').hide()
            $('#otimo').hide()
        } else if (arr[pos] == 'Regular') {
            $('#regular').show()
            $('#pessimo').hide()
            $('#ruim').hide()
            $('#bom').hide()
            $('#otimo').hide()
        }
        else if (arr[pos] == 'Bom') {
            $('#regular').hide()
            $('#pessimo').hide()
            $('#ruim').hide()
            $('#bom').show()
            $('#otimo').hide()
        }
        else if (arr[pos] == 'Ótimo') {
            $('#pessimo').hide()
            $('#ruim').hide()
            $('#regular').hide()
            $('#bom').hide()
            $('#otimo').show()
        } else {
            $('#pessimo').hide()
            $('#ruim').hide()
            $('#regular').hide()
            $('#bom').hide()
            $('#otimo').hide()
        }
    }
}