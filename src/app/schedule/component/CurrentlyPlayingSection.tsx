'use client'
import { GameItem } from '@/types'
import { Play, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CurrentlyPlayingSection = ({currentlyPlayingGame} : {currentlyPlayingGame:  GameItem | undefined}) => {
  return (
      <section className="mb-12 bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-xl shadow-2xl border-b-4 border-r-4 border-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6 flex items-center drop-shadow-[0_0_8px_rgba(255,255,0,0.5)]">
          <Play className="mr-4 text-lg md:text-5xl" /> Currently Playing
        </h2>
        {currentlyPlayingGame?.appid ? (
          <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <Image
              src={`http://media.steampowered.com/steamcommunity/public/images/apps/${currentlyPlayingGame?.appid}/${currentlyPlayingGame.img_icon_url}.jpg`}
              alt={currentlyPlayingGame.name}
              className="rounded-full object-cover border-4 border-blue-500 shadow-md mb-4 md:mb-0 md:mr-6"
              width={96}
              height={96}
            />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-3xl font-extrabold text-white mb-2">
                {currentlyPlayingGame.name}
              </h3>
              <p className="text-green-400 md:text-xl mt-3 font-semibold flex items-center justify-center md:justify-start">
                <Star className="mr-2 animate-pulse" /> Playing Now!
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            No game currently marked as playing.
          </p>
        )}
      </section>
  )
}

export default CurrentlyPlayingSection
