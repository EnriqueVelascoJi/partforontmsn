//dependencies
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

//img
import logo from '../assests/msn-logo.png';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function EditUser() {

    const navigate = useNavigate()
    const { id } = useParams()


    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState(1)
    const [aprobador, setAprobador] = useState(false)
    const [verificadorWA, setVerificadorWA] = useState(false)
    const [cliente, setCliente] = useState(2);


    const [clientes, setClientes] = useState([]);

    const getUser  = async() => {
      
      const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuario/${id}`;
    
        try {
            const response = await fetch(url);
            const result = await response.json();
    
            const normalData = result.data;
            console.log(normalData)
    
            setNombre(normalData[0].nombre)
            setApellido(normalData[0].apellido)
            setEmail(normalData[0].email)
            setTelefono(normalData[0].telefono)
            setPassword(normalData[0].contrasenia)
            setAprobador(normalData[0].aprobador)
            setVerificadorWA(normalData[0].verificadorwa)
            setCliente(normalData[0].idcliente)
    
            
        } catch (error) {
            console.log(error)
        }
      
    }

    const fetchData = async() => {

        const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';
    
        try {
            const response = await fetch(url);
            const result = await response.json();
    
            const normalData = result.data;
    
           setClientes(normalData)
    
        } catch (error) {
            console.log(error)
        }
        
        
    }

    const handleCliente = (e) => {

        setCliente(e.target.value)
      }


    const postData = async() => {

        const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuario/${id}`;
      
          try {
              const body = {
                nombre,
                apellido,
                email,
                telefono,
                password,
                tipoUsuario,
                aprobador,
                verificadorWA,
                cliente
              }
                const response = await fetch(url, {
                  method: "PATCH", 
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body)
                });
                const result = await response.json();
        
                console.log(result.data)
              
          } catch (error) {
              console.log(error)
          }
          navigate('/usuarios')
          
      }
    
    //   const updateData = async() => {
    //     const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/mecanico/${idToEdit}`;
      
    //       try {
    //           const body = {
    //             nombre,
    //             siglas
    //           }
    //           const response = await fetch(url, {
    //               method: "PATCH", 
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(body)
    //             });
    //             const result = await response.json();
        
    //             console.log(result.data)
    //       } catch (error) {
    //           console.log(error)
    //       }
    //       navigate(0)
    //   }

    
    useEffect(() => {
        fetchData();
        getUser();
    }, [])
  return (
    <>
      <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

      <div class="flex flex-col items-center justify-center ">
        <div class="flex flex-col bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-3xl">
          <div class="relative mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span class="bg-white px-4 text-xs text-gray-500 uppercase">Editar usuario</span>
            </div>
          </div>
          <div class="mt-10">
            <form action="#">
              <div class="flex flex-col mb-6">
                <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Nombre:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">

                  </div>
                  <input 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  id="email" type="text" name="email" class="text-sm sm:text-base placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Nombre" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Apellido:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                    </span>
                  </div>

                  <input 
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  id="password" type="text" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Apellido" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Correo electrónico:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                    </span>
                  </div>

                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  id="password" type="email" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="example@gnmail.com" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Teléfono:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                    </span>
                  </div>

                  <input 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  id="password" type="text" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="5566772211" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                    </span>
                  </div>

                  <input value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" type="text" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="********" />
                </div>
              </div>
              <div class="flex items-center mb-6 -mt-4">
                <div class="flex ml-auto">
                </div>
              </div>


              <FormControl fullWidth style={{marginBottom: '20px'}}>
                  <FormLabel id="demo-controlled-radio-buttons-group">Aprobador</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={aprobador}
                    onChange={(e) => setAprobador(e.target.value)}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Aprobador" />
                    <FormControlLabel value={false} control={<Radio />} label="No aprobador" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth style={{marginBottom: '20px'}}>
                  <FormLabel id="demo-controlled-radio-buttons-group">Verificador WhatsApp</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={verificadorWA}
                    onChange={(e) => setVerificadorWA(e.target.value)}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Verificador" />
                    <FormControlLabel value={false} control={<Radio />} label="No verificador" />
                  </RadioGroup>
                </FormControl>
              <FormControl fullWidth style={{marginBottom: '20px'}}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cliente}
              onChange={handleCliente}
            >
              {
                clientes.map(cliente => (
                  <MenuItem value={cliente.idcliente} key={cliente.idcliente}>{cliente.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
              <div class="flex w-full">
                <button onClick={postData} type="button" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                  <span class="mr-2 uppercase">Regístrate</span>
                  <span>
                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}
