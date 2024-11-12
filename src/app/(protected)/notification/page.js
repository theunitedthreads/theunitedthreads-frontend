import NotificationContainer from "./_components/NotificationContainer";

export const metadata = {
  title: "Notifications",
  description: "Notifications page",
};

export default function UserNotificationsPage() {
  return (
    <div className="px-5 md:px-10 lg:mx-auto lg:w-[85%] 2xl:w-3/4">
      <NotificationContainer />
    </div>
  );
}
