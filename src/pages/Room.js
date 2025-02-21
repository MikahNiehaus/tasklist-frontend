import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodos from "../hooks/useTodos";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import TodoFilter from "../components/TodoFilter";
import "../styles.css";

const Room = () => {
  const { roomCode } = useParams(); // ✅ Get room code from URL
  const navigate = useNavigate();

  console.log("\n==============================");
  console.log(`📌 [Room Component] Rendered for Room Code: ${roomCode}`);
  console.log("==============================\n");

  // ✅ Prevent API calls if roomCode is missing
  useEffect(() => {
    if (!roomCode) {
      console.error("❌ Error: Room code is undefined!");
      navigate("/");
    }
  }, [roomCode, navigate]);

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
    handleDeleteTodo, // ✅ Removed handleToggleStatus
  } = useTodos(roomCode); // ✅ Fetch todos using the correct room code

  useEffect(() => {
    console.log(`🔄 [Filter Updated] => ${filter}`);
  }, [filter]);

  useEffect(() => {
    console.log(`📋 [Todos Updated] =>`, todos);
  }, [todos]);

  return (
    <div className="container">
      <h1>Room: {roomCode}</h1>
      <p>🔗 Share this link: {window.location.href}</p>

      {/* Todo Filter */}
      <TodoFilter filter={filter} setFilter={setFilter} />

      {/* Create & Edit Todos */}
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
            handleDeleteTodo={handleDeleteTodo} 
            roomCode={roomCode} 
          />
        ))}
      </ul>
    </div>
  );
};

export default Room;
