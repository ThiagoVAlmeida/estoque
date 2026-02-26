const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const EstoqueService = require('../services/estoqueService');
const CaixaService = require('../services/caixaService');
const Produto = require('../models/produto');
const Movimento = require('../models/movimentacao');

async function iniciarMain() {
    const estoque = new EstoqueService();
    const caixa = new CaixaService();

    function Perguntar(pergunta) {
        return new Promise((resolve) => {
            rl.question(pergunta, resolve);
        });
    }

    async function Pausar() {
        await Perguntar('\nPressione ENTER para continuar...');
    }

    async function mostrarMenu() {
        // console.clear();
        console.log('-----MENU-----');
        console.log('1 - Estoque');
        console.log('2 - Caixa');
        console.log('3 - Sair');
        const r = await Perguntar('Escolha uma opção: ');

        try {
            if (r == 1) {
                console.log('-----MENU-----');
                console.log('1 - Adicionar');
                console.log('2 - Entrada');
                console.log('3 - Saida');
                console.log('4 - Buscar');
                console.log('5 - Remover');
                console.log('6 - Listar');
                console.log('7 - Voltar');
                const r1 = await Perguntar('Escolha uma opção: ');

                switch (r1) {
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
                            await Pausar();
                        } else if (categoria == 2) {
                            let nome = await Perguntar('Informe o nome do produto: ');
                            let quantidade = Number(await Perguntar('Informe a quantidade: '));
                            let fornecedor = 'Sabor';
                            let unidade = Number(quantidade);
                            let vencimento = await Perguntar('Informe o vencimento: ');
                            let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                            const produtoAdd = await estoque.adicionar(produto);
                            console.table(produtoAdd);
                            await Pausar();
                        } else if (categoria == 3) {
                            let nome = await Perguntar('Informe o nome do produto: ');
                            let quantidade = Number(await Perguntar('Informe a quantidade:'));
                            let fornecedor = 'Flash';
                            let unidade = Number(await Perguntar('Informe quantas unidades: '));
                            let vencimento = await Perguntar('Informe o vencimento: ');
                            let produto = new Produto(nome, quantidade, fornecedor, unidade, vencimento);
                            const produtoAdd = await estoque.adicionar(produto);
                            console.table(produtoAdd);
                            await Pausar();
                        } else if (categoria == 4) {
                            let nome = await Perguntar('Informe o nome do produto: ');
                            let quantidade = Number(await Perguntar('Informe a quantidade:'));
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
                        let idEntrada = Number(await Perguntar('informe o id do produto: '));
                        let qtdEntrada = Number(await Perguntar('informe a quantidade do produto: '));
                        let unidadeEntrada = Number(await Perguntar('informe a unidade do produto: '));
                        const produtoEntrada = await estoque.entrada(idEntrada, qtdEntrada, unidadeEntrada);
                        console.table(produtoEntrada)
                        await Pausar();
                        break;
                    case "3":
                        let idSaida = Number(await Perguntar('informe o id do produto: '));
                        let qtdSaida = Number(await Perguntar('informe a quantidade do produto: '));
                        let unidadeSaida = Number(await Perguntar('informe a unidade do produto: '));
                        const produtoSaida = await estoque.saida(idSaida, qtdSaida, unidadeSaida);
                        console.table(produtoSaida)
                        await Pausar();
                        break;
                    case "4":
                        let idBusca = Number(await Perguntar('informe o id para busca o produto: '));
                        let produtoBusca = await estoque.buscar(idBusca);
                        console.table(produtoBusca);
                        await Pausar();
                        break;
                    case "5":
                        let idRemove = Number(await Perguntar('informe o id para remover o produto: '));
                        let buscaRemove = await estoque.buscar(idRemove);
                        console.table(buscaRemove);
                        let confirma = await Perguntar('Deseja remover esse produto?(S/N): ');
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
                    case "7":
                        mostrarMenu();
                        return;
                }
            } else if (r == 2) {
                console.log('---------MENU---------');
                console.log('1 - Adicionar');
                console.log('2 - Buscar');
                console.log('3 - Fechamento')
                console.log('4 - Remover');
                console.log('5 - Listar')
                console.log('6 - Voltar');
                const r2 = await Perguntar('Escolha uma opção: ');

                switch (r2) {
                    case "1":
                        let entrada = Number(await Perguntar('Informe o valor que entrou no Caixa: '));
                        let saida = Number(await Perguntar('Informe o valor que saiu do Caixa: '));
                        let descricao = await Perguntar('Descrição da transação: ');
                        const movimento = new Movimento(entrada, saida, descricao);
                        const movimentoAdd = await caixa.adicionar(movimento);
                        console.table(movimentoAdd);
                        await Pausar();
                        break;
                    case "2":
                        let idBusca = Number(await Perguntar('Informe o Id do Relatorio: '));
                        let busca = await caixa.buscaRelatorio(idBusca);
                        console.table(busca);
                        await Pausar();
                        break;
                    case "3":
                        let idfechamento = Number(await Perguntar('Informe o Id do relatorio: '));
                        let fechamento = await caixa.fechamento(idfechamento);
                        console.log(fechamento);
                        await Pausar();
                        break;
                    case "4":
                        let idRemove = Number(await Perguntar('Informe o Id para ecluir o relatorio: '));
                        let buscaRelatorio = await caixa.buscaRelatorio(idRemove);
                        console.table(buscaRelatorio);
                        let confirma = await Perguntar('Deseja Remove esse relatorio?(S/N): ');
                        if (confirma.trim().toUpperCase() === 'S'){
                            const relatorios = await caixa.removeRelatorio(idRemove);
                            console.table(relatorios);
                            await Pausar();
                            break;
                        } else {
                            console.log('Produto não removido');
                            await Pausar();
                            break;
                        }
                    case "5":
                        const relatorios = await caixa.listarRelatorios();
                        console.table(relatorios);
                        await Pausar();
                        break;
                    case "6":
                        mostrarMenu();
                        return;
                    default:
                        break;
                }
            } else if(r == 3){
                rl.close();
                return;
            } else {
                throw new Error("Opção invalida");
            }
        } catch (error) {
            console.log('\n❌ ERRO:', error.message);
            await Pausar();
        }
        await mostrarMenu();
    }
    await mostrarMenu();
}

module.exports = { iniciarMain };

