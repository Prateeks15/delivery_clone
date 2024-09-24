import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import { NativeWindStyleSheet } from "nativewind";
import RestaurantScreen from './screens/RestaurantScreen';
import { StripeProvider } from "@stripe/stripe-react-native";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { store } from "./store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <SafeAreaProvider>
<StripeProvider publishableKey="pk_test_51OzMLrSAiMjC1aCLaFeFOL3v149tT5JBXF3j5kBX2hG0YHuHinA9vH8tjS7uFdGpk2RsJWogxOZ4ogAa4cLygNL000sK3ebUZJ">

      <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {/* Screens  */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
        </Stack.Navigator>
        </Provider>
      </NavigationContainer>
      </StripeProvider>

    </SafeAreaProvider>


  );
}

