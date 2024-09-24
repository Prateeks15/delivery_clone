import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../sanity'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client.fetch(`
    *[_type == "category"]
  `).then(data => {
      // console.log(data, "categories");
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* Category Card */}
      {categories.map(category => (
        <CategoryCard key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name} />

      ))}
      {/* 
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Texting2" />
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Texting3" />
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Texting3" />
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Texting3" />
      <CategoryCard imgUrl='https://links.papareact.com/gn7' title="Texting3" /> */}

    </ScrollView>
  )
}

export default Categories
