'use server'
// Import unstable_cache from next/cache for caching functionality
import { unstable_cache } from "next/cache";
import { IGameListResponse } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { decrypt } from "../action";
import { STEAM_ID_COOKIE } from "../lib/constant";

export const fetchGameLists = async () => {
    const cookiesStore = await cookies();
    const steamIdCookies = cookiesStore.get(STEAM_ID_COOKIE);
    let steamIdKey;

    if (steamIdCookies) {
        const id = await decrypt(steamIdCookies?.value);
        steamIdKey = id?.steamId
    } else {
        steamIdKey = process.env.MY_ID
    }

    // Wrap the data fetching logic with unstable_cache
    // The cache key is an array including a unique string 'game-lists' and the steamIdKey
    // This ensures that the data is cached per user
    // The revalidate option is set to 3600 seconds (1 hour)
    return unstable_cache(
        async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamIdKey}&include_appinfo=true&include_played_free_games=true`);
            return response.data.response as IGameListResponse;
        },
        ['game-lists', steamIdKey], // Cache key: unique string and steamIdKey
        { revalidate: 3600 } // Revalidate every 1 hour
    )();
}