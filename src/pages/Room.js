import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodos from "../hooks/useTodos";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import TodoFilter from "../components/TodoFilter";
import "../styles.css";

const Room = () => {
  const { roomCode } = useParams(); // Get room code from URL parameters
  const navigate = useNavigate();

  console.log("\n==============================");
  console.log(`Room Component Rendered for Room Code: ${roomCode}`);
  console.log("==============================\n");

  // Redirect to home if roomCode is missing
  useEffect(() => {
    if (!roomCode) {
      console.error("Error: Room code is undefined!");
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
    handleToggleStatus,
    handleDeleteTodo,
  } = useTodos(roomCode); // Fetch todos using the room code

  useEffect(() => {
    console.log(`Filter Updated => ${filter}`);
  }, [filter]);

  useEffect(() => {
    console.log(`Todos Updated =>`, todos);
  }, [todos]);

  return (
    <div className="container">
      <h1>Room: {roomCode}</h1>
      <p>
        Share this link:{" "}
        <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
          {window.location.href}
        </button>
      </p>

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
            handleToggleStatus={handleToggleStatus}
            handleDeleteTodo={handleDeleteTodo} 
            roomCode={roomCode} 
          />
        ))}
      </ul>
    </div>
  );
};

export default Room;
