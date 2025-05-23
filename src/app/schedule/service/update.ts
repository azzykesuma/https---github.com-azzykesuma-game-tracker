"use server";

import { COLLECTIONCONFIG } from "@/app/lib/constant";
import { db } from "@/app/lib/firebase";
import { IDoc } from "@/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { revalidatePath } from "next/cache";

export const updateToPlayGame = async (
  gameId: number,
  duration: number
): Promise<boolean> => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return false;
  }

  try {
    const docRef = doc(
      db,
      COLLECTIONCONFIG.COLLECTION_NAME,
      COLLECTIONCONFIG.TO_PLAY_FIELD
    );
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.error("To-play document doesn't exist!");
      return false;
    }

    const currentData = docSnapshot.data();
    const toPlayArray: IDoc["toPlay"] = currentData.toPlay || [];
    const existingGameIndex = toPlayArray.findIndex(
      (game) => game.gameId.toString() === gameId.toString()
    );

    if (existingGameIndex !== -1) {
      const updatedArray = [...toPlayArray];
      updatedArray[existingGameIndex] = { gameId, duration };
      await updateDoc(docRef, {
        toPlay: updatedArray,
      });
    } else {
      console.error(`Game ${gameId} not found to update`);
    }
    revalidatePath("/schedule");

    return true;
  } catch (error) {
    console.error("Error updating to-play game:", error);
    return false;
  }
};

export const deleteToPlayGame = async (
  gameId: number,
): Promise<boolean> => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return false;
  }

  try {
    const docRef = doc(
      db,
      COLLECTIONCONFIG.COLLECTION_NAME,
      COLLECTIONCONFIG.TO_PLAY_FIELD
    );
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.error("To-play document doesn't exist!");
      return false;
    }

    const currentData = docSnapshot.data();
    const toPlayArray: IDoc["toPlay"] = currentData.toPlay || [];
     const updatedArray = toPlayArray.filter(
      (game) => game.gameId.toString() !== gameId.toString()
    );


    if (updatedArray.length < toPlayArray.length) {
      await updateDoc(docRef, {
        toPlay: updatedArray,
      });
      console.log(`Game ${gameId} successfully removed from to-play list.`);
    } else {
      console.log(`Game ${gameId} not found in to-play list, no update needed.`);
    }

    revalidatePath("/schedule");

    return true;
  } catch (error) {
    console.error("Error updating to-play game:", error);
    return false;
  }
};

export const createToPlayGame = async (
  gameId : number,
  duration : number,
) => {
  if (!db) {
    console.error("Firestore DB instance is not initialized.");
    return false;
  }

  try {
    const docRef = doc(
      db,
      COLLECTIONCONFIG.COLLECTION_NAME,
      COLLECTIONCONFIG.TO_PLAY_FIELD
    );

    const docSnapshot = await getDoc(docRef);

    let toPlayArray: IDoc["toPlay"] = [];


    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();
      toPlayArray = currentData.toPlay || [];
    }

    console.log('toplayarray', toPlayArray);

    // check if the gameId already exists in the toPlayArray
    const existingGameIndex = toPlayArray.findIndex(
      (game) => game.gameId.toString() === gameId.toString()
    );

    if (existingGameIndex !== -1) {
      console.error(`Game ${gameId} already exists in to-play list.`);
      return false;
    }

    const newGameEntry = { gameId, duration };
    const updatedArray = [...toPlayArray, newGameEntry];

    if (docSnapshot.exists()) {
        await updateDoc(docRef, {
            toPlay: updatedArray,
        });
    } else {
        await setDoc(docRef, {
            toPlay: updatedArray,
        });
    }


    console.log(`Game ${gameId} with duration ${duration} successfully added to to-play list.`);

    revalidatePath("/schedule");

    return true; // Indicate success
  } catch (error) {
    // Log any errors that occur during the process.
    console.error("Error creating to-play game:", error);
    return false; // Indicate failure
  }
};