import React from "react";
import { completeTodo, deleteTodo, updateTodo } from "../api";

const TodoItem = ({ todo, setEditingTodo, loadTodos }) => {
  const handleToggleStatus = async () => {
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      loadTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>

      <button onClick={handleToggleStatus} className="toggle-btn">
        Toggle Status
      </button>
      <button onClick={() => setEditingTodo(todo)} className="edit-btn">
        Edit
      </button>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
