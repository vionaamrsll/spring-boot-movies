import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const MovieTable = ({ movieData, onEdit }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // get userData in cookie, decode, and store is_admin to isAdmin state
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

  // delete data localhost:8080/api/movies/{id}, header Authorization: token
  const deleteMovie = async (id) => {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.ok) {
      alert("Movie deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete movie");
    }
  };

  const handleDetele = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(id);
    }
  };

  return (
    <div>
      <h1 className="my-10 text-xl font-bold text-center">Movie Schedule</h1>
      <table className="border-2">
        <thead className="text-white bg-blue-700">
          <tr className="[&>*]:border-2 [&>*]:p-2">
            <th>Title</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Airtime</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {movieData.map((movie) => (
            <tr key={movie.id} className="[&>*]:border-2 [&>*]:p-1 ">
              <td>{movie.title}</td>
              <td className="w-96">{movie.description}</td>
              <td className="text-center">{movie.rating}</td>
              <td>{movie.schedule.replace("T", " ")}</td>
              {isAdmin && (
                <td className="flex gap-2">
                  <button
                    className="p-2 text-white bg-red-500"
                    onClick={() => handleDetele(movie.id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(movie)}
                    className="p-2 text-white bg-yellow-500"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
