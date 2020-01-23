class LivroControlador {

  lista() {
    return function(req, resp) {  
      const livroDao = new LivroDao(db);
      livroDao
        .lista()
        .then(livros => 
          resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
              livros: livros
            }
        ))
        .catch(erro => console.log(erro))
    };
  }
}

module.exports = LivroControlador;