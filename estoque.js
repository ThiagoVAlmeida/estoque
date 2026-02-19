const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const caminhoArquivo = path.resolve(__dirname, 'teste.json');
const Produto = require('./produto');
const escreve = require('./escreve');
const ler = require('./ler');

class MeuEstoque {
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

        return console.table(produtos);
    }

    async entrada(id, qtd) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) throw new Error(" Produto não encontrado");

        produto.quantidade += qtd;

        await escreve(
            caminhoArquivo,
            JSON.stringify(produtos, null, 2)
        );

        return console.table(produtos);
    }

    async saida(id, qtd) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) return console.log("Produto não encontrado");

        if (produto.quantidade < qtd) {
            throw new Error(" Estoque insuficiente");
        }

        produto.quantidade -= qtd;

        await escreve(
            caminhoArquivo,
            JSON.stringify(produtos, null, 2)
        );

        return console.table(produtos);
    }

    async buscar(id) {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");

        const produto = produtos.find(produto => produto.id === Number(id));
        if (!produto) throw new Error(" Produto não encontrado");

        return console.table(produto);
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

        return console.table(novosProdutos);
    }

    async listar() {
        const dados = await ler(caminhoArquivo);
        const produtos = JSON.parse(dados || "[]");
        return console.table(produtos);
    }
}

async function main() {
    const estoque = new MeuEstoque();

    function perguntar(pergunta) {
        return new Promise((resolve) => {
            rl.question(pergunta, resolve);
        });
    }

    async function pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }


    async function mostrarMenu() {
        console.clear();
        console.log('-----MENU-----');
        console.log('1 - Adicionar');
        console.log('2 - Entrada');
        console.log('3 - Saida');
        console.log('4 - Buscar');
        console.log('5 - Remover');
        console.log('6 - Listar');
        console.log('7 - Sair');

        const r = await perguntar('Escolha uma opção: ');

        try {

            switch (r) {
                case "1":
                    let nome = await perguntar('informe o nome do produto: ');
                    let quantidade = Number(await perguntar('informe a quantidade: '));
                    let fornecedor = await perguntar('informe o fornecedor: ');
                    let unidade = Number(await perguntar('informe quantas unidades: '));
                    let vencimento = await perguntar('informe o vencimento: ');

                    let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                    await estoque.adicionar(produto);
                    await pausar();
                    break;
                case "2":
                    let idEntrada = Number(await perguntar('informe o id do produto: '));
                    let qtdEntrada = Number(await perguntar('informe a quantidade do produto: '));
                    // falta unidade
                    await estoque.entrada(idEntrada, qtdEntrada);
                    await pausar();
                    break;
                case "3":
                    let idSaida = Number(await perguntar('informe o id do produto: '));
                    let qtdSaida = Number(await perguntar('informe a quantidade do produto: '));
                    await estoque.saida(idSaida, qtdSaida);
                    await pausar();
                    break;
                case "4":
                    let idBusca = Number(await perguntar('informe o id para busca o produto: '));
                    await estoque.buscar(idBusca);
                    await pausar();
                    break;
                case "5":
                    let idRemove = Number(await perguntar('informe o id para remover o produto: '));
                    await estoque.remover(idRemove);
                    await pausar();
                    break;
                case "6":
                    await estoque.listar();
                    await pausar();
                    break;
                case "7":
                    rl.close();
                    return;
            }
        } catch (error) {
            console.log('\n❌ ERRO:', error.message);
            await pausar();
        }
        await mostrarMenu();
    }
    await mostrarMenu();
}

main();

