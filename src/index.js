const pedirLogin = require('./cli/login');
const iniciarMenu = require('./cli/main');

async function main() {
    while (true) {

        const usuario = await pedirLogin();

        if (!usuario) {
            console.log("Encerrando sistema...");
            break;
        }

        await iniciarMenu(usuario);
    }

    rl.close();
}

main();