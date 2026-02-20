const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const EstoqueService = require('../services/estoqueService');
const Produto = require('../models/produto');

async function iniciarMain() {
    const estoque = new EstoqueService();

    function Perguntar(pergunta) {
        return new Promise((resolve) => {
            rl.question(pergunta, resolve);
        });
    }

    async function pausar() {
        await Perguntar('\nPressione ENTER para continuar...');
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

        const r = await Perguntar('Escolha uma opção: ');

        try {

            switch (r) {
                case "1":
                    console.log('Qual a categoria do produto');
                    console.log('1 - Acai/Cremes');
                    console.log('2 - Caldas');
                    console.log('3 - Picoles/Cremosinho');
                    console.log('4 - Sorvetes');
                    let categoria = await Perguntar('Escolha a Categoria: ');
                    if (categoria == 1) {
                        let nome = await Perguntar('informe o nome do produto: ');
                        let quantidade = Number(await Perguntar('informe a quantidade: '));
                        let fornecedor = 'FS';
                        let unidade = Number(quantidade);
                        let vencimento = await Perguntar('informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd)
                        await pausar();
                    } else if(categoria == 2){
                        let nome = await Perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await Perguntar('Informe a quantidade: '));
                        let fornecedor = 'Sabor';
                        let unidade = Number(quantidade);
                        let vencimento = await Perguntar('Informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await pausar();
                    } else if(categoria == 3){
                        let nome = await Perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await Perguntar('Informe a quantidade:'));
                        let fornecedor = 'Flash';
                        let unidade = Number(await Perguntar('Informe quantas unidades: '));
                        let vencimento = await Perguntar('Informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await pausar();
                    } else if(categoria == 4){
                        let nome = await Perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await Perguntar('Informe a quantidade:'));
                        let fornecedor = 'Qwy';
                        let unidade = Number(quantidade);
                        let vencimento;
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await pausar();
                    } else {
                        break;
                    }
                    break;
                case "2":
                    let idEntrada = Number(await Perguntar('informe o id do produto: '));
                    let qtdEntrada = Number(await Perguntar('informe a quantidade do produto: '));
                    let unidadeEntrada = Number(await Perguntar('informe a unidade do produto: '));
                    const produtoEntrada = await estoque.entrada(idEntrada, qtdEntrada, unidadeEntrada);
                    console.table(produtoEntrada)
                    await pausar();
                    break;
                case "3":
                    let idSaida = Number(await Perguntar('informe o id do produto: '));
                    let qtdSaida = Number(await Perguntar('informe a quantidade do produto: '));
                    let unidadeSaida = Number(await Perguntar('informe a unidade do produto: '));
                    const produtoSaida = await estoque.saida(idSaida, qtdSaida, unidadeSaida);
                    console.table(produtoSaida)
                    await pausar();
                    break;
                case "4":
                    let idBusca = Number(await Perguntar('informe o id para busca o produto: '));
                    let produtoBusca = await estoque.buscar(idBusca);
                    console.table(produtoBusca);
                    await pausar();
                    break;
                case "5":
                    let idRemove = Number(await Perguntar('informe o id para remover o produto: '));
                    let buscaRemove = await estoque.buscar(idRemove);
                    console.table(buscaRemove);
                    let confirma = await Perguntar('Deseja remover esse produto(S/N)? ');
                    if(confirma.trim().toUpperCase() === 'S'){
                        const produtoRemove = await estoque.remover(idRemove);
                        console.table(produtoRemove);
                        await pausar();
                        break;
                    } else {
                        console.log('Produto não remevido');
                        await pausar();
                        break;
                    }
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