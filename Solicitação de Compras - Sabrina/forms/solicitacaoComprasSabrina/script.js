    var calendarioDataVencimento = FLUIGC.calendar('#dataVencimento');
    var calendarioDataReferencia = FLUIGC.calendar('#dataReferencia');

    function dataAtual() {
    var data = new Date();
    var dia  = data.getDate();
    var mes  = data.getMonth() + 1;
    var ano  = data.getFullYear();

    dia  = (dia<=9 ? "0"+dia : dia);
    mes  = (mes<=9 ? "0"+mes : mes);

    var newData = dia+"/"+mes+"/"+ano;

    return newData;
    } // dataAtual

    $("#dataEmissao").val(dataAtual);

    function setSelectedZoomItem(selectedItem) {     
    var inputId = selectedItem.inputId;
    var id = selectedItem.inputId.replace("produto", ""); // -> __1
        
    $("#descricao" + id).val(selectedItem.Descricao);
    $("#unMedida" + id).val(selectedItem.unMedida);
    $("#vlTotal" + id).val(selectedItem.vlUnit);
    $("#vlUnit" + id).val(selectedItem.vlUnit);
    $("#quantidade" + id).val(1);
    window["CentroCusto2" + id].setValue(selectedItem.centrodeCusto);
    var calendarioNecessidade = FLUIGC.calendar('#necessidade' + id);

    $("#quantidade" + id).on("blur", (e) => {
        var quantidade = parseInt($("#quantidade" + id).val());
        var valor = parseInt($("#vlUnit" + id).val());
        console.log(selectedItem.vlUnit);
        console.log(quantidade);

        $("#vlTotal" + id).val(valor * quantidade);

        var real = (valor * quantidade).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    });
    }

    function removedZoomItem(removedItem) {
    var inputId = removedItem.inputId;
    var id = removedItem.inputId.replace("produto", "");

    $("#descricao" + id).val("");
    $("#unMedida" + id).val("");
    $("#vlTotal" + id).val("");
    $("#vlUnit" + id).val("");
    $("#quantidade" + id).val("");
    $("#centrodeCusto" + id).val("");
    }

    function upload() {
    JSInterface.showCamera("nf.pdf");
    }

    function aprovacao1() {
    var myModal = FLUIGC.modal({
    title: 'Atenção:',
    content: '<p>Você tem certeza que deseja APROVAR essa compra?</p>',
    id: 'fluig-modal',
    actions: [{
        'label': 'Sim',
        'bind': 'data-open-modal',
        'autoClose': true
    },{
        'label': 'Não',
        'autoClose': true
    }]
    });

    }

    function aprovacao2() {
    var myModal = FLUIGC.modal({
    title: 'Atenção:',
    content: '<p>Você tem certeza que deseja REPROVAR essa compra?</p>',
    id: 'fluig-modal',
    actions: [{
        'label': 'Sim',
        'bind': 'data-open-modal',
        'autoClose': true
    },{
        'label': 'Não',
        'autoClose': true
    }]
    });
    }

    $("#simGestor").click(function(){
    $("#aprovaGestor").val("Sim");
    })

    $("#naoGestor").click(function(){
    $("#aprovaGestor").val("Não");
    }) 

    $("#simRH").click(function(){
    $("#aprovaRH").val("Sim");
    })

    $("#naoRH").click(function(){
    $("#aprovaRH").val("Não");
    }) 

    $(document).ready(()=>{ //quando o doc estiver pronto
    let user = $("#matSolicitante").val(); //armazenando o valor da matricula
    var ds = DatasetFactory.getDataset("colleague", null, [ //peggando no dataset a colleague
        DatasetFactory.createConstraint("login", user, user, ConstraintType.MUST) //criando uma constraint, onde sera buscado somente um login especifico
    ], null).values[0];

    $("#solicitante").val(ds.colleagueName); // para aparecer somente o nome do solicitante

    })

    function excluirBotao() {
    $(".excluir").hide();
    }