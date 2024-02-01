import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import Swal from 'sweetalert2'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});
function getSum(total, num) {
  return total + num;
}
function Aeropuerto() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [isNew, setIsnew] = useState(true);

  const [nombre, setNombre] = useState('')
  const [siglas, setSiglas] = useState('')
  const [idToEdit, setIdToEdit] = useState(0)

  const [clientes, setClientes] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [cliente, setCliente] = useState(0);
  const [aeropuerto, setAeropuerto] = useState(0);
  const [equipo, setEquipo] = useState(0);

  const [ventas, setVentas] = useState(0)
  const [costos, setCostos] = useState(0);

  const [clienteId, setClienteId] = useState(0)
  const [idCliente, setIdCliente] = useState(0)
  const [idEquipo, setIdEquipo] = useState(0)
  const [idAeropuerto, setIdAeropuerto] = useState(0)
  

  const navigate = useNavigate();


  const options = {
    selectableRows: false,
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async() => {

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/';

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData1 = result.data;
        console.log(normalData1)
        let normalData = []
        if(clienteId != 2 ) {
          normalData = normalData1.filter( i => i.idcliente == clienteId)
        }
        else {
          normalData = normalData1
        }
        let ids = []
        let dataDisplay1 = []
        for(let i = 0; i < normalData.length; i++) {
          const currentId = normalData[i].idincidencia;
          if(!ids.includes(currentId)) {
            const refaccionesToIterate = normalData.filter(n => n.idincidencia === currentId);
            const arrayToIterateCosto = refaccionesToIterate.map(r => r.nopiezas * r.costo)
            const arrayToIterateVenta = refaccionesToIterate.map(r => r.nopiezas * r.precioventa)
            const costoRefacciones = arrayToIterateCosto.reduce(getSum, 0)
            const ventaRefacciones = arrayToIterateVenta.reduce(getSum, 0)
            let newFormatDisplay = [] 
            if(clienteId == 2)
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
             `$ ${costoRefacciones}`,
             `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            else
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
              `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            dataDisplay1.push(newFormatDisplay)
            ids.push(normalData[i].idincidencia)
          }
          
        }

    

       setData(dataDisplay1);
    } catch (error) {
        console.log(error)
    }
    
    
  }
  const fetchDataByDate = async() => {

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/getbydate';

    try {
      const body = {
        fechaInicio:startDate,
        fechaFin: endDate
      }
      console.log(body)
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        });
        const result = await response.json();

        const normalData = result.data;
        console.log({normalData})
        let ids = []
        let dataDisplay1 = []
        for(let i = 0; i < normalData.length; i++) {
          const currentId = normalData[i].idincidencia;
          if(!ids.includes(currentId)) {
            const refaccionesToIterate = normalData.filter(n => n.idincidencia === currentId);
            const arrayToIterateCosto = refaccionesToIterate.map(r => r.nopiezas * r.costo)
            const arrayToIterateVenta = refaccionesToIterate.map(r => r.nopiezas * r.precioventa)
            const costoRefacciones = arrayToIterateCosto.reduce(getSum, 0)
            const ventaRefacciones = arrayToIterateVenta.reduce(getSum, 0)
            let newFormatDisplay = [] 
            if(clienteId == 2)
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
             `$ ${costoRefacciones}`,
             `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            else
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
              `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            dataDisplay1.push(newFormatDisplay)
            ids.push(normalData[i].idincidencia)
          }
          
        }

    

       setData(dataDisplay1);
    } catch (error) {
        console.log(error)
    }
    
    
  }

  const fetchDataEquipos = async() => {

    const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/equipos/`;
    const body = {
      fechaInicio:startDate,
        fechaFin: endDate,
      equipo,
      aeropuerto,
      cliente
    }
    console.log(body)

    try {
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();

      const normalData = result.data;
      let ids = []
      let dataDisplay1 = []
      for(let i = 0; i < normalData.length; i++) {
        const currentId = normalData[i].idincidencia;
        if(!ids.includes(currentId)) {
          const refaccionesToIterate = normalData.filter(n => n.idincidencia === currentId);
          const arrayToIterateCosto = refaccionesToIterate.map(r => r.nopiezas * r.costo)
          const arrayToIterateVenta = refaccionesToIterate.map(r => r.nopiezas * r.precioventa)
          const costoRefacciones = arrayToIterateCosto.reduce(getSum, 0)
          const ventaRefacciones = arrayToIterateVenta.reduce(getSum, 0)
          let newFormatDisplay = []
          if(clienteId == 2)
          newFormatDisplay = [
            normalData[i].idincidencia, 
            normalData[i].incidencianombre, 
            normalData[i].clientenombre, 
            normalData[i].aeropuertonombre,
            `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
            `$ ${costoRefacciones}`,
            `$ ${ventaRefacciones}`,
            normalData[i].estatus, 
            normalData[i].fecha.split('T')[0]
           ]
           else
           newFormatDisplay = [
            normalData[i].idincidencia, 
            normalData[i].incidencianombre, 
            normalData[i].clientenombre, 
            normalData[i].aeropuertonombre,
            `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
            `$ ${ventaRefacciones}`,
            normalData[i].estatus, 
            normalData[i].fecha.split('T')[0]
           ]
          dataDisplay1.push(newFormatDisplay)
          ids.push(normalData[i].idincidencia)
        }
        
      }

  

     setData(dataDisplay1);
      } catch (error) {
          console.log(error)
      }  
    
    
  }

  const fetchDataAeropuertos = async() => {

    const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/aeropuertos/`;
    const body = {
      fechaInicio:startDate,
        fechaFin: endDate,
      aeropuerto,
      cliente
    }


    try {
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();

      const normalData = result.data;
        let ids = []
        let dataDisplay1 = []
        for(let i = 0; i < normalData.length; i++) {
          const currentId = normalData[i].idincidencia;
          if(!ids.includes(currentId)) {
            const refaccionesToIterate = normalData.filter(n => n.idincidencia === currentId);
            const arrayToIterateCosto = refaccionesToIterate.map(r => r.nopiezas * r.costo)
            const arrayToIterateVenta = refaccionesToIterate.map(r => r.nopiezas * r.precioventa)
            const costoRefacciones = arrayToIterateCosto.reduce(getSum, 0)
            const ventaRefacciones = arrayToIterateVenta.reduce(getSum, 0)
            let newFormatDisplay = [] 
            if(clienteId == 2)
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
             `$ ${costoRefacciones}`,
             `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            else
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
              `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            dataDisplay1.push(newFormatDisplay)
            ids.push(normalData[i].idincidencia)
          }
          
        }

    

       setData(dataDisplay1);
    
      } catch (error) {
          console.log(error)
      }     
}

const fetchDataCliente = async() => {

  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/clientes/`;
  const body = {
    fechaInicio:startDate,
        fechaFin: endDate,
        cliente
  }


  try {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();

    const normalData = result.data;
        let ids = []
        let dataDisplay1 = []
        for(let i = 0; i < normalData.length; i++) {
          const currentId = normalData[i].idincidencia;
          if(!ids.includes(currentId)) {
            const refaccionesToIterate = normalData.filter(n => n.idincidencia === currentId);
            const arrayToIterateCosto = refaccionesToIterate.map(r => r.nopiezas * r.costo)
            const arrayToIterateVenta = refaccionesToIterate.map(r => r.nopiezas * r.precioventa)
            const costoRefacciones = arrayToIterateCosto.reduce(getSum, 0)
            const ventaRefacciones = arrayToIterateVenta.reduce(getSum, 0)
            let newFormatDisplay = [] 
            if(clienteId == 2)
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
             `$ ${costoRefacciones}`,
             `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            else
            newFormatDisplay = [
             normalData[i].idincidencia, 
             normalData[i].incidencianombre, 
             normalData[i].clientenombre, 
             normalData[i].aeropuertonombre,
              `${normalData[i].noeconomico} - ${normalData[i].equipo}`,
              `$ ${ventaRefacciones}`,
             normalData[i].estatus, 
             normalData[i].fecha.split('T')[0]
            ]
            dataDisplay1.push(newFormatDisplay)
            ids.push(normalData[i].idincidencia)
          }
          
        }

    

       setData(dataDisplay1);
  
    } catch (error) {
        console.log(error)
    }     
}

const getSelects = async () => {

  const urlCliente = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';
  // const urlAeropuerto = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';
  // const urlEquipo = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';



      try {

        const [clienteResponse, aeropuertoResponse, equipoResponse] = await Promise.all([
          fetch(urlCliente),
          // fetch(urlAeropuerto),
          // fetch(urlEquipo)
        ]);
        const [clienteResult, aeropuertoResult, equipoResult] = await Promise.all([
          clienteResponse.json(),
          // aeropuertoResponse.json(),
          // equipoResponse.json()
        ])

        console.log(clienteResult, aeropuertoResult, equipoResult)
        setClientes(clienteResult.data)
        // setEquipos(equipoResult.data)
        // setAeropuertos(aeropuertoResult.data)
        

    } catch (error) {
        console.log(error)
    }
}
const getAeropuertos = async () => {

  const urlCliente = `https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/aeropuertocliente/${cliente}`;
  // const urlAeropuerto = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';
  // const urlEquipo = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';



      try {

        const [clienteResponse, aeropuertoResponse, equipoResponse] = await Promise.all([
          fetch(urlCliente),
          // fetch(urlAeropuerto),
          // fetch(urlEquipo)
        ]);
        const [clienteResult, aeropuertoResult, equipoResult] = await Promise.all([
          clienteResponse.json(),
          // aeropuertoResponse.json(),
          // equipoResponse.json()
        ])

        console.log(clienteResult, aeropuertoResult, equipoResult)
        setAeropuertos(clienteResult.data)
        // setEquipos(equipoResult.data)
        // setAeropuertos(aeropuertoResult.data)
        

    } catch (error) {
        console.log(error)
    }
}
const getEquipos = async () => {

  const idclienteaeropuerto = aeropuertos.find(a => a.idaeropuerto === aeropuerto).idclienteaeropuerto
  const urlCliente = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/equipos/${idclienteaeropuerto}`;
  // const urlAeropuerto = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';
  // const urlEquipo = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';



      try {

        const [clienteResponse, aeropuertoResponse, equipoResponse] = await Promise.all([
          fetch(urlCliente),
          // fetch(urlAeropuerto),
          // fetch(urlEquipo)
        ]);
        const [clienteResult, aeropuertoResult, equipoResult] = await Promise.all([
          clienteResponse.json(),
          // aeropuertoResponse.json(),
          // equipoResponse.json()
        ])

        console.log(clienteResult, aeropuertoResult, equipoResult)
        setEquipos(clienteResult.data)
        // setEquipos(equipoResult.data)
        // setAeropuertos(aeropuertoResult.data)
        

    } catch (error) {
        console.log(error)
    }
}
const postData = async(id) => {
  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';

    try {
        const body = {
          nombre,
          siglas
        }
          const response = await fetch(url, {
            method: "POST", 
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
    navigate(0)
    
}
const updateData = async() => {
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/${idToEdit}`;

    try {
        const body = {
          nombre,
          siglas
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
    navigate(0)
}

const generarResumen = async() => {

  let url = ''
  let body = {}

  if(equipo === 0 && cliente === 0 && aeropuerto === 0) {

    fetchData()
    url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/costos1'
    body = {
      fechaInicio: startDate,
      fechaFin: endDate
    }
    fetchDataByDate()
  }
  else if(equipo) {
    fetchDataEquipos()
    url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/costos2'
    body = {
      fechaInicio: startDate,
      fechaFin: endDate,
      equipo,
      aeropuerto,
      cliente
    }
  }
  else if(aeropuerto) {
    fetchDataAeropuertos()
    url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/costos3'
    body = {
      fechaInicio: startDate,
      fechaFin: endDate,
      aeropuerto,
      cliente
    }
    
  }

  else if(cliente) {
    fetchDataCliente()
    url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/costos4'
    body = {
      fechaInicio: startDate,
      fechaFin: endDate,
      cliente
    }
    
  }
  

    try {
          const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
  
          console.log(result.data)

          const incidencias = result.data;
          console.log({incidencias})
          let costo = 0
          let venta = 0
          for(let i = 0; i < incidencias.length; i++) {
            costo += incidencias[i].nopiezas * incidencias[i].costo
            venta += incidencias[i].nopiezas * incidencias[i].precioventa
          }

          setCostos(costo)
          setVentas(venta)
        
    } catch (error) {
        console.log(error)
    }

    
}
//handles
const handleCliente = (e) => {

  setCliente(e.target.value)
  setAeropuerto(0)
  setEquipo(0)
}
const handleAeropuerto = (e) => {

  setAeropuerto(e.target.value)
  setEquipo(0)
}
const handleEquipo = (e) => {

  setEquipo(e.target.value)
  
}

useEffect(() => {

        fetchData()
        getSelects()
    
}, [clienteId])
useEffect(() => {

  if(cliente)getAeropuertos()

}, [cliente])
useEffect(() => {

  if(aeropuerto) getEquipos()

}, [aeropuerto])

const editItem  = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;

        setNombre(normalData[0].nombre)
        setSiglas(normalData[0].siglas)

        handleClickOpen()
        setIsnew(0)
        setIdToEdit(id)
    } catch (error) {
        console.log(error)
    }
  
}
const deleteItem = async() => {
  Swal.fire({
    title: '¿Estas seguro que quieres borrar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, seguro!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        '',
        'success'
      )
    }
  })
}
  

 
const columns = [
  "ID",
  { name: "Nombre", options: { filterOptions: { fullWidth: true } } },
  "Cliente",
  "Aeropuerto",
  "Equipo",
  "Costo",
  "Venta",
  "Estatus",
  "Fecha",
  // {
  //   name: "Editar",
  //   options: {
  //     filter: true,
  //     sort: false,
  //     empty: true,
  //     customBodyRender: (value, tableMeta, updateValue) => {
  //       return (
  //         <IconButton
  //                                     onClick={() => editItem(tableMeta.rowData[0])}
  //                                 >
  //                                     <Edit />
  //                                 </IconButton>
  //       );
  //     }
  //   }
  // },
  // {
  //   name: "Eliminar",
  //   options: {
  //     filter: true,
  //     sort: false,
  //     empty: true,
  //     customBodyRender: (value, tableMeta, updateValue) => {
  //       return (
  //         <IconButton
  //                                     onClick={deleteItem}
  //                                 >
  //                                     <Delete/>
  //                                 </IconButton>
  //       );
  //     }
  //   }
  // },
  
];


const columns2 = [
  "ID",
  { name: "Nombre", options: { filterOptions: { fullWidth: true } } },
  "Cliente",
  "Aeropuerto",
  "Equipo",
  //"Costo",
  "Venta",
  "Estatus",
  "Fecha",
 
  
];

useEffect(() => {
  const userClientId = localStorage.getItem("userClientId");

  setClienteId(userClientId)
  if(userClientId != 2) setCliente(userClientId)
}, [])
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
      <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>
      {/* <Grid container>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Home
          </Typography>
        </Grid>
        
      </Grid> */}

    </Box>
    <Box sx={{ width: `calc(100% - ${300}px)`, marginLeft: { sm: '260px' }, marginBottom: '50px'}}>
      <Grid container spacing={3}>
      {
      clienteId == 2 &&  (
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cliente}
              onChange={handleCliente}
            >
              <MenuItem value={0}>TODOS</MenuItem>
              {
                clientes.map(cliente => (
                  <MenuItem value={cliente.idcliente} key={cliente.idcliente}>{cliente.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        )}
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Aeropuerto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={aeropuerto}
              onChange={handleAeropuerto}
            >
              <MenuItem value={0}>TODOS</MenuItem>
              {
                aeropuertos.map(aeropuerto => (
                  <MenuItem value={aeropuerto.idaeropuerto} key={aeropuerto.idaeropuerto}>{aeropuerto.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={equipo}
              onChange={handleEquipo}
            >
              <MenuItem value={0}>TODOS</MenuItem>
              {
                equipos.map(equipo => (
                  <MenuItem value={equipo.idequipo} key={equipo.idequipo}>{equipo.noeconomico} - {equipo.equipo}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
       
      </Grid>
    </Box>
    <Box sx={{ width: `calc(100% - ${300}px)`, marginLeft: { sm: '260px' }, marginBottom: '50px'}}>
      <Grid container spacing={3}>
        
        <Grid item md={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="Fecha de inicio"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="Fecha fin"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }, marginBottom: '20px'}}>
    <Grid container>
    <Grid item md={6}>
          <Button variant="outlined" onClick={generarResumen}>Generar resúmen</Button>
        </Grid>
    </Grid>
    </Box>
     {
      clienteId == 2 ?  (
        <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }, marginBottom: '20px'}}>
        <Typography variant="h4" >
            Resumen de costos y ventas
          </Typography>
          <Typography variant="h5" style={{color: '#626263', marginTop: '10px'}}>
            Costos: ${costos}
          </Typography>
          <Typography variant="h5" style={{color: '#626263',  marginTop: '10px'}}>
            Ventas: ${ventas}
          </Typography>
          </Box>
      ) : (
        <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }, marginBottom: '20px'}}>
        <Typography variant="h4" >
            Resumen de ventas
          </Typography>
          <Typography variant="h5" style={{color: '#626263',  marginTop: '10px'}}>
            Ventas: ${ventas}
          </Typography>
          </Box>
      )
     }
        <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>
        <MUIDataTable
        
        title={"Últimas incidencias"}
        data={data}
        columns={clienteId == 2 ? columns : columns2 }
        options={options}
      />
        </Box>



      {/* Modal */}
      <div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nuevo registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa todos los datos para poder completar un nuevo registro.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del aeropuerto"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)} value={nombre}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Siglas del aeropuerto"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setSiglas(e.target.value)} value={siglas}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={isNew ? postData : updateData}>{isNew ? 'Agregar' : 'Editar'}</Button>
        </DialogActions>
      </Dialog>
    </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Aeropuerto;

