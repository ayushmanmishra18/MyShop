import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { UserCircleIcon, ShoppingBagIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import UserInfo from '../../components/user/UserInfo';
import OrderHistory from '../../components/user/OrderHistory';
import AddressBook from '../../components/user/AddressBook';
import Reviews from '../../components/user/Reviews';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and view your orders
          </p>
        </div>
        
        <div className="md:flex">
          {/* Sidebar Navigation */}
          <div className="md:w-64 border-r border-gray-200 bg-gray-50">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <UserCircleIcon className="h-12 w-12 text-gray-400" />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {[
                  { name: 'Profile', icon: UserCircleIcon },
                  { name: 'Orders', icon: ShoppingBagIcon },
                  { name: 'Addresses', icon: MapPinIcon },
                  { name: 'Reviews', icon: StarIcon },
                ].map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(index)}
                    className={`${
                      activeTab === index
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full text-left`}
                  >
                    <item.icon
                      className={`${
                        activeTab === index ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {activeTab === 0 && <UserInfo user={user} />}
            {activeTab === 1 && <OrderHistory />}
            {activeTab === 2 && <AddressBook />}
            {activeTab === 3 && <Reviews />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
