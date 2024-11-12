import { getSocketEndpoint } from "@/config/envConfig";
import { useGetCsrIdQuery } from "@/redux/api/userApi";
import { selectToken } from "@/redux/features/authSlice";
import { successToast } from "@/utils/customToast";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socketLoading, setSocketLoading] = useState(false);
  const token = useSelector(selectToken);
  const [chatIdFromSocket, setChatIdFromSocket] = useState(null);

  const { data: chatReceiverIdRes } = useGetCsrIdQuery(null, { skip: !token });
  const chatReceiverId = useMemo(() => {
    return chatReceiverIdRes?.data?._id;
  }, [chatReceiverIdRes]);

  const socket = useMemo(() => {
    setSocketLoading(true);

    if (token) {
      const socketStore = io(getSocketEndpoint(), {
        transports: ["websocket"],
        auth: {
          token,
        },
      });

      socketStore.on("connect", () => {
        // successToast("Connected to server");
        setSocketLoading(false);
      });

      return socketStore;
    }
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketLoading,
        setChatIdFromSocket,
        chatIdFromSocket,
        chatReceiverId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
