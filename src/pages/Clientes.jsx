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

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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

  const [clienteId, setClienteId] = useState(0)

  const [idaeropuertos, setIdAeropuertos] = useState([])
  const [aeropuertos, setAeropuertos]  = useState([])
  const [selectedAeropuertos, setSelectedAeropuertos] = useState([])

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

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        const dataDisplay = normalData.map(item => [item.idcliente, item.nombre, item.descripcion]);

       setData(dataDisplay);

    } catch (error) {
        console.log(error)
    }
    
    
}

const fetchAeropuertos = async() => {

  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/aeropuerto/';

  try {
      const response = await fetch(url);
      const result = await response.json();

      const normalData = result.data;
      const idsAeropuertos = normalData.map(aeropuerto => aeropuerto.idaeropuerto)

     setAeropuertos(normalData);
     setIdAeropuertos(idsAeropuertos)

  } catch (error) {
      console.log(error)
  }
  
  
}

const postData = async() => {

  let error= false;
  if(nombre === '' || siglas === '' || selectedAeropuertos.length === 0) {
    setGlobalError(true)
    return
  } 
  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';
  const newAeropuertos = aeropuertos.filter(aeropuerto => selectedAeropuertos.indexOf(aeropuerto.nombre) !== -1)

 if(!error) {
  try {
    const body = {
      nombre,
      descripcion: siglas,
      aeropuertos: newAeropuertos
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
    
}
const updateData = async() => {

  let error= false;
  if(nombre === '' || siglas === '' || selectedAeropuertos.length === 0) {
    setGlobalError(true)
    return
  } 
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/${idToEdit}`;
  const newAeropuertos = aeropuertos.filter(aeropuerto => selectedAeropuertos.indexOf(aeropuerto.nombre) !== -1)

 if(!error) {
  try {
    const body = {
      nombre,
      descripcion: siglas,
      aeropuertos: newAeropuertos
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
    
}


useEffect(() => {

        fetchData()
        fetchAeropuertos()
    
}, [])

const editItem  = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log(normalData)

        setNombre(normalData[0].nombre)
        setSiglas(normalData[0].descripcion)

        let aeropuertosText = []
        for(let i = 0; i < aeropuertos.length; i++) {
          for(let j = 0; j < normalData.length; j++) {
            if(aeropuertos[i].idaeropuerto === normalData[j].idaeropuerto) {
              aeropuertosText.push(aeropuertos[i].nombre)
            }
          }
        }
        setSelectedAeropuertos(aeropuertosText)

        

        handleClickOpen()
        setIsnew(0)
        setIdToEdit(id)
    } catch (error) {
        console.log(error)
    }
  
}

const deleteCliente = async (id) => {
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/${id}`;

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

const deleteItem = async(id) => {
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
      deleteCliente(id)
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
  "Descripción",
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
                                      onClick={() => deleteItem(tableMeta.rowData[0])}
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
  { name: "Nombre", options: { filterOptions: { fullWidth: true } } },
  "Descripción",
  
];

useEffect(() => {
  const userClientId = localStorage.getItem("userClientId");
  setClienteId(userClientId)
}, [])

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setSelectedAeropuertos(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
  setGlobalError(false)
};

const handleNombre = (e) => {
  setNombre(e.target.value)
  setGlobalError(false)

}
const handleSiglas = (e) => {
  setSiglas(e.target.value)
  setGlobalError(false)

}

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
            <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>

      <Grid container style={{}}>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Clientes
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Button variant="outlined" onClick={handleClickOpen}>Nuevo</Button>
        </Grid>
      </Grid>

    </Box>
    <Box sx={{  width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>

        <MUIDataTable
          title={"Lista de Clientes"}
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del cliente"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNombre} value={nombre}
          />
          <TextField
            autoFocus
            margin="dense"
            id="siglas"
            label="Descripción del cliente"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleSiglas} value={siglas}
          />
        </DialogContent>
        <Grid container style={{margin: '0 5%'}}>
        <FormControl style={{width: '90%'}}>
          <InputLabel id="demo-multiple-checkbox-label">Aeropuertos donde opera</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedAeropuertos}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {aeropuertos.map((aeropuerto) => (
              <MenuItem key={aeropuerto.idaeropuerto} value={aeropuerto.nombre}>
                <Checkbox checked={selectedAeropuertos.indexOf(aeropuerto.nombre) > -1} />
                <ListItemText primary={aeropuerto.nombre} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
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

