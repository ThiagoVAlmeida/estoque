const menuEstoque = require('./menuEstoque');
const menuCaixa = require('./menuCaixa');
const menuUsuarios = require('./menuUsuarios');
const { perguntar } = require('../utils/input');

async function iniciarMain(usuario) {
    while (true) {
        console.log("\n----- MENU -----");
        console.log("1 - Estoque");
        console.log("2 - Caixa");

        if (usuario.id === 1) {
            console.log("3 - Gerenciar usuários");
            console.log("4 - Sair");
        } else {
            console.log("3 - Sair");
        }

        const opcao = await perguntar("Escolha: ");

        if (opcao == 1) {
            await menuEstoque();
        }

        else if (opcao == 2) {
            await menuCaixa();
        }

        else if (opcao == 3 && usuario.id === 1) {
            await menuUsuarios();
        }

        else if ((opcao == 3 && usuario.id !== 1) || (opcao == 4 && usuario.id === 1)) {
            break;
        }

        else {
            console.log("Opção inválida");
        }

    }
}

module.exports = iniciarMain;