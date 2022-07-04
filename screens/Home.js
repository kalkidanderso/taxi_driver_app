import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Detail from './Detail'

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home View</Text>
      <Button style={{margin: "10px", padding: "20px", backgroundColor: "red"}} title='Navigate to Login Page' onPress={() => navigation.navigate("Login")}/>
      <Button title='Navigate to Detail Page' onPress={() => navigation.navigate("Detail")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    login: {
        margin: "1000px"
    }
});