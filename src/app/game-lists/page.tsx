import Link from 'next/link';
import { convertMinutesToDays } from '../lib/dateFormatter';
import { fetchGameLists } from './actions';
import GameCard from './component/GameCard';
import InnerLayout from '@/components/layout/InnerLayout';
import { IGames } from '@/types';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock10 } from 'lucide-react';

const GameLists = async ({ searchParams }: { searchParams: { sort?: string; search?: string } }) => {
  const gameLists = await fetchGameLists();
  let game_count = 0
  let { games } = gameLists;
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
  game_count = games.length;


  if (sortBy === 'playtime_desc') {
    games.sort((a: IGames, b: IGames) => b.playtime_forever - a.playtime_forever);
  } else if (sortBy === 'alpha_asc') {
    games.sort((a: IGames, b: IGames) => a.name.localeCompare(b.name));
  } 

  const searchAction = async (formData: FormData) => {
    'use server';

    const searchValue = formData.get('search');
    const newSearchQuery = typeof searchValue === 'string' ? searchValue : '';
    const currentSort = resolvedSearchParams.sort || '';

    const params = new URLSearchParams();
    if (newSearchQuery) {
      params.set('search', newSearchQuery);
    }
    if (currentSort) {
      params.set('sort', currentSort);
    }

    redirect(`/game-lists?${params.toString()}`);
  };

  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Your Game Library
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
          Total games in your collection:{" "}
          <span className="font-semibold text-white">{game_count}</span>
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

        <div className="mt-6 flex space-y-5 flex-col md:flex-row items-center justify-between w-full">
          <span className="text-gray-300 text-lg mr-2">Sort by:</span>
          <div className='flex items-center flex-col md:grid md:grid-cols-[50px_80px_1fr] gap-2'>
            <Link
              href={
                "?sort=playtime_desc" +
                (searchQuery ? "&search=" + searchQuery : "")
              }
              className={`
                px-4 w-full flex justify-center md:w-[50px] text-center py-2 rounded-lg text-sm font-medium
                ${
                  sortBy === "playtime_desc"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
                transition-all duration-200
              `}
            >
              <Clock10 />
            </Link>
            <Link
              href={`?sort=alpha_asc${
                searchQuery ? "&search=" + searchQuery : ""
              }`}
              className={`
                px-4 w-full md:w-full text-center py-2 rounded-lg text-sm font-medium
                ${
                  sortBy === "alpha_asc"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
                transition-all duration-200
              `}
            >
              A - Z
            </Link>
            <form
              action={searchAction}
              className="flex items-center gap-3 w-full"
            >
              <Input
                type="text"
                name="search"
                placeholder="Search games by name..."
                defaultValue={searchQuery || ""}
                className="
                flex-grow px-4 py-2 rounded-lg bg-gray-700 text-white
                border border-gray-600 focus:outline-none focus:border-purple-500
                placeholder-gray-400
              "
              />
              <Button
                type="submit"
                className="
                rounded-lg bg-purple-600 text-white font-medium
                hover:bg-purple-700 transition-colors shadow-md
              "
              >
                Search
              </Button>
              {searchQuery && (
                <Link
                  href={"?" + (sortBy ? "sort=" + sortBy : "")}
                  className="
                  px-4 py-2 rounded-lg bg-red-600 text-white font-medium
                  hover:bg-red-700 transition-colors shadow-md
                "
                >
                  Clear
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>

      {games.length === 0 && searchQuery && (
        <p className="text-center text-xl text-gray-400 mt-8">
          No games found matching &quot;{searchQuery}&quot;. Try a different
          search!
        </p>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        {games.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </InnerLayout>
  );
};

export default GameLists
