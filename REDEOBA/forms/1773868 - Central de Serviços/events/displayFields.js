function displayFields(form,customHTML){ 

    var processId = getValue("WKNumProces");
    
    var user = getValue("WKUser");
    var state =  getValue("WKNumState");
    // user = 'hq4gjqjx6x9gl2bt1560169781141'
    var esconder = [];
    // form.setValue("hd_cod_processo", processId);
    form.setValue("hd_cod_atividade", state);

    if(state == 0 || state == 3){
       esconder.push(
            'dias_abertos', 'prioridade', 'dados_solic', 'row_chat', 'row_avaliacao', 'classificacao', 'suporte', 'avaliacao', 'inicio-success',
            'classificacao-warning', 'classificacao-success', 'suporte-warning', 'suporte-success', 'avaliacao-warning', 'avaliacao-success'
       )
    }else if( state == 4){
        form.setValue('txt_tarefa_numSolic', processId)
        esconder.push( 
            'dias_abertos', 'row_chat', 'row_avaliacao', 'solicitacao', 'suporte', 'avaliacao', 'prox_atividade', 'inicio-warning',
            'classificacao-success', 'suporte-warning', 'suporte-success', 'avaliacao-warning', 'avaliacao-success'
        )
        
    }else if(state == 6 || state == 8 || state == 10){
        form.setValue('txt_tarefa_numSolic', processId)
        esconder.push(
            'row_avaliacao', 'solicitacao', 'classificacao', 'avaliacao', 
            'inicio-warning', 'classificacao-warning', 'suporte-success', 'avaliacao-warning', 'avaliacao-success'
        )
        
    }else if(state == 12){
        esconder.push(
            'dias_abertos', 'solicitacao', 'classificacao', 'suporte', 'row_inicia_conversa',
            'inicio-warning', 'classificacao-warning', 'suporte-warning', 'avaliacao-success'
        )
        
    }else if(state == 16){
        esconder.push(
            'dias_abertos', 'avaliacao', 'classificacao', 'suporte', 'row_inicia_conversa',
            'inicio-warning', 'classificacao-warning', 'suporte-warning', 'avaliacao-warning'
        )
        
    }
    
    // if(state == 6){
    //     var data_atual = geraData()
    //     form.setValue('hd_dta_entrada', data_atual)
    // }
    for(var i=0; i< esconder.length;i++){
		form.setVisibleById(esconder[i],false);
	}
    customHTML.append("<script>function getUsuario(){ return '" +  user + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + state + "; }</script>");
    customHTML.append("<script>var FORM_MODE = '" + form.getFormMode() + "'</script>");
}
function geraData(){
    // Buscar a data e hora atual
    var data   = new Date();
    var dia    = data.getDate();
    var mes    = data.getMonth() + 1;
    var ano    = data.getFullYear();
    var hora   = data.getHours();
    var min    = data.getMinutes();
    var seg    = data.getSeconds();
  
    if(dia < 10) {dia = "0" + dia;}
    if(mes < 10) {mes = "0" + mes;}
    if(hora < 10){hora = "0" + hora;}
    if(min < 10) {min = "0" + min;}
    if(seg < 10) {seg = "0" + seg;}
  
    return dia + '/' +mes+ '/' +ano+' - '+hora+ ':' +min;
}


