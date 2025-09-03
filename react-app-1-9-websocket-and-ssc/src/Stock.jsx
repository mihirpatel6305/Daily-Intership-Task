import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { throttle } from "lodash";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Stock() {
  const socketRef = useRef(null);
  const reconnectTimeout = useRef(null);
  const queryClient = useQueryClient();

  const { data: trade } = useQuery({
    queryKey: ["BTCUSDT-trade"],
    queryFn: () => null, // WebSocket push data in cache
    initialData: null,
  });

  const updateCache = throttle((tradeData) => {
    queryClient.setQueryData(["BTCUSDT-trade"], tradeData);
  }, 100); // Update UI in every 1 second

  const connect = () => {
    socketRef.current = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socketRef.current.onopen = () => {
      console.log("Connected to Finnhub WebSocket");
      socketRef.current.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data?.length > 0) {
        updateCache(data.data[0]); // update cache on new message
        console.log("New trade:", data.data[0]);
      }
    };

    socketRef.current.onclose = () => {
      console.log("Connection closed");
      reconnectTimeout.current = setTimeout(connect, 3000);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error", err);
      socketRef.current.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeout.current);
      socketRef.current?.close();
    };
  }, []);

  return (
    <div className="p-6 border rounded-xl shadow-lg w-96 text-center bg-white transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer">
      <h2 className="font-bold mb-4 text-xl text-gray-900">
        BINANCE:BTCUSDT Live Trade
      </h2>
      {trade ? (
        <div className="space-y-2">
          <p className="text-green-600 font-semibold text-lg transition-colors duration-500">
            Price: ${trade.p}
          </p>
          <p className="text-gray-700">Volume: {trade.v}</p>
          <p className="text-gray-500 text-sm">
            Time: {new Date(trade.t).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic">Waiting for trades...</p>
      )}
    </div>
  );
}
