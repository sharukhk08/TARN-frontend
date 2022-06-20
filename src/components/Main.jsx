import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

const Main = () => {
  const initialState = {
    title: "",
    completed: false,
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
  };
  // const APIURL = "http://192.168.43.220:4000/api/v1";
  const APIURL = "https://task-node-react.herokuapp.com/api/v1";
  const [isLoading, setLoading] = useState(false);
  const [isAddTodoLoading, setAddTodoLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const [latestTodoData, setLatestTodoData] = useState(initialState);

  // GET TO DO LIST
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${APIURL}/todo`)
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ADD TODO TO DATABASE
  const addTodo = () => {
    setAddTodoLoading(true);
    axios
      .post(`${APIURL}/add/todo`, latestTodoData)
      .then((res) => {
        setAddTodoLoading(false);
        setTodos([res.data.data, ...todos]);
        setLatestTodoData(initialState);
      })
      .catch((err) => {
        setAddTodoLoading(false);
        setLatestTodoData(initialState);
        console.log(err);
      });
  };

  // DELETE TODO
  const deleteToDo = (id) => {
    axios
      .delete(`${APIURL}/delete/todo/${id}`)
      .then((res) => {
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CHECK UNCHECK TODO
  const completeToDo = (id) => {
    axios
      .put(`${APIURL}/complete/todo/${id}`)
      .then((res) => {
        const newTodos = todos.map((todo) => {
          if (todo._id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });

        console.log(newTodos, "newTodos");
        setTodos(newTodos);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {console.log(todos, "todos")}
      <div className="h-screen w-full flex justify-center items-center bg-amber-500">
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
               if(latestTodoData.title.length > 0 && e.key === "Enter"){
                 addTodo();
               }
              }}
              value={latestTodoData.title}
              type="text"
              placeholder="Press Enter for Add a todo"
              className="bg-amber-400 rounded-sm px-4 py-2  w-full text-black outline-0 placeholder-gray-700"
            />
            <button
              onClick={addTodo}
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
