<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
    <div class="panel-body" style="margin-left: 100px; margin-right: 100px;">
        <div id="cadastroCurso" class="panel-custom">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                    class="panel-icon"> Cadastro de Curso </h2>
                <hr>
            </div>
            <div class="panel-body">
                <div class='row'>
                    <div class='col-md-2'>
                    <input type="hidden" id="hd_edit" value="false">
                        <label for='idCurso'>ID</label>
                        <input type='number' class='form-control' id='idCurso' name='idCurso' maxlength="4"/>
                    </div>
                    <div class='col-md-5'>
                        <label for='nomeCurso'>Nome do curso</label>
                        <input type='text' class='form-control' id='nomeCurso' name='nomeCurso' placeholder="Full Stack 2 - Quarta-Feira" />
                    </div>
                    <div class='col-md-5'>
                        <label for='cargaHoraria'>Carga Horária</label>
                        <input type='text' class='form-control' id='cargaHoraria' name='cargaHoraria' mask="00000"/>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6'>
                        <label for='valorCurso'>Valor do curso</label>
                        <input type='text' class='form-control' id='valorCurso' name='valorCurso' onInput="mascaraMoeda(event);"/>
                    </div>
                    <div class='col-md-6'>
                        <label for='valorMatricula'>Valor Matrícula</label>
                        <input type='text' class='form-control' id='valorMatricula' name='valorMatricula' onInput="mascaraMoeda(event);"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel-custom" id="cadastroTurma">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                        class="panel-icon"> Cadastro de Turma </h2>
                        <hr>
            </div>
            <div class="panel-body">
                <div id='lista_produtos'>
                </div>
                <div class="row row-center">
                    <div class="row-center" onclick="adicionarTurma()">
                        <div class='circle'>
                            <img src='/cadastro_curso_mfx_academy/resources/images/flaticon-add-plus.png'>
                        </div>
                        <div class='div-element-center'>
                            <label>Adicionar Turma</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="cadastroModulos" class="panel-custom">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                        class="panel-icon"> Cadastro de Módulos </h2>
                        <hr>
            </div>
            <div class="panel-body">
                <div id='lista_produtos1'>
                </div>
                <div class="row row-center">
                    <div class="row-center" onclick="adicionarModulo()">
                        <div class='circles'>
                            <img src='/cadastro_curso_mfx_academy/resources/images/flaticon-add-plus.png'>
                        </div>
                        <div class='div-element-center'>
                            <label>Adicionar Módulo</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="cadastroPagamento" class="panel-custom">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                        class="panel-icon"> Cadastro de Formas de Pagamento </h2>
                        <hr>
            </div>
            <div class="panel-body">
                <div id='lista_produtos2'>
                </div>
                <div class="row row-center">
                    <div class="row-center" onclick="adicionarPagamento()">
                        <div class='circles'>
                            <img src='/cadastro_curso_mfx_academy/resources/images/flaticon-add-plus.png'>
                        </div>
                        <div class='div-element-center'>
                            <label>Adicionar Forma de Pagamento</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <#--  <div id="cadastroDataPagamento" class="panel-custom">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                        class="panel-icon"> Cadastro de Data de Pagamento </h2>
                        <hr>
            </div>
            <div class="panel-body">
                <div id='lista_produtos3'>
                </div>
                <div class="row row-center">
                    <div class="row-center" onclick="adicionarDataPagamento()">
                        <div class='circles'>
                            <img src='/cadastro_curso_mfx_academy/resources/images/flaticon-add-plus.png'>
                        </div>
                        <div class='div-element-center'>
                            <label>Adicionar Data de Pagamento</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>  -->

        <div id="cadastroMensalidade" class="panel-custom">
            <div class="panel-heading">
                <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/cadastro.png" alt="Cadastro"
                        class="panel-icon"> Cadastro de Mensalidade </h2>
                        <hr>
            </div>
            <div class="panel-body">
                <div class='row'>
                    <div class='col-md-2'>
                        <label for="parcelas">QT de Parcelas</label>
                        <input type="number" name="parcelas" id="parcelas" class="form-control">
                    </div>
                    <div class='col-md-10'>
                        <label for="valorMensal">Valor Mensal</label>
                        <input type="text" name="valorMensal" id="valorMensal" class="form-control" readonly>
                    </div>
                    <#--  <div class='col-md-4'>
                        <label for="formaPagamento">Forma de Pagamento</label>
                        <input type="text" name="formaPagamento" id="formaPagamento" class="form-control" placeholder="Cartão de Crédito">
                    </div>  -->
                </div>
            </div>
        </div>
        <div class="row row-center">
            <div class="row-center">
                <div class='div-element-center'>
                    <button class="btn btn-success" onclick="salvarCurso()">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    
    <div id="buscarCadastro" class="panel-custom">
        <div class="panel-heading">
            <h2 class="panel-title"><img src="/cadastro_curso_mfx_academy/resources/images/buscarCadastro.png" alt="Cadastro"
               class="panel-icon"> Buscar Cadastro </h2>
                <input type="hidden" id="hd_documentIdCurso" value="">
                <input type="hidden" id="hd_documentIdTurma" value="">
                <input type="hidden" id="hd_documentIdModulo" value="">
                <input type="hidden" id="hd_documentIdPagamento" value="">
                <#--  <input type="hidden" id="hd_documentIdDataPagamento" value="">  -->
            <hr>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class='col-md-4'>
                    <label for="buscarCursoCampo">Buscar Curso</label>
                    <input type="text" id="buscarCursoCampo" class="form-control" onchange="search(this.value)" placeholder="Nome do curso" style="border-radius: 20px; heigth: 30px; width: auto;">
                </div>
            </div>
            <div id="buscarCurso" style="overflow-y:auto !important; height: 450px !important;"></div>
        </div>
    </div>

    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

<#--  <div class='col-md-1'>
                          <div onclick="remover(this)" style=" position: absolute;  right:calc(100vw - 2240px); top: 7px; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/trash.png" alt="lixeira" class="panel-icon"></div>
                        </div>
                        <div class='col-md-1'>
                          <div onclick="editar(this)" style=" position: absolute; right: calc(100vw - 2135px); top: 7px; background-color: transparent;"><img src="/cadastro_curso_mfx_academy/resources/images/akar-icons_edit.png" alt="editar" class="panel-icon"></div>
                        </div>  -->