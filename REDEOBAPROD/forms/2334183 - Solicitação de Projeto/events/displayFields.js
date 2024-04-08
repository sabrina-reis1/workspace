function displayFields(form,customHTML){
    var atividade = getValue("WKNumState");
    var user = getValue("WKUser");
    
    form.setValue('numAtividade', atividade);
    form.setValue('login_user', getValue("WKUser"));
    form.setValue('hd_userEmail', fluigAPI.getUserService().getCurrent().getEmail());
    
    if(atividade == 15 || atividade == 0){
        form.setVisibleById("painelChat", false);
        form.setVisibleById("painelAprovacao", false);
        form.setVisibleById("tabelaAnexosGerente", false);
    }
    if(atividade == 43){
        form.setVisibleById("btnAddAnexo", false);
        form.setVisibleById("painelObservacoes", false);
    }
    if(atividade == 46 || atividade == 49){
        form.setVisibleById("painelObservacoes", false);
    }
    if(atividade == 52){
        form.setVisibleById("painelObservacoes", false);
    }    
    if(atividade == 57){
        form.setVisibleById("tabelaAnexosGerente", false);
        form.setVisibleById("painelAprovacao", false);
        form.setVisibleById("btnAddAnexo", false);
    }
    if(atividade == 65 || atividade == 9 || atividade == 7 || atividade == 14 || atividade == 11){
        form.setVisibleById("btnAddAnexo", false);
        form.setVisibleById("btnAddAnexoGerente", false);
        form.setVisibleById("painelObservacoes", false);
        form.setVisibleById("painelAprovacao", false);
    }
    customHTML.append("<script>function getUsuario(){ return '" +  user + "'; }</script>");
}
