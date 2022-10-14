$(document).ready(function () {
    carregarDados();
});

function carregarDados() {
    $.ajax({
        url: "Imoveis/GetAll",
        method: "GET",
        success: function (imoveis) {
            montarTabela(imoveis);
        }
    });
}

$(".novoImovel").click(function () {
    escolherTituloModal("Cadastrar novo imóvel");
    mostrarModal();
    limparForm();

    $('.imovelId').val(0);
});

function montarTabela(imoveis) {
    var indice = 0;
    var divTabelaImovel = document.getElementById("divTabelaImovel");
    var tabela = '<table class="table table-sm table-hover table-striped MontarTabelaPaginada tabela">';
    tabela += '<thead>';
    tabela += '<tr>';
    tabela += '<th>Código</th>';
    tabela += '<th>Cliente</th>';
    tabela += '<th>Cidade</th>';
    tabela += '<th>Bairro</th>';
    tabela += '<th>Rua</th>';
    tabela += '<th>Número</th>';
    tabela += '<th>Complemento</th>';
    tabela += '<th>Ações</th>';
    tabela += '</tr>';
    tabela += '</thead>';
    tabela += '<tbody>';

    for (indice = 0; indice < imoveis.length; indice++) {
        tabela += `<tr id="${imoveis[indice].imovelId}">`;
        tabela += `<td>${imoveis[indice].imovelId}</td>`;
        tabela += `<td>${imoveis[indice].clienteId}</td>`;
        tabela += `<td>${imoveis[indice].cidade}</td>`;
        tabela += `<td>${imoveis[indice].bairro}</td>`;
        tabela += `<td>${imoveis[indice].rua}</td>`;
        tabela += `<td>${imoveis[indice].numero}</td>`;
        tabela += `<td>${imoveis[indice].complemento}</td>`;
        tabela += `<td><button class="btn btn-sm btn-outline-info" onclick="pegarImovelId(${imoveis[indice].imovelId})">Atualizar</button> |
                                    <button class="btn btn-sm btn-outline-danger" onclick="excluirImovel(${imoveis[indice].imovelId})">Excluir</button></td>`;
        tabela += `</tr>`;
    }
    tabela += '</tbody>';
    tabela += '</table>';

    divTabelaImovel.innerHTML = tabela;
    $('.MontarTabelaPaginada').DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.12.1/i18n/pt-BR.json"
        },
        "pageLength": 25
    });
}

function escolherTituloModal(texto) {
    $(".modal-title").text(texto);
}

function mostrarModal() {
    new bootstrap.Modal($("#modalImovel"), {}).show();
}

function mostrarModalConfirma(imovelId) {
    new bootstrap.Modal($("#modalConfirma"), {}).show();
    var botoes = `<button type="button" class="btn btn-primary" onclick="confirmaExcluir(${imovelId})">Confirmar</button>`;
    botoes += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>';

    var modalconfirma = document.getElementById("modalFooter");

    modalconfirma.innerHTML = botoes;
}

function excluirImovel(imovelId) {
    escolherTituloModal(`Deseja realmente excluir o imovel ${imovelId}`);
    mostrarModalConfirma(imovelId);
}

function limparForm() {
    $(".clienteId").val('');
    $(".clienteId").removeClass('is-valid');
    $(".cidade").val('');
    $(".cidade").removeClass('is-valid');
    $(".bairro").val('');
    $(".bairro").removeClass('is-valid');
    $(".rua").val('');
    $(".rua").removeClass('is-valid');
    $(".numero").val('');
    $(".numero").removeClass('is-valid');
    $(".complemento").val('');
    $(".complemento").removeClass('is-valid');
}

$(".btnSalvar").click(function () {
    var imovel = {
        imovelId: $('.imovelId').val(),
        clienteId: $('.clienteId').val(),
        cidade: $('.cidade').val(),
        bairro: $('.bairro').val(),
        rua: $('.rua').val(),
        numero: $('.numero').val(),
        complemento: $('.complemento').val(),
        
    }

    if (validarFormulario(imovel)) {
        if (parseInt(imovel.imovelId) > 0) {
            atualizarImovel(imovel)
        } else
            cadastrarImovel(imovel);
    }
});

function cadastrarImovel(imovel) {
    $.ajax({
        url: "Imoveis/NovoImovel",
        method: 'POST',
        data: {
            imovel: imovel
        },
        success: function (imovelCadastrado) {
            $("#modalImovel").modal('hide');
            var linhaNovoImovel = `<tr id="${imovelCadastrado.imovelId}">`;
            linhaNovoImovel += `<td>${imovelCadastrado.imovelId}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.clienteId}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.cidade}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.bairro}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.rua}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.numero}</td>`;
            linhaNovoImovel += `<td>${imovelCadastrado.complemento}</td>`;
            linhaNovoImovel += `<td><button class="btn btn-sm btn-outline-info" onclick="pegarImovelId(${imovelCadastrado.imovelId})">Atualizar</button> |
                               <button class="btn btn-sm btn-outline-danger" onclick="excluirImovel(${imovelCadastrado.imovelId})">Excluir</button></td>`;
            linhaNovoImovel += `</tr>`;

            $(".tabela tbody").append(linhaNovoImovel);
            limparForm();
        }
    });
}

function pegarImovelId(imovelId) {
    $.ajax({
        url: "Imoveis/BuscarImovelId",
        method: 'GET',
        data: {
            imovelId: imovelId
        },
        success: function (imovel) {
            mostrarModal();
            escolherTituloModal(`Atualizar imovel ${imovel.nome}`);
            $(".imovelId").val(imovel.imovelId);
            $(".clienteId").val(imovel.clienteId);
            $(".cidade").val(imovel.cidade);
            $(".bairro").val(imovel.bairro);
            $(".rua").val(imovel.rua);
            $(".numero").val(imovel.numero);
            $(".complemento").val(imovel.complemento);
        }
    });
}

function atualizarImovel(imovel) {
    $.ajax({
        url: "Imoveis/AtualizarImovel",
        method: 'PUT',
        data: {
            imovel: imovel
        },
        success: function (imovelAtualizado) {
            $("#modalImovel").modal('hide');

            var linhaTabela = $(`#${imovelAtualizado.imovelId}`);
            linhaTabela[0].childNodes[0].innerText = imovelAtualizado.imovelId;
            linhaTabela[0].childNodes[1].innerText = imovelAtualizado.clienteId;
            linhaTabela[0].childNodes[2].innerText = imovelAtualizado.cidade;
            linhaTabela[0].childNodes[3].innerText = imovelAtualizado.bairro;
            linhaTabela[0].childNodes[4].innerText = imovelAtualizado.rua;
            linhaTabela[0].childNodes[5].innerText = imovelAtualizado.numero;
            linhaTabela[0].childNodes[6].innerText = imovelAtualizado.complemento;

            limparForm();
        }
    })
}

function confirmaExcluir(imovelId) {
    $.ajax({
        url: "Imoveis/ExcluirImovel",
        method: 'DELETE',
        data: {
            imovelId: imovelId
        },
        success: function (status) {
            if (status) {
                $("#modalConfirma").modal('hide');
                alert("Imovel excluído com sucesso");
                document.getElementById(imovelId).remove();
            }
            else
                alert(status.messagem);
        }
    });
}

function validarFormulario(imovel) {
    let clienteValido = validarCliente(imovel.clienteId);
    let cidadeValida = validarCidade(imovel.cidade);
    let bairroValido = validarBairro(imovel.bairro);
    let ruaValida = validarRua(imovel.rua);
    let numeroValido = validarNumero(imovel.numero);

    if (clienteValido == true && cidadeValida == true && bairroValido == true && ruaValida == true && numeroValido == true)
        return true;
    return false
}

function validarCliente(clienteId) {
    // // TODO - GetById no cliente para verificar se existe um cliente com esse id
    return true;
}

function validarCidade(cidade) {
    let cidadeValida = true;

    if (cidade.trim() == '' || cidade == undefined) {
        $(".cidade").addClass('is-invalid');
        $(".erroCidade").text("Preencha a cidade");
        $(".erroCidade").removeClass("d-none");

        cidadeValida = false;
    }
    else if (cidade.length < 2) {
        $(".cidade").addClass('is-invalid');
        $(".erroCidade").text("Insira uma cidade válida");
        $(".erroCidade").removeClass("d-none");

        bairroValido = false;
    }
    else {
        $(".cidade").removeClass('is-invalid');
        $(".cidade").addClass('is-valid');
        $(".erroCidade").addClass("d-none");

        cidadeValida = true;
    }

    return cidadeValida;
}

function validarBairro(bairro) {
    let bairroValido = true;

    if (bairro.trim() == '' || bairro == undefined) {
        $(".bairro").addClass('is-invalid');
        $(".erroBairro").text("Preencha o bairro");
        $(".erroBairro").removeClass("d-none");

        bairroValido = false;
    }
    else if (bairro.length < 2) {
        $(".bairro").addClass('is-invalid');
        $(".erroBairro").text("Insira um bairro válido");
        $(".erroBairro").removeClass("d-none");

        bairroValido = false;
    }
    else {
        $(".bairro").removeClass('is-invalid');
        $(".bairro").addClass('is-valid');
        $(".erroBairro").addClass("d-none");

        bairroValido = true;
    }

    return bairroValido;
}

function validarRua(rua) {
    let ruaValida = true;

    if (rua.trim() == '' || rua == undefined) {
        $(".rua").addClass('is-invalid');
        $(".erroRua").text("Preencha o bairro");
        $(".erroRua").removeClass("d-none");

        bairroValido = false;
    }
    else if (rua.length < 2) {
        $(".rua").addClass('is-invalid');
        $(".erroRua").text("Insira uma rua válida");
        $(".erroRua").removeClass("d-none");

        ruaValida = false;
    }
    else {
        $(".rua").removeClass('is-invalid');
        $(".rua").addClass('is-valid');
        $(".erroRua").addClass("d-none");

        ruaValida = true;
    }

    return ruaValida;
}

function validarNumero(numero) {
    let numeroValido = true;

    if (numero == '' || numero == undefined) {
        $(".numero").addClass('is-invalid');
        $(".erroNumero").text("Preencha o número");
        $(".erroNumero").removeClass("d-none");

        numeroValido = false;
    }
    else {
        $(".numero").removeClass('is-invalid');
        $(".numero").addClass('is-valid');
        $(".erroNumero").addClass("d-none");

        numeroValido = true;
    }

    return numeroValido;
}