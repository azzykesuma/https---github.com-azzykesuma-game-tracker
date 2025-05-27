'use server'
import { IGameListResponse } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { decrypt } from "../action";
import { STEAM_ID_COOKIE } from "../lib/constant";

export const fetchGameLists = async() => {
    const cookiesStore = await cookies();
    const steamIdCookies = cookiesStore.get(STEAM_ID_COOKIE);
    let steamIdKey;
    if(steamIdCookies) {
        const id = await decrypt(steamIdCookies?.value);
        steamIdKey = id?.steamId
    } else {
        steamIdKey = process.env.MY_ID
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamIdKey}&include_appinfo=true&include_played_free_games=true`);
    return response.data.response as IGameListResponse
}