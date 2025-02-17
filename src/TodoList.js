import React, { useState, useEffect, useCallback } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
} from "./api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", completed: false });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  // ✅ Load Todos with useCallback & Logging
  const loadTodos = useCallback(async () => {
    console.log(`Fetching todos with filter: ${filter}`);
    try {
      const data = await fetchTodos(filter);
      setTodos(data);
      console.log("Todos fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // ✅ Create a new Todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title) return;

    console.log("Creating new todo:", newTodo);
    try {
      await createTodo({ ...newTodo });
      console.log("Todo created successfully");
      setNewTodo({ title: "", description: "", completed: false });
      loadTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // ✅ Update an existing Todo (Title, Description, and Status)
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!editingTodo.title) return;

    console.log("Updating todo:", editingTodo);
    try {
      await updateTodo(editingTodo.id, editingTodo);
      console.log("Todo updated successfully");
      setEditingTodo(null);
      loadTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // ✅ Mark Todo as Completed
  const handleCompleteTodo = async (id) => {
    console.log(`Marking todo ${id} as completed`);
    try {
      await completeTodo(id);
      console.log(`Todo ${id} marked as completed`);
      loadTodos();
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  // ✅ Toggle Status (Completed <-> Pending)
  const handleToggleStatus = async (todo) => {
    console.log(`Toggling status for todo ${todo.id}, current status: ${todo.completed}`);
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      console.log(`Todo ${todo.id} status updated successfully`);
      loadTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Delete a Todo
  const handleDeleteTodo = async (id) => {
    console.log(`Deleting todo ${id}`);
    try {
      await deleteTodo(id);
      console.log(`Todo ${id} deleted successfully`);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>To-Do List</h1>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Create Todo Form */}
      <form onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo} style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Title"
          value={editingTodo ? editingTodo.title : newTodo.title}
          onChange={(e) =>
            editingTodo
              ? setEditingTodo({ ...editingTodo, title: e.target.value })
              : setNewTodo({ ...newTodo, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={editingTodo ? editingTodo.description : newTodo.description}
          onChange={(e) =>
            editingTodo
              ? setEditingTodo({ ...editingTodo, description: e.target.value })
              : setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button type="submit">{editingTodo ? "Update Todo" : "Create Todo"}</button>
        {editingTodo && (
          <button onClick={() => setEditingTodo(null)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      {/* Display Todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0", listStyle: "none" }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>
              Status: {todo.completed ? "✅ Completed" : "❌ Pending"}
              <button onClick={() => handleToggleStatus(todo)} style={{ marginLeft: "10px" }}>
                Toggle Status
              </button>
            </p>
            {!todo.completed && (
              <button onClick={() => handleCompleteTodo(todo.id)}>Mark as Completed</button>
            )}
            <button onClick={() => setEditingTodo(todo)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
