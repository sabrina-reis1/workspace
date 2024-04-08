function beforeStateLeave(sequenceId){
    log.info("BEFORE STATE LEAVE")
    var proxAtividade = getValue("WKNextState")
    var numProcess = getValue("WKNumProces")

    var dataSolic = {
        name        : "",
        email       : "",
        situation   : "",
        message     : "",
        params      : "",
        button      : '<a href="http://fluig.redeoba.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numProcess + '">Tarefa para análise</a>'
    }
    
    var dataColleague = {
        fieldName    : "colleaguePK.colleagueId",
        initialValue : "",
        finalValue   : ""
    }
    
    if(proxAtividade == 57){
        dataSolic.name      = hAPI.getCardValue("txt_solicitante")
        dataSolic.email     = hAPI.getCardValue("txt_email_solicitante")
        dataSolic.situation = 'Revisão - Solicitação de Projetos'
        dataSolic.message   = "A sua solicitação de projeto foi enviada para revisão. Por favor, valide todos os pontos."
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }

    if (proxAtividade == 43) {
        dataColleague.initialValue  = hAPI.getCardValue("aprov1")
        dataColleague.finalValue    = hAPI.getCardValue("aprov1")

        var retDts = getColleague(dataColleague)

        dataSolic.email     = retDts.getValue(0, 'mail');
        dataSolic.name      = retDts.getValue(0, 'colleagueName')
        dataSolic.situation = 'Aprovação Gerente - Solicitação de Projetos'
        dataSolic.message   = "A solicitação de projeto n° " + numProcess + " foi encaminhada para você aprovar. Clique em Tarefa para análise para aprovar/reprovar a solicitação."
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }
    
    if (proxAtividade == 46) {
        dataColleague.initialValue  = hAPI.getCardValue("aprov2")
        dataColleague.finalValue    = hAPI.getCardValue("aprov2")

        var retDts = getColleague(dataColleague)

        dataSolic.email     = retDts.getValue(0, 'mail');
        dataSolic.name      = retDts.getValue(0, 'colleagueName')
        dataSolic.situation = 'Aprovação Diretor - Solicitação de Projetos'
        dataSolic.message   = "A solicitação de projeto n° " + numProcess + " foi encaminhada para você aprovar. Clique em Tarefa para análise para aprovar/reprovar a solicitação."
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }
    
    if (proxAtividade == 49) {
        dataColleague.initialValue  = hAPI.getCardValue("aprov3")
        dataColleague.finalValue    = hAPI.getCardValue("aprov3")

        var retDts = getColleague(dataColleague)

        dataSolic.email     = retDts.getValue(0, 'mail');
        dataSolic.name      = retDts.getValue(0, 'colleagueName')
        dataSolic.situation = 'Aprovação CEO - Solicitação de Projetos'
        dataSolic.message   = "A solicitação de projeto n° " + numProcess + " foi encaminhada para você aprovar. Clique em Tarefa para análise para aprovar/reprovar a solicitação."
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }

    if (proxAtividade == 52) {
        dataColleague.initialValue  = hAPI.getCardValue("pacoteiro")
        dataColleague.finalValue    = hAPI.getCardValue("pacoteiro")

        var retDts = getColleague(dataColleague)

        dataSolic.email     = retDts.getValue(0, 'mail');
        dataSolic.name      = retDts.getValue(0, 'colleagueName')
        dataSolic.situation = 'Aprovação Pacoteiro - Solicitação de Projetos'
        dataSolic.message   = "A solicitação de projeto n° " + numProcess + " foi encaminhada para você aprovar. Clique em Tarefa para análise para aprovar/reprovar a solicitação."
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }

    if(proxAtividade == 65){
        dataSolic.name      = hAPI.getCardValue("txt_solicitante")
        dataSolic.email     = hAPI.getCardValue("txt_email_solicitante")
        dataSolic.situation = 'Solicitação aprovada com sucesso'
        dataSolic.message   = "A sua solicitação de projeto foi aprovada com sucesso!"
        dataSolic.params    = "CABECALHO##Solicitação de Projetos;;NOME##"+ dataSolic.name+ ";;MENSAGEM##"+ dataSolic.message +";;BOTAO##" + dataSolic.button + ";;RODAPE##<div style='width: 100%; text-align: center;'>Mensagem Automática</div>"
        sendEmail(dataSolic)
    }

}

function sendEmail(paramsSendEmail){
    var c1 = DatasetFactory.createConstraint('EMAIL',       paramsSendEmail.email,      paramsSendEmail.email,      ConstraintType.MUST)
    var c2 = DatasetFactory.createConstraint('ASSUNTO',     paramsSendEmail.situation,  paramsSendEmail.situation,  ConstraintType.MUST)
    var c3 = DatasetFactory.createConstraint('TEMPLATE',    "templateEmailOba",         "templateEmailOba",         ConstraintType.MUST)
    var c4 = DatasetFactory.createConstraint('PARAMETROS',  paramsSendEmail.params,     paramsSendEmail.params,     ConstraintType.MUST)
    
    var ds = DatasetFactory.getDataset("ds_sendEmail", null, [c1, c2, c3, c4], null)
}

function getColleague(paramGetCollegue){
    var c1 = DatasetFactory.createConstraint(paramGetCollegue.fieldName, paramGetCollegue.initialValue, paramGetCollegue.finalValue, ConstraintType.MUST)
    var dts_user = DatasetFactory.getDataset('colleague', null, [c1], null)

    return dts_user
}