import axios from "axios";

// Determine environment
const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = isProduction
  ? process.env.API_URL
  : "http://127.0.0.1:3001";

console.log(`🌍 Environment: ${isProduction ? "Production" : "Development"}`);
console.log(`🔗 API Base URL: ${API_BASE_URL}`);

// ✅ Test API Connection and Log
const testApiConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/healthcheck`);
    console.log("✅ API Connection Successful:", response.status);
  } catch (error) {
    console.error("❌ API Connection Failed:", error.message);
  }
};

// Automatically test on load
testApiConnection(); // ✅ Call the function immediately
                  // ✅ Use local API during development

// Fetch all todos (with optional filter)
export const fetchTodos = async (filter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`, {
      params: { filter },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo) => {
  const response = await axios.post(`${API_BASE_URL}/todos`, todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updatedTodo);
  return response.data;
};

// Mark a todo as completed
export const completeTodo = async (id) => {
  const response = await axios.patch(`${API_BASE_URL}/todos/${id}/complete`);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};
