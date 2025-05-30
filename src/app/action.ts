"use server";
import { ISteamAvatar, SteamPlayerSummary } from "@/types";
import axios from "axios";
import * as jose from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE, STEAM_ID_COOKIE } from "./lib/constant";

const encodedKey = new TextEncoder().encode(process.env.SECRET_KEY);
export async function encrypt(payload: jose.JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export const fetchUserData = async () => {
  const steamIdCookies =  (await cookies()).get(STEAM_ID_COOKIE);
  let steamId;

  if (!steamIdCookies) {
    steamId = process.env.MY_ID
  } else {
    const id = await decrypt(steamIdCookies?.value);
    steamId = id?.steamId
  }


  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_KEY}&steamids=${steamId}`
  );
  const result: SteamPlayerSummary = response.data.response.players[0];
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  if (!cookieStore.get(SESSION_COOKIE)) {
    const session = await encrypt({ result, expiresAt });
    (await cookies()).set(SESSION_COOKIE, session, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expiresAt,
    });
  }
  return result;
};

export const fetchUserAvatar = async () => {
  const steamIdCookies =  (await cookies()).get(STEAM_ID_COOKIE);
  let steamId;

  if (!steamIdCookies) {
    steamId = process.env.MY_ID
  } else {
    const id = await decrypt(steamIdCookies?.value);
    steamId = id?.steamId
  }


  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetAnimatedAvatar/v1/?key=${process.env.STEAM_KEY}&steamid=${steamId}`
  );
  const result = response.data.response.avatar as ISteamAvatar['avatar']
  return result;
};

export const fetchUserAvatarFrame = async () => {
  const steamIdCookies =  (await cookies()).get(STEAM_ID_COOKIE);
  let steamId;

  if (!steamIdCookies) {
    steamId = process.env.MY_ID
  } else {
    const id = await decrypt(steamIdCookies?.value);
    steamId = id?.steamId
  }


  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetAvatarFrame/v1/?key=${process.env.STEAM_KEY}&steamid=${steamId}`
  );
  const result = response.data.response.avatar_frame as ISteamAvatar['avatar']
  return result;
};

export const fetchUserBackground = async () => {
  const steamIdCookies =  (await cookies()).get(STEAM_ID_COOKIE);
  let steamId;

  if (!steamIdCookies) {
    steamId = process.env.MY_ID
  } else {
    const id = await decrypt(steamIdCookies?.value);
    steamId = id?.steamId
  }


  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/IPlayerService/GetProfileBackground/v1/?key=${process.env.STEAM_KEY}&steamid=${steamId}`
  );
  const result = response.data.response.profile_background.image_large as string
  return result;
};



export const setCookie = async (name: string, value: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set(name, value, {
    httpOnly: false,
    secure: true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
    expires: expiresAt,
  });
};

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jose.jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { steamId: string };
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}