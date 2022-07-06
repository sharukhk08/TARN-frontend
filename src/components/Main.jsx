import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { useAuthProvider } from "../contexts/AuthProvider";
import ToDo from "./ToDo";

const Main = () => {
  const { todos } = useCrud();

  const [isDropDownShow, setDropDownShow] = useState(false);
  const { logout, user } = useAuthProvider();

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
        {isDropDownShow && (
          <div
            className="user-dropdown-menu-overlay"
            onClick={() => setDropDownShow((prevState) => !prevState)}
          ></div>
        )}

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
        <ToDo />
      </div>
    </>
  );
};

export default Main;
