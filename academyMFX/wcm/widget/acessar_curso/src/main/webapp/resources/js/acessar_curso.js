var MyWidget = SuperWidget.extend({
    variavelNumerica: null,
    variavelCaracter: null,

    init: function() {
    },
  
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

function openWindow(id){
    window.open(WCMAPI.getTenantURL() + '/cadastro_curso_mfx_academy_sr', '_self')
}