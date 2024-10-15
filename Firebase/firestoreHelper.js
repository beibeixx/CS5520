
import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./fireBaseSetup";

export async function writeToDB(data, collectionName){
    try{
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log(docRef);
    }
    catch (err) {
        console.log(err)
    }
}