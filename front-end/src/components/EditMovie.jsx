import { useRef } from "react";

export const EditMovie = ({ movieData }) => {
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

  // put localhost:8080/api/movies
  const updateMovie = async (data, movieData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movies/${movieData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("Movie updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const movieId = movieData.id;
    const data = {
      title: titleRef?.current?.value,
      description: descriptionRef?.current?.value,
      rating: ratingRef?.current?.value,
      schedule: airtimeRef?.current?.value,
    };

    updateMovie(data, movieData);
  };

  return (
    <form className="flex flex-col gap-3 mt-20 w-96" onSubmit={handleEdit}>
      <label>Title</label>
      <input
        type="text"
        defaultValue={movieData.title}
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={titleRef}
      />
      <label>Description</label>
      <input
        type="text"
        defaultValue={movieData.description}
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={descriptionRef}
      />
      <label>Rating</label>
      <input
        type="text"
        defaultValue={movieData.rating}
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={ratingRef}
      />
      <label>Airtime</label>
      <input
        type="datetime-local"
        defaultValue={movieData.schedule}
        className="p-2 border-2 border-black rounded-lg"
        required
        ref={airtimeRef}
      />
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="p-2 text-white bg-yellow-500 rounded-lg"
      >
        Cancel
      </button>
      <button type="submit" className="p-2 text-white bg-blue-500 rounded-lg">
        Edit
      </button>
    </form>
  );
};
