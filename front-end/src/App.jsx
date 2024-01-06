import { LoginPage } from "./pages/LoginPage";
import { MovieList } from "./pages/MovieList";

const ProtectedPage = () => {
  const isLogin = () => {
    // get userData cookie, return true if not null
    const userData = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("userData="));

    return userData ? true : false;
  };
  console.log(isLogin());

  return isLogin() ? <MovieList /> : <LoginPage />;
};

export default function App() {
  return <ProtectedPage />;
}
