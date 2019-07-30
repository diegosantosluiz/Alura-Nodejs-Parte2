class LivroDao {
  constructor(db) {
    this._db = db;
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `INSERT INTO LIVROS (
          titulo,
          preco,
          descricao
        ) VALUES (?,?,?)`,
        [
          livro.titulo,
          livro.preco,
          livro.descricao
        ],
        function (erro) {
          if (erro) {
            console.log(erro);
            return reject('Não foi possível inserir os livros!');
          }
          
          resolve();
        }
      );
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `UPDATE LIVROS SET 
          TITULO = ?,
          PRECO = ?,
          DESCRICAO = ?
        WHERE ID = ?`,
        [
          livro.titulo,
          livro.preco,
          livro.descricao,
          livro.id
        ],
        (erro) => {
          if (erro) {
            console.log(erro);
            return reject('Não foi possível atualizar o livro!');
          }
          
          resolve();
        }
      )
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        'SELECT * FROM LIVROS WHERE ID = ?',
        [ id ],
        (erro, livro) => {
          if (erro)
            return reject('Não foi possível buscar o livro!');
            
          return resolve(livro);
        }
      )
    });
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM LIVROS',
        (erro, resultados) => {
          if (erro)
            return reject('Não foi possível listar os livros!');

          return resolve(resultados);
        }
      );
    }); 
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        'DELETE FROM LIVROS WHERE ID = ?',
        [ id ],
        (erro) => {
          if (erro) {
            console.log(erro);
            return reject('Não foi possível remover o livro!');
          }
          
          resolve();
        }
      );
    });
  }
}

module.exports = LivroDao;