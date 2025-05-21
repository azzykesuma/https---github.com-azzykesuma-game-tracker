import Link from 'next/link';
import { convertMinutesToDays } from '../lib/dateFormatter';
import { fetchGameLists } from './actions';
import GameCard from './component/GameCard';
import InnerLayout from '@/components/layout/InnerLayout';

const GameLists = async () => {
  const gameLists = await fetchGameLists();
  const { game_count, games } = gameLists;

  const ALLMINUTESPLAYTIME = gameLists.games.map(item => item.playtime_forever).reduce((a, b) => a + b, 0);

  return (
    <InnerLayout>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Your Game Library
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
          Total games in your collection: <span className="font-semibold text-white">{game_count}</span>
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 leading-relaxed">
          TOTAL PLAYTIME: <strong className="text-red-300">{convertMinutesToDays(ALLMINUTESPLAYTIME)}</strong> days!
          <br className="sm:hidden"/>
          <span className="block mt-2 sm:inline sm:ml-2 text-gray-400 font-normal italic">
            Feeling productive yet? 😉
          </span>
        </h2>
        <Link href="/">Back Home 🏠</Link>
      </div>

      {/* Game Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        {games.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </InnerLayout>
  );
};

export default GameLists
