import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";

export const UserProfile = () => {
  const usernameRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const getToken = () => {
    const userDataCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("userData="));

    if (userDataCookie) {
      // Extract the token value without the "userData=" prefix
      const token = userDataCookie.substring("userData=".length);
      return token;
    }
  };

  // fetch user detail localhost:8080/api/users
  useEffect(() => {
    const token = getToken();
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        usernameRef.current.value = data.data.username;
        fullNameRef.current.value = data.data.fullName;
        emailRef.current.value = data.data.email;
        phoneRef.current.value = data.data.phone;
      });
  }, []);

  // put localhost:8080/api/users
  const updateProfile = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: usernameRef.current.value,
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    updateProfile(data);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  const getUserRole = () => {
    const userData = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("userData="));
    if (userData) {
      const decodedData = jwtDecode(userData);
      setIsAdmin(decodedData.is_admin);
    }
  };

  useEffect(() => {
    getUserRole();
  }, []);

  return (
    <form className="flex flex-col gap-3 mt-20 w-96" onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-lg"
        required
        disabled={!isAdmin}
        ref={usernameRef}
        readOnly
      />
      <label>Full Name</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-lg"
        required
        disabled={!isAdmin}
        ref={fullNameRef}
      />
      <label>Email</label>
      <input
        type="email"
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={emailRef}
        disabled={!isAdmin}
      />
      <label>phone</label>
      <input
        type="tel"
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={phoneRef}
        disabled={!isAdmin}
      />
      {isAdmin && (
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 border-2 border-black rounded-lg"
        >
          Update
        </button>
      )}
      <button
        type="button"
        className="p-2 text-white bg-yellow-500 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Cancel
      </button>
    </form>
  );
};
