const moment = require('moment');
const axios = require("axios");
const conexao = require('../insfraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento {
    constructor() {
        this.dataValida = ({data, dataCriacao}) =>
            moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = tamanho => tamanho >= 5;

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const {nome} = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Client deve ter pelo menos 5 caracteres'
            }
        ];
    }

    lista() {
       return repositorio.lista();
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
            .then((resultado) => {
                return resultado;
            });
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        };

        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros));
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            return repositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId;
                    return { ...atendimento, id };
                });
        }
    }

    altera(valores, id) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        return repositorio.altera(valores, id)
            .then((resultado) => {
                return resultado;
            });
    }

    deleta(id) {
        return repositorio.deleta(id)
            .then((resultado) => {
                return resultado;
            });
    }
}

module.exports = new Atendimento();