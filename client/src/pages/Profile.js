import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfile,
  updateProfile,
  addOrUpdateAddress,
  deleteAddress,
  changePassword,
  clearError
} from '../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, addresses, loading, error, passwordMessage } = useSelector(state => state.auth);

  // Profile form state
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phoneNumber: '' });
  // Address form state
  const [addressForm, setAddressForm] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  // Password form state
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  useEffect(() => {
    dispatch(getProfile());
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  // Profile update
  const handleProfileChange = e => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = e => {
    e.preventDefault();
    dispatch(updateProfile(profileForm));
  };

  // Address add/edit
  const handleAddressChange = e => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };
  const handleAddressSubmit = e => {
    e.preventDefault();
    dispatch(addOrUpdateAddress({ address: addressForm, index: editAddressIndex }));
    setAddressForm({ street: '', city: '', state: '', zipCode: '', country: '' });
    setEditAddressIndex(null);
  };
  const handleEditAddress = (addr, idx) => {
    setAddressForm(addr);
    setEditAddressIndex(idx);
  };
  const handleDeleteAddress = idx => {
    dispatch(deleteAddress(idx));
  };

  // Password change
  const handlePasswordChange = e => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = e => {
    e.preventDefault();
    dispatch(changePassword(passwordForm));
    setPasswordForm({ currentPassword: '', newPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-dark-800 rounded-4xl shadow-large p-8 animate-fade-in">
        <h2 className="text-3xl font-bold font-display text-primary-400 mb-6 text-center">Your Profile</h2>
        {loading && <div className="text-primary-400 text-center mb-4">Loading...</div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {/* Profile Info */}
        <form className="space-y-4 mb-8" onSubmit={handleProfileSubmit}>
          <h3 className="text-xl font-semibold text-dark-50 mb-2">Profile Info</h3>
          <input name="name" type="text" placeholder="Name" value={profileForm.name} onChange={handleProfileChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300" />
          <input name="email" type="email" placeholder="Email" value={profileForm.email} onChange={handleProfileChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300" />
          <input name="phoneNumber" type="text" placeholder="Phone Number" value={profileForm.phoneNumber} onChange={handleProfileChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300" />
          <button type="submit" className="w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition">Update Profile</button>
        </form>
        {/* Addresses */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-dark-50 mb-2">Addresses</h3>
          <form className="space-y-2 mb-4" onSubmit={handleAddressSubmit}>
            <div className="flex gap-2 flex-wrap">
              <input name="street" type="text" placeholder="Street" value={addressForm.street} onChange={handleAddressChange} className="flex-1 px-2 py-1 rounded bg-primary-100 text-black border border-primary-300" />
              <input name="city" type="text" placeholder="City" value={addressForm.city} onChange={handleAddressChange} className="flex-1 px-2 py-1 rounded bg-primary-100 text-black border border-primary-300" />
              <input name="state" type="text" placeholder="State" value={addressForm.state} onChange={handleAddressChange} className="flex-1 px-2 py-1 rounded bg-primary-100 text-black border border-primary-300" />
              <input name="zipCode" type="text" placeholder="Zip Code" value={addressForm.zipCode} onChange={handleAddressChange} className="flex-1 px-2 py-1 rounded bg-primary-100 text-black border border-primary-300" />
              <input name="country" type="text" placeholder="Country" value={addressForm.country} onChange={handleAddressChange} className="flex-1 px-2 py-1 rounded bg-primary-100 text-black border border-primary-300" />
            </div>
            <button type="submit" className="py-1 px-4 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition">{editAddressIndex !== null ? 'Update Address' : 'Add Address'}</button>
            {editAddressIndex !== null && <button type="button" className="ml-2 py-1 px-4 rounded-4xl bg-dark-700 text-primary-400 font-semibold transition" onClick={() => { setAddressForm({ street: '', city: '', state: '', zipCode: '', country: '' }); setEditAddressIndex(null); }}>Cancel</button>}
          </form>
          <ul className="divide-y divide-dark-700">
            {addresses && addresses.map((addr, idx) => (
              <li key={idx} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <span className="text-dark-50">{addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</span>
                <span>
                  <button className="mr-2 px-3 py-1 rounded bg-primary-400 text-dark-900 font-semibold hover:bg-primary-500 transition" onClick={() => handleEditAddress(addr, idx)}>Edit</button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition" onClick={() => handleDeleteAddress(idx)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Change Password */}
        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
          <h3 className="text-xl font-semibold text-dark-50 mb-2">Change Password</h3>
          <input name="currentPassword" type="password" placeholder="Current Password" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300" />
          <input name="newPassword" type="password" placeholder="New Password" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-2 rounded bg-primary-100 text-black border border-primary-300" />
          <button type="submit" className="w-full py-2 rounded-4xl bg-primary-500 hover:bg-primary-600 text-dark-50 font-semibold transition">Change Password</button>
          {passwordMessage && <div className="text-green-500 text-center mt-2">{passwordMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile; 