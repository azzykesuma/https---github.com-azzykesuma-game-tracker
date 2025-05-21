import { decrypt } from "@/app/action";
import { STEAM_ID_COOKIE } from "@/app/lib/constant";
import { PlayerStats } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getStatForGames = async (stat: string) => {
  try {
    const cookiesStore = await cookies();
    const steamIdCookies = cookiesStore.get(STEAM_ID_COOKIE);
    let steamIdKey;
    if (steamIdCookies) {
      const id = await decrypt(steamIdCookies?.value);
      steamIdKey = id?.steamId;
    } else {
      steamIdKey = process.env.MY_ID;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${stat}&key=${process.env.STEAM_KEY}&steamid=${steamIdKey}`
    );
    if(response.status !== 200) {
      return null
    }
    return response.data.playerstats.stats as PlayerStats['data']['playerstats']['stats'];
  } catch (error) {
    console.error(error);
    return null
  }
};

