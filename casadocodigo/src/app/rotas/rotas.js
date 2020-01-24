const { check } = require('express-validator/check');

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();
const rotasBase = BaseControlador.rotas();

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();
const rotasLivro = LivroControlador.rotas();

module.exports = (app) => {
  app.get(rotasBase.home, baseControlador.home());
  
  app.get(rotasLivro.lista, livroControlador.lista());

  app.get(rotasLivro.cadastro, livroControlador.formularioCadastro());

  app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

  app.post(rotasLivro.lista,
    [
      check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
      check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ],
    livroControlador.cadastra()
  );

  app.put(rotasLivro.lista, livroControlador.edita());

  app.delete(rotasLivro.delecao, livroControlador.remove());
};