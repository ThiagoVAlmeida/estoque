const Usuario = require('../models/usuario');
const userservice = require('../services/userService');
const { perguntar } = require('../utils/input');

async function menuUsuarios() {
    const usuarios = new userservice();

    async function Pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }

    while (true) {
        console.log('\n--- GERENCIAR USUÁRIOS ---');
        console.log('1 - Cadastrar');
        console.log('2 - Buscar');
        console.log('3 - Remover');
        console.log('4 - Atualizar');
        console.log('5 - Voltar');

        const r = await perguntar('Escolha: ');

        try {
            
            if (r == 1) {
                let username = await perguntar('Informe o Username: ');
                let senha = await perguntar('Informe a senha: ');
                let usuario = new Usuario(username, senha);
                await usuarios.cadastrarUser(usuario);
                console.log("Usuário cadastrado com sucesso!");
                await Pausar();
            } else if (r == 2) {
                let usernameBusca = await perguntar('Informe o Nome de Usuario: ');
                let usuario = await usuarios.buscar(usernameBusca);
                console.table(usuario);
                await Pausar();
            } else if (r == 3) {
                let usernameRemove = await perguntar('Informe o Nome de Usuario: ');
                let buscaUser = await usuarios.buscar(usernameRemove);
                console.table(buscaUser);
                let confirma = await perguntar('Deseja Remove esse usuario?(S/N): ');
                if (confirma.trim().toUpperCase() === 'S') {
                    const novosUsuarios = await usuarios.remover(usernameRemove);
                    console.table(novosUsuarios);
                    await Pausar();
                } else {
                    console.log('Produto não removido');
                    await Pausar();
                }
    
            } else if (r == 4) {
                let username = await perguntar("Usuario que deseja atualizar: ");
                let novoUsername = await perguntar("Novo username: ");
                let novaSenha = await perguntar("Nova senha: ");
    
                const atualizado = await usuarios.atualizar(username, {
                    username: novoUsername,
                    senha: novaSenha
                });
    
                console.log("Usuário atualizado:");
                console.table(atualizado);
    
            } else if (r == 5) {
                break;
            } else {
                console.log("Opção inválida");
            }
        } catch (error) {
            console.log('\n❌ ERRO:', error.message);
            await Pausar();
        }
    }
}

module.exports = menuUsuarios;