function displayFields(form,customHTML){

    var atividadeAtual = getValue("WKNumState");
    var user = getValue("WKUser");

    form.setValue("matSolicitante", user)

    form.setVisibleById("aprovacaoGestor", false);
    form.setVisibleById("aprovacaoRH", false);
    form.setVisibleById("notificar", false);
    form.setVisibleById("notificarErro", false);
    form.setVisibleById("nf", true);
    form.setVisibleById("adiciona", true);

    if(atividadeAtual == 2) {
        form.setVisibleById("aprovacaoGestor", true);
        form.setVisibleById("nf", false);
        form.setVisibleById("adiciona", false);
        customHTML.append('<script>$(function () { excluirBotao(); });</script>');
    } else if(atividadeAtual == 13) {
        form.setVisibleById("aprovacaoRH", true);
        form.setVisibleById("nf", false);
        form.setVisibleById("adiciona", false);
        customHTML.append('<script>$(function () { excluirBotao(); });</script>');
    } else if (atividadeAtual == 31) {
        form.setVisibleById("notificar", true);
        form.setVisibleById("nf", false);
        form.setVisibleById("adiciona", false);
        customHTML.append('<script>$(function () { excluirBotao(); });</script>');
    } else if (atividadeAtual == 9) {
        form.setVisibleById("notificarErro", true);
        form.setVisibleById("nf", false);
        form.setVisibleById("adiciona", false);
        customHTML.append('<script>$(function () { excluirBotao(); });</script>');
    } 
}