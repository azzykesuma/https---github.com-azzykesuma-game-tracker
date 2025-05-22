import {
  doc,
  Firestore,
  getDoc,
  updateDoc
} from "firebase/firestore/lite";
import { revalidatePath } from "next/cache";
import { COLLECTIONCONFIG } from "../lib/constant";

export const fetchToPlayData = async (db: Firestore) => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return [];
  }

  try {
    // Fetch the specific document by ID
    const toPlayDocRef = doc(db, COLLECTIONCONFIG.COLLECTION_NAME, COLLECTIONCONFIG.TO_PLAY_FIELD);
    const docSnapshot = await getDoc(toPlayDocRef);
    
    if (docSnapshot.exists()) {
      return docSnapshot.data().toPlay || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching to-play games:", error);
    return [];
  }
};


export const fetchCurrentlyPlaying = async (db: Firestore) => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return [];
  }

  try {
    // Fetch the specific document by ID
    const currentlyPlayingDocRef = doc(db, COLLECTIONCONFIG.COLLECTION_NAME, COLLECTIONCONFIG.CURRENTLY_PLAYING_FIELD);
    const docSnapshot = await getDoc(currentlyPlayingDocRef);
    
    if (docSnapshot.exists()) {
      return docSnapshot.data().currentlyPlaying || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching currently playing games:", error);
    return [];
  }
};

export const updateCurrentlyPlaying = async (db: Firestore, gameId: string) => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return false;
  }

  try {
    const docRef = doc(db, COLLECTIONCONFIG.COLLECTION_NAME, COLLECTIONCONFIG.CURRENTLY_PLAYING_FIELD);
    
    await updateDoc(docRef, {
      currentlyPlaying: {
        gameId: gameId
      }
    });
    
    console.log("Currently playing game updated successfully!");
    revalidatePath("/schedule");
    return true;
  } catch (error) {
    console.error("Error updating currently playing game:", error);
    return false;
  }
};

