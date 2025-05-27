'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock10 } from 'lucide-react';

const GameFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentSearchQuery = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(currentSearchQuery);

  useEffect(() => {
    setSearchInput(currentSearchQuery);
  }, [currentSearchQuery]);

  const handleSearchSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    if (currentSort) {
      params.set('sort', currentSort);
    } else {
      params.delete('sort');
    }
    router.push(`/game-lists?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    if (currentSort) {
      params.set('sort', currentSort);
    } else {
      params.delete('sort');
    }
    router.push(`/game-lists?${params.toString()}`);
  };

  return (
    <div className="mt-6 flex space-y-5 flex-col md:flex-row items-center justify-between w-full">
      <span className="text-gray-300 text-lg mr-2">Sort by:</span>
      <div className="flex items-center flex-col md:grid md:grid-cols-[50px_80px_1fr] gap-2">
        <Link
          href={`?sort=playtime_desc${currentSearchQuery ? "&search=" + currentSearchQuery : ""}`}
          className={`
            px-4 w-full flex justify-center md:w-[50px] text-center py-2 rounded-lg text-sm font-medium
            ${
              currentSort === "playtime_desc"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }
            transition-all duration-200
          `}
        >
          <Clock10 />
        </Link>
        <Link
          href={`?sort=alpha_asc${currentSearchQuery ? "&search=" + currentSearchQuery : ""}`}
          className={`
            px-4 w-full md:w-full text-center py-2 rounded-lg text-sm font-medium
            ${
              currentSort === "alpha_asc"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }
            transition-all duration-200
          `}
        >
          A - Z
        </Link>
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-3 w-full"
        >
          <Input
            type="text"
            name="search"
            placeholder="Search games by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
          {currentSearchQuery && (
            <Button
              type="button"
              onClick={handleClearSearch}
              className="
                px-4 py-2 rounded-lg bg-red-600 text-white font-medium
                hover:bg-red-700 transition-colors shadow-md
              "
            >
              Clear
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GameFilters;

