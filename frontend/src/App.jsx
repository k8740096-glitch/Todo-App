import {useEffect, useState} from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const fetchTodos = async () => {
    const res = await fetch("https://todo-app-lnf1.onrender.com/api/todos");
    const data = await res.json();
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos();
  },[]);
  const addTodo = async () => {
    if(!text) return;
    await fetch("https://todo-app-lnf1.onrender.com/api/todos",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({text}),
    });
    setText("");
    fetchTodos();
  };
  const toggleTodo = async (id, completed) => {
    await fetch(`https://todo-app-lnf1.onrender.com/api/todos/${id}`,{
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({completed: !completed}),
    });
    fetchTodos();
  };
  const deleteTodo = async (id) => {
    await fetch(`https://todo-app-lnf1.onrender.com/sapi/todos/${id}`,{
      method: "DELETE",
    });
    fetchTodos();
  };
  return(
    <div className="container">
      <div className="todo-box">
      <h2>To-Do List</h2>
      <div className="input-section">
      <input 
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo)=> (
          <li key={todo._id}>
            <span 
            onClick={() => toggleTodo(todo._id, todo.completed)}
            
            >
            {todo.text}
            </span>
            <button onClick={()=> deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    
  );
}
export default App;