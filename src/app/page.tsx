import InnerLayoutWithBackground from "@/components/layout/InnerLayoutWithBackground";
import ButtonSections from "./component/ButtonSections";
import UserProfile from "./component/UserProfile";

export default async function Main() {
  return (
    <InnerLayoutWithBackground>
      <div className="absolute inset-0 z-5 bg-gradient-to-br from-gray-950/30 to-gray-800/80"></div>{" "}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto
                      bg-white/10 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8 shadow-2xl"
      >
        <UserProfile />
        <ButtonSections />
      </div>
    </InnerLayoutWithBackground>
  );
}
