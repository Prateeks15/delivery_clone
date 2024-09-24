import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    StarIcon,
} from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon, MapPinIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { useEffect } from 'react';

const RestaurantScreen = (props) => {
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    } } = useRoute()

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          })
        );
      }, []);

    return (
        <>
            <BasketIcon />
            <ScrollView contentContainerStyle={{
                paddingTop: insets.top
            }}>
                <View className='relative'>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className='w-full bg-gray-300 p-4 h-80'
                    />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className='absolute top-5 left-5 p-2 bg-gray-100 rounded-full'>
                        <ArrowLeftIcon size={20} color='#00CCBB' />
                    </TouchableOpacity>
                </View>
                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{title}</Text>
                        <View className='flex-row my-1 space-x-2'>
                            <View className='flex-row items-center space-x-1'>
                                <StarIcon color='green' opacity={0.5} size={22} />
                                <Text className='text-xs text-gray-500'>
                                    <Text className='text-green-500'>{rating}</Text> · {genre}
                                </Text>
                            </View>

                            <View className='flex-row items-center space-x-1'>
                                <MapPinIcon color='gray' opacity={0.4} size={22} />
                                <Text className='text-xs text-gray-500 flex items-center'>
                                    Nearby · <Text style={{ display: 'block' }} className='w-40' >{address}</Text>
                                </Text>
                            </View>
                        </View>

                        <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                    </View>

                    <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                        <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
                        <Text className='pl-2 flex-1 text-sm font-bold'>
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color='#00CCBB' />
                    </TouchableOpacity>
                </View>

                <View className='pb-36'>
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

                    {/* Dishrows */}
                    {dishes?.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>


            </ScrollView>
        </>
    )
}

export default RestaurantScreen