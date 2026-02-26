module.exports = class Produto {
    constructor(nome, quantidade, fornecedor, unidade, vencimento) {
        this.id = Produto.ultimoId;
        this.nome = this.verifPalavra(nome);
        this.quantidade = this.verifQtd(quantidade);
        this.fornecedor = this.verifPalavra(fornecedor);
        this.unidade = this.verifQtd(unidade);
        this.vencimento = this.parseData(vencimento);
    }

    verifPalavra(palavra) {
        if (typeof (palavra) !== "string") {
            throw new Error("Caracteres invalidos");
        }

        return palavra;
    }

    verifQtd(quantidade) {
        if (typeof (quantidade) !== "number" || quantidade <= 0) {
            throw new Error("Quantidade invalida");
        }

        return quantidade;
    }

    parseData(vencimento) {
        
        // Data não informada
        if (!vencimento) {
            const data = new Date();
            const dataBrasil = formataData(data);
            return dataBrasil;
        }
        
        function formataData(data) {
            const dia = zeroAEsquerda(data.getDate());
            const mes = zeroAEsquerda(data.getMonth() + 1);
            const ano = zeroAEsquerda(data.getFullYear());
            
            return `${dia}/${mes}/${ano}`;
        }
        
        function zeroAEsquerda(num) {
            return num >= 10 ? num : `0${num}`;
        }
        
        // Data informada
        if (vencimento.length !== 8) {
            throw new Error("Data deve ter 8 dígitos no formato DDMMAAAA");
        }
        
        const dia = Number(vencimento.slice(0, 2));
        const mes = Number(vencimento.slice(2, 4));
        const ano = Number(vencimento.slice(4, 8));
        
        const data = new Date(ano, mes - 1, dia);

        if (
            data.getFullYear() !== ano ||
            data.getMonth() !== mes - 1 ||
            data.getDate() !== dia
        ) {
            throw new Error("Data invalida");
        }

        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    }
}
