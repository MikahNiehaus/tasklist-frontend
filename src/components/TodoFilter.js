import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      {["all", "pending", "completed"].map((type) => (
        <button
          key={type}
          className={`filter-button ${filter === type ? "active" : ""}`}
          onClick={() => setFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
