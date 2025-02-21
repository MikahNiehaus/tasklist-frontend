import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// ✅ Debugging: Log every request URL before sending it
const logRequest = (method, url, data) => {
  console.log(`📡 ${method.toUpperCase()} Request to: ${url}`);
  if (data) console.log("📤 Data Sent:", JSON.stringify(data, null, 2));
};

// ✅ Debugging: Log API response
const logResponse = (method, url, response) => {
  console.log(`✅ ${method.toUpperCase()} Response from: ${url}`);
  console.log("📥 Data Received:", JSON.stringify(response.data, null, 2));
};

// ✅ Create a new room (Backend generates the room code)
export const createRoom = async () => {
  const url = `${API_BASE_URL}/rooms`;
  logRequest("POST", url);

  try {
    const response = await axios.post(url);
    logResponse("POST", url, response);
    return response.data.room_code;
  } catch (error) {
    console.error("❌ Error creating room:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Check if a room exists
export const checkRoomExists = async (roomCode) => {
  const url = `${API_BASE_URL}/rooms/${roomCode}`;
  logRequest("GET", url);

  try {
    const response = await axios.get(url);
    logResponse("GET", url, response);
    return response.data.exists;
  } catch (error) {
    console.error("❌ Error checking room:", error.response?.data || error.message);
    return false;
  }
};

// ✅ Fetch all todos for a specific room
export const fetchTodos = async (roomCode) => {
  const url = `${API_BASE_URL}/rooms/${roomCode}/todos`;
  logRequest("GET", url);

  try {
    const response = await axios.get(url);
    logResponse("GET", url, response);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching todos:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create a new todo inside a specific room
export const createTodo = async (roomCode, todo) => {
  if (!todo || !todo.title) {
    console.error("❌ Error: Missing todo data!");
    return;
  }

  const url = `${API_BASE_URL}/rooms/${roomCode}/todos`;
  const requestData = { todo }; // ✅ Wrap inside "todo"
  logRequest("POST", url, requestData);

  try {
    const response = await axios.post(url, requestData);
    logResponse("POST", url, response);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating todo:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update a todo inside a specific room
export const updateTodo = async (roomCode, id, updatedTodo) => {
  if (!updatedTodo || !updatedTodo.title) {
    console.error("❌ Error: Missing updated todo data!");
    return;
  }

  const url = `${API_BASE_URL}/rooms/${roomCode}/todos/${id}`;
  const requestData = { todo: updatedTodo }; // ✅ Wrap inside "todo"
  logRequest("PATCH", url, requestData);

  try {
    const response = await axios.patch(url, requestData);
    logResponse("PATCH", url, response);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating todo:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Mark a todo as completed inside a room
export const completeTodo = async (roomCode, id) => {
  const url = `${API_BASE_URL}/rooms/${roomCode}/todos/${id}/complete`;
  const requestData = { todo: {} }; // ✅ Ensure request consistency

  logRequest("PATCH", url, requestData);

  try {
    const response = await axios.patch(url, requestData);
    logResponse("PATCH", url, response);
    return response.data;
  } catch (error) {
    console.error("❌ Error marking todo as complete:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ Delete a todo from a room
export const deleteTodo = async (roomCode, id) => {
  const url = `${API_BASE_URL}/rooms/${roomCode}/todos/${id}`;
  const requestData = { todo: {} }; // ✅ Keep request structure consistent

  logRequest("DELETE", url, requestData);

  try {
    const response = await axios.delete(url, { data: requestData });
    logResponse("DELETE", url, response);
  } catch (error) {
    console.error("❌ Error deleting todo:", error.response?.data || error.message);
    throw error;
  }
};
