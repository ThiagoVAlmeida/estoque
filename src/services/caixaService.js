const path = require('path');
const caminhoArquivo = path.resolve(__dirname, '../../data/relatorios.json');
const escreve = require('../utils/escreve');
const ler = require('../utils/ler');

module.exports = class CaixaService{
    async adicionar(movimento){
        const dados = await ler(caminhoArquivo);
        const relatorios = JSON.parse(dados || "[]");

        const maiorId = relatorios.reduce((max, p) =>
            p.id > max ? p.id : max, 0);

        movimento.id = maiorId + 1;

        relatorios.push(movimento);

        await escreve(
            caminhoArquivo,
            JSON.stringify(relatorios, null, 2)
        );

        return movimento;
    }

    async buscaRelatorio(id){
        const dados = await ler(caminhoArquivo);
        const relatorios = JSON.parse(dados || "[]");

        const relatorio = relatorios.find(relatorio => relatorio.id === Number(id));
        if (!relatorio) throw new Error("Relatorio não encontrado");
        
        return relatorio;
    }

    async fechamento(id){
        const dados = await ler(caminhoArquivo);
        const relatorios = JSON.parse(dados || "[]");

        const relatorio = relatorios.find(relatorio => relatorio.id === Number(id));
        if (!relatorio) throw new Error("relatorio não encontrado");

        return `\nFechamento: ${relatorio.data}\nValor: ${relatorio.fechamentoCaixa}\nDescrição: ${relatorio.descricao}`;
    }

    async removeRelatorio(id){
        const dados = await ler(caminhoArquivo);
        const relatorios = JSON.parse(dados || "[]");

        const relatorio = relatorios.filter(relatorio => relatorio.id === Number(id));
        if (!relatorio) throw new Error("Relatorio não encontrado");
        
        const novosRelatorios = relatorios.filter(
            r => r.id !== Number(id)
        );

        await escreve(
            caminhoArquivo,
            JSON.stringify(novosRelatorios, null, 2)
        );

        return novosRelatorios;
    }

    async listarRelatorios(){
        const dados = await ler(caminhoArquivo);
        const relatorios = JSON.parse(dados || "[]");
        return relatorios;
    }
}

