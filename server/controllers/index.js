class Controller {
  static getRootHandler (req, res, next) {
    res.status(200).json({ message: 'welcome to mypokemon' })
  }
}

module.exports = Controller;