import React from "react";

const TodoForm = ({ newTodo, setNewTodo, editingTodo, setEditingTodo, handleCreateTodo, handleUpdateTodo }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevents page refresh

    if (editingTodo) {
      handleUpdateTodo(editingTodo.id, editingTodo);
      setEditingTodo(null); // ✅ Reset the form after updating
    } else {
      handleCreateTodo(newTodo);
    }

    // ✅ Reset form after submission
    setNewTodo({ title: "", description: "" });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={editingTodo ? editingTodo.title : newTodo?.title || ""}
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
        value={editingTodo ? editingTodo.description : newTodo?.description || ""}
        onChange={(e) =>
          editingTodo
            ? setEditingTodo({ ...editingTodo, description: e.target.value })
            : setNewTodo({ ...newTodo, description: e.target.value })
        }
      />
      <button type="submit">{editingTodo ? "Update Todo" : "Create Todo"}</button>
      {editingTodo && (
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setEditingTodo(null)} // ✅ Reset after canceling
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;
