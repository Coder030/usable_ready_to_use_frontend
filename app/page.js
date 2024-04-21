"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./style.css";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:2000/chat");
      const socket = socketRef.current;
      setSocket(socket);
    }
  }, []);
  useEffect(() => {
    const fetchy = async () => {
      const rep = await fetch("http://localhost:2000/api/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await rep.json();
      console.log(data["data"]);
      if (data["message"] == "nvt") {
        router.push("/signin");
      } else {
        console.log("yay");
      }
    };
    fetchy();
  }, [socket, router]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
