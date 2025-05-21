export interface SteamPlayerSummary {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname?: string;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
}

export interface IGames {
  appid: number
  name: string
  playtime_forever: number
  img_icon_url: string
  has_community_visible_stats: boolean
  playtime_windows_forever: number
  playtime_mac_forever: number
  playtime_linux_forever: number
  playtime_deck_forever: number
  content_descriptorids: number[]
  playtime_disconnected: number
}

export type IRecentlyPlayedGame = Omit<IGames, 'playtime_disconnected' | 'content_descriptorids'>

export interface IGameListResponse {
  games: IGames[]
  game_count: number
}

export interface SteamAchievement {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  description: string;
  icon: string;
  icongray: string;
}

export interface PersonalAchievement {
  apiname : string;
  achieved : number;
  unlocktime : number
}

export interface IAchievement {
  data : {
      game : {
        availableGameStats : {
          achievements : SteamAchievement[] 
        }
      }
  }
}

export interface PlayerStats  {
  data : {
    playerstats : {
      achievements : PersonalAchievement[]
      stats: {name : string, value : number}[]
    }
    gameName : string;
    achievements : {name : string, achieved : number}[]

  }
}

export interface GlobalAchievement {
  name : string;
  percent : number;
}
export interface IGlobalAchievementPercentages  {
  data : {
    achievementpercentages : {
      achievements : {
        achievement : GlobalAchievement[]
      }
    }
    gameName : string;
  }
}

export interface IRecentlyPlayed {
  data : {
    response : {
      games : IRecentlyPlayedGame[]
      total_count : number
    }
  }
}