import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function LoginScreen() {
  return (
    <View>
      <Link href="/(auth)/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign Up</Text>
          </Link>
    </View>
  )
}