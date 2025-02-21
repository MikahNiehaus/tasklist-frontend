import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api";

const useTodos = (roomCode) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  console.log("🛠️ useTodos Hook Initialized");
  console.log("📌 Room Code:", roomCode);

  // ✅ Fetch todos when the component mounts
  useEffect(() => {
    if (roomCode) {
      console.log("📡 Fetching todos for room:", roomCode);
      fetchTodos(roomCode)
        .then((fetchedTodos) => {
          console.log("✅ Todos fetched successfully:", fetchedTodos);
          setTodos(fetchedTodos);
        })
        .catch((error) => console.error("❌ Error fetching todos:", error));
    }
  }, [roomCode]);

  // ✅ Create a new todo
  const handleCreateTodo = async () => {
    console.log("📝 handleCreateTodo called with:", newTodo);
    
    if (!newTodo.title.trim()) {
      console.error("❌ Cannot create an empty todo!");
      return;
    }

    try {
      console.log("🚀 Sending API request to create todo...");
      const createdTodo = await createTodo(roomCode, newTodo);
      console.log("✅ Todo created successfully:", createdTodo);

      setTodos((prevTodos) => {
        const newTodos = [...prevTodos, createdTodo];
        console.log("🆕 Updated Todos State:", newTodos);
        return newTodos;
      });

      setNewTodo({ title: "", description: "" }); // ✅ Reset input fields
    } catch (error) {
      console.error("❌ Error creating todo:", error);
    }
  };

  // ✅ Toggle Between Complete & Pending (Calls API)
 const handleToggleStatus = async (todo) => {
  try {
    const updatedTodo = await updateTodo(roomCode, todo.id, { 
      title: todo.title, 
      description: todo.description, 
      completed: !todo.completed 
    });

    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
  } catch (error) {
    console.error("❌ Error toggling todo status:", error);
  }
};

  

  // ✅ Update a todo
  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    console.log("✏️ handleUpdateTodo called for ID:", id);
    
    try {
      console.log("🚀 Sending API request to update todo...");
      const updatedTodo = await updateTodo(roomCode, id, { 
        title: updatedTitle, 
        description: updatedDescription 
      });

      console.log("✅ API Response for Update:", updatedTodo);

      setTodos((prevTodos) => {
        const newTodos = prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo));
        console.log("🆕 Updated Todos State:", newTodos);
        return newTodos;
      });

      setEditingTodo(null); // ✅ Exit editing mode
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };

  // ✅ Delete a task
  const handleDeleteTodo = async (id) => {
    console.log("🗑️ handleDeleteTodo called for ID:", id);

    try {
      console.log("🚀 Sending API request to delete todo...");
      await deleteTodo(roomCode, id);
      console.log("✅ Todo deleted successfully!");

      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => todo.id !== id);
        console.log("🆕 Updated Todos State:", newTodos);
        return newTodos;
      });
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
    }
  };
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  

  return {
    todos: filteredTodos,  // ✅ Now returning the filtered list
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
  };
};  

export default useTodos;
