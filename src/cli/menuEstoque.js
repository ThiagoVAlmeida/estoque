const EstoqueService = require('../services/estoqueService');
const Produto = require('../models/produto');
const { perguntar } = require('../utils/input');

async function menuEstoque() {
    const estoque = new EstoqueService();

    async function Pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }

    while(true){
        try {
            console.log('-----MENU-----');
            console.log('1 - Adicionar');
            console.log('2 - Entrada');
            console.log('3 - Saida');
            console.log('4 - Buscar');
            console.log('5 - Remover');
            console.log('6 - Listar');
            console.log('7 - Voltar');
            const r1 = await perguntar('Escolha uma opção: ');

            if (r1 === "7") {
                break;
            }
    
            switch (r1) {
                case "1":
                    console.log('Qual a categoria do produto');
                    console.log('1 - Acai/Cremes');
                    console.log('2 - Caldas');
                    console.log('3 - Picoles/Cremosinho');
                    console.log('4 - Sorvetes');
                    let categoria = await perguntar('Escolha a Categoria: ');
                    if (categoria == 1) {
                        let nome = await perguntar('informe o nome do produto: ');
                        let quantidade = Number(await perguntar('informe a quantidade: '));
                        let fornecedor = 'FS';
                        let unidade = Number(quantidade);
                        let vencimento = await perguntar('informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd)
                        await Pausar();
                    } else if (categoria == 2) {
                        let nome = await perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await perguntar('Informe a quantidade: '));
                        let fornecedor = 'Sabor';
                        let unidade = Number(quantidade);
                        let vencimento = await perguntar('Informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await Pausar();
                    } else if (categoria == 3) {
                        let nome = await perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await perguntar('Informe a quantidade:'));
                        let fornecedor = 'Flash';
                        let unidade = Number(await perguntar('Informe quantas unidades: '));
                        let vencimento = await perguntar('Informe o vencimento: ');
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await Pausar();
                    } else if (categoria == 4) {
                        let nome = await perguntar('Informe o nome do produto: ');
                        let quantidade = Number(await perguntar('Informe a quantidade:'));
                        let fornecedor = 'Qwy';
                        let unidade = Number(quantidade);
                        let vencimento;
                        let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                        const produtoAdd = await estoque.adicionar(produto);
                        console.table(produtoAdd);
                        await Pausar();
                    } else {
                        break;
                    }
                    break;
                case "2":
                    let idEntrada = Number(await perguntar('informe o id do produto: '));
                    let qtdEntrada = Number(await perguntar('informe a quantidade do produto: '));
                    let unidadeEntrada = Number(await perguntar('informe a unidade do produto: '));
                    const produtoEntrada = await estoque.entrada(idEntrada, qtdEntrada, unidadeEntrada);
                    console.table(produtoEntrada)
                    await Pausar();
                    break;
                case "3":
                    let idSaida = Number(await perguntar('informe o id do produto: '));
                    let qtdSaida = Number(await perguntar('informe a quantidade do produto: '));
                    let unidadeSaida = Number(await perguntar('informe a unidade do produto: '));
                    const produtoSaida = await estoque.saida(idSaida, qtdSaida, unidadeSaida);
                    console.table(produtoSaida)
                    await Pausar();
                    break;
                case "4":
                    let idBusca = Number(await perguntar('informe o id para busca o produto: '));
                    let produtoBusca = await estoque.buscar(idBusca);
                    console.table(produtoBusca);
                    await Pausar();
                    break;
                case "5":
                    let idRemove = Number(await perguntar('informe o id para remover o produto: '));
                    let buscaRemove = await estoque.buscar(idRemove);
                    console.table(buscaRemove);
                    let confirma = await perguntar('Deseja remover esse produto?(S/N): ');
                    if (confirma.trim().toUpperCase() === 'S') {
                        const produtoRemove = await estoque.remover(idRemove);
                        console.table(produtoRemove);
                        await Pausar();
                        break;
                    } else {
                        console.log('Produto não removido');
                        await Pausar();
                        break;
                    }
                case "6":
                    const produtos = await estoque.listar();
                    console.table(produtos);
                    await Pausar();
                    break;
            }
        } catch (error) {
            console.log('\n❌ ERRO:', error.message);
            await Pausar();
        }
    }
}

module.exports = menuEstoque;