import React from "react";

const TodoForm = ({ newTodo, setNewTodo, editingTodo, setEditingTodo, handleCreateTodo, handleUpdateTodo }) => {
  return (
    <form className="todo-form" onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}>
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
