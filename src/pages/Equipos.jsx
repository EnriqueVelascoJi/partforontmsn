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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Alert } from '@mui/material';


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

function Aeropuerto() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [isNew, setIsnew] = useState(true);

  const [nombre, setNombre] = useState('')
  const [siglas, setSiglas] = useState('')
  const [idToEdit, setIdToEdit] = useState(0)


  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [noSerie, setNoSerie] = useState('')
  const [tipoCombustible, setTipoCombustible] = useState('')
  const [noEconomico, setNoEconomico] = useState('')
  const [motivo, setMotivo] = useState('')
  const [enUso, setEnUso] = useState(true)
  const [aeropuerto, setAeropuerto] = useState(0);
  const [cliente, setCliente] = useState(0);
  const [tipo, setTipo] = useState(0);


  const [aeropuertos, setAeropuertos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [clienteId, setClienteId] = useState(0)

  const [globalError, setGlobalError] = useState(false)



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

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        const dataDisplay = normalData.map(item => [item.idequipo, item.equipo, item.noeconomico, item.marca, item.modelo, item.noserie, item.tipocombustible, item.enuso ? <CheckCircle color='success'/> : <Cancel color='error'/>, item.motivo, item.nombreaeropuerto, item.nombrecliente]);

       setData(dataDisplay);

    } catch (error) {
        console.log(error)
    }
    
    
}
const postData = async() => {

  console.log(aeropuerto)
  if(aeropuerto=== 0 || tipo == 0 || nombre === '' || marca === '' || modelo === '' || noSerie === '' || noEconomico === '' || tipoCombustible === '' ) {
    setGlobalError(true)
    return
  } 
  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';

    try {
        const body = {
          nombre,
          marca,
          modelo,
          noSerie,
          noEconomico,
          tipoCombustible,
          aeropuerto,
          motivo,
          enUso,
          idTipoEquipo: tipo


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
  
          console.log(result.data)
        
    } catch (error) {
        console.log(error)
    }
    navigate(0)
    
}
const updateData = async() => {
  if(aeropuerto=== 0 || tipo == 0 || nombre === '' || marca === '' || modelo === '' || noSerie === '' || noEconomico === '' || tipoCombustible === '' ) {
    setGlobalError(true)
    return
  } 
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/${idToEdit}`;

    try {
        const body = {
          nombre,
          marca,
          modelo,
          noSerie,
          noEconomico,
          tipoCombustible,
          aeropuerto,
          motivo,
          enUso,
          idTipoEquipo: tipo


        }
        console.log(body)
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
const handleAeropuerto = (e) => {

  setAeropuerto(e.target.value)
  setGlobalError(false)

}
const handleTipo = (e) => {

  setTipo(e.target.value)
  setGlobalError(false)

}
const handleCliente = (e) => {


  setCliente(e.target.value)
    setGlobalError(false)

}
const handleModelo = (e) => {


  setModelo(e.target.value)
    setGlobalError(false)

}
const handleMarca = (e) => {


  setMarca(e.target.value)
    setGlobalError(false)

}
const handleNombre = (e) => {


  setNombre(e.target.value)
    setGlobalError(false)

}
const handleNoEconomico = (e) => {


  setNoEconomico(e.target.value)
    setGlobalError(false)

}
const handleNoSerie = (e) => {


  setNoSerie(e.target.value)
    setGlobalError(false)

}

const handleMotivo = (e) => {


  setMotivo(e.target.value)
    setGlobalError(false)

}

const handleTipoCombustible = (e) => {


  setTipoCombustible(e.target.value)
    setGlobalError(false)

}
const handleEnUso= (e) => {


  setEnUso(e.target.value)
    setGlobalError(false)

}




const fetchClientes = async() => {

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
const fetchAeropuertos = async() => {

  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/aeropuertocliente/${cliente}`;

  try {
      const response = await fetch(url);
      const result = await response.json();

      const normalData = result.data;
     setAeropuertos(normalData)
  } catch (error) {
      console.log(error)
  }
  
  
}
const fetchTipos = async() => {

  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/tipoequipos`;

  try {
      const response = await fetch(url);
      const result = await response.json();

      const normalData = result.data;
     setTipos(normalData)
  } catch (error) {
      console.log(error)
  }
  
  
}
useEffect(() => {

        fetchData()
        fetchClientes()
        fetchTipos()
    
}, [])
useEffect(() => {

  fetchAeropuertos()

}, [cliente])

const editItem  = async(id, data) => {
  console.log(data)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data[0];
        console.log(normalData)
        
        setNombre(normalData.equipo)
        setMarca(normalData.marca)
        setModelo(normalData.modelo)
        setNoEconomico(normalData.noeconomico)
        setNoSerie(normalData.noserie)
        setTipoCombustible(normalData.tipocombustible)
        setMotivo(normalData.motivo)
        setEnUso(normalData.enuso)
        setCliente(normalData.idcliente)
        setAeropuerto(normalData.idclienteaeropuerto)
        setTipo(normalData.idtipoequipo)

        handleClickOpen()
        setIsnew(0)
        setIdToEdit(id)
    } catch (error) {
        console.log(error)
    }
  
}
const deleteEquipo = async (id) => {
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/${id}`;

  try {
    const response = await fetch(url, {
        method: "DELETE", 
      });
      const result = await response.json();

  } catch (error) {
      console.log(error)
  }
  navigate(0)
}
const chooseDelete = async(id) => {
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
      deleteEquipo(id)
      Swal.fire(
        'Eliminado!',
        '',
        'success'
      )
    }
  })
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
  { name: "Equipo", options: { filterOptions: { fullWidth: true } } },
  "No. económico",
  "Marca",
  "Modelo",
  "No. serie",
  "Tipo de combustible",
  "En uso",
  "Motivo",
  "Aeropuerto",
  "Cliente",
  {
    name: "Editar",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton
                                      onClick={() => editItem(tableMeta.rowData[0], tableMeta)}
                                  >
                                      <Edit />
                                  </IconButton>
        );
      }
    }
  },
  {
    name: "Eliminar",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton
          onClick={() => chooseDelete(tableMeta.rowData[0])}
          >
                                      <Delete/>
                                  </IconButton>
        );
      }
    }
  },
  
];

const columns2 = [
  "ID",
  { name: "Equipo", options: { filterOptions: { fullWidth: true } } },
  "No. económico",
  "Marca",
  "Modelo",
  "No. serie",
  "Tipo de combustible",
  "En uso",
  "Motivo"
  
];

useEffect(() => {
  const userClientId = localStorage.getItem("userClientId");
  setClienteId(userClientId)
}, [])

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
            <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>

      <Grid container style={{}}>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Equipos
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Button variant="outlined" onClick={handleClickOpen}>Nuevo</Button>
        </Grid>
      </Grid>

    </Box>
    <Box sx={{  width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>

        <MUIDataTable
          title={"Lista de equipos"}
          data={data}
          columns={clienteId == 2 ? columns : columns2}
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
          <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cliente}
              onChange={handleCliente}
            >
              <MenuItem value={0}>-- Selecciona un cliente --</MenuItem>
              {
                clientes.map(cliente => (
                  <MenuItem value={cliente.idcliente} key={cliente.idcliente}>{cliente.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="demo-simple-select-label">Aeropuerto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={aeropuerto}
              onChange={handleAeropuerto}
            >
              <MenuItem value={0}>-- Selecciona un aeropuerto --</MenuItem>
              {
                aeropuertos.map(aeropuerto => (
                  <MenuItem value={aeropuerto.idclienteaeropuerto} key={aeropuerto.idaeropuerto}>{aeropuerto.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="demo-simple-select-label">Tipo de Equipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tipo}
              onChange={handleTipo}
            >
              <MenuItem value={0}>-- Selecciona un tipo de equipo --</MenuItem>
              {
                tipos.map(tipoequipo => (
                  <MenuItem value={tipoequipo.idtipoequipo} key={tipoequipo.idtipoequipo}>{tipoequipo.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNombre} value={nombre}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Marca del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleMarca} value={marca}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="No económico del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNoEconomico} value={noEconomico}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Modelo del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleModelo} value={modelo}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="No serie del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNoSerie} value={noSerie}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Tipo de combustible del equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTipoCombustible} value={tipoCombustible}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">En uso</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={enUso}
              onChange={handleEnUso}
            >
              <FormControlLabel value={true} control={<Radio />} label="En uso" />
              <FormControlLabel value={false} control={<Radio />} label="No en uso" />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Motivo de no usar el equipo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleMotivo} value={motivo}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={isNew ? postData : updateData}>{isNew ? 'Agregar' : 'Editar'}</Button>
        </DialogActions>
        {globalError && <Alert severity="error" style={{marginTop: '10px'}}>Error en el formulario!</Alert>}
      </Dialog>
    </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Aeropuerto;

