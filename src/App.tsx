import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Getting message", message.data);
      setMessage(message.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  const ref = useRef<HTMLInputElement>(null);

  if (!socket) {
    return <div> Loading... </div>;
  }
  return (
    <>
      <input type="text" ref={ref} />
      <button
        onClick={() => {
          socket.send(ref.current?.value!);
        }}
      >
        Send
      </button>

      <div>{message}</div>
    </>
  );
}

export default App;
