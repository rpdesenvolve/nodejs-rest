const conexao = require('../insfraestrutura/database/conexao');

const uploadDeArquivo = require('../insfraestrutura/arquivos/uploadArquivos');

class Pet {
    adiciona(pet, res) {
        const sql = 'INSERT INTO pets SET ?';

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if (erro) { res.status(400).json({erro}); }

            const novoPet = {nome: pet.nome, imagem: novoCaminho};

            conexao.query(sql, novoPet, (erro) => {
                if (erro) { res.status(400).json(erro) }
                else { res.status(201).json(novoPet); }
            });
        });
    }
}

module.exports = new Pet();