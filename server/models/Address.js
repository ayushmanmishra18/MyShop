const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name for the address'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    maxlength: [20, 'Phone number cannot be longer than 20 characters'],
  },
  street: {
    type: String,
    required: [true, 'Please add a street address'],
    maxlength: [100, 'Street address cannot be more than 100 characters'],
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    maxlength: [50, 'City name cannot be more than 50 characters'],
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
    maxlength: [50, 'State name cannot be more than 50 characters'],
  },
  postalCode: {
    type: String,
    required: [true, 'Please add a postal code'],
    maxlength: [20, 'Postal code cannot be more than 20 characters'],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    default: 'India',
    maxlength: [50, 'Country name cannot be more than 50 characters'],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  addressType: {
    type: String,
    enum: ['home', 'work', 'other'],
    default: 'home',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can only have one default address
AddressSchema.index({ user: 1, isDefault: 1 }, { unique: true, partialFilterExpression: { isDefault: true } });

// Prevent duplicate addresses for the same user
AddressSchema.index(
  {
    user: 1,
    street: 1,
    city: 1,
    state: 1,
    postalCode: 1,
    country: 1,
  },
  { unique: true }
);

// Cascade delete orders when an address is deleted
AddressSchema.pre('deleteOne', { document: true }, async function (next) {
  console.log(`Orders being removed for address ${this._id}`);
  await this.model('Order').updateMany(
    { shippingAddress: this._id },
    { $unset: { shippingAddress: '' } }
  );
  next();
});

module.exports = mongoose.model('Address', AddressSchema);
