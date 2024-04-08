$("#cnpj").blur(function () {
  $.getJSON(
    "https://publica.cnpj.ws/cnpj/" + $("#cnpj").val().replace(/\D/g, ""),
    function (dados) {
      $("#razaoSocial").val(dados.razao_social);
    }
  )

    .done(function (dados) {
        $("#razaoSocial").val(dados.razao_social);
        
        FLUIGC.toast({
        message: "CNPJ válido",
        type: "success"
        });
        setTimeout(() => {
        $("#toaster").remove();
        }, 3500);
        return false;
    })

    .fail(function () {
        limpa_formulário_cnpj();

        FLUIGC.toast({
          message: "CNPJ inválido",
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

function limpa_formulário_cnpj() {
  // Limpa valores do formulário de cnpj.
  $("#razaoSocial").val("");
}
