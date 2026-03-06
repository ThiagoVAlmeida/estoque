const userservice = require('../services/userService');
const { perguntar } = require('../utils/input');

async function pedirLogin() {
    const usuarios = new userservice();

    async function Pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }

    while (true) {

        console.log('\n----- LOGIN -----');

        const username = await perguntar('Nome de Usuario: ');
        const senha = await perguntar('Senha: ');

        try {
            const usuarioLogado = await usuarios.login(username, senha);

            if (!usuarioLogado) {
                console.log("Usuário ou senha inválidos!");
                continue;
            }

            console.log("Login realizado com sucesso!");
            return usuarioLogado;

        } catch (error) {
            console.log('\n❌ ERRO:', error.message);
            await Pausar();
        }

    }
}

module.exports = pedirLogin;