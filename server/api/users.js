const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json('user api route')
  } catch (err) {
    next(err)
  }
})
