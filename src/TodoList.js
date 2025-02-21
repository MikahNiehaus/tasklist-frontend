import React, { useEffect } from "react";
import useTodos from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import "./styles/styles.css";

const TodoList = () => {
  console.log("\n==============================");
  console.log(`📌 [TodoList] Component Rendered at ${new Date().toLocaleTimeString()}`);
  console.log("==============================\n");

  const {
    todos = [], // ✅ Ensure todos is always an array
    newTodo,
    editingTodo,
    filter,
    setNewTodo,
    setEditingTodo,
    setFilter,
    handleCreateTodo,
    handleToggleStatus,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodos();

  useEffect(() => {
    console.log(`🔄 [Filter Updated] => ${filter}`);
  }, [filter]);

  useEffect(() => {
    console.log(`📋 [Todos Updated] =>`, todos);
  }, [todos]);

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      {/* ✅ Filter Buttons with Logging */}
      <TodoFilter filter={filter} setFilter={setFilter} />

      {/* ✅ Create & Edit Todo Form */}
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        handleCreateTodo={handleCreateTodo}
        handleUpdateTodo={handleUpdateTodo}
      />

      {/* ✅ Todo List */}
      <ul className="todo-list">
        {(todos || []) // ✅ Ensure todos is defined before filtering
          .filter((todo) => {
            if (filter === "all") return true;
            if (filter === "pending") return !todo.completed;
            if (filter === "completed") return todo.completed;
            return true;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              setEditingTodo={setEditingTodo}
              handleToggleStatus={handleToggleStatus}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
