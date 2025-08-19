'use client'
import React, { Children } from 'react'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { ConfiguredStore, PersistedStore } from '@/lib/redux/store'
import { Provider } from 'react-redux'

const ReduxProvider = ({children}) => {
  return (
    <PersistGate persistor={PersistedStore}>
        <Provider store={ConfiguredStore}>
            {children}
        </Provider>
    </PersistGate>
  )
}

export default ReduxProvider
