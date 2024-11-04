import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { database } from "./fireBaseSetup";
import { doc, deleteDoc } from "firebase/firestore";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
    deleteAllFromDB(`goals/${deletedId}/users`)
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapShot) => {
      deleteDoc(doc(database, collectionName, docSnapShot.id));
      //needupdate
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB(id, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.log("update DB ", err);
  }
}

export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnapShot) => {
        data.push(docSnapShot.data());
      });
    }
    return data;
  } catch (err) {
    console.log("get all docs", err);
  }
}
