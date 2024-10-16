import { collection, addDoc, getDocs } from "firebase/firestore";
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
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapShot) => {
      deleteDoc(doc(database, collectionName, docSnapShot.id));
    });
  } catch (err) {
    console.log(err);
  }
}
