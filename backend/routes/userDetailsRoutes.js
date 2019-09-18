const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userDetails');

router.get('/', async (req, res) => {
  const userDetails = await UserDetails.find();
  res.status(200).json(userDetails);
});

router.get('/:id', getUserDetails, (req, res) => {
  res.status(200).json(res.userDetails);
});

router.post('/', async (req, res) => {
  const userDetails = new UserDetails({
    about: req.body.about,
    availableEquipment: req.body.availableEquipment,
    climbingStyles: req.body.climbingStyles,
    languagesSpoken: req.body.languagesSpoken
  });

  try {
    const newUserDetails = await userDetails.save();
    res.status(201).json(newUserDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getUserDetails, async (req, res) => {
  res.userDetails.about = req.body.about;
  res.userDetails.availableEquipment = req.body.availableEquipment;
  res.userDetails.climbingStyles = req.body.climbingStyles;
  res.userDetails.languagesSpoken = req.body.languagesSpoken;

  try {
    const updatedUserDetails = await res.userDetails.save();
    res.json(updatedUserDetails);
  } catch{
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getUserDetails, async (req, res) => {
  if (req.body.about != null) {
    res.userDetails.about = req.body.about;
  }

  if (req.body.availableEquipment != null) {
    res.userDetails.availableEquipment = req.body.availableEquipment;
  }

  if (req.body.climbingStyles != null) {
    res.userDetails.climbingStyles = req.body.climbingStyles;
  }

  if (req.body.languagesSpoken != null) {
    res.userDetails.languagesSpoken = req.body.languagesSpoken;
  }

  try {
    const updatedUserDetails = await res.userDetails.save();
    res.json(updatedUserDetails);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getUserDetails, async (req, res) => {
  try {
    await res.userDetails.remove();
    res.json({ message: 'Deleted User Details' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUserDetails(req, res, next) {
  try {
    const userDetails = await UserDetails.findById(req.params.id);
    if (userDetails == null) {
      return res.status(404).json({ message: 'Cant find user details' });
    }

    res.userDetails = userDetails;
    next();
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;