import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import React, { useState, useEffect } from "react";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/fireBaseSetup";
import {
  deleteAllFromDB,
  deleteFromDB,
  writeToDB,
} from "../Firebase/firestoreHelper";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from "../Firebase/fireBaseSetup";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { ref } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/fireBaseSetup";

export default function Home({ navigation, route }) {
  // console.log(database);
  const appName = "My app";
  const [receivedData, setReceivedData] = useState("");
  const [visible, setVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const listerToFirebase = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          console.log(docSnapshot.id);
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
        console.log(newArray);
      },
      (err) => {
        console.log(err);
        Alert.alert(err.message);
      }
    );

    return () => listerToFirebase();
  }, []);

  function handleProfile() {
    navigation.navigate("Profile");
  }

  const fetchAndUploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`An HTTP error happened status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullpath;
    } catch (err) {
      console.log("fetch And Upload Image", err);
    }
  };

  const handleInputData = (data) => {
    console.log("App.js", data);
    let uri = ""
    if (data.imageUri) {
      uri = fetchAndUploadImage(data.imageUri);
    }
    let newGoal = { text: data.text };
    newGoal = { ...newGoal, owner: auth.currentUser.uid };
    if (uri) {
      newGoal = { ...newGoal, uri: uri };

    }
    // writeToDB(newGoal, "goals");
    // setGoals((prebGoals) => {
    //   return [...prebGoals, newGoal];
    // });
    // setReceivedData(data);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleGoalDelete = (deletedId) => {
    // const newGoals = goals.filter((goalObj) => {
    //   return goalObj.id != deleteId;
    // });
    // setGoals(newGoals);
    console.log(deletedId);

    // setGoals((prebGoals) => {
    //   return prebGoals.filter((goalObj) => {
    //     return goalObj.id != deletedId;
    //   });
    // });
    deleteFromDB(deletedId, "goals");
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          // onPress: () => setGoals([]),
          onPress: () => deleteAllFromDB("goals"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        {/* <Button title="Add a Goal" onPress={() => setVisible(true)} /> */}
        <PressableButton
          componentStyle={styles.addGoal}
          pressedHandler={() => setVisible(true)}
          pressedStyle={styles.pressedAddGoal}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        cancelHandler={handleCancel}
        visibility={visible}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && { backgroundColor: "blue" },
              ]}
            />
          )}
          ListHeaderComponent={
            goals.length > 0 ? (
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>My Goals</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No goals to show</Text>
            </View>
          }
          ListFooterComponent={
            goals.length > 0 ? (
              <View style={styles.listFooter}>
                <Button title="Delete All" onPress={handleDeleteAll} />
              </View>
            ) : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                goal={item}
                deleteHandler={handleGoalDelete}
                navigation={navigation}
                separators={separators}
              />
            );
          }}
        ></FlatList>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        {goals.map((goal) => {
          return (
            <View key={goal.id} style={styles.textContainer}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          );
        })}
        <Text style={styles.text}>{receivedData} </Text> 
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    // color: "white",
    backgroundColor: "#dcd",
    flex: 4,
    // alignItems: "center",
  },
  emptyListContainer: {
    marginTop: 10,
  },
  emptyListText: {
    color: "purple",
    fontSize: 22,
  },
  listHeader: {
    marginTop: 10,
  },
  listHeaderText: {
    color: "purple",
    fontSize: 22,
  },
  listFooter: {
    padding: 10,
    marginTop: 10,
  },
  separator: {
    height: 3,
    backgroundColor: "grey",
  },
  addGoal: {
    backgroundColor: "red",
  },
  pressedAddGoal: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
