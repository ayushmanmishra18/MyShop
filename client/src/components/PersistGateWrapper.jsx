import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../store/store';
import Loader from './common/Loader';

// Create the persistor
export const persistor = persistStore(store);

const PersistGateWrapper = ({ children }) => {
  return (
    <PersistGate 
      loading={
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <Loader size="lg" />
        </div>
      } 
      persistor={persistor}
    >
      {children}
    </PersistGate>
  );
};

export default PersistGateWrapper;
