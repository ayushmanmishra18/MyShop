const express = require('express');
const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controllers/addressController');
const { authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Protect all routes with authentication
router.use(authorize);

router
  .route('/')
  .get(getAddresses)
  .post(createAddress);

router
  .route('/:id')
  .get(getAddress)
  .put(updateAddress)
  .delete(deleteAddress);

router.put('/:id/set-default', setDefaultAddress);

module.exports = router;
