"use server";

import { COLLECTIONCONFIG } from "@/app/lib/constant";
import { db } from "@/app/lib/firebase";
import { IDoc } from "@/types";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
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
