const query = require('../insfraestrutura/database/queries');

class Atendimento {
    lista() {
        const sql = 'SELECT * FROM Atendimentos'
        return query(sql);
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
        return query(sql, id);
    }

    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';
        return query(sql, atendimento);
    }

    altera(valores, id) {
        const sql = `UPDATE atendimentos SET ? where id = ${id}`;
        return query(sql, valores, id);
    }

    deleta(id) {
        const sql = `DELETE FROM atendimentos WHERE id = ${id}`;
        return query(sql, id);
    }
}

module.exports = new Atendimento();