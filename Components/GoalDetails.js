import { StyleSheet, Text, View, Button,Image } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PressableButton from "./PressableButton";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { storage } from "../Firebase/fireBaseSetup";
import { ref, getDownloadURL} from "firebase/storage";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const [uri, setUri] = useState("");

  useEffect(() => {
    const getImageUri = async() => {
      if (route.params.goalData.uri){
        const imageRef = ref(storage, route.params.goalData.uri);
        const httpUrl = await getDownloadURL(imageRef);
        setUri(httpUrl);
      }
    }
    getImageUri();
  },[])



  function warningHandler() {
    setIsWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.goalData.id, { warning: true }, "goals");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // <Button title="Warning" color="white" onPress={warningHandler} />
        <PressableButton
          componentStyle={styles.iconStyle}
          pressedHandler={warningHandler}
        >
          <Ionicons name="warning" size={24} color="black" />
        </PressableButton>
      ),
    });
  }, []);

  function moreDetailsHandler() {
    navigation.push("Details");
  }
  return (
    <View>
      {route.params ? (
        <Text style={isWarning && styles.warning}>
          Goal is {route.params.goalData.text} and its id is{" "}
          {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={isWarning && styles.warning}>More Details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler}></Button>
      {uri&&<Image
          source={{ uri: uri }}
          style={styles.image}
          alt="Preview of the image taken"
        />
      }   
        <GoalUsers id={route.params.goalData.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
  },
  iconStyle: {
    backgroundColor: "red",
    opacity: 0.5,
  },
  image: {
    width: 200,
    height: 200,
  },
});
