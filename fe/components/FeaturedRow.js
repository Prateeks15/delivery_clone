import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity'

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
    const [restaurants, setRestaurants] = useState([]);
   
    useEffect(() => {
    client.fetch(`
    *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        }
      }[0]
    `, { id }).then(res => {
        // console.log(res?.restaurants, "res");
        setRestaurants(res?.restaurants)
    })
    }, [])
    



    return (
        <View>

            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className='text-xs text-gray-500 px-4'>{description}</Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {/*  Restarunts Cards*/}
                {restaurants?.map(restaurant => (
                     <RestaurantCard
                     id={restaurant._id}
                     key={restaurant?._id}
                     imgUrl={restaurant?.image}
                     title={restaurant.name}
                     rating={restaurant.rating}
                     genre={restaurant?.type?.name}
                     address={restaurant?.address}
                     short_description={restaurant?.short_description}
                     dishes={restaurant?.dishes}
                     long={restaurant?.long}
                     lat={restaurant?.lat}
                 />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow