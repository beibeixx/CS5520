import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route}) {

    console.log(route)
    function moreDetailsHandler(){
        navigation.push('Details')
    }
  return (
    <View>
        {route.params ? (
        <View>
            <Text>{route.params.goalData.text}</Text>
        </View>) : (
            <Text>More Details</Text>
        )
        }
        <Button title="More Details" onPress={moreDetailsHandler}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})