import { useEffect, useRef, useState } from "react";
import getMessageFromNumber from "../utils/getMessageFromNumber";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const WS_URL = import.meta.env.VITE_WS_URL;

function useWebSocket() {
  const queryClient = useQueryClient();
  const ws = useRef(null);
  const reconnectRef = useRef(null);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => [],
    staleTime: Infinity,
  });

  const connectWebsocket = () => {
    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      ws.current.close();
    }

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Connected to websocket");
      ws.current.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    };

    ws.current.onclose = () => {
      console.log("Connection closed. Retrying in 3s...");
      if (!reconnectRef.current) {
        reconnectRef.current = setTimeout(() => {
          connectWebsocket();
          reconnectRef.current = null;
        }, 3000);
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const timeStr = data?.data[0]?.t;
      const dummyReceivedMsg = getMessageFromNumber(timeStr);

      if (timeStr) {
        queryClient.setQueryData(["messages"], (prev = []) => [
          ...prev,
          { text: dummyReceivedMsg, type: "received", read: false },
        ]);
      }
    };

    ws.current.onerror = (err) => console.error("WebSocket error:", err);
  };

  const sendMessage = (msg) => {
    if (msg.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
      queryClient.setQueryData(["messages"], (prev = []) => [
        ...prev,
        { text: msg, type: "sent" },
      ]);
    }
  };

  useEffect(() => {
    connectWebsocket();

    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      if (ws.current && ws.current.readyState !== WebSocket.CLOSED)
        ws.current.close();
    };
  }, []);

  return { sendMessage };
}

export default useWebSocket;
