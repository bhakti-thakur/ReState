import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { logIn } from '@/lib/appwrite'

const signIn  = () => {
  const handleLogin = async () =>{
    const result = await logIn();
    if(result){
      console.log('Logged in successfully')
    } else {
      Alert.alert('Error', 'Failed to log in')
    }
  }
  return (
    <SafeAreaView className=' bg-white h-full'>
      <ScrollView contentContainerClassName=' h-full'>
        <Image source = {images.onboarding} className=' w-full h-4/6' resizeMode='contain'/>
        <View className=' px-10'>
          <Text className=' text-base text-center uppercase font-rubik text-black-200'> Welcome to Restate </Text>
          <Text className=' font-rubik-bold text-3xl text-black-300 text-center mt-2 mb-5'>
            Let's get you closer to {"\n"} 
              <Text className=' text-primary-300'> Your Ideal Home </Text>
          </Text>
          <Text className=' text-md font-rubik text-black-200 text-center pt-3 border-t-hairline border-black-100'>
            Get started with ReState
          </Text>
          <View className=' flex flex-row justify-center'>
            <TouchableOpacity onPress={handleLogin} className=' bg-gray-50 shadow-lg shadow-black-100 rounded-full w-full py-4  mt-3'>
              <View className=' flex flex-row items-center justify-center gap-5'>
                <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
                <Text className=' text-lg font-rubik-medium text-black-300 text-center'>
                  Log in with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signIn 