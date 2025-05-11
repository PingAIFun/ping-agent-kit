// App.tsx
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {navigationRef} from './src/hooks/useAppNavigation';
import {store} from './src/state/store';
import {ThemeProvider} from './src/theme';

import {PrivyProvider, PrivyElements} from '@privy-io/expo';
import {DefaultCustomizationConfig} from './src/config';
import {CustomizationProvider} from './src/CustomizationProvider';
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from '@env';

export default function App() {
  const config = DefaultCustomizationConfig;
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <CustomizationProvider config={config}>
            <PrivyProvider
              appId={PRIVY_APP_ID}
              clientId={PRIVY_CLIENT_ID}
              config={{
                embedded: {
                  solana: {
                    createOnLogin: 'users-without-wallets',
                  },
                },
              }}>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
              <PrivyElements />
            </PrivyProvider>
          </CustomizationProvider>
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
