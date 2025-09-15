import { useState,useEffect, useCallback } from "react"
import { ToastContainer, toast} from "react-toastify"
import axios from "axios"
import Searchinput from "./components/Searchinput"
import Card from "./components/Card"


export default function App() {
  const [usuarios,setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_URL = "http://localhost:8000"


  const obtenerUsuarios = async () => {
  try {
      const response = await axios.get (`${API_URL}/usuarios`)
      setUsuarios(response.data)
      setFiltrados(response.data)

    } catch (error) {
      console.log('error al obtener usuarios: ', error)
      setError('error al obtener usuarios')
      toast.error('error al obtener usuarios')
    }
  }
  useEffect(() => {
    obtenerUsuarios()
  }, [])
  

  console.log  ('usuarios:', usuarios)

  useEffect(() => {
    obtenerUsuarios()
  }, [])

const filtrarUsuarios = useCallback(
  (query) => {
    const q = query.trim().toLowerCase()
    const resultados = usuarios.filter((u) => 
    [u.nombre,u.apellidos, u.perfil, u.intereses, u.email].some((campo) =>
       String(campo).toLowerCase().includes(q)
  ))


  setFiltrados(resultados)

  },
  [usuarios]
)



  return (

    <div className="min-h-screen bg-gray-100 py-12 p-B space-y-4">
      <h1 className="text-center text-3xl font-bold nb-4">Buscador de usuarios</h1>




      <Searchinput onSearch={oneSearch} />

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {filtrados.length > 0 ? (
    filtrados.map((usuario) => (
      <Card key={usuario.id} usuarios={usuario} />
    ))
  ) : (
    <div className="text-center text-xl font-bold col-span-full">
      No se encontraron resultados
    </div>
  )}
</div>

    </div>

  )
}