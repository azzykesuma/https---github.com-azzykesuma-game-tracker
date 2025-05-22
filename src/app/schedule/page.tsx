import BackButton from "@/components/layout/BackButton";
import InnerLayout from "@/components/layout/InnerLayout";
import { IDoc } from "@/types";
import { db } from "../lib/firebase";
import { fetchCurrentlyPlaying, fetchToPlayData, updateCurrentlyPlaying } from "./action";
import SchedulePlay from "./component/SchedulePlay";

const Schedule = async () => {
  const data = (await fetchToPlayData(db)) as IDoc['toPlay'];
  const currentlyPLaying = (await fetchCurrentlyPlaying(db)) as {gameId: string};

  const update = async (gameId: string) => {
      'use server'
      await updateCurrentlyPlaying(db, gameId);
  }
  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Schedule
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
          Personal Gaming Schedule
        </p>
        {/* Back Button */}
        <div className="my-5">
          <BackButton />
        </div>
        <SchedulePlay data={data} currentlyPLaying={currentlyPLaying.gameId} update={update} />
      </div>
    </InnerLayout>
  );
};

export default Schedule;
