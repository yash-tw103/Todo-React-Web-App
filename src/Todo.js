import React, { useState, useEffect } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const [editId, seteditId] = useState();

  const edititem = (id) => {
    const edit_todo = todos.find((item) => {
      return item.id === id;
    });
    setisEdit(true);
    seteditId(id);
    setNewTodo(edit_todo.name);
  };
  // API URL
  const apiUrl = "https://jsonplaceholder.typicode.com/posts/1/comments";

  // Fetch Todo items from the API when the component mounts
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to add a new Todo item
  const addTodo = (e) => {
    e.preventDefault();
    // Create a new Todo object
    const newTodoItem = {
      name: newTodo,
      completed: false
    };

    // Send a POST request to add the Todo to the API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodoItem)
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]); // Update the state with the new Todo
        setNewTodo(""); // Clear the input field
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  // Function to mark a Todo item as completed
  const updateTodo = (id, newText) => {
    
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: newText } : todo
    );
    // Send a PUT request to update the Todo on the API
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newText })
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(updatedTodos);
        setisEdit(false);
        setNewTodo("");
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const deleteTodo = (id) => {
    
    // Send a DELETE request to remove the Todo from the API
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <div className="card" style={{ width: "40rem", margin: "auto" }} >

        <div className="card-body" style={{ margin: "auto", textAlign: "center" }}>
        <form className="row g-3" >
          <h5 className="card-title"><button onClick={(e) => { e.preventDefault() }} className="btn btn-warning btn-lg" style={{ fontSize: "2rem", color: "white" }}>Todos</button></h5><hr />

          <div className="col-auto">
          <input
            type="text"
            className="form-control"
            id="inputPassword2"
            placeholder="Enter tasks here..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ width: "30rem", border: "2px solid RGB(167 185 204)" }}
          />
          </div>
          <div className="col-auto">
          {isEdit ? (
            <button className="btn btn-success btn-sm" onClick={(e) =>{e.preventDefault();
               updateTodo(editId, newTodo)}}>Update</button>
          ) : (
            <button className="btn btn-primary" onClick={addTodo}>Add</button>
          )}
          </div>

          </form>

        </div>
        {/* showing all the items that we have added */} 
        <div className="show-tasks" style={{  width: "90%", margin: "auto" }}>
        <div className="task">
        <ul className="list-group">
          {todos.map((todo) => (
            <li className="list-group-item" style={{  backgroundColor:"#7430fa" , color:"white"  }}  key={todo.id} >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none"
                }}
              >
                {todo.name}
              </span>
              {/* {!todo.completed && (
              <button onClick={() => updateTodo(todo.id, todo.name)}>
                Complete
              </button>
            )} */}

            <div className="task-button" style={{  display:"inline-block", float: "right" }} >
              <button className="btn btn-danger btn-sm" onClick={(e) =>{e.preventDefault();
                 deleteTodo(todo.id)}}>Delete</button>
              &nbsp; <button className="btn btn-success btn-sm" onClick={(e) => {e.preventDefault(); edititem(todo.id)}}>Update</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
        </div>
        

      </div>
      <br /> <br />
    </div>

  );
}

export default Todo;
