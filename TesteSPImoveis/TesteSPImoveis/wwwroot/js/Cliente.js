$(document).ready(function () {
    carregarDados();
});

function carregarDados() {
    $.ajax({
        url: "Clientes/GetAll",
        method: "GET",
        success: function (clientes) {
            montarTabela(clientes);
        }
    });
}

$(".novoCliente").click(function () {
    escolherTituloModal("Cadastrar novo cliente");
    mostrarModal();
    limparForm();

    $('.clienteId').val(0);
});

function montarTabela(clientes) {
    var indice = 0;
    var divTabelaCliente = document.getElementById("divTabelaCliente");
    var tabela = '<table class="table table-sm table-hover table-striped MontarTabelaPaginada tabela">';
    tabela += '<thead>';
    tabela += '<tr>';
    tabela += '<th>Código</th>';
    tabela += '<th>Nome</th>';
    tabela += '<th>Email</th>';
    tabela += '<th>Telefone</th>';
    tabela += '<th>Data</th>';
    tabela += '<th>Ações</th>';
    tabela += '</tr>';
    tabela += '</thead>';
    tabela += '<tbody>';

    for (indice = 0; indice < clientes.length; indice++) {
        tabela += `<tr id="${clientes[indice].clienteId}">`;
        tabela += `<td>${clientes[indice].clienteId}</td>`;
        tabela += `<td>${clientes[indice].nome}</td>`;
        tabela += `<td>${clientes[indice].email}</td>`;
        tabela += `<td>${clientes[indice].telefone}</td>`;
        tabela += `<td>${clientes[indice].data}</td>`;
        tabela += `<td><button class="btn btn-sm btn-outline-info" onclick="pegarClienteId(${clientes[indice].clienteId})">Atualizar</button> |
                                    <button class="btn btn-sm btn-outline-danger" onclick="excluirCliente(${clientes[indice].clienteId})">Excluir</button></td>`;
        tabela += `</tr>`;
    }
    tabela += '</tbody>';
    tabela += '</table>';

    divTabelaCliente.innerHTML = tabela;
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
    new bootstrap.Modal($("#modalCliente"), {}).show();
}

function mostrarModalConfirma(clienteId) {
    new bootstrap.Modal($("#modalConfirma"), {}).show();
    var botoes = `<button type="button" class="btn btn-primary" onclick="confirmaExcluir(${clienteId})">Confirmar</button>`;
    botoes += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>';

    var modalconfirma = document.getElementById("modalFooter");

    modalconfirma.innerHTML = botoes;
}

function excluirCliente(clienteId) {
    escolherTituloModal(`Deseja realmente excluir o cliente ${clienteId}`);
    mostrarModalConfirma(clienteId);
}

function limparForm() {
    $(".nome").val('');
    $(".nome").removeClass('is-valid');
    $(".email").val('');
    $(".email").removeClass('is-valid');
    $(".telefone").val('');
    $(".telefone").removeClass('is-valid');
    $(".data").val('');
    $(".dataCadastro").removeClass('is-valid');
}

$(".btnSalvar").click(function () {
    var cliente = {
        clienteId: $('.clienteId').val(),
        nome: $('.nome').val(),
        email: $('.email').val(),
        telefone: $('.telefone').val(),
        data: $('.dataCadastro').val(),
    }

    if (validarFormulario(cliente)) {
        if (parseInt(cliente.clienteId) > 0) {
            atualizarCliente(cliente)
        } else
            cadastrarCliente(cliente);
    }
});

function cadastrarCliente(cliente) {
    $.ajax({
        url: "Clientes/NovoCliente",
        method: 'POST',
        data: {
            cliente: cliente
        },
        success: function (clienteCadastrado) {
            $("#modal").modal('hide');
            var linhaNovoCliente = `<tr id="${clienteCadastrado.clienteId}">`;
            linhaNovoCliente += `<td>${clienteCadastrado.clienteId}</td>`;
            linhaNovoCliente += `<td>${clienteCadastrado.nome}</td>`;
            linhaNovoCliente += `<td>${clienteCadastrado.email}</td>`;
            linhaNovoCliente += `<td>${clienteCadastrado.telefone}</td>`;
            linhaNovoCliente += `<td>${clienteCadastrado.data}</td>`;
            linhaNovoCliente += `<td><button class="btn btn-sm btn-outline-info" onclick="pegarClienteId(${clienteCadastrado.clienteId})">Atualizar</button> |
                               <button class="btn btn-sm btn-outline-danger" onclick="excluirCliente(${clienteCadastrado.clienteId})">Excluir</button></td>`;
            linhaNovoCliente += `</tr>`;

            $(".tabela tbody").append(linhaNovoCliente);
            limparForm();
        }
    });
}

function pegarClienteId(clienteId) {
    $.ajax({
        url: "Clientes/BuscarClienteId",
        method: 'GET',
        data: {
            clienteId: clienteId
        },
        success: function (cliente) {
            mostrarModal();
            escolherTituloModal(`Atualizar cliente ${cliente.nome}`);
            $(".clienteId").val(cliente.clienteId);
            $(".nome").val(cliente.nome);
            $(".email").val(cliente.email);
            $(".telefone").val(cliente.telefone);
            $(".dataCadastro").val(cliente.data);
        }
    });
}

function atualizarCliente(cliente) {
    $.ajax({
        url: "Clientes/AtualizarCliente",
        method: 'PUT',
        data: {
            cliente: cliente
        },
        success: function (clienteAtualizado) {
            $("#modal").modal('hide');

            var linhaTabela = $(`#${clienteAtualizado.clienteId}`);
            linhaTabela[0].childNodes[0].innerText = clienteAtualizado.clienteId;
            linhaTabela[0].childNodes[1].innerText = clienteAtualizado.nome;
            linhaTabela[0].childNodes[2].innerText = clienteAtualizado.email;
            linhaTabela[0].childNodes[3].innerText = clienteAtualizado.telefone;
            linhaTabela[0].childNodes[4].innerText = clienteAtualizado.data;

            limparForm();
        }
    })
}

function confirmaExcluir(clienteId) {
    $.ajax({
        url: "Clientes/ExcluirCliente",
        method: 'DELETE',
        data: {
            clienteId: clienteId
        },
        success: function (status) {
            if (status) {
                $("#modalConfirma").modal('hide');
                alert("Cliente excluído com sucesso");
                document.getElementById(clienteId).remove();
            }
            else
                alert(status.messagem);
        }
    });
}

function validarFormulario(cliente) {
    let nomeValido = validarNome(cliente.nome);
    let emailValido = validarEmail(cliente.email);
    let telefoneValido = validarTelefone(cliente.telefone);
    let dataValida = validarData(cliente.data);

    if (nomeValido == true && emailValido == true && telefoneValido == true && dataValida == true)
        return true;
    return false
}

function validarNome(nome) {
    let nomeValido = true;
    if (nome.trim() == '' || nome == undefined) {
        $(".nome").addClass('is-invalid');
        $(".erroNome").text("Preencha o nome");
        $(".erroNome").removeClass("d-none");

        nomeValido = false;
    }
    else if (nome.length < 2) {
        $(".nome").addClass('is-invalid');
        $(".erroNome").text("Insira um nome válido");
        $(".erroNome").removeClass("d-none");

        nomeValido = false;
    }
    else {
        $(".nome").removeClass('is-invalid');
        $(".nome").addClass('is-valid');
        $(".erroNome").addClass("d-none");

        nomeValido = true;
    }
    return nomeValido;
}

function validarEmail(email) {
    let emailValido = true;

    if (email.trim() == '' || email == undefined) {
        $(".email").addClass('is-invalid');
        $(".erroEmail").text("Preencha o email");
        $(".erroEmail").removeClass("d-none");

        emailValido = false;
    }
    else {
        $(".email").removeClass('is-invalid');
        $(".email").addClass('is-valid');
        $(".erroEmail").addClass("d-none");

        emailValido = true;
    }

    return emailValido;
}

function validarTelefone(telefone) {
    let telefoneValido = true;

    if (telefone.trim() == '' || telefone == undefined) {
        $(".telefone").addClass('is-invalid');
        $(".erroTelefone").text("Preencha o telefone");
        $(".erroTelefone").removeClass("d-none");

        telefoneValido = false;
    }
    else if (telefone.length < 10) {
        $(".telefone").addClass('is-invalid');
        $(".erroTelefone").text("Insira um telefone válido");
        $(".erroTelefone").removeClass("d-none");

        telefoneValido = false;
    }
    else {
        $(".telefone").removeClass('is-invalid');
        $(".telefone").addClass('is-valid');
        $(".erroTelefone").addClass("d-none");

        telefoneValido = true;
    }

    return telefoneValido;
}

function validarData(data) {
    let dataValida = true;

    if (data == '' || data == undefined) {
        $(".dataCadastro").addClass('is-invalid');
        $(".erroData").text("Preencha a data");
        $(".erroData").removeClass("d-none");

        dataValida = false;
    }
    else {
        $(".dataCadastro").removeClass('is-invalid');
        $(".dataCadastro").addClass('is-valid');
        $(".erroData").addClass("d-none");

        dataValida = true;
    }

    return dataValida;
}