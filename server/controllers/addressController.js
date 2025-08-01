const Address = require('../models/Address');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all addresses for logged in user
// @route   GET /api/v1/addresses
// @access  Private
exports.getAddresses = asyncHandler(async (req, res, next) => {
  const addresses = await Address.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    count: addresses.length,
    data: addresses,
  });
});

// @desc    Get single address
// @route   GET /api/v1/addresses/:id
// @access  Private
exports.getAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is address owner
  if (address.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this address`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: address,
  });
});

// @desc    Create new address
// @route   POST /api/v1/addresses
// @access  Private
exports.createAddress = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // If this is set as default, unset any other default addresses for this user
  if (req.body.isDefault) {
    await Address.updateMany(
      { user: req.user.id, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  const address = await Address.create(req.body);

  res.status(201).json({
    success: true,
    data: address,
  });
});

// @desc    Update address
// @route   PUT /api/v1/addresses/:id
// @access  Private
exports.updateAddress = asyncHandler(async (req, res, next) => {
  let address = await Address.findById(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is address owner
  if (address.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this address`,
        401
      )
    );
  }

  // If this is set as default, unset any other default addresses for this user
  if (req.body.isDefault) {
    await Address.updateMany(
      { user: req.user.id, isDefault: true, _id: { $ne: req.params.id } },
      { $set: { isDefault: false } }
    );
  }

  address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: address,
  });
});

// @desc    Delete address
// @route   DELETE /api/v1/addresses/:id
// @access  Private
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is address owner
  if (address.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this address`,
        401
      )
    );
  }

  await address.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Set default address
// @route   PUT /api/v1/addresses/:id/set-default
// @access  Private
exports.setDefaultAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is address owner
  if (address.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this address`,
        401
      )
    );
  }

  // Unset any other default addresses for this user
  await Address.updateMany(
    { user: req.user.id, isDefault: true, _id: { $ne: req.params.id } },
    { $set: { isDefault: false } }
  );

  // Set this address as default
  address.isDefault = true;
  await address.save();

  res.status(200).json({
    success: true,
    data: address,
  });
});
