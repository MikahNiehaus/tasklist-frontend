import React from "react";
import { toggleTodo } from "../api"; // ✅ Import toggleTodo API

const TodoItem = ({ todo, setEditingTodo, handleDeleteTodo, roomCode, setTodos }) => {
  // ✅ Toggle status using API and update UI immediately
  const handleToggleTodo = async () => {
    try {
      await toggleTodo(roomCode, todo.id); // ✅ API call

      // ✅ Optimistically update UI by toggling completed state
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );

      // Optional: If you need to refresh todos from the DB, uncomment this:
      // await loadTodos();
    } catch (error) {
      console.error("❌ Error toggling todo status:", error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>

      {/* ✅ Use handleToggleTodo to toggle status */}
      <button onClick={handleToggleTodo} className="toggle-btn">
        {todo.completed ? "Reopen" : "Mark Complete"}
      </button>

      <button onClick={() => setEditingTodo(todo)} className="edit-btn">
        ✏️ Edit
      </button>
      <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
        ❌ Delete
      </button>
    </li>
  );
};

export default TodoItem;
