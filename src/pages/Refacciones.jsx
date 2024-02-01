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

  const [costo, setCosto] = useState(0)
  const [venta, setVenta] = useState(0)

  const [fechaVenta, setFechaVenta] = useState(new Date())
  const [fechaCosto, setFechaCosto] = useState(new Date())

  const [tipoEquipos, setTipoEquipos]  = useState([])
  const [selectedTipoEquipos, setSelectedTipoEquipos] = useState([])
  

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [isNew, setIsnew] = useState(true);

  const [nombre, setNombre] = useState('')
  const [proveedor, setProveedor] = useState('')
  const [idToEdit, setIdToEdit] = useState(0)

  const navigate = useNavigate();

  const [clienteId, setClienteId] = useState(0)


 

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

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/';

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log(normalData[0].fechacosto)
        const dataDisplay = normalData.map(item => [item.idrefaccion, item.nombre, item.costo ? `$ ${item.costo}`  : '-', item.fechacosto ? item.fechacosto.split('T')[0] : '-',  item.venta ? `$ ${item.venta}`  : '-', item.fechaventa ? item.fechaventa.split('T')[0] : '-', item.proveedor]);

       setData(dataDisplay);

    } catch (error) {
        console.log(error)
    }
    
    
}
const postData = async(id) => {
  const newEquipos = tipoEquipos.filter(tipoequipo => selectedTipoEquipos.indexOf(tipoequipo.nombre) !== -1)

  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/';

    try {
        const body = {
          nombre,
          proveedor,
          costo,
          venta,
          fechaCosto,
          fechaVenta,
          equipos: newEquipos
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
  const newEquipos = tipoEquipos.filter(tipoequipo => selectedTipoEquipos.indexOf(tipoequipo.nombre) !== -1)

  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/${idToEdit}`;

    try {
      const body = {
        nombre,
        proveedor,
        costo,
        venta,
        fechaCosto,
        fechaVenta,
        equipos: newEquipos
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
const fetchTipoEquipo = async() => {
  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/tipoequipos/';

  try {
      const response = await fetch(url);
      const result = await response.json();

      const normalData = result.data;

     setTipoEquipos(normalData);

  } catch (error) {
      console.log(error)
  }
}

useEffect(() => {

        fetchData()
    
}, [])

const editItem  = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log(normalData)

        setNombre(normalData[0].nombre)
        setProveedor(normalData[0].proveedor)
        setCosto(normalData[0].costo)
        setVenta(normalData[0].venta)
        setFechaCosto(normalData[0].fechacosto ? normalData[0].fechacosto.split('T')[0] : new Date())
        setFechaVenta(normalData[0].fechaventa ? normalData[0].fechaventa.split('T')[0] : new Date())
        let tipoEquipoText = []
        for(let i = 0; i < tipoEquipos.length; i++) {
          for(let j = 0; j < normalData.length; j++) {
            if(tipoEquipos[i].idtipoequipo === normalData[j].idtipoequipo) {
              tipoEquipoText.push(tipoEquipos[i].nombre)
            }
          }
        }
        setSelectedTipoEquipos(tipoEquipoText)


        handleClickOpen()
        setIsnew(0)
        setIdToEdit(id)
    } catch (error) {
        console.log(error)
    }
  
}
const deleteRefaccion = async (id) => {
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/${id}`;

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
      deleteRefaccion(id)
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
  "Nombre",
  { name: "Costo", options: { filterOptions: { fullWidth: true } } },
  "Fecha costo",
  "Venta",
  "Fecha venta",
  "Proveedor",
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

const columns2 = [
  "ID",
  "Nombre",
  { name: "Costo", options: { filterOptions: { fullWidth: true } } },
  "Fecha costo",
  "Venta",
  "Fecha venta",
  "Proveedor"
];

useEffect(() => {
  const userClientId = localStorage.getItem("userClientId");
  setClienteId(userClientId)
}, [])

useEffect(() => {
  fetchTipoEquipo()
}, [])

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setSelectedTipoEquipos(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
            <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>

      <Grid container style={{}}>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Refacciones
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Button variant="outlined" onClick={handleClickOpen}>Nuevo</Button>
        </Grid>
      </Grid>

    </Box>
    <Box sx={{  width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>

        <MUIDataTable
          title={"Lista de Refacciones"}
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
            label="Nombre de la refacción"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNombre(e.target.value)} value={nombre}
          />
          <TextField
            autoFocus
            margin="dense"
            id="proveedor"
            label="Proveedor"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProveedor(e.target.value)} value={proveedor}
          />
          <TextField
            autoFocus
            margin="dense"
            id="proveedor"
            label="Costo"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setCosto(e.target.value)} value={costo}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fecha"
            label="Fecha costo"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setFechaCosto(e.target.value)} value={fechaCosto}
          />
          <TextField
            autoFocus
            margin="dense"
            id="proveedor"
            label="Venta"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setVenta(e.target.value)} value={venta}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fecha"
            label="Fecha venta"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setFechaVenta(e.target.value)} value={fechaVenta}
          />
           <Grid container style={{margin: '5% 0'}}>
          <FormControl style={{width: '95%'}}>
          <InputLabel id="demo-multiple-checkbox-label">Tipo de equipo</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedTipoEquipos}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {tipoEquipos.map((tipoequipo) => (
              <MenuItem key={tipoequipo.idtipoequipo} value={tipoequipo.nombre}>
                <Checkbox checked={selectedTipoEquipos.indexOf(tipoequipo.nombre) > -1} />
                <ListItemText primary={tipoequipo.nombre} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
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

