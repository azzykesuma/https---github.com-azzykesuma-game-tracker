"use server";
import { decrypt } from "@/app/action";
import { STEAM_ID_COOKIE } from "@/app/lib/constant";
import { IAchievement, PlayerStats } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchAchievementLists = async (id: number) => {
  const response: IAchievement = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/ISteamUserStats/GetSchemaForGame/v0002/?key=${process.env.STEAM_KEY}&appid=${id}&l=english&format=json`
  );
  return response.data.game;
};

export const fetchMyAchievement = async (id: string) => {
  const cookiesStore = await cookies();
  const steamIdCookies = cookiesStore.get(STEAM_ID_COOKIE);
  let steamIdKey;
  if (steamIdCookies) {
    const id = await decrypt(steamIdCookies?.value);
    steamIdKey = id?.steamId;
  } else {
    steamIdKey = process.env.MY_ID;
  }
  try {
    const response: PlayerStats = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ISteamUserStats/GetPlayerAchievements/v0001/?appId=${id}&key=${process.env.STEAM_KEY}&steamid=${steamIdKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
