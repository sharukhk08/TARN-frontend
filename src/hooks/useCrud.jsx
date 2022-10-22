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
    userId: "",
  };

  const [deletedItemId, setDeleteItemId] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isAddTodoLoading, setAddTodoLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [latestTodoData, setLatestTodoData] = useState(initialState);
  const headers = {
    token: `${localStorage.getItem("tarn-front-token")}`,
  };

  // GET TO DO LIST
  useEffect(() => {
    if (headers.token) {
      setLoading(true);
      axios
        .get(GET_TODO_LIST_API, { headers })
        .then((res) => {
          setTodos(res.data.todos);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  // ADD TODO TO DATABASE
  const addTodo = (_id) => {
    console.log(_id);
    Object.assign(latestTodoData, { userId: _id });
    setAddTodoLoading(true);
    axios
      .post(ADD_TODO_API, latestTodoData, { headers })
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
    setDeleteItemId(id);
    axios
      .delete(`${DELETE_TODO_API}/${id}`, { headers })
      .then(() => {
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
        setDeleteItemId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CHECK UNCHECK TODO
  const completeToDo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo._id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
    axios
      .put(`${COMPLETE_TODO_API}/${id}`, headers)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    isDeleteLoading,
    isLoading,
    isAddTodoLoading,
    completeToDo,
    deleteToDo,
    todos,
    addTodo,
    latestTodoData,
    setLatestTodoData,
    deletedItemId,
  };
}
