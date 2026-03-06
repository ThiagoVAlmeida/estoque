const CaixaService = require('../services/caixaService');
const Movimento = require('../models/movimentacao');
const { perguntar } = require('../utils/input');

async function menuCaixa() {
    const caixa = new CaixaService();

    async function Pausar() {
        await perguntar('\nPressione ENTER para continuar...');
    }

    try {
        console.log('---------MENU---------');
        console.log('1 - Adicionar');
        console.log('2 - Buscar');
        console.log('3 - Fechamento')
        console.log('4 - Remover');
        console.log('5 - Listar')
        console.log('6 - Voltar');
        const r2 = await perguntar('Escolha uma opção: ');

        switch (r2) {
            case "1":
                let entrada = Number(await perguntar('Informe o valor que entrou no Caixa: '));
                let saida = Number(await perguntar('Informe o valor que saiu do Caixa: '));
                let descricao = await perguntar('Descrição da transação: ');
                const movimento = new Movimento(entrada, saida, descricao);
                const movimentoAdd = await caixa.adicionar(movimento);
                console.table(movimentoAdd);
                await Pausar();
                break;
            case "2":
                let idBusca = Number(await perguntar('Informe o Id do Relatorio: '));
                let busca = await caixa.buscaRelatorio(idBusca);
                console.table(busca);
                await Pausar();
                break;
            case "3":
                let idfechamento = Number(await perguntar('Informe o Id do relatorio: '));
                let fechamento = await caixa.fechamento(idfechamento);
                console.log(fechamento);
                await Pausar();
                break;
            case "4":
                let idRemove = Number(await perguntar('Informe o Id para ecluir o relatorio: '));
                let buscaRelatorio = await caixa.buscaRelatorio(idRemove);
                console.table(buscaRelatorio);
                let confirma = await perguntar('Deseja Remove esse relatorio?(S/N): ');
                if (confirma.trim().toUpperCase() === 'S') {
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
            default:
                break;
        }
    } catch (error) {
        console.log('\n❌ ERRO:', error.message);
        await Pausar();
    }

}

module.exports = menuCaixa;