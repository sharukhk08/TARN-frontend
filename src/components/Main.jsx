import React, { useState, useEffect } from "react";
import { useCrud } from "../hooks/useCrud";
import { useAuthProvider } from "../contexts/AuthProvider";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Main = () => {
  const { todos } = useCrud();

  const [isDropDownShow, setDropDownShow] = useState(false);
  const { logout, user } = useAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/todo");
    }
  }, [location]);
  console.log(location.pathname);
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
        {isDropDownShow && (
          <div
            className="user-dropdown-menu-overlay"
            onClick={() => setDropDownShow((prevState) => !prevState)}
          ></div>
        )}

        <div className=" absolute left-10 top-6 bg-white  rounded-sm">
          {location.pathname === "/todo" ? (
            <h6
              onClick={() => navigate("/quiz")}
              className="my-3 px-5 font-bold cursor-pointer z-1"
            >
              Play Quiz
            </h6>
          ) : (
            <h6
              onClick={() => navigate("/todo")}
              className="my-3 px-5 font-bold cursor-pointer z-1"
            >
              Add Todo
            </h6>
          )}
        </div>

        <div className="user-dropdown-menu absolute right-10 top-6 bg-white  rounded-sm">
          <h6
            onClick={() => setDropDownShow((prevState) => !prevState)}
            className="my-3 px-5 cursor-pointer z-1"
          >
            {user.name}
          </h6>
          <div className="relative w-full px-5 ">
            <ul
              className={`${
                isDropDownShow ? "dropdown-active" : ""
              } dropdown-nav `}
            >
              <li>Mail : {user.email}</li>
              <li>Total TODO : {todos.length}</li>
              <li onClick={logout}>LOGOUT</li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Main;
