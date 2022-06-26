import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthProvider";

const Main = () => {
  const {
    isLoading,
    isAddTodoLoading,
    completeToDo,
    deleteToDo,
    todos,
    addTodo,
    latestTodoData,
    setLatestTodoData,
  } = useCrud();

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
              <li>Total TODO : 10</li>
              <li onClick={logout}>LOGOUT</li>
            </ul>
          </div>
        </div>
        <div className="max-w-xl w-full bg-white rounded-lg p-5 sm:p-6">
          <h1 className="font-bold mb-4 text-black text-xl">
            TODO WITH NODE+REACT 😎☕
          </h1>
          <div className="flex items-center">
            <input
              onChange={(e) =>
                setLatestTodoData({ ...latestTodoData, title: e.target.value })
              }
              onKeyUp={(e) => {
                if (latestTodoData.title.length > 0 && e.key === "Enter") {
                  addTodo(user._id);
                }
              }}
              value={latestTodoData.title}
              type="text"
              placeholder="Press Enter for Add a todo"
              className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
            />
            <button
              onClick={() => addTodo(user._id)}
              disabled={isAddTodoLoading || !latestTodoData.title}
              className="bg-amber-700 text-white px-6 py-2 rounded-sm hover:bg-amber-800 transition-all duration-300 ease-linear ml-3"
            >
              {isAddTodoLoading ? <Loader /> : "ADD"}
            </button>
          </div>

          <div className="mt-3">
            <ul className="max-h-64	 overflow-auto style-scrollbar pr-3">
              {isLoading ? (
                <div className="p-10">
                  <Loader />
                </div>
              ) : todos && todos.length > 0 ? (
                todos.map((todo, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="form-check flex items-center">
                      <input
                        className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-amber-600 checked:border-amber-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        id="flexCheckChecked"
                        checked={todo.completed}
                        onChange={() => completeToDo(todo._id)}
                      />
                      <label
                        className="form-check-label inline-block cursor-pointer mb-0"
                        htmlFor="flexCheckChecked"
                      >
                        <span className="text-md sm:text-lg text-black font-normal">
                          {todo.title}
                        </span>
                      </label>
                    </div>

                    <button
                      className="bg-black text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-slate-800 transition-all duration-300 ease-linear"
                      onClick={() => deleteToDo(todo._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <div>
                  <h1 className="text-md sm:text-lg text-black font-medium">
                    Add your First To DO List and save to Database
                  </h1>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
