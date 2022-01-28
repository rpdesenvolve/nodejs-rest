const conexao = require('./conexao');

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erros, resutados) => {
            if (erros) { reject(erros); }
            else { resolve(resutados); }
        });
    });
};

module.exports = executaQuery;