const express = require('express')
const router = express.Router()
const FriendLists = require('../models/friendLists')

//TODO: allow getting friends withing a certain radius
router.get('/', async (req, res) => {
  const friendLists = await FriendLists.find()
  res.json(friendLists)
})

router.get('/:id', getFriendLists, (req, res) => {
  res.json(res.friendLists)
})

router.post('/', async (req, res) => {
  const friendLists = new FriendLists({
    friendList: req.body.friendList,
    friendRequests: req.body.friendRequests
  })

  try {
    const newFriendLists = await friendLists.save()
    res.status(201).json(newFriendLists)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', getFriendLists, async (req, res) => {
  res.friendLists.friendList = req.body.friendList
  res.friendLists.friendRequests = req.body.friendRequests

  try {
    const updatedFriendLists = await res.friendLists.save()
    res.json(updatedFriendLists)
  } catch{
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', getFriendLists, async (req, res) => {
  if (req.body.friendList != null) {
    res.friendLists.friendList = req.body.friendList
  }

  if (req.body.friendRequests != null) {
    res.friendLists.friendRequests = req.body.friendRequests
  }

  try {
    const updatedFriendList = await res.friendLists.save()
    res.json(updatedFriendList)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getFriendLists, async (req, res) => {
  try {
    await res.friendLists.remove()
    res.json({ message: 'Deleted friendLists' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getFriendLists(req, res, next) {
  try {
    const friendLists = await FriendLists.findById(req.params.id)
    if (friendLists == null) {
      return res.status(404).json({ message: 'Cant find friends lists' })
    }
    
    res.friendLists = friendLists
    next()
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router