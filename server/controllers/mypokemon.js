const { Mypokemon } = require('../models');

class MypokemonController {
  static listMypokemon (req, res, next) {
    Mypokemon.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next);
  }
  
  static addMypokemon (req, res, next) {
    const newPokemon = {
      alias: req.body.alias,
      name: req.body.name,
      url: req.body.url
    }
    Mypokemon.create(newPokemon)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next);
  }

  static deleteMypokemon (req, res, next) {
    const { id } = req.params;

    Mypokemon.destroy({ where: { id }})
      .then(data => {
        if (data) {
          res.status(200).json({ message: `Pokemon deleted` });
        } else {
          next({
            code: 404,
            message: 'Not Found'
          })
        }
      })
      .catch(next);
  }
}

module.exports = MypokemonController;