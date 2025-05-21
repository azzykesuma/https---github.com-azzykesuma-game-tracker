import { IRecentlyPlayed } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { STEAM_ID_COOKIE } from "../lib/constant";
import { decrypt } from "../action";

export const fetchMyCurrentlyPlayedGame = async () => {
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
    const response: IRecentlyPlayed = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamIdKey}`
    );
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
