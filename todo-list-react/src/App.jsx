
import TodoItem from "./Todoitem";
import { useState } from "react";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

  const agregarTarea = () => {
    if (input.trim()) {
      setTareas([
        ...tareas,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput("");
    }
  };

  const toggleCompleted = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const editarTarea = (id, newText) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, text: newText } : tarea
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-2 rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">LISTA DE TAREAS</h1>

      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir Tarea"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={agregarTarea}
        >
          Añadir Tarea
        </button>
      </div>

      <div className="space-y-2">
        {tareas.map((tarea) => (
          <TodoItem
            key={tarea.id}
            tarea={tarea}
            toggleCompleted={toggleCompleted}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}  // 👈 ahora sí se pasa bien
          />
        ))}
      </div>
    </div>
  );
}
