function validateForm(form){
	var msg = "";

    if(form.getValue("dataVencimento") == "") {
        msg += "Campo Data de Vencimento não foi preenchido.<br>";
    }

    if(form.getValue("filial") == null || form.getValue("filial") == "") {
        msg += "Campo Filial não foi informado.<br>";
    }

    if(form.getValue("depto") == 0) {
        msg += "Campo Departamento Emitente não foi preenchido.<br>";
    }

    if(form.getValue("centroCusto") == null || form.getValue("centroCusto") == "") {
        msg += "Campo Centro de Custo não foi selecionado.<br>"
    }

    if (form.getValue("pagamento") == "") {
        msg += "Campo Tipo de Pagamento não foi selecionado.<br>"
    }
    if (form.getValue("email") == "") {
        msg += "Campo Email não foi preenchido.<br>"
    }
    if (form.getValue("telefone") == "") {
        msg += "Campo Telefone não foi preenchido.<br>"
    }
    if (form.getValue("ramal") == "") {
        msg += "Campo Ramal não foi preenchido.<br>"
    }
    if (form.getValue("cep") == "") {
        msg += "Campo CEP não foi preenchido.<br>"
    }
    if (form.getValue("endereco") == "") {
        msg += "Campo Endereço não foi preenchido.<br>"
    }
    if (form.getValue("cidade") == "") {
        msg += "Campo Cidade não foi preenchido.<br>"
    }
    if (form.getValue("estado") == "") {
        msg += "Campo Estado não foi preenchido.<br>"
    }


    if(form.getValue("cnpj") == "") {
        msg += "Campo CNPJ/CPF não foi preenchido.<br>";
    }
    

    if(form.getValue("razaoSocial") == "") {
        msg += "Campo Razão Social não foi selecionado.<br>";
    }

    if(form.getValue("banco") == "") {
        msg += "Campo Banco não foi preenchido.<br>";
    }

    if(form.getValue("tipoConta") == "") {
        msg += "Campo Tipo de Conta não foi preenchido.<br>";
    }

    if(form.getValue("conta") == "") {
        msg += "Campo Conta não foi preenchido.<br>";
    }

    if(form.getValue("Agencia") == "") {
        msg += "Campo Agência não foi preenchido.<br>";
    }

    if(form.getValue("informacoes") == "") {
        msg += "Campo Observações/Histórico não foi preenchido.<br>";
    }

    if(form.getValue("nf") == "") {
		msg += "Campo anexo não foi preenchido..<br>";
	}

    if(form.getValue("dataReferencia") == "") {
		msg += "Campo Data de Referência não foi preenchido.<br>";
	}

    if(form.getValue("valorNF") == "") {
		msg += "Campo Valor Total da NF não foi preenchido.<br>";
	}

    if(form.getValue("numeroNF") == "") {
		msg += "Campo Número da NF não foi preenchido.<br>";
	}

    var tabelaSolicitacao = form.getChildrenIndexes('itensTabela');

    if (tabelaSolicitacao.length == 0) {
        msg += "Campo Itens da Solicitação não foi informado."
    }

    if(msg != "") {
        throw msg;
    }
}
