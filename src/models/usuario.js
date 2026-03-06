module.exports = class Usuario {
    constructor(username, senha) {
        this.id = Usuario.ultimoId;
        this.username = this.verifPalavra(username);
        this.senha = senha;
    }

    verifPalavra(palavra) {
        if (typeof (palavra) !== "string") {
            throw new Error("Caracteres invalidos");
        }

        const regex = /^[A-Za-z]+$/;

        if (!regex.test(palavra)) {
            throw new Error("O username deve conter apenas letras");
        }

        return palavra;
    }
}
