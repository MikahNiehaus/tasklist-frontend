import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api";

const useTodos = (roomCode) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  // ✅ Fetch todos when the component mounts
  useEffect(() => {
    if (roomCode) {
      fetchTodos(roomCode).then(setTodos);
    }
  }, [roomCode]);

  // ✅ Create a new todo
  const handleCreateTodo = async () => {
    if (!newTodo.title.trim()) return; // Prevent empty title submission

    try {
      const createdTodo = await createTodo(roomCode, newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]); // ✅ Append new todo
      setNewTodo({ title: "", description: "" }); // ✅ Reset input fields
    } catch (error) {
      console.error("❌ Error creating todo:", error);
    }
  };

  // ✅ Toggle Between Complete & Pending
  const handleToggleStatus = async (todo) => {
    try {
      const updatedTodo = await updateTodo(roomCode, todo.id, { 
        title: todo.title, 
        description: todo.description, 
        completed: !todo.completed // ✅ Toggle true/false
      });

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (error) {
      console.error("❌ Error toggling todo status:", error);
    }
  };

  // ✅ Handle Editing a Todo
  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    try {
      const updatedTodo = await updateTodo(roomCode, id, { 
        title: updatedTitle, 
        description: updatedDescription 
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setEditingTodo(null); // ✅ Exit editing mode
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };

  // ✅ Delete a task
  const handleDeleteTodo = async (id) => {
    await deleteTodo(roomCode, id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    newTodo,
    editingTodo,
    filter,
    setNewTodo,
    setEditingTodo,
    setFilter,
    handleCreateTodo, // ✅ Restored!
    handleToggleStatus,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useTodos;
