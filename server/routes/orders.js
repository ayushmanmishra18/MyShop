const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all orders - Admin
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email');

    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += order.totalPrice;
    });

    res.json({
      success: true,
      totalAmount,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update / Process order - Admin
// @route   PUT /api/orders/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.orderStatus === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'You have already delivered this order'
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 