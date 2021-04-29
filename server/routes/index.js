const router = require('express').Router();
const Controller = require('../controllers');
const MypokemonController = require('../controllers/mypokemon');

router.get('/', Controller.getRootHandler);
router.get('/mypokemon', MypokemonController.listMypokemon);
router.post('/mypokemon', MypokemonController.addMypokemon);
router.delete('/mypokemon/:id', MypokemonController.deleteMypokemon);

module.exports = router;