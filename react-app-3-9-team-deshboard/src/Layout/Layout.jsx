import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useSelector } from "react-redux";

function Layout() {
  const isAuthenticated = useSelector((state) => !!state?.auth?.token);
  return (
    <div className="flex h-screen">
      {isAuthenticated && (
        <div className="w-56 h-full bg-white border-r">
          <NavBar />
        </div>
      )}

      <main className="flex-1 h-screen overflow-y-scroll no-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
