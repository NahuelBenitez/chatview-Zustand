//ESTA ES LA PAGINA CHAT
import { useRef, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useStore from "./store";

import { io } from "socket.io-client";
import { Message } from "./components/Message";

const Home = () => {
  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    console.log(setUsername);
    navigate("/");
  };

  const [messages, setMessages] = useState([]);
  const socketRef = useRef(
    io("http://localhost:3000", { query: { username } })
  );
  const formRef = useRef(null);

  useEffect(() => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(formRef.current);
      const input = formData.get("message");
      const message = input.trim();
      if (message !== "") {
        // Enviar el mensaje al servidor
        socketRef.current.emit("message", message);
        formRef.current.reset();
        setMessages((messages) => [
          ...messages,
          {
            username,
            message,
            isFromMe: true,
          },
        ]);
      }
    };

    socketRef.current.on("message-received", (data) => {
      setMessages((messages) => [
        ...messages,
        {
          username: data.from.username,
          message: data.message,
          isFromMe: false,
        },
      ]);
    });

    formRef.current = document.querySelector("form");
    formRef.current.addEventListener("submit", handleSubmit);

    return () => {
      formRef.current.removeEventListener("submit", handleSubmit);
    };
  }, [username]);

  return (
    <div className="bg-slate-900">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl text-center text-white">
          Welcome, {username}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-3 rounded-lg m-2 flex justify-end"
        >
          Logout
        </button>
      </header>

      <main className="bg-slate-800">
        <section className="p-3 ">
          <div id="messages-container" className="bg-slate-900 rounded-lg">
            <div id="messages">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  username={username}
                  message={message.message}
                  isFromMe={message.isFromMe}
                />
              ))}
            </div>
          </div>
          <form ref={formRef} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
  <input
    type="text"
    name="message"
    placeholder="Type a message"
    required
    className="px-4 py-2 rounded-lg border border-blue-400 shadow-sm focus:outline-none focus:border-blue-600 bg-white flex-grow"
  />
  <button
    type="submit"
    aria-label="send-message-button"
    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
  >
    ➡
  </button>
</form>

        </section>
      </main>
    </div>
  );
};

export default Home;
