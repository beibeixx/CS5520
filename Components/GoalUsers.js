import {
  FlatList,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB } from "../Firebase/firestoreHelper";

export default function GoalUsers({id}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`An HTTP error happened status: ${response.status}`);
        }
        const data = await response.json();
        data.map((user) => {
            writeToDB(user, `goals/${id}/users`)

        })

        setUsers(
          data.map((users) => {
            return users.name;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <FlatList data={users} renderItem={({item}) => {
        return <Text>{item}</Text>
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({});
