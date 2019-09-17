const express = require('express')
const router = express.Router()
const UserCard = require('../models/userCard')

router.get('/', async (req, res) => {
  const userCards = await UserCard.find()
  res.status(200).json(userCards)
})

router.get('/:id', getUserCard, (req, res) => {
  res.status(200).json(res.userCard)
})

router.post('/', async (req, res) => {
  const userCard = new UserCard({
    name: req.body.name,
    imgUrl: req.body.imgUrl
  })

  try {
    const newUserCard = await userCard.save()
    res.status(201).json(newUserCard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', getUserCard, async (req, res) => {
  res.userCard.name = req.body.name
  res.userCard.imgUrl = req.body.imgUrl

  try {
    const updatedUserCard = await res.userCard.save()
    res.json(updatedUserCard)
  } catch{
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', getUserCard, async (req, res) => {
  if (req.body.name != null) {
    res.userCard.name = req.body.name
  }

  if (req.body.imgUrl != null) {
    res.userCard.imgUrl = req.body.imgUrl
  }

  try {
    const updatedUserCard = await res.userCard.save()
    res.json(updatedUserCard)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getUserCard, async (req, res) => {
  try {
    await res.userCard.remove()
    res.json({ message: 'Deleted User Card' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUserCard(req, res, next) {
  try {
    const userCard = await UserCard.findById(req.params.id)
    if (userCard == null) {
      return res.status(404).json({ message: 'Cant find user card' })
    }
    
    res.userCard = userCard
    next()
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router