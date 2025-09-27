import { useState, useEffect } from "react";
import supabase from "../supabase-clients";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todo").select("*");
    if (error) {
      console.error("Error fetching todo: ", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };
    const { data, error } = await supabase
      .from("todo")
      .insert([newTodoData])
      .select();
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodoList((prev) => [...prev, data[0]]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { error } = await supabase
      .from("todo")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);
    if (error) {
      console.log("Error toggling task", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) {
      console.log("Error deleting task", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-[600px] w-full m-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a new todo"
            className="border border-gray-300 rounded-md p-2 mr-2 flex-1"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 active:bg-blue-700 transition duration-200"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
        {todoList.length > 0 &&
          todoList.map((todo) => (
            <div
              key={todo.id}
              className="flex  justify-between mt-4 border border-gray-300 rounded-md p-4 bg-gray-50 mb-4"
            >
              <div className="flex flex-col">
                <p className="text-lg font-medium">{todo.name}</p>
                <p
                  className={`text-sm ${
                    todo.isCompleted ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {todo.isCompleted ? "Completed" : "Not Completed"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="  w-full mt-2  bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 active:bg-blue-700 transition duration-200"
                  // onClick={() => toggleComplete(todo.id, todo.isCompleted)}
                  onClick={() => completeTask(todo.id, todo.isCompleted)}
                >
                  {todo.isCompleted ? "Completed" : "Undo"}
                </button>
                <button
                  className=" mt-2  bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 active:bg-red-700 transition duration-200"
                  // onClick={() => deleteTask(todo.id)}
                  onClick={() => deleteTask(todo.id)}
                >
                  Delete Task
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
