import { log } from "console";
import React, { useState } from "react";

type ResponseData = {
  message: string;
  error: string;
};

interface LoginFormState {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw data.error;
      }
      // Parse the API response and update the state
      const responseData: ResponseData = await response.json();
      if (response.status === 200) {
        setMessage(responseData.message);
      }
    } catch (error) {
      setMessage(error as string);
    }
  };

  return (
    <form
      className="flex flex-col p-6 bg-blue-300 w-80	"
      onSubmit={handleSubmit}
    >
      <label>
        UserName:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        />
      </label>
      <button
        type="submit"
        className="block w-full px-4 py-2 mt-2 bg-purple-700 text-white border rounded-md "
      >
        Login
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
