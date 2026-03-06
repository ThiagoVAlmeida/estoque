const path = require('path');
const caminhoArquivo = path.resolve(__dirname, '../../data/usuarios.json');
const escreve = require('../utils/escreve');
const ler = require('../utils/ler');
const bcrypt = require("bcrypt");

module.exports = class authService {
    async login(username, senha) {
        const dados = await ler(caminhoArquivo);
        const usuarios = JSON.parse(dados || "[]");

        const usuario = usuarios.find(u => u.username === username);
        if (!usuario) return false;

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) return null;

        return usuario;
    }

    async cadastrarUser(usuario) {
        const dados = await ler(caminhoArquivo);
        const usuarios = JSON.parse(dados || "[]");

        const existe = usuarios.find(u => u.username === usuario.username);
        if (existe) throw new Error("Usuário já existe");

        const maiorId = usuarios.reduce((max, u) =>
            u.id > max ? u.id : max, 0);

        usuario.id = maiorId + 1;


        const hash = await bcrypt.hash(usuario.senha, 10);
        usuario.senha = hash;

        usuarios.push(usuario);

        await escreve(
            caminhoArquivo,
            JSON.stringify(usuarios, null, 2)
        );
    }

    async buscar(username) {
        const dados = await ler(caminhoArquivo);
        const usuarios = JSON.parse(dados || "[]");

        const usuario = usuarios.find(usuario => usuario.username === username);
        if (!usuario) throw new Error(" Usuario não encontrado");

        return usuario;
    }

    async atualizar(username, novosDados) {
        const dados = await ler(caminhoArquivo);
        const usuarios = JSON.parse(dados || "[]");

        const index = usuarios.findIndex(u => u.username === username);

        if (index === -1) throw new Error("Usuario não encontrado");

        if (novosDados.username) {
            usuarios[index].username = novosDados.username;
        }

        if (novosDados.senha) {
            usuarios[index].senha = await bcrypt.hash(novosDados.senha, 10);
        }

        await escreve(
            caminhoArquivo,
            JSON.stringify(usuarios, null, 2)
        );

        return usuarios[index];
    }

    async remover(username) {
        const dados = await ler(caminhoArquivo);
        const usuarios = JSON.parse(dados || "[]");

        const usuarioExiste = usuarios.find(u => u.username === username);
        if (!usuarioExiste) throw new Error(" Usuario não encontrado");

        const novosUsuarios = usuarios.filter(
            u => u.username !== username
        );

        await escreve(
            caminhoArquivo,
            JSON.stringify(novosUsuarios, null, 2)
        );

        return novosUsuarios;
    }
}
