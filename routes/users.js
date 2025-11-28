const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('favorites', 'name images rating address');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/users/address
// @desc    Add address
// @access  Private
router.post('/address', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.address.push(req.body);
    await user.save();

    res.json({
      success: true,
      data: user.address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/users/address/:addressId
// @desc    Update address
// @access  Private
router.put('/address/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const address = user.address.id(req.params.addressId);
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    Object.assign(address, req.body);
    await user.save();

    res.json({
      success: true,
      data: user.address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/users/address/:addressId
// @desc    Delete address
// @access  Private
router.delete('/address/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.address.pull(req.params.addressId);
    await user.save();

    res.json({
      success: true,
      data: user.address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/users/favorites/:restaurantId
// @desc    Add restaurant to favorites
// @access  Private
router.post('/favorites/:restaurantId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.favorites.includes(req.params.restaurantId)) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant already in favorites'
      });
    }

    user.favorites.push(req.params.restaurantId);
    await user.save();

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/users/favorites/:restaurantId
// @desc    Remove restaurant from favorites
// @access  Private
router.delete('/favorites/:restaurantId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites.pull(req.params.restaurantId);
    await user.save();

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;