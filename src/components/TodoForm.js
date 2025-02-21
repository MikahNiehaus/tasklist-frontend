import React from "react";

const TodoForm = ({ newTodo, setNewTodo, editingTodo, setEditingTodo, handleCreateTodo, handleUpdateTodo }) => {
  console.log("📌 TodoForm Rendered");
  console.log("📝 Current Todo State:", newTodo);
  console.log("✏️ Editing Todo:", editingTodo ? editingTodo : "None");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevents page refresh
    console.log("🚀 Form Submitted");

    if (editingTodo) {
      console.log("🔄 Updating Todo:", editingTodo);
      handleUpdateTodo(editingTodo.id, editingTodo);
      setEditingTodo(null); // ✅ Reset the form after updating
    } else {
      console.log("🆕 Creating New Todo:", newTodo);
      handleCreateTodo(newTodo);
    }

    // ✅ Reset form after submission
    console.log("🧹 Resetting Form...");
    setNewTodo({ title: "", description: "" });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={editingTodo ? editingTodo.title : newTodo?.title || ""}
        onChange={(e) => {
          console.log("📌 Title Changed:", e.target.value);
          editingTodo
            ? setEditingTodo({ ...editingTodo, title: e.target.value })
            : setNewTodo({ ...newTodo, title: e.target.value });
        }}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={editingTodo ? editingTodo.description : newTodo?.description || ""}
        onChange={(e) => {
          console.log("📌 Description Changed:", e.target.value);
          editingTodo
            ? setEditingTodo({ ...editingTodo, description: e.target.value })
            : setNewTodo({ ...newTodo, description: e.target.value });
        }}
      />
      <button type="submit">{editingTodo ? "Update Todo" : "Create Todo"}</button>
      {editingTodo && (
        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            console.log("❌ Cancel Edit - Resetting Form");
            setEditingTodo(null);
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;
