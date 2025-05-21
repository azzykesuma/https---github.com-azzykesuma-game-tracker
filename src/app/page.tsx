import ButtonSections from "./component/ButtonSections";
import UserProfile from "./component/UserProfile";

export default async function Main() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 p-6">
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <UserProfile />
        <ButtonSections />
      </div>
    </div>
  );
}
