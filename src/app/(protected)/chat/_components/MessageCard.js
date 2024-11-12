import React, { useEffect, useState } from "react";
import OwnerMsgCard from "./OwnerMsgCard";
import ReceiverMsgCard from "./ReceiverMsgCard";
import { format } from "date-fns";

export default function MessageCard({ message, userId, previousMessage }) {
  const isDifferentSender =
    !previousMessage || previousMessage.sender !== message.sender;

  // format message sent time
  const [sentTime, setSentTime] = useState("");
  useEffect(() => {
    if (isDifferentSender) {
      setSentTime(format(message?.createdAt, "dd MMM, h:mm a"));
    }
  }, [isDifferentSender, message]);

  return (
    <div className="">
      {/* {lastSender} */}
      {message?.sender === userId ? (
        <div className="flex flex-col items-end">
          <div>
            <p className="text-muted-foreground text-end text-sm">{sentTime}</p>

            <OwnerMsgCard message={message} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <p className="text-muted-foreground ml-12 text-sm">{sentTime}</p>
          <ReceiverMsgCard
            message={message}
            isDifferentSender={isDifferentSender}
          />
        </div>
      )}
    </div>
  );
}
