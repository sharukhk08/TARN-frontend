import { useState, useEffect } from "react";
import axios from "axios";
import {
  COMPLETE_TODO_API,
  DELETE_TODO_API,
  ADD_TODO_API,
  GET_TODO_LIST_API,
} from "../ApiServices";

export function useCrud() {
  const initialState = {
    title: "",
    completed: false,
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
  };

  const [isLoading, setLoading] = useState(false);
  const [isAddTodoLoading, setAddTodoLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [latestTodoData, setLatestTodoData] = useState(initialState);

  // GET TO DO LIST
  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_TODO_LIST_API)
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
      .post(ADD_TODO_API, latestTodoData)
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
      .delete(`${DELETE_TODO_API}/${id}`)
      .then(() => {
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
      .put(`${COMPLETE_TODO_API}/${id}`)
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

  return {
    isLoading,
    isAddTodoLoading,
    completeToDo,
    deleteToDo,
    todos,
    addTodo,
    latestTodoData,
    setLatestTodoData,
  };
}
