import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  console.log("TodoFilter Component Rendered at", new Date().toLocaleTimeString());
  console.log("Current Filter =>", filter);

  const handleFilterChange = (type) => {
    if (filter === type) return; // Prevent unnecessary re-renders if the same filter is clicked

    console.log(`Filter Button Clicked => ${type} at`, new Date().toLocaleTimeString());
    console.log(`Previous Filter => ${filter}`);
    console.log(`New Filter => ${type}`);

    setFilter(type);
  };

  return (
    <div className="filters">
      {["all", "pending", "completed"].map((type, index) => (
        <button
          key={type}
          id={`filter-${index}`}
          className={`filter-button ${filter === type ? "active" : ""}`}
          onClick={() => handleFilterChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
