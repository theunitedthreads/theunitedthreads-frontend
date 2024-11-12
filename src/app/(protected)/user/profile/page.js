import ProfileContainer from "./_components/ProfileContainer";

export const metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function ProfilePage() {
  return (
    <div className="px-5 md:px-10 lg:mx-auto lg:w-[85%] 2xl:w-3/4">
      <ProfileContainer />
    </div>
  );
}
