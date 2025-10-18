"use client";
import React from "react";

export default function page() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/auth/signup`, {
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
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className="bg-gray-300 text-black"
          />
        </div>
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
