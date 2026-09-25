"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("Nyali Branch");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, branch }),
    });
    if (!response.ok) {
      const result = await response.json();
      return setError(result.error);
    }

    setMessage("Account registered. You can now log in.");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff5f1] px-5 text-[#38221d]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-7 shadow-sm sm:p-9"
      >
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f5a623]">
          Ai-CHA admin
        </p>
        <h1 className="mt-2 font-serif text-4xl">Create account.</h1>
        <p className="mt-2 text-sm text-[#8f7167]">
          Register an admin account for this local dashboard.
        </p>
        <div className="mt-7 flex flex-col gap-4">
          <label className="text-sm font-semibold">
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
              required
            />
          </label>
          <label className="text-sm font-semibold">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
              required
            />
          </label>
          <label className="text-sm font-semibold">
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
              required
            />
          </label>
          <label className="text-sm font-semibold">
            Branch
            <select
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
            >
              <option>Nyali Branch</option>
              <option>Fontanella Branch</option>
            </select>
          </label>
          <label className="text-sm font-semibold">
            Password
            <input
              type="password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
              required
            />
          </label>
          <label className="text-sm font-semibold">
            Confirm password
            <input
              type="password"
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]"
              required
            />
          </label>
        </div>
        {error && (
          <p className="mt-3 text-sm font-semibold text-[#b0443b]">{error}</p>
        )}
        {message && (
          <p className="mt-3 text-sm font-semibold text-[#4d754d]">{message}</p>
        )}
        <button
          type="submit"
          className="mt-6 h-12 w-full rounded-full bg-[#e9002b] font-semibold text-white transition hover:bg-[#b80022]"
        >
          Register account
        </button>
        <p className="mt-5 text-center text-sm text-[#8f7167]">
          Already registered?{" "}
          <Link href="/admin/login" className="font-semibold text-[#e9002b]">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
