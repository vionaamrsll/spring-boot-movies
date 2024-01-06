import { jwtDecode } from "jwt-decode";
import { useRef } from "react";

export const AddMovie = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const ratingRef = useRef();
  const airtimeRef = useRef();

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

  // post localhost:8080/api/movies
  const addMovie = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("Movie added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      title: titleRef?.current?.value,
      description: descriptionRef?.current?.value,
      rating: ratingRef?.current?.value,
      schedule: airtimeRef?.current?.value,
    };

    addMovie(data);
  };

  return (
    <form className="flex flex-col gap-3 mt-20 w-96" onSubmit={handleEdit}>
      <label>Title</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-lg"
        ref={titleRef}
        required
      />
      <label>Description</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={descriptionRef}
      />
      <label>Rating</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={ratingRef}
      />
      <label>Airtime</label>
      <input
        type="datetime-local"
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={airtimeRef}
      />
      <button
        type="button"
        className="p-2 text-white bg-yellow-500 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Cancel
      </button>
      <button type="submit" className="p-2 text-white bg-blue-500 rounded-lg">
        Add
      </button>
    </form>
  );
};
