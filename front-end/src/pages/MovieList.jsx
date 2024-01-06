import { useEffect, useState } from "react";
import { MovieTable } from "../components/MovieTable";
import { EditMovie } from "../components/EditMovie";
import { AddMovie } from "../components/AddMovie";
import { jwtDecode } from "jwt-decode";

export const MovieList = () => {
  const [movieData, setMovieData] = useState(null); // set state pas onsukses fetch data
  const [editData, setEditData] = useState(null);
  const [pageState, setPageState] = useState("read"); // read, add, edit

  const handleEdit = (data) => {
    setEditData(data);
    setPageState("edit");
  };

  console.log(editData);

  const navigateAdd = () => {
    setPageState("add");
  };

  const handleLogout = () => {
    // remove token
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

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

  // fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${getToken()}`,
          },
        });
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (movieData == null ) { 
      fetchMovieData();
    }
  });

  return (
    <div className="flex flex-col items-center h-screen text-black bg-white">
      {pageState === "read" && movieData && (
        <MovieTable movieData={movieData.data} onEdit={handleEdit} />
      )}
      {pageState === "edit" && <EditMovie movieData={editData} />}
      {pageState === "add" && <AddMovie />}
      <div className="absolute space-x-2 bottom-3 right-3">
        {isAdmin && (
          <button
            className="p-2 text-white bg-green-500 rounded-lg"
            onClick={navigateAdd}
          >
            Add
          </button>
        )}
        <button
          className="p-2 text-white bg-red-500 rounded-lg "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
