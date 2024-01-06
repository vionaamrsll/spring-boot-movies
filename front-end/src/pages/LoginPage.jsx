import { useRef } from "react";
import MoviePoster from "../img/movie-poster.jpg";
import { jwtDecode } from "jwt-decode";
export const LoginPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  // function login localhost:8080/api/auth
  async function login(data) {
    try {
      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const parse = await response.json();
        alert(`Login failed: ${parse['errors']}`);
        throw new Error(`HTTP error! Status: ${response.errors}`);
      }

      const responseData = await response.json();

      if (responseData.data && responseData.data.token) {
        // Save the token to cookies
        document.cookie = `userData=${responseData.data.token};`;

        window.location.reload();

        return responseData;
      } else {
        throw new Error("Token not found in the response data");
      }
    } catch (error) {
      return { errors: ["Login failed."] };
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameRef.current.value === "") {
      alert("Username cannot be empty");
      return;
    }
    if (passwordRef.current.value === "") {
      alert("Password cannot be empty");
      return;
    }
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    login(data);
  };

  return (
    <main className="h-screen">
      <section className="grid h-full grid-cols-2">
        <img src={MoviePoster} className="object-cover h-full" />
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-3 px-20 text-white bg-black"
        >
          <h1 className="mb-10 text-lg font-bold text-center">
            Log into your account
          </h1>
          <div>
            <label
              className="block mb-2 text-sm font-semibold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              ref={usernameRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
