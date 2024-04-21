"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FaBloggerB, FaHome } from "react-icons/fa";

function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emp, setEmp] = useState(false);
  const [same, setSame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suc, setSuc] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    setSuc(false);
    setSame(false);
    setEmp(false);
    if (username === "" || password === "") {
      setLoading(false);
      setEmp(true);
      return false;
    } else {
      setEmp(false);
      const response = await fetch("http://localhost:2000/make_cookie", {
        method: "POST",
        body: JSON.stringify({ name: username, password: password }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data["message"] === "same") {
        setLoading(false);
        setSame(true);
        setSuc(false);
      } else {
        setSame(false);
        setSuc(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <h1 className="heading">Create a free account now</h1>
      <div className="card">
        <p className="l1">Username</p>
        <input
          className="i1"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <p className="l2">Password</p>
        <input
          className="i2"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="cont">
          <button onClick={handleClick} className="bootyKicked">
            Sign up
          </button>
        </div>
        <Link href="/signin">
          <p className="linkyeah">Already registered on Chatly?</p>
        </Link>
      </div>
      {emp && <p className="emp">Empty request</p>}
      {same && (
        <p className="emp">This username is already taken. Try another?</p>
      )}
      {suc && <p className="suc">Success! New user created!</p>}
      {loading && <p className="load">Loading...</p>}
    </div>
  );
}

export default Page;
