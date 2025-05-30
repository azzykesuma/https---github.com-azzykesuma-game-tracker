import InnerLayout from '@/components/layout/InnerLayout';
import { IGames } from '@/types';
import Link from 'next/link';
import { convertMinutesToDays } from '../lib/dateFormatter';
import { fetchGameLists } from './actions';
import GameCard from './component/GameCard';
import GameFilters from './component/GameFilter';
import { Suspense } from 'react';

const GameLists = async ({ searchParams }: { searchParams: Promise<{sort: string, search : string}>}) => {
  const gameLists = await fetchGameLists();
  let { games } = gameLists;
  const totalApiGameCount = gameLists.game_count; // Total games from API
  const ALLMINUTESPLAYTIME = games.map(item => item.playtime_forever).reduce((a, b) => a + b, 0);

  const resolvedSearchParams = await Promise.resolve(searchParams);
  const sortBy = resolvedSearchParams.sort;
  const searchQuery = resolvedSearchParams.search;

  let filteredGames = games;

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    filteredGames = games.filter((game: IGames) =>
      game.name.toLowerCase().includes(lowerCaseSearchQuery)
    );
  }

  games = filteredGames;
  const displayedGameCount = games.length; // Count of games after filtering


  if (sortBy === 'playtime_desc') {
    games.sort((a: IGames, b: IGames) => b.playtime_forever - a.playtime_forever);
  } else if (sortBy === 'alpha_asc') {
    games.sort((a: IGames, b: IGames) => a.name.localeCompare(b.name));
  } 


  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Your Game Library
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
          Total games in your collection:{" "}
          <span className="font-semibold text-white">{totalApiGameCount}</span>
        </p>
        <p className="text-base sm:text-lg text-gray-400 mb-6">
          Displaying:{" "}
          <span className="font-semibold text-white">{displayedGameCount}</span>
          {searchQuery && ` (filtered by "${searchQuery}")`}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 leading-relaxed">
          TOTAL PLAYTIME:{" "}
          <strong className="text-red-300">
            {convertMinutesToDays(ALLMINUTESPLAYTIME)}
          </strong>{" "}
          days!
          <br className="sm:hidden" />
          <span className="block mt-2 sm:inline sm:ml-2 text-gray-400 font-normal italic">
            Feeling productive yet? 😉
          </span>
        </h2>
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Back Home 🏠
        </Link>

        <GameFilters />
      </div>

      {games.length === 0 && searchQuery && (
        <p className="text-center text-xl text-gray-400 mt-8">
          No games found matching &quot;{searchQuery}&quot;. Try a different
          search!
        </p>
      )}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {games.map((game) => (
              <GameCard key={game.appid} game={game} />
            ))}
        </div>
        </Suspense>
    </InnerLayout>
  );
};

export default GameLists
