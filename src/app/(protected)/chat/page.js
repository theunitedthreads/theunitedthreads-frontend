import ChatContainer from "./_components/ChatContainer";

export const metadata = {
  title: "Messages",
  description: "Messages page",
};

export default function Chat() {
  return (
    <div className="mx-auto w-full px-4 md:w-[90%] md:px-0 lg:w-[70%]">
      <ChatContainer />
    </div>
  );
}
