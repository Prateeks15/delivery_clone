import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
  } from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';

  import React, { useEffect, useState } from 'react';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { useDispatch, useSelector } from 'react-redux';
  import Currency from 'react-currency-formatter';
  import { selectRestaurant } from '../features/restaurantSlice';
  import {
    removeFromBasket,
    selectBasketItems,
    selectBasketTotal,
  } from '../features/basketSlice';
  import { XCircleIcon } from 'react-native-heroicons/solid';
  import { urlFor } from '../sanity';
  import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

  
  const BasketScreen = () => {
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const stripe = useStripe();

  
    const navigation = useNavigation();
  
    const restaurant = useSelector(selectRestaurant);
  
    const items = useSelector(selectBasketItems);
  
    const basketTotal = useSelector(selectBasketTotal);
    const insets = useSafeAreaInsets();

  
    const dispatch = useDispatch();
  
    useEffect(() => {
        if(items.length > 0) {
            const groupedItems = items.reduce((results, item) => {
                (results[item.id] = results[item.id] || []).push(item);
                return results;
              }, {});
          
              setGroupedItemsInBasket(groupedItems);
        } else {
            navigation.goBack();
        }
      
    }, [items]);

    console.log(basketTotal, 'ites');

    const onOrderPlace = async () => {
      try {
        // sending request
        const response = await fetch("https://b0dc-2406-b400-72-d67b-1b52-5ef0-afec-1300.ngrok-free.app/pay", {
            method: "POST",
            body: JSON.stringify({ name: 'prateek', price: basketTotal + 5.99 }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data, "datda");
        if (!response.ok) return Alert.alert(data.message);
        const clientSecret = data.clientSecret;
        const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'prateek',
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        // await new Promise((resolve) => setTimeout(resolve, 2500))
        const presentSheet = await stripe.presentPaymentSheet();
        if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        navigation.navigate('PreparingOrderScreen')
        // Alert.alert("Payment complete, thank you!");
    } catch (err) {
        console.error(err);
        Alert.alert("Something went wrong, try again later!");
    }

    }


  
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 bg-gray-100'  style={{ paddingTop: insets.top }}>
          <View className='p-5 border-b border-[#00CCBB] bg-white shadow-sm'>
            <View>
              <Text className='text-lg font-bold text-center'>Basket</Text>
              <Text className='text-center text-gray-400'>
                {restaurant.title}
              </Text>
            </View>
  
            <TouchableOpacity
              onPress={navigation.goBack}
              className='rounded-full bg-gray-100 absolute top-3 right-5'
            >
              <XCircleIcon color='#00CCBB' size={50} />
            </TouchableOpacity>
          </View>
  
          <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
            <Image
              source={{
                uri: 'https://links.papareact.com/wru',
              }}
              className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <Text className='flex-1'>Deliver in 50-75 min</Text>
            <TouchableOpacity>
              <Text className='text-[#00CCBB]'>Change</Text>
            </TouchableOpacity>
          </View>
  
          <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View
                key={key}
                className='flex-row items-center space-x-3 bg-white py-2 px-5'
              >
                <Text className='text-[#00CCBB]'>{items.length} x</Text>
                <Image
                  source={{
                    uri: urlFor(items[0]?.image).url(),
                  }}
                  className='h-12 w-12 rounded-full'
                />
                <Text className='flex-1'>{items[0]?.name}</Text>
  
                <Text className='text-gray-600'>
                  <Currency quantity={items[0]?.price} currency='GBP' />
                </Text>
  
                <TouchableOpacity>
                  <Text
                    className='text-[#00CCBB] text-xs'
                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
  
          <View className='p-5 bg-white mt-5 space-y-4'>
            <View className='flex-row justify-between'>
              <Text className='text-gray-400'>Subtotal</Text>
              <Text className='text-gray-400'>
                <Currency quantity={basketTotal} currency='GBP' />
              </Text>
            </View>
  
            <View className='flex-row justify-between'>
              <Text className='text-gray-400'>Delivery Fee</Text>
              <Text className='text-gray-400'>
                <Currency quantity={5.99} currency='GBP' />
              </Text>
            </View>
  
            <View className='flex-row justify-between'>
              <Text>Order Total</Text>
              <Text className='font-extrabold'>
                <Currency quantity={basketTotal + 5.99} currency='GBP' />
              </Text>
            </View>
  
            <TouchableOpacity
              onPress={() => onOrderPlace()}
              className='rounded-lg bg-[#00CCBB] p-4'
            >
              <Text className='text-center text-white text-lg font-bold'>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default BasketScreen;
  