import { useState, useEffect, useCallback } from "react";
import { fetchTodos, createTodo, updateTodo, completeTodo, deleteTodo } from "../api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", completed: false });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  // ✅ Load Todos
  const loadTodos = useCallback(async () => {
    try {
      const data = await fetchTodos(filter);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // ✅ Create a Todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title) return;

    try {
      await createTodo({ ...newTodo });
      setNewTodo({ title: "", description: "", completed: false });
      loadTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // ✅ Update a Todo
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!editingTodo.title) return;

    try {
      await updateTodo(editingTodo.id, editingTodo);
      setEditingTodo(null);
      loadTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // ✅ Complete a Todo
  const handleCompleteTodo = async (id) => {
    try {
      await completeTodo(id);
      loadTodos();
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  // ✅ Toggle Status
  const handleToggleStatus = async (todo) => {
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      loadTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Delete a Todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
    handleToggleStatus,
    handleDeleteTodo,
  };
};

export default useTodos;
