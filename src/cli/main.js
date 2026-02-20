const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const EstoqueService = require('../services/estoqueService');
const Produto = require('../models/produto');

async function iniciarMain() {
    const estoque = new EstoqueService();

    function perguntar(pergunta) {
        return new Promise((resolve) => {
            rl.question(pergunta, resolve);
        });
    }

    async function pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }


    async function mostrarMenu() {
        // console.clear();
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
                    const produtoAdd = await estoque.adicionar(produto);
                    console.table(produtoAdd)
                    await pausar();
                    break;
                case "2":
                    let idEntrada = Number(await perguntar('informe o id do produto: '));
                    let qtdEntrada = Number(await perguntar('informe a quantidade do produto: '));
                    // falta unidade
                    const produtoEntrada = await estoque.entrada(idEntrada, qtdEntrada);
                    console.table(produtoEntrada)
                    await pausar();
                    break;
                case "3":
                    let idSaida = Number(await perguntar('informe o id do produto: '));
                    let qtdSaida = Number(await perguntar('informe a quantidade do produto: '));
                    const produtoSaida = await estoque.saida(idSaida, qtdSaida);
                    console.table(produtoSaida)
                    await pausar();
                    break;
                case "4":
                    let idBusca = Number(await perguntar('informe o id para busca o produto: '));
                    const produtoBusca = await estoque.buscar(idBusca);
                    console.table(produtoBusca);
                    await pausar();
                    break;
                case "5":
                    let idRemove = Number(await perguntar('informe o id para remover o produto: '));
                    const produtoRemove = await estoque.remover(idRemove);
                    console.table(produtoRemove)
                    await pausar();
                    break;
                case "6":
                    const produtos = await estoque.listar();
                    console.table(produtos)
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

module.exports = { iniciarMain };