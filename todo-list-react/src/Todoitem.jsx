import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  const [editando, setEditando] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState(tarea.text);

  const guardarEdicion = () => {
    if (nuevoTexto.trim()) {
      editarTarea(tarea.id, nuevoTexto.trim());
      setEditando(false);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
      {editando ? (
        <input
          className="flex-1 p-2 border rounded"
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          onBlur={guardarEdicion}
          onKeyDown={(e) => e.key === "Enter" && guardarEdicion()}
          autoFocus
        />
      ) : (
        <span className={tarea.completed ? "line-through text-gray-400 flex-1" : "flex-1"}>
          {tarea.text}
        </span>
      )}

      <input
        className="w-4 h-4"
        type="checkbox"
        checked={tarea.completed}
        onChange={() => toggleCompleted(tarea.id)}
      />

      <button onClick={() => eliminarTarea(tarea.id)}>
        <TrashIcon className="w-5 h-5 text-red-500" />
      </button>

      <button onClick={() => setEditando(true)}>
        <PencilIcon className="w-5 h-5 text-yellow-500" />
      </button>
    </div>
  );
}
