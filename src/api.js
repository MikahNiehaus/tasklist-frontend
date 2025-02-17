import axios from 'axios';

// ✅ Corrected API Base URL (with /api/v1/)
const API_BASE_URL = "http://localhost:3001/" || "https://tasklist-backend.railway.internal/";

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
