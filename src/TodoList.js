import React from "react";
import useTodos from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import "./styles/styles.css";

const TodoList = () => {
  const {
    todos,
    newTodo,
    editingTodo,
    filter,
    setNewTodo,
    setEditingTodo,
    setFilter,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleStatus,
    handleDeleteTodo,
  } = useTodos();

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      {/* Filter Buttons */}
      <TodoFilter filter={filter} setFilter={setFilter} />

      {/* Create & Edit Todo Form */}
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        handleCreateTodo={handleCreateTodo}
        handleUpdateTodo={handleUpdateTodo}
      />

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setEditingTodo={setEditingTodo}
            handleToggleStatus={handleToggleStatus} // ✅ Now correctly passed
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
