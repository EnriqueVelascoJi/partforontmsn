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

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  const [selectedRefacciones, setSelectedRefacciones] = useState([])


  

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [isNew, setIsnew] = useState(true);

  const [nombre, setNombre] = useState('')
  const [siglas, setSiglas] = useState('')
  const [idToEdit, setIdToEdit] = useState(0)

  const [clientes, setClientes] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [refacciones, setRefacciones] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [estatus, setEstatus] = useState([
    'Nueva incidencia',
    'En espera de aprobación',
    'Aprobada',
    'Rechazada',
    'Terminada'
  ])

  const [refaccionIn, setRefaccionIn] = useState([])

  const [cliente, setCliente] = useState('');
  const [aeropuerto, setAeropuerto] = useState('');
  const [equipo, setEquipo] = useState('');
  const [refaccion, setRefaccion] = useState('');
  const [mecanico, setMecanico] = useState('');
  const [est, setEst] = useState('');

  const [descripcion, setDescripcion] = useState('')
  const [comentarios, setComentarios] = useState('')

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

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia';

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        const dataDisplay = normalData.map(item => [item.idincidencia, item.nombre, item.estatus, item.descripcion, item.comentario, item.checkwa ? <CheckCircle color='success'/> : <Cancel color='error'/>, item.fecha.split('T')[0]]);

       setData(dataDisplay);

    } catch (error) {
        console.log(error)
    }
    
    
}

const getSelects = async () => {

  const urlCliente = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';
  const urlAeropuerto = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';
  const urlEquipo = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/';
  const urlRefacciones= 'https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/';
  const urlMecanico= 'https://backmsn.msnserviciosaereos.com.mx/apiv2/mecanico/';


      try {

        const [clienteResponse, aeropuertoResponse, equipoResponse, refaccionResponse, mecanicoResponse] = await Promise.all([
          fetch(urlCliente),
          fetch(urlAeropuerto),
          fetch(urlEquipo),
          fetch(urlRefacciones),
          fetch(urlMecanico)
        ]);
        const [clienteResult, aeropuertoResult, equipoResult, refaccionResult, mecanicoResult] = await Promise.all([
          clienteResponse.json(),
          aeropuertoResponse.json(),
          equipoResponse.json(),
          refaccionResponse.json(),
          mecanicoResponse.json()
        ])

        console.log(clienteResult, aeropuertoResult, equipoResult)
        setClientes(clienteResult.data)
        setEquipos(equipoResult.data)
        setAeropuertos(aeropuertoResult.data)
        setRefacciones(refaccionResult.data)
        setMecanicos(mecanicoResult.data)
        

    } catch (error) {
        console.log(error)
    }
}
const postData = async() => {
  const url = 'hhttps://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/';

    try {
      const incidencia = {
        nombre,
        descripcion,
        comentario: comentarios,
        idMecanico: mecanico,
        estatus: est,
        refacciones: refaccionIn,
        fecha: new Date(),
      }
          const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(incidencia)
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

useEffect(() => {

  getSelects()

}, [])


//handles
const handleStatus = (e) => {

  setEst(e.target.value)
}
const handleDescripcion = (e) => {

  setDescripcion(e.target.value)
}
const handleComentarios = (e) => {

  setComentarios(e.target.value)
}
const handleEquipo = (e) => {

  setEquipo(e.target.value)
}
const handleMecanico = (e) => {

  setMecanico(e.target.value)
}
const handleRefaccion = (e) => {

  setRefaccion(e.target.value)
}

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setSelectedRefacciones(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );

};

const handleRefaccionesIncidencias = (e, id) => {

  const newArray = refaccionIn.map(rI => {
    if(rI.id === id) {
      rI[e.target.name] = e.target.value
    }
    return rI
  })

  setRefaccionIn(newArray)
}
useEffect(() => {

        fetchData()
        getSelects()
    
}, [])
useEffect(() => {
  if(selectedRefacciones.length > 0) {

    const refaccionesIncidecnias = selectedRefacciones.map((sr, index) => (
      {
        id: index,
        refaccion: refacciones.find(r => r.nombre === sr).idrefaccion,
        noPiezas: 0,
        costo: 0,
        precioVenta: 0,
        fechaVenta: new Date(),
        fechaCosto: new Date(),
        proveedor: ''
      }
    ))

    console.log(refaccionesIncidecnias)
    setRefaccionIn(refaccionesIncidecnias)
  }
}, [selectedRefacciones])

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
const verMas  = async(id) => {
  // console.log(id)
  // const url = `http://localhost:3016/incidencia/${id}`;

  //   try {
  //       const response = await fetch(url);
  //       const result = await response.json();

  //       const normalData = result.data;

  //       console.log(normalData)

        
  //   } catch (error) {
  //       console.log(error)
  //   }
  
  navigate(`/incidencia/${id}`)
}
const deleteIncidencia = async (id) => {
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/${id}`;

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
      deleteIncidencia(id)
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
  "Estatus",
  "Descripción",
  "Comentario",
  "Check WhatsApp",
  "Fecha",
  {
    name: "Ver más",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton
                                      onClick={() => verMas(tableMeta.rowData[0])}
                                  >
                                      <VisibilityIcon />
                                  </IconButton>
        );
      }
    }
  },
  {
    name: "Editar",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton
                                      onClick={() => editItem(tableMeta.rowData[0])}
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
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
      <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Resumen de Incidencia
          </Typography>
        </Grid>
      </Grid>

    </Box>
    
        <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>
          <Grid container spacing={3}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Cliente:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
                  Estafeta
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Aeropuerto:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
                  Aeropuerto SLP
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Equipo:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
              BARRA DE REMOLQUE B737
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Estatus:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
                Nueva incidencia
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Costo:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
              $400000
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Gasto:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
                $30000
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h4">
                  Refacciones:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h4">
              Refaccion 1
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
        </Box>



      {/* Modal */}
      <div>

      <Dialog open={open} onClose={handleClose} fullWidth={true}
        maxWidth={'lg'}>
        <DialogTitle>Nuevo registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa todos los datos para poder completar un nuevo registro.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la incidencia"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)} value={nombre}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Descripción de la incidencia"
            type="text"
            fullWidth
            variant="standard"
            multiline
          rows={4}
            onChange={(e) => setDescripcion(e.target.value)} value={descripcion}
          />
           <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Comentarios adicionales "
            type="text"
            fullWidth
            variant="standard"
            multiline
          rows={4}
            onChange={(e) => setComentarios(e.target.value)} value={comentarios}
          />
       
      <Grid container spacing={3} style={{marginTop: '20px'}}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={equipo}
              label="Age"
              onChange={handleEquipo}
            >
              <MenuItem value={''}>-- Selecciona un equipo --</MenuItem>
              {
                equipos.map(equipo => (
                  <MenuItem value={equipo.equipo} key={equipo.idequipo}>{equipo.equipo}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>

          <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Refacciones</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedRefacciones}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {refacciones.map((refaccion) => (
              <MenuItem key={refaccion.idrefaccion} value={refaccion.nombre}>
                <Checkbox checked={selectedRefacciones.indexOf(refaccion.nombre) > -1} />
                <ListItemText primary={refaccion.nombre} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>

        </Grid>
      </Grid>
      <Grid container spacing={3} style={{marginTop: '20px'}}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mecanico</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mecanico}
              label="Mecanico"
              onChange={handleMecanico}
            >
              <MenuItem value={''}>-- Selecciona un mecanico --</MenuItem>
              {
                mecanicos.map(mecanico => (
                  <MenuItem value={mecanico.idmecanico} key={mecanico.idmecanico}>{mecanico.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={est}
              label="Estatus"
              onChange={handleStatus}
            >
              <MenuItem value={''}>-- Selecciona un estatus --</MenuItem>
              {
                estatus.map(est => (
                  <MenuItem value={est} key={est}>{est}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>


      {
        refaccionIn.map(rI => (
          <Grid key={rI.id} container spacing={3} style={{marginTop: '20px'}}>
       
        <Grid item md={3}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Refacción"
            type="text"
            fullWidth
            variant="standard"
            value={rI.refaccion}
            disabled
          />
          </FormControl>
          
        </Grid>
        <Grid item md={3}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="No piezas"
            type="number"
            fullWidth
            variant="standard"
            name="noPiezas"
            onChange={(e) => handleRefaccionesIncidencias(e, rI.id)} value={rI.noPiezas}
          />
          </FormControl>
          
        </Grid>
        <Grid item md={3}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="costo"
            type="number"
            fullWidth
            variant="standard"
            name="costo"
            onChange={(e) => handleRefaccionesIncidencias(e, rI.id)} value={rI.costo}
          />
          </FormControl>
          
        </Grid>
        <Grid item md={3}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Precio de venta"
            type="number"
            fullWidth
            variant="standard"
            name="precioVenta"
            onChange={(e) => handleRefaccionesIncidencias(e, rI.id)} value={rI.precioVenta}
          />
          </FormControl>
          
        </Grid>
      </Grid>
        ))
      }



      <Grid container style={{marginTop: '20px'}} >
      <Button variant="outlined" endIcon={<ImageIcon />} style={{marginRight: '20px'}}>
        <label htmlFor="img">Subir Imagen</label>
              <input type="file"
                      id="img" name="img"
                      accept="image/png, image/jpeg" style={{visibility:'hidden'}}/>
              
      </Button>
      <Button variant="outlined" endIcon={<AttachFileIcon />} style={{marginRight: '20px'}}>
      <label htmlFor="img">Subir archivo</label>
              <input type="file"
                      id="img" name="img"
                      accept="image/png, image/jpeg" style={{visibility:'hidden'}}/>      </Button>
      </Grid>
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

