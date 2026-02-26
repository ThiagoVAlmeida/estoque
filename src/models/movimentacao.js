module.exports = class movimento{
    constructor(entrada, saida, descricao){
        this.id = movimento.ultimoId;
        this.data = this.dataCompleta();
        this.valorEntrada = entrada;
        this.valorSaida = saida;
        this.fechamentoCaixa = this.valorEntrada - this.valorSaida;
        this.descricao = descricao;
    }

    dataCompleta(){
        const data = new Date();
        const dataBrasil = formataData(data);
        
        function zeroAEsquerda(num){
            return num >= 10 ? num : `0${num}`;
        }
        
        function formataData(data){
            const dia = zeroAEsquerda(data.getDate());
            const mes = zeroAEsquerda(data.getMonth() + 1);
            const ano = zeroAEsquerda(data.getFullYear());
            
            return `${dia}/${mes}/${ano}`;
        }

        return dataBrasil;
    }
}