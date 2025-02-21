import React from "react";

const TodoItem = ({ todo, setEditingTodo, handleToggleStatus, handleDeleteTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>

      {/* ✅ Toggle Between Complete & Pending */}
      <button onClick={() => handleToggleStatus(todo)} className="toggle-btn">
        {todo.completed ? "Reopen" : "Mark Complete"}
      </button>

      {/* ✅ Edit Button */}
      <button onClick={() => setEditingTodo(todo)} className="edit-btn">
        ✏️ Edit
      </button>

      {/* ✅ Delete Button */}
      <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
        ❌ Delete
      </button>
    </li>
  );
};

export default TodoItem;
