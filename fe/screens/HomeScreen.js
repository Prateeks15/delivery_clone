import { View, Text, SafeAreaView, Image, StyleSheet, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
// import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native-web';


const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    // const subscribe = async () => {
    //     // try {
    //     //   // sending request
    //     //   const response = await fetch("https://b0dc-2406-b400-72-d67b-1b52-5ef0-afec-1300.ngrok-free.app/", {
    //     //     method: "GET",
    //     //     // body: JSON.stringify({ name }),
    //     //     headers: {
    //     //       "Content-Type": "application/json",
    //     //     },
    //     //   });
    //     //   console.log(response, "ressss");
    //     //   const data = await response.json();
    //     //   console.log(data, "datda");
    //     // } catch (err) {
    //     //   console.error(err);
    //     //   Alert.alert("Something went wrong, try again later!");
    //     // }

    //     try {
    //         // sending request
    //         const response = await fetch("https://b0dc-2406-b400-72-d67b-1b52-5ef0-afec-1300.ngrok-free.app/pay", {
    //             method: "POST",
    //             body: JSON.stringify({ name: 'prateek' }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data, "datda");
    //         if (!response.ok) return Alert.alert(data.message);
    //         const clientSecret = data.clientSecret;
    //         const initSheet = await stripe.initPaymentSheet({
    //             paymentIntentClientSecret: clientSecret,
    //             merchantDisplayName: 'prateek',
    //         });
    //         if (initSheet.error) return Alert.alert(initSheet.error.message);
    //         // await new Promise((resolve) => setTimeout(resolve, 2500))
    //         const presentSheet = await stripe.presentPaymentSheet();
    //         if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    //         Alert.alert("Payment complete, thank you!");
    //     } catch (err) {
    //         console.error(err);
    //         Alert.alert("Something went wrong, try again later!");
    //     }
    // };

    useEffect(() => {
        // subscribe();
    }, [])


    useEffect(() => {
        sanityClient.fetch(`
        *[_type == 'featured'] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->,
              type->{
                name
              }
            }
          }
        `).then((data) => {
            // console.log(data, "datda");
            setFeaturedCategories(data);
        })
    }, [])


    // const styles = StyleSheet.create({
    //     container: {
    //         padding: 0
    //     }
    // })


    return (
        <SafeAreaView className='bg-white pt-5'>

                <View className='flex-row pb-3 items-center mx-4 space-x-2' style={{ paddingTop: insets.top }}>
                    <Image
                        source={{
                            uri: 'https://links.papareact.com/wru'
                        }}
                        className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                    />
                    <View className='flex-1'>
                        <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                        <Text className='font-bold text-xl'>
                            Current Location

                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>

                    </View>

                    <UserIcon size={30} color="#00CCBB" />
                </View>

                {/* Search */}
                <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                    <View className='flex-row space-x-2 flex-1 bg-gray-200 p-2 rounded ml-1'>
                        <MagnifyingGlassIcon color="#00CCBB" />
                        <TextInput placeholder='Search Restraunts and Cuisines' keyboardType='default' />
                    </View>
                    <AdjustmentsVerticalIcon color="#00CCBB" />
                </View>

                <ScrollView className='bg-gray-100'
                    contentContainerStyle={{
                        paddingBottom: 200
                    }}
                >
                    {/* categories */}
                    <Categories />

                    {/* Featured rows */}

                    {featuredCategories?.map(category => (
                        <FeaturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                            featuredCategory="featured"
                        />
                    ))}
                    {/* <FeaturedRow
                    id="1"
                    title="Featured"
                    description="Paid placements from our partners"
                    featuredCategory="featured"
                />

                <FeaturedRow
                    id="2"
                    title="Tasty Discounts"
                    description="Everyone's been enjoying these juicy discounts"
                    featuredCategory="discounts"
                />

                <FeaturedRow
                    id="3"
                    title="Offers near you"
                    description="Why not support your local restaurant tonight!"
                    featuredCategory="offers"
                /> */}
                </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen