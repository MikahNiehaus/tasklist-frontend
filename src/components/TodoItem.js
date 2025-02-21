import React from "react";

const TodoItem = ({ todo, setEditingTodo, handleToggleStatus, handleDeleteTodo }) => {
  console.log(`📝 Rendering Todo ID: ${todo.id} | Title: ${todo.title}`);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>

      {/* ✅ Toggle Between Complete & Pending */}
      <button
        onClick={() => {
          console.log(`🎯 Toggle Button Clicked for Todo ID: ${todo.id}`);
          if (!handleToggleStatus) {
            console.error("❌ ERROR: handleToggleStatus is NOT defined!");
            return;
          }
          handleToggleStatus(todo);
        }}
        className="toggle-btn"
      >
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
