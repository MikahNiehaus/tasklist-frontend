import React from "react";
import { createTodo, updateTodo } from "../api";

const TodoForm = ({ newTodo, setNewTodo, editingTodo, setEditingTodo, loadTodos }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.title && !editingTodo?.title) return;

    try {
      if (editingTodo) {
        await updateTodo(editingTodo.id, editingTodo);
        setEditingTodo(null);
      } else {
        await createTodo({ ...newTodo });
        setNewTodo({ title: "", description: "", completed: false });
      }
      loadTodos();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
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
        <button className="cancel-btn" onClick={() => setEditingTodo(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;
