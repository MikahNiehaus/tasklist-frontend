import React from "react";

const TodoItem = ({ todo, setEditingTodo, handleToggleStatus, handleDeleteTodo }) => {
  const formatDate = (dateString) => {
    const options = {  hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log("Full Todo Item:", todo.updated_at); // ✅ Log full todo item

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      <p>Created At: {formatDate(todo.created_at)}</p>
      <p>Updated At: {formatDate(todo.updated_at)}</p>
      <button onClick={() => handleToggleStatus(todo.id)} className="toggle-btn">
        {todo.completed ? "Reopen" : "Mark Complete"}
      </button>

      <button onClick={() => setEditingTodo(todo)} className="edit-btn">
        Edit
      </button>

      <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
