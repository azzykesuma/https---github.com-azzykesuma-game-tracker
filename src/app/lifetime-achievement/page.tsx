import InnerLayout from '@/components/layout/InnerLayout'
import Link from 'next/link';
import React from 'react'
import { fetchMyAchievement } from '../game-lists/[id]/action';

const LifetimeAchievement = async() => {
    // const myAchievements = await fetchMyAchievement();
  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Lifetime Achievement
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
            Friendly Reminder : Game Achievement IS NOT actual life achievement 😉
        </p>

        <Link href="/">Back Home 🏠</Link>
      </div>
    </InnerLayout>
  );
}

export default LifetimeAchievement
