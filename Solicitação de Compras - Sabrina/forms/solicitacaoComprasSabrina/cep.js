$("#cep").blur(function() {
    $.getJSON("//viacep.com.br/ws/" + $("#cep").val() + "/json/", function(dados) {
        $("#endereco").val(dados.logradouro);
        $("#cidade").val(dados.localidade);
        $("#estado").val(dados.uf);
    })

    .done(function (data) {
        if(data.erro) {
          limpa_formulário_cep();

          FLUIGC.toast({
            message: "CEP inválido",
            type: "danger"
          });
          setTimeout(() => {
            $("#toaster").remove();
          }, 3500);
          return false;
        }
        FLUIGC.toast({
            message: 'CEP válido',
            type: 'success'
        });
        setTimeout(() => { $("#toaster").remove() }, 3500)
        return false;
    })

    .fail(function () {
        limpa_formulário_cep();

        FLUIGC.toast({
          message: "CEP inválido",
          type: "danger"
        });
        setTimeout(() => {
          $("#toaster").remove();
        }, 3500);
        return false;
    })

    .always(function () {
      console.log("Função finalizada");
    });
});

function limpa_formulário_cep() {
    // Limpa valores do formulário de cnpj.
    $("#endereco").val("");
    $("#cidade").val("");
    $("#estado").val("");
}
