const express = require('express')
const router = express.Router()
const Location = require('../models/location')

router.get('/', async (req, res) => {
  const locations = await Location.find()
  res.json(locations)
})

router.get('/:id', getLocation, (req, res) => {
  res.json(res.location)
})

router.post('/', async (req, res) => {
  const location = new Location({
    lat: req.body.lat,
    lng: req.body.lng
  })

  try {
    const newLocation = await location.save()
    res.status(201).json(newLocation)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', getLocation, async (req, res) => {
  res.location.lat = req.body.lat
  res.location.lng = req.body.lng

  try {
    const updatedLocation = await res.location.save()
    res.json(updatedLocation)
  } catch{
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', getLocation, async (req, res) => {
  if (req.body.lat != null) {
    res.location.lat = req.body.lat
  }

  if (req.body.lng != null) {
    res.location.lng = req.body.lng
  }

  try {
    const updatedLocation = await res.location.save()
    res.json(updatedLocation)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getLocation, async (req, res) => {
  try {
    await res.location.remove()
    res.json({ message: 'Deleted Location' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getLocation(req, res, next) {
  try {
    const location = await Location.findById(req.params.id)
    if (location == null) {
      return res.status(404).json({ message: 'Cant find location' })
    }
    
    res.location = location
    next()
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router