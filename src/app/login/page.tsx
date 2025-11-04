"use client";

import { FormEvent, useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="h-[500px] flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className="bg-gray-300 text-black"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password || ""}
            className="bg-gray-300 text-black"
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
