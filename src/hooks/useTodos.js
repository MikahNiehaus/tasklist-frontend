import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, completeTodo, deleteTodo } from "../api"; // ✅ Fixed Imports

const useTodos = (roomCode) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  // ✅ Fetch todos when the component mounts
  useEffect(() => {
    if (roomCode) {
      fetchTodos(roomCode).then(setTodos);
    }
  }, [roomCode]);

  const handleCreateTodo = async (e) => {
    if (e && e.preventDefault) e.preventDefault(); // ✅ Ensure it's an event before calling preventDefault()
  
    if (!newTodo || !newTodo.title?.trim()) {
      console.error("⚠️ Cannot create an empty todo!");
      return;
    }
  
    try {
      const createdTodo = await createTodo(roomCode, { title: newTodo.title, description: newTodo.description || "" });
      setTodos((prevTodos) => [...prevTodos, createdTodo]); // ✅ Update UI instantly
      setNewTodo({ title: "", description: "" }); // ✅ Clear input after adding
    } catch (error) {
      console.error("❌ Error creating todo:", error.message);
    }
  };
  
  

  // ✅ Update an existing todo
  const handleUpdateTodo = async (id, updatedText) => {
    const updatedTodo = await updateTodo(roomCode, id, { title: updatedText });
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // ✅ Mark a task as completed
  const handleCompleteTodo = async (id) => {
    const updatedTodo = await completeTodo(roomCode, id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
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
    handleCreateTodo,
    handleUpdateTodo,
    handleCompleteTodo,
    handleDeleteTodo,
  };
};

export default useTodos;
