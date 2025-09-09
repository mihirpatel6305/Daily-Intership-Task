import { useEffect, useRef, useState } from "react";
import getMessageFromNumber from "../utils/getMessageFromNumber";

export default function useWebSocket() {
  const ws = useRef(null);
  const reconnectRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const connectWebsocket = () => {
    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      ws.current.close();
    }

    ws.current = new WebSocket(
      "wss://ws.finnhub.io?token=d2rc4bpr01qlk22slkr0d2rc4bpr01qlk22slkrg"
    );

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
      timeStr &&
        setMessages((prev) => [
          ...prev,
          { text: dummyReceivedMsg, type: "received" },
        ]);
    };

    ws.current.onerror = (err) => console.error("WebSocket error:", err);
  };

  const sendMessage = (msg) => {
    if (msg.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
      setMessages((prev) => [...prev, { text: msg, type: "sent" }]);
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

  return { messages, setMessages, sendMessage };
}
