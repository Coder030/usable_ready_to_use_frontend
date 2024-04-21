"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./style.css";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { FaBloggerB, FaHome } from "react-icons/fa";

function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emp, setEmp] = useState(false);
  const [nf, setNf] = useState(false);
  const [f, setF] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    setNf(false);
    setF(false);
    setEmp(false);
    if (username === "" || password === "") {
      setLoading(false);
      setEmp(true);
      setNf(false);
      return false;
    } else {
      setEmp(false);
      const response = await fetch("http://localhost:2000/get_cookie", {
        method: "POST",
        body: JSON.stringify({ name: username, password: password }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data["data"] === "nf") {
        setLoading(false);
        setNf(true);
        return false;
      } else {
        setF(true);
        setNf(false);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <h1 className="heading">Good to see you again</h1>
      <div className="card">
        <p className="l1">Your username</p>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="i1"
          type="text"
        />
        <p className="l2">Your password</p>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="i2"
          type="password"
          minLength={6}
        />
        <div className="cont">
          <button onClick={handleClick} className="bootyKicked">
            Sign in
          </button>
        </div>
        <Link href="/signup">
          <p className="linkyeah">Don{`'`}t have an account on Chatly??</p>
        </Link>
      </div>
      {emp && <p className="emp">Empty request</p>}
      {nf && (
        <p className="nftrue">This doesn{`'`}t match. Please try again?</p>
      )}
      {f && <p className="f">Success! The user has been found!</p>}
      {loading && <p className="emp2">Loading...</p>}
    </div>
  );
}

export default Page;
