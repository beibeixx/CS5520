import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route}) {

    function moreDetailsHandler(){
        navigation.push('Details')
    }
  return (
    <View>
        {route.params ? (
            <Text>Goal is {route.params.goalData.text} and its id is {route.params.goalData.id}</Text>
        ) : (
            <Text>More Details</Text>
        )
        }
        <Button title="More Details" onPress={moreDetailsHandler}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})