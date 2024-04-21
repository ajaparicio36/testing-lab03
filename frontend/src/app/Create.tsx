import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [newPog, setNewPog] = useState({
    name: "",
    symbol: "",
    price: "",
    color: "#000000", // Default color is black
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPog({ ...newPog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/manage/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPog),
      });
      if (response.ok) {
        console.log("Pog created successfully.");
        navigate("/admin"); // Navigate to the home page after successful creation
      } else {
        console.error("Failed to create Pog.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="bg-white border border-gray rounded-md p-4">
        <h2 className="text-primary font-semibold mb-4">Create Pog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-primary font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPog.name}
              onChange={handleChange}
              className="border border-gray rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="symbol"
              className="block text-primary font-semibold mb-2"
            >
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={newPog.symbol}
              onChange={handleChange}
              className="border border-gray rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-primary font-semibold mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={newPog.price}
              onChange={handleChange}
              className="border border-gray rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-primary font-semibold mb-2"
            >
              Color
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={newPog.color}
              onChange={handleChange}
              className="border border-gray rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-gray text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
