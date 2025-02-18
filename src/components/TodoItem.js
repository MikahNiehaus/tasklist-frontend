import React from "react";

const TodoItem = ({ todo, setEditingTodo, handleCompleteTodo, handleToggleStatus, handleDeleteTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>

      <button onClick={() => handleToggleStatus(todo)} className="toggle-btn">
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
