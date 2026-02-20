const path = require('path');
const caminhoArquivo = path.resolve(__dirname, '../../data/estoque.json');
const escreve = require('../utils/escreve');
const ler = require('../utils/ler');

class EstoqueService {
    async adicionar(produto) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const maiorId = produtos.reduce((max, p) =>
            p.id > max ? p.id : max, 0);

        produto.id = maiorId + 1;

        const produtoExistente = produtos.find(p => p.nome.toLowerCase() === produto.nome.toLowerCase());
        if (produtoExistente) throw new Error(" Esse produto ja existe");

        produtos.push(produto);

        await escreve(
            caminhoArquivo,
            JSON.stringify(produtos, null, 2)
        );

        return produtos;
    }

    async entrada(id, qtd, unidade) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) throw new Error(" Produto não encontrado");

        produto.quantidade += qtd;
        produto.unidade += unidade;

        await escreve(
            caminhoArquivo,
            JSON.stringify(produtos, null, 2)
        );

        return produto;
    }

    async saida(id, qtd, unidade) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) throw new Error(" Produto não encontrado");

        if (produto.quantidade < qtd || produto.unidade < unidade) {
            throw new Error(" Estoque insuficiente");
        }

        produto.quantidade -= qtd;
        produto.unidade -= unidade;

        await escreve(
            caminhoArquivo,
            JSON.stringify(produtos, null, 2)
        );

        return produto;
    }

    async buscar(id) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) throw new Error(" Produto não encontrado");

        return produto;
    }

    async remover(id) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produtoExiste = produtos.filter(produto => produto.id === Number(id));
        if (!produtoExiste) throw new Error(" Produto não encontrado");

        const novosProdutos = produtos.filter(
            p => p.id !== Number(id)
        );

        await escreve(
            caminhoArquivo,
            JSON.stringify(novosProdutos, null, 2)
        );

        return novosProdutos;
    }

    async listar() {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");
        return produtos;
    }
}

module.exports = EstoqueService;