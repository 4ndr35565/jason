import { useEffect, useState, } from "react"

export default function Searchinput({oneSearch}){


        const[query,setQuery] = useState('')

        useEffect(() => {
            const timeout = setTimeout(() => {
                oneSearch (query)

            }, 500)

            return () => clearTimeout(timeout)

        }, [query, oneSearch])
    return( 


        <div>
            
            <input
            value = {query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded shadow-md transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 p-2"    
             type= "text" 
             placeholder="Buscar por nombre, perfile o intereses"
            />
        </div>

    )

}
