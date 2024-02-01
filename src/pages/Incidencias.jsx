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
import Autocomplete from "@mui/material/Autocomplete";

import { Alert } from '@mui/material';
import S3 from 'react-aws-s3';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';


import DeleteIcon from '@mui/icons-material/Delete';


const MAX_COUNT = 5;

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
function getSum(total, num) {
  return total + num;
}

// const config = {
//   bucketName: process.env.REACT_APP_BUCKET_NAME,
//   dirName: process.env.REACT_APP_DIR_NAME /* optional */,
//   region: process.env.REACT_APP_REGION,
//   accessKeyId: process.env.REACT_APP_ACCESS_ID,
//   secretAccessKey: process.env.REACT_APP_ACCESS_KEY,



// }
const config = {
  bucketName: 'msnserviciosaereosbucket',
  // dirName: '',
  region: 'us-east-1',
  accessKeyId: 'AKIA6LCQFQVQS7XZLMWF',
  secretAccessKey: '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',
  s3Url: 'https://msnserviciosaereosbucket.s3.amazonaws.com'
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

  const [selectedRefacciones, setSelectedRefacciones] = useState([])
  const [selectedRefaccionesToEdit, setSelectedRefaccionesToEdit] = useState([])

  const [inputValue, setInputValue] = React.useState('');
  const [inputValue1, setInputValue1] = React.useState('');

  const [globalError, setGlobalError] = useState(false)

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [isNew, setIsnew] = useState(true);

  const [nombre, setNombre] = useState('')
  const [siglas, setSiglas] = useState('')
  const [idToEdit, setIdToEdit] = useState(0)

  const [clientes, setClientes] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [displayEquipos, setDisplayEquipos] = useState([])
  const [displayEquipos1, setDisplayEquipos1] = useState([])

  const [refacciones, setRefacciones] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [estatus, setEstatus] = useState([
    'Nueva incidencia',
    'En espera de aprobación',
    'Aprobada',
    'Rechazada',
    'Terminada'
  ])
  const [tipoServicio, setTipoServicio] = useState('')
  const [tipos, setTipos] = useState([
    'Preventivo',
    'Correctivo',
    'Predictivo'
  ])

  const [refaccionIn, setRefaccionIn] = useState([])
  const [refaccionesSave, setRefaccionesSave] = useState([])

  const [equiposSave, setEquiposSave] = useState([])

  const [totalRefacciones, setTotalRefacciones] = useState([])


  const [cliente, setCliente] = useState('');
  const [aeropuerto, setAeropuerto] = useState('');
  const [equipo, setEquipo] = useState('');
  const [refaccion, setRefaccion] = useState('');
  const [mecanico, setMecanico] = useState('');
  const [nombrePiezas, setNombrePiezas] = useState([])
  const [est, setEst] = useState('');

  const [descripcion, setDescripcion] = useState('')
  const [comentarios, setComentarios] = useState('')

  const [incidenciaData, setIncidenciaData] = useState([])


  const [search, setSearch] = useState('')
  const [searchEquipo, setSearchEquipo] = useState('')



  const [clienteId, setClienteId] = useState(0)
  const [idEquipo, setIdEquipo] = useState(0)
  const [idAeropuerto, setIdAeropuerto] = useState(0)

  const [costo, setCosto] = useState(0)
  const [venta, setVenta] = useState(0)

  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])

  const [files2, setFiles2] = useState([])
  const [images2, setImages2] = useState([])

  const [files3, setFiles3] = useState([])
  const [images3, setImages3] = useState([])

  const [files4, setFiles4] = useState([])
  const [images4, setImages4] = useState([])
  const [fileLimit, setFileLimit] = useState(false);


  const [imagesUploaded, setImagesUploaded] = useState([])
  const [filesUploaded, setFileUploaded] = useState([])

  const [filesDisplay, setFilesDisplay] = useState([])
  const [imagesDisplay, setImagesDisplay] = useState([])

  const [equiposSelected, setEquiposSelected] = useState([])

  const [noEquipos, setNoEquipos] = useState(1)

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

  const clear = () => {
    setIsnew(true)
    setNombre('')
    setDescripcion('')
    setComentarios('')
    setMecanico('')
    setEst('')
    setTipoServicio('')
    setCliente('')
    setAeropuerto('')
    setEquipo('')
    setAeropuertos([])
    setEquipos([])
    setRefacciones([])
    setRefaccionIn([])
    setSelectedRefacciones([])
    setDisplayEquipos([])
  }

  const handleClickOpen = () => {
    setOpen(true);

    
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };
  const handleClose2 = () => {
    setOpen2(false);
    clear();
  };

  const fetchData = async() => {

    const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia';

    try {
        const response = await fetch(url);
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
              normalData[i].equipo,
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
const fetchEquipos = async () => {

  console.log(aeropuerto)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/equipo/equipos/${aeropuerto}`;

  try {
      const response = await fetch(url);
      const result = await response.json();

      const normalData = result.data;
      console.log({normalData})

      const rta = normalData.sort((a, b) => parseInt(a.noeconomico.trim()) - parseInt(b.noeconomico.trim() ))
      const rta_1 = rta.sort((a,b) => a.equipo.trim().localeCompare(b.equipo.trim()))
      const newEquipos = rta_1.map(equipo => `${equipo.noeconomico} - ${equipo.equipo}`)
      setDisplayEquipos(newEquipos)
      setEquipos(normalData)
      setEquiposSave(normalData)
  } catch (error) {
      console.log(error)
  }
}

const getSelects = async () => {

  const urlCliente = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/cliente/';
  const urlRefacciones= 'https://backmsn.msnserviciosaereos.com.mx/apiv2/refacciones/';
  const urlMecanico= 'https://backmsn.msnserviciosaereos.com.mx/apiv2/mecanico/';


      try {

        const [clienteResponse, refaccionResponse, mecanicoResponse] = await Promise.all([
          fetch(urlCliente),
          fetch(urlRefacciones),
          fetch(urlMecanico)
        ]);
        const [clienteResult, refaccionResult, mecanicoResult] = await Promise.all([
          clienteResponse.json(),
          refaccionResponse.json(),
          mecanicoResponse.json()
        ])

        setClientes(clienteResult.data)
        setMecanicos(mecanicoResult.data)
        setTotalRefacciones(refaccionResult.data)
        

    } catch (error) {
        console.log(error)
    }
}
const getSelectsRefacciones = async (id) => {


  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/getbyequipo/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        setRefacciones(normalData)
        setRefaccionesSave(normalData)

    } catch (error) {
        console.log(error)
    }
  
}
const getSelectsRefacciones2 = async (id) => {


  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/getbyequipo/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        return normalData

    } catch (error) {
        console.log(error)
        return []
    }
  
}
const handleUpload = (file) => {
  let newFileName = file.name.replace(/\..+$/, "");
  const ReactS3Client = new S3(config);
  const result = ReactS3Client.uploadFile(file, newFileName).then((data) => {
    if (data.status === 204) {
      console.log("success", data.location);
      return data.location
    } else {
      console.log("fail");
    }
  }).catch(err => {
    console.log(err)
  });

  return result;
};

const uploadFiles = async (uploads, flag, id) => {

  if(flag === 1) config['dirName'] = 'adminimages'
  else config['dirName'] = 'adminfiles'



    // for (let i = 0; i < uploads.length; i++) {
    //   const fileUploaded = handleUpload(uploads[i]);
    //   console.log(fileUploaded, flag)
    // }

    const array = uploads.map(u => handleUpload(u))

    let resultUpload = await Promise.all(array)
    if(flag === 1) {
      const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/uploadimages';

      try {
        const incidencia = {
          id,
          images: resultUpload 
        }
            const response = await fetch(url, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(incidencia)
            });
            const result = await response.json();
          
      } catch (error) {
          console.log(error)
      }
      }
    else {
      const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/uploadfiles';

      try {
        const incidencia = {
          id,
          files: resultUpload 
        }
            const response = await fetch(url, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(incidencia)
            });
            const result = await response.json();
          
      } catch (error) {
          console.log(error)
      }
    }
} 
const postData = async() => {
  const incidencia = {
    nombre,
    descripcion,
    comentario: comentarios,
    idMecanico: mecanico,
    estatus: est,
    tipoServicio,
    refacciones: refaccionIn,
    cliente,
    aeropuerto: idAeropuerto,
    equipo: idEquipo,
    fecha: new Date(),
    images: imagesUploaded,
    files: filesUploaded

  }
  console.log(incidencia)
  if(cliente === '' || aeropuerto === '' || !equipo || nombre === '' || descripcion === '' || !mecanico  || est === '' || refaccionIn.length === 0 || tipoServicio === '') {
    setGlobalError(true)
    return
  } 
  const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/';

    try {
      const incidencia = {
        nombre,
        descripcion,
        comentario: comentarios,
        idMecanico: mecanico,
        estatus: est,
        refacciones: refaccionIn,
        tipoServicio,
        cliente,
        aeropuerto: idAeropuerto,
        equipo: idEquipo,
        fecha: new Date(),
        images: imagesUploaded,
        files: filesUploaded
      }
      console.log(incidencia)
          const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(incidencia)
          });
          const result = await response.json();
  
          const idIncidencia = result.data.id;

          console.log(idIncidencia)

          if(images.length > 0) await uploadFiles(images, 1, idIncidencia)
          if(files.length > 0) await uploadFiles(files, 2, idIncidencia)

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Incidencia creada exitosamente.',
            showConfirmButton: false,
            timer: 1500
          })

     
        
    } catch (error) {
        console.log(error)
    }
   //navigate(0)
    
}

const  borrarFiles = async(fls, id) => {
console.log(fls, id)
const ids = fls.map(f => f.idArchivo)

const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/borrarfiles';

      try {
        const incidencia = {
          id,
          ids
        }
            const response = await fetch(url, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(incidencia)
            });
            const result = await response.json();
          
      } catch (error) {
          console.log(error)
      }


}
const borrarImages = async(imgs, id) => {
console.log(imgs, id)
const ids = imgs.map(f => f.idArchivo)

const url = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/borrarimages';

      try {
        const incidencia = {
          id,
          ids
        }
            const response = await fetch(url, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(incidencia)
            });
            const result = await response.json();
          
      } catch (error) {
          console.log(error)
      }

}
const updateData = async() => {
  
  if(nombre === '' || descripcion === '' || !mecanico  || est === '' || refaccionIn.length === 0 || tipoServicio === '') {
    setGlobalError(true)
    return
  } 

  
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/${idToEdit}`;

    try {
      const incidencia = {
        nombre,
        descripcion,
        comentario: comentarios,
        idMecanico: mecanico,
        estatus: est,
        refacciones: refaccionIn,
        tipoServicio,
        fecha: new Date(),
      }
        const response = await fetch(url, {
            method: "PATCH", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(incidencia)
          });
          const result = await response.json();
  
          console.log(result.data)
          await borrarFiles(files3, idToEdit)
          await borrarImages(images3, idToEdit)
          if(images.length > 0) await uploadFiles(images, 1, idToEdit)
          if(files.length > 0) await uploadFiles(files, 2, idToEdit)

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Incidencia creada exitosamente.',
            showConfirmButton: false,
            timer: 1500
          })


          
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
  setGlobalError(false)

}
const handleTipo = (e) => {

  setTipoServicio(e.target.value)
  setGlobalError(false)

}
const handleDescripcion = (e) => {

  setDescripcion(e.target.value)
  setGlobalError(false)

}
const handleComentarios = (e) => {

  setComentarios(e.target.value)
  setGlobalError(false)

}
const handleEquipo = (e) => {

  console.log(e.target.value)
  setEquipo(e.target.value)
}
const handleMecanico = (e) => {

  setMecanico(e.target.value)
  setGlobalError(false)

}
const handleRefaccion = (e) => {

  setRefaccion(e.target.value)
}

const handleChange = (event) => {
  event.stopPropagation()
  const {
    target: { value },
  } = event;
  
  console.log(value)
  const newValue = value.filter(v => v !== '')
  console.log(newValue)
  setSelectedRefacciones(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : newValue,
  );
  setGlobalError(false)

};
const handleChange2 = (event, ide) => {
  event.stopPropagation()
  const {
    target: { value },
  } = event;
  
  console.log({value})
  const newValue = value.filter(v => v !== '')
  console.log({newValue, ide})

  let equiposAux = equiposSelected

  for(let i = 0; i < equiposAux.length; i++) {

    if(equiposAux[i].idEquipo == ide) {

      equiposAux[i].selectedRefacciones = typeof value === 'string' ? value.split(',') : newValue
      break
    }

  }

  console.log(equiposAux)
  
  setEquiposSelected(equiposAux)
  setGlobalError(false)

};

const handleChangeEquipo = (event) => {
  event.stopPropagation()
  const {
    target: { value },
  } = event;

  const newValue = value.filter(v => v !== '')
  console.log('entro', value)
  
  setEquipo(newValue[0])
  setDisplayEquipos1(newValue)
  setGlobalError(false)

};
const handleKey = (event) => {
  console.log({event})
}

const handleRefaccionesIncidencias = (e, id) => {

  console.log(refaccionIn, id)
  const newArray = refaccionIn.map(rI => {
    if(rI.id === id) {
      rI[e.target.name] = e.target.value
    }
    return rI
  })

  setRefaccionIn(newArray)
  setGlobalError(false)

}
const handleAeropuerto = (e) => {

  setAeropuerto(e.target.value)
  setGlobalError(false)

}
const handleCliente = (e) => {

  setCliente(e.target.value)
  setGlobalError(false)

}

const logicEquipos = async () => {
if(equipos.length > 0 && equiposSelected.length > 0) {

  const aux = equiposSelected
  for(let i = 0; i < aux.length; i++) {

    if(aux[i].equipo !== '' ) {

      const idEquipoT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === aux[i].equipo).idtipoequipo
    const idEquipoTT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === aux[i].equipo).idequipo
    if(idEquipoT) {
      aux[i].idTipoEquipo = idEquipoT
      aux[i].idReal = idEquipoTT
    const re = await getSelectsRefacciones2(idEquipoT)
    aux[i].refacciones = re
      //setIdEquipo(idEquipoTT)
    }
    }

    console.log('pre', aux)

  }
}
}
useEffect(() => {

        fetchData()
        getSelects()
    
}, [])
useEffect(() => {
  console.log({selectedRefacciones, refacciones})
  if(selectedRefacciones.length > 0 && !selectedRefacciones.includes('') && refacciones.length > 0) {
    console.log({selectedRefacciones, refacciones})
    const refaccionesIncidecnias = selectedRefacciones.map((sr, index) => (
      {
        id: index,
        refaccion: refaccionesSave.find(r => r.nombre === sr).idrefaccion,
        noPiezas: 1,
        costo: refaccionesSave.find(r => r.nombre === sr).costo ? refaccionesSave.find(r => r.nombre === sr).costo : 0,
        precioVenta: refaccionesSave.find(r => r.nombre === sr).venta ? refaccionesSave.find(r => r.nombre === sr).venta : 0,
        proveedor: refaccionesSave.find(r => r.nombre === sr).proveedor,
        fechaVenta: new Date().toISOString().slice(0, 10).toString(),
        fechaCosto: new Date().toISOString().slice(0, 10).toString(),
        nombreRefaccion: sr
      }
    ))

    if(nombrePiezas.length > 0) {
      let refaccionesIncidecniasEdit = []
      for(let i = 0; i < refaccionesIncidecnias.length; i++) {
        for(let j = 0; j < nombrePiezas.length; j++) {
          if(refaccionesIncidecnias[i].nombreRefaccion == nombrePiezas[j].nombre ) {
            refaccionesIncidecnias[i].noPiezas = nombrePiezas[j].nopiezas
            break
          }
        }
      }
    }

    console.log(refaccionesIncidecnias)
    setRefaccionIn(refaccionesIncidecnias)

  }
}, [selectedRefacciones, refacciones, nombrePiezas])
useEffect(() => {
  console.log({selectedRefaccionesToEdit})
  if(selectedRefaccionesToEdit.length > 0 && !selectedRefaccionesToEdit.includes('')) {
    const refaccionesIncidecnias = selectedRefaccionesToEdit.map((sr, index) => (
      {
        id: index,
        refaccion: sr.idrefaccion,
        noPiezas: sr.nopiezas,
        costo: sr.costo,
        precioVenta: sr.venta,
        proveedor: sr.proveedor,
        fechaVenta: new Date().toISOString().slice(0, 10).toString(),
        fechaCosto: new Date().toISOString().slice(0, 10).toString(),
        nombreRefaccion: sr.nombre
      }
    ))

    console.log(refaccionesIncidecnias)
    setRefaccionIn(refaccionesIncidecnias)
  }
}, [selectedRefaccionesToEdit])

useEffect(() => {
  console.log({equipos})
  if(equipos.length > 0 && equipo && equipo != '') {
    console.log(equipo)
    const idEquipoT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === equipo).idtipoequipo
    const idEquipoTT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === equipo).idequipo

    if(idEquipoT) {
      getSelectsRefacciones(idEquipoT)
      setIdEquipo(idEquipoTT)
    }
    
  }
  
}, [equipo])
useEffect(() => {
  //logicEquipos()
  
}, [equiposSelected])

useEffect(() => {
  console.log({aeropuertos})
  if(aeropuertos.length > 0 && aeropuerto) {
    const idAeropuertoT = aeropuertos.find(r => r.idclienteaeropuerto === aeropuerto).idaeropuerto
    if(idAeropuertoT) {
      setIdAeropuerto(idAeropuertoT)
    }
    
  }
  
}, [aeropuerto])
useEffect(() => {

  fetchAeropuertos()

}, [cliente])
useEffect(() => {

  fetchEquipos()

}, [aeropuerto])

useEffect(() => {
  console.log({search})
  if(search !== '') {
    const refaccionesFiltered = refacciones.filter(refaccion => refaccion.nombre.includes(search.toUpperCase()))

    if(refaccionesFiltered.length > 0) setRefacciones(refaccionesFiltered)
    else setRefacciones(refaccionesSave)
  }
  else setRefacciones(refaccionesSave)
}, [search])

useEffect(() => {
  console.log({searchEquipo})
  if(searchEquipo !== '') {
    const equiposFiltered = equipos.filter(equipo => equipo.equipo.toUpperCase().includes(searchEquipo.toUpperCase()))

    if(equiposFiltered.length > 0) setEquipos(equiposFiltered)
    else setEquipos(refaccionesSave)
  }
  else setEquipos(equiposSave)
}, [searchEquipo])

const verFiles = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/vermasfiles/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log({files: normalData})
        
        setFilesDisplay(normalData)
        


        
    } catch (error) {
        console.log(error)
    }

}
const verImages = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/vermasimages/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log({files: normalData})
       
        setImagesDisplay(normalData)


        
    } catch (error) {
        console.log(error)
    }

}
const verFiles2 = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/vermasfiles/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;

      
        const arraynew = normalData.map(f => ({name: f.url.split('adminfiles/')[1], url: f.url, idArchivo: f.idarchivo}))
        console.log(arraynew)
        setFiles2(arraynew)
        setFiles4(arraynew)


        
    } catch (error) {
        console.log(error)
    }

}
const verImages2 = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/vermasimages/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;

        const arraynew = normalData.map(f => ({name: f.url.split('adminimages/')[1], url: f.url, idArchivo: f.idimagen}))
        setImages2(arraynew)
        setImages4(arraynew)



        
    } catch (error) {
        console.log(error)
    }

}
const editItem  = async(id) => {

  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/${id}`;

    try {
        
      const response = await fetch(url);
      const result = await response.json();

        const normalData = result.data[0];
        console.log(result.data)
        const refaccionesToEdit = result.data.map(re => ({
          idrefaccion: re.idrefaccion,
          costo: re.costo,
          venta: re.venta,
          proveedor: re.proveedor,
          nombre: re.nombrerefaccion,
          nopiezas: re.nopiezas
        }))
        const nameRefaciiones = result.data.map(re => re.nombrerefaccion);
        const namePiezasRefacciones = result.data.map(re => ({nombre: re.nombre, nopiezas: re.nopiezas}))
        setNombrePiezas(namePiezasRefacciones)
        console.log({nameRefaciiones})
        console.log(result.data)
        console.log(normalData)
        console.log(refaccionesToEdit)
        setCliente(normalData.idcliente)
        setAeropuerto(normalData.idclienteaeropuerto)
        setEquipo(`${normalData.noeconomico} - ${normalData.nombrequipo}`)
        getSelectsRefacciones(normalData.idtipoequipo)
        setSelectedRefacciones(nameRefaciiones)
        //setSelectedRefaccionesToEdit(refaccionesToEdit)
        setDescripcion(normalData.descripcion)
        setComentarios(normalData.comentario)
        setEst(normalData.estatus)
        setNombre(normalData.nombreincidencia)
        setTipoServicio(normalData.tiposervicio)
        setMecanico(normalData.idmecanico)
        // setSelectedRefacciones(nameRefaciiones)
        await verFiles2(id)
        await verImages2(id)

        handleClickOpen()
        setIsnew(0)
        setIdToEdit(id)
    } catch (error) {
        console.log(error)
    }
  
}

const verMas  = async(id) => {
  console.log(id)
  const url = `https://backmsn.msnserviciosaereos.com.mx/apiv2/incidencia/vermas/${id}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        const normalData = result.data;
        console.log({normalData})

        let costo = 0
        let venta = 0
          for(let i = 0; i < normalData.length; i++) {
            costo += normalData[i].nopiezas * normalData[i].costo
            venta += normalData[i].nopiezas * normalData[i].precioventa
          }

          setCosto(costo)
          setVenta(venta)

        setIncidenciaData(normalData)

        await verFiles(id)
        await verImages(id)

        
    } catch (error) {
        console.log(error)
    }

  setOpen2(true)

  
  
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

const handleUploadFiles = (files1, flag) => {
  let uploaded
  if(flag === 1) uploaded = [...images]; 
  else uploaded = [...files]; 
  let limitExceeded = false;
  files1.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
          uploaded.push(file);
          if (uploaded.length === MAX_COUNT) setFileLimit(true);
          if (uploaded.length > MAX_COUNT) {
              alert(`Solo puedes agregar hasta ${MAX_COUNT} archivos.`);
              setFileLimit(false);
              limitExceeded = true;
              return true;
          }
      }
  })
  if (!limitExceeded) {
    console.log({uploaded})
    if(flag === 1 ) setImages(uploaded)
    else setFiles(uploaded)
  }
}
const handleImageEvent =  (e) => {
    console.log(e)

  const chosenFiles = Array.prototype.slice.call(e.target.files)
  handleUploadFiles(chosenFiles, 1);
}

const handleFileEvent =  (e) => {
  console.log(e)
  const chosenFiles = Array.prototype.slice.call(e.target.files)
  handleUploadFiles(chosenFiles, 2);
}

const removeFile = (name) => {

  const newArray = files2.filter( f => f.url !== name)
  const newArray2 = files4.filter( f => f.url == name)
  setFiles2(newArray)
  setFiles3(files3.concat(newArray2))

}
const removeImage = (name) => {


  const newArray = images2.filter( f => f.url !== name)
  const newArray2 = images4.filter( f => f.url == name)

  setImages2(newArray)
  setImages3(images3.concat(newArray2))

}

const addEquipo = () => { 

  const newEquipo = {
    idEquipo: noEquipos,
    idReal: 0,
    idTipoEquipo: 0,
    equipo: '',
    input: '',
    refacciones: [],
    selectedRefacciones: []
  }



  setEquiposSelected([...equiposSelected, newEquipo])
  setNoEquipos(noEquipos + 1)

}

const handleMultipleEquiposIn = (equ, id) => {

  const equiposAux = equiposSelected

  for(let i = 0; i < equiposAux.length; i++) {

    if(equiposAux[i].idEquipo == id) {

      equiposAux[i].input = equ
    }

  }

  console.log('enn', equiposAux)

  setEquiposSelected(equiposAux)

}

const handleMultipleEquipos = async(equ, id) => {

  const equiposAux = equiposSelected

  for(let i = 0; i < equiposAux.length; i++) {

    if(equiposAux[i].idEquipo == id) {

      equiposAux[i].equipo = equ

      const idEquipoT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === equiposAux[i].equipo).idtipoequipo
      const idEquipoTT = equipos.find(r => `${r.noeconomico} - ${r.equipo}` === equiposAux[i].equipo).idequipo
      if(idEquipoT) {
        equiposAux[i].idTipoEquipo = idEquipoT
        equiposAux[i].idReal = idEquipoTT
      const re = await getSelectsRefacciones2(idEquipoT)
      equiposAux[i].refacciones = re
      break
    }

  }
}

  console.log('enn', equiposAux)

  setEquiposSelected(equiposAux)

}

const handleDelete = (id) => {

  const equiposAux = equiposSelected.filter(en => en.idEquipo != id)

  setEquiposSelected(equiposAux)

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
  }
  
];

useEffect(() => {
  const userClientId = localStorage.getItem("userClientId");
  setClienteId(userClientId)
}, [])
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
      <Box sx={{ width: '100%', marginLeft: { sm: '260px' }}}>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom style={{color: '#AFB2B4'}} >
            Incidencias
          </Typography>
        </Grid>
        {
          clienteId == 2 && (
            <Grid item md={6}>
              <Button variant="outlined" onClick={handleClickOpen}>Nuevo</Button>
            </Grid>
          )
        }
      </Grid>

    </Box>
    
        <Box sx={{ width: `calc(100% - ${240}px)`, marginLeft: { sm: '260px' }}}>
        <MUIDataTable
        
        title={"Incidencias"}
        data={data}
        columns={clienteId == 2 ? columns : columns2}
        options={options}
      />
        </Box>



      {/* Modal */}
      <div>

      <Dialog open={open} onClose={handleClose} fullWidth={true}
        maxWidth={'lg'}>
        <DialogTitle>{ isNew ? 'Nuevo registro' : 'Editar registro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa todos los datos para poder completar un nuevo registro.
          </DialogContentText>
          {
            isNew ? (
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
            ) : (
              <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cliente}
              onChange={handleCliente}
              disabled
            >
              <MenuItem value={0}>-- Selecciona un cliente --</MenuItem>
              {
                clientes.map(cliente => (
                  <MenuItem value={cliente.idcliente} key={cliente.idcliente}>{cliente.nombre}</MenuItem>
                ))
              }
            </Select>
              </FormControl>
            )
          }
          {
            isNew ?  (
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
            ) : (
              <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="demo-simple-select-label">Aeropuerto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={aeropuerto}
              onChange={handleAeropuerto}
              disabled
            >
              <MenuItem value={0}>-- Selecciona un aeropuerto --</MenuItem>
              {
                aeropuertos.map(aeropuerto => (
                  <MenuItem value={aeropuerto.idclienteaeropuerto} key={aeropuerto.idaeropuerto}>{aeropuerto.nombre}</MenuItem>
                ))
              }
            </Select>
              </FormControl>
            )
          }
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

      {
                
      } 
      <Grid container spacing={3} style={{marginTop: '20px'}}>
        {
          isNew ? (
            equiposSelected.map((equ => (
              <Grid key={equ.idEquipo} container spacing={3} style={{marginTop: '20px', marginLeft: '5px'}}>
                  <Grid item md={5}>
                  {/* 
                  <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-labe1l">Equipo</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-labe1l"
                id="demo-multiple-checkbox1"
                multiple
                value={displayEquipos1}
                onChange={handleChangeEquipo}
                onClose={() => setSearchEquipo("")}
                style={{minWidth: 120}}
                

              >
                <MenuItem value=''>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="siglas1"
                      label="Buscar equipo"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={searchEquipo}
                      onChange={(e) => setSearchEquipo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          // Prevents autoselecting item while typing (default Select behaviour)
                          e.stopPropagation();
                        }
                      }}
                    />
                </MenuItem>
                {equipos.map((equipo, index) => (
                  <MenuItem key={index} value={`${equipo.noeconomico} - ${equipo.equipo}`} style={{width: 120}}>{ `${equipo.noeconomico} - ${equipo.equipo}`}
                  </MenuItem>
                ))}
              </Select>
                  </FormControl>
                  */}
            <Autocomplete
              value={equ.equipo}
              onChange={(event, newValue) => {
                setEquipo(newValue);
                handleMultipleEquipos(newValue, equ.idEquipo)
              }}
              inputValue={equ.input}
              onInputChange={(event, newInputValue) => {
                handleMultipleEquiposIn(newInputValue, equ.idEquipo)
              }}
              id="controllable-states-demo"
              options={displayEquipos}
              renderInput={(params) => <TextField {...params} label="Equipo" />}
            /> 
            {/* <Autocomplete
              id="equipos"
              options={equipos}
              value={equipo}
              getOptionLabel={(option) => option.label}
              // onChange={handleEquipo}
              onChange={(event, newValue) => {
                setEquipo(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Equipo" />}
            /> */}
              {/* <FormControl fullWidth>
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
                      <MenuItem value={equipo.equipo} key={equipo.idequipo}>{equipo.noeconomico} - {equipo.equipo}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl> */}
                </Grid>
                <Grid item md={5}>
                <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Refacciones</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={equ.selectedRefacciones}
                  onChange={(e) => handleChange2(e, equ.idEquipo)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  onClose={() => setSearch("")}
                  style={{minWidth: 120}}
      
                >
                  <MenuItem value='' >
                      <TextField
                        autoFocus
                        margin="dense"
                        id="siglas"
                        label="Buscar refacción"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== "Escape") {
                            // Prevents autoselecting item while typing (default Select behaviour)
                            e.stopPropagation();
                          }
                        }}
                      />
                  </MenuItem>
                  {equ.refacciones.map((refaccion, index) => (
                    index < 50 && (
                    <MenuItem key={refaccion.idrefaccion} value={refaccion.nombre} style={{width: 120}}>
                      <Checkbox checked={equ.selectedRefacciones.indexOf(refaccion.nombre) > -1} />
                      <ListItemText primary={refaccion.nombre} />
                    </MenuItem>
                    )
                  ))}
                </Select>
                    </FormControl>
                </Grid>
                <Grid item md={2}>
                  <IconButton aria-label="delete" size="large" onClick={() => handleDelete(equ.idEquipo)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )))
            
          ) : (
            <Grid item md={6}>
        <Autocomplete
        disabled
          value={equipo}
          onChange={(event, newValue) => {
            setEquipo(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={displayEquipos}
          renderInput={(params) => <TextField {...params} label="Equipo" />}
        />
        </Grid>
          )
        }

{/* Descomentar */}
  {/*      <Grid item md={6}>
        

          {
            isNew ? (
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
            onClose={() => setSearch("")}
            style={{minWidth: 120}}

          >
            <MenuItem value='' >
                <TextField
                  autoFocus
                  margin="dense"
                  id="siglas"
                  label="Buscar refacción"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
            </MenuItem>
            {refacciones.map((refaccion, index) => (
              index < 50 && (
              <MenuItem key={refaccion.idrefaccion} value={refaccion.nombre} style={{width: 120}}>
                <Checkbox checked={selectedRefacciones.indexOf(refaccion.nombre) > -1} />
                <ListItemText primary={refaccion.nombre} />
              </MenuItem>
              )
            ))}
          </Select>
              </FormControl>

            ) : (
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
            onClose={() => setSearch("")}
            style={{minWidth: 120}}

          >
            <MenuItem value='' >
                <TextField
                  autoFocus
                  margin="dense"
                  id="siglas"
                  label="Buscar refacción"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
            </MenuItem>
            {refacciones.map((refaccion, index) => (
              index < 50 && (
              <MenuItem key={refaccion.idrefaccion} value={refaccion.nombre} style={{width: 120}}>
                <Checkbox checked={selectedRefacciones.indexOf(refaccion.nombre) > -1} />
                <ListItemText primary={refaccion.nombre} />
              </MenuItem>
              )
            ))}
          </Select>
              </FormControl>
            )
          }
        </Grid>

*/}
      </Grid>

      <Button onClick={addEquipo}>{'Agregar un equipo'}</Button>

      <Grid container spacing={3} style={{marginTop: '20px'}}>
        <Grid item md={4}>
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
        <Grid item md={4}>
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
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo servicio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tipoServicio}
              label="Estatus"
              onChange={handleTipo}
            >
              <MenuItem value={''}>-- Selecciona un tipo de servico --</MenuItem>
              {
                tipos.map(tipo => (
                  <MenuItem value={tipo} key={tipo}>{tipo}</MenuItem>
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
            value={rI.nombreRefaccion}
            disabled
          />
          </FormControl>
          
        </Grid>
        <Grid item md={2}>
          
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
        <Grid item md={2}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name5"
            label="costo"
            type="number"
            fullWidth
            variant="standard"
            name="costo"
            onChange={(e) => handleRefaccionesIncidencias(e, rI.id)} value={rI.costo}
          />
          </FormControl>
          
        </Grid>
        <Grid item md={2}>
          
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
        <Grid item md={3}>
          
          <FormControl fullWidth>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Proveedor"
            type="text"
            fullWidth
            variant="standard"
            name="proveedor"
            value={rI.proveedor}
            onChange={(e) => handleRefaccionesIncidencias(e, rI.id)} 

          />
          </FormControl>
          
        </Grid>
      </Grid>
        ))
      }



      {
        isNew ? (
          <Grid container style={{marginTop: '20px'}} >
            <Grid item md={6}>
              <Button variant="outlined" endIcon={<ImageIcon />} style={{marginRight: '20px'}}>
                <label htmlFor="img1">Subir Imagen</label>
                      <input type="file"
                              id="img1" 
                              name="img1"
                              onChange={handleImageEvent}
                              accept=" application/pdf, image/png, image/jpeg" style={{visibility:'hidden'}}/>
                      
              </Button>
              <div>
                {
                  images.map((img, index) => (
                    <li key={index}>{img.name} <CheckCircle color="success"/></li>
                  ))
                }
              </div>
            </Grid>
            <Grid item md={6}>
                <Button variant="outlined" endIcon={<AttachFileIcon />} style={{marginRight: '20px'}}>
                  <label htmlFor="file1">Subir archivo</label>
                  <input type="file"
                        id="file1"
                        name="file1"
                        onChange={handleFileEvent}
                        accept="application/pdf, image/png, image/jpeg" style={{visibility:'hidden'}}/>      
                </Button>


              <div>
                {
                  files.map((file, index) => (
                    <li key={index}>{file.name}  <CheckCircle color="success"/></li>
                  ))
                }
              </div>
                      </Grid>
          </Grid>
        ) : (
          <Grid container style={{marginTop: '20px'}} >
            <Grid item md={6}>
              <Button variant="outlined" endIcon={<ImageIcon />} style={{marginRight: '20px'}}>
                <label htmlFor="img1">Subir Imagen</label>
                      <input type="file"
                              id="img1" 
                              name="img1"
                              onChange={handleImageEvent}
                              accept=" application/pdf, image/png, image/jpeg" style={{visibility:'hidden'}}/>
                      
              </Button>
              <div>
                {
                  images2.map((img, index) => (
                    <li key={index} onClick={() => removeImage(img.url)}>{img.name} <Cancel style={{cursor: 'pointer'}} color="error"/></li>
                  ))
                }
              </div>
              <div>
                {
                  images.map((img, index) => (
                    <li key={index}>{img.name} <CheckCircle color="success"/></li>
                  ))
                }
              </div>
            </Grid>
            <Grid item md={6}>
                <Button variant="outlined" endIcon={<AttachFileIcon />} style={{marginRight: '20px'}}>
                  <label htmlFor="file1">Subir archivo</label>
                  <input type="file"
                        id="file1"
                        name="file1"
                        onChange={handleFileEvent}
                        accept="application/pdf, image/png, image/jpeg" style={{visibility:'hidden'}}/>      
                </Button>


              <div>
                {
                  files2.map((file, index) => (
                    <li key={index} onClick={() => removeFile(file.url)}>{file.name}  <Cancel style={{cursor: 'pointer'}} color="error"/></li>
                  ))
                }
              </div>
              <div>
                {
                  files.map((file, index) => (
                    <li key={index}>{file.name}  <CheckCircle color="success"/></li>
                  ))
                }
              </div>
            </Grid>
          </Grid>
        )
      }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={isNew ? postData : updateData}>{isNew ? 'Agregar' : 'Editar'}</Button>
        </DialogActions>
        {globalError && <Alert severity="error" style={{marginTop: '10px'}}>Error en el formulario!</Alert>}
      </Dialog>

      <Dialog open={open2} onClose={handleClose2} fullWidth={true}
        maxWidth={'lg'}>
        <DialogTitle>Resumen de incidencia</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A continuación se muestran más detalles de la incidencia
          </DialogContentText>

          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Nombre:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
                {incidenciaData.length > 0 && incidenciaData[0].incidencianombre}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Descripción:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].descripcion}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Comentario:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].comentario}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Mecanico asignado:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].mecaniconombre}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Cliente:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].clientenombre}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Aeropuerto:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].aeropuertonombre}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Equipo:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && `${incidenciaData[0].noeconomico} - ${incidenciaData[0].equipo}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Estatus:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].estatus}
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
          {
            clienteId == 2 && (
              <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Costo:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              ${incidenciaData.length > 0 && costo}
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={6}>
                <Typography variant="h5">
                  Venta:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
                ${incidenciaData.length > 0 && venta}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
            )
          }
          <Grid item md={6} container style={{marginTop: '20px'}}>
              <Grid item md={6}>
                <Typography variant="h5">
                  Tipo de servicio:
                </Typography>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" style={{color: '#A3ABB9'}}>
              {incidenciaData.length > 0 && incidenciaData[0].tiposervicio}
                </Typography>
              </Grid>
            </Grid>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={12} container>
              <Grid item md={12} style={{marginBottom: '5px'}}>
                <Typography variant="h5">
                  Listado de refacciones
                </Typography>
              </Grid>
              <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">No piezas</TableCell>
            {
              clienteId == 2 && (
                <>
                  <TableCell align="center">Costo</TableCell>
                <TableCell align="center">Venta</TableCell>
                <TableCell align="center">Proveedor</TableCell>
                </>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {incidenciaData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.refaccionnombre}
              </TableCell>
              <TableCell align="center">{row.nopiezas}</TableCell>
              {
                clienteId == 2 && (
                  <>
                  <TableCell align="center">$ {row.costo}</TableCell>
              <TableCell align="center">$ {row.precioventa}</TableCell>
              <TableCell align="center">{row.proveedor}</TableCell>
                  </>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
              </TableContainer>
              {/* {
                incidenciaData.map(incidencia => (
                  <Grid item md={12} key={incidencia.refaccionnombre}>
                    <li>
                    {incidencia.refaccionnombre}
                    </li>
                  </Grid>
                ))
              } */}
            </Grid>
            
          </Grid>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <Grid item md={6} container>
              <Grid item md={12}>
                <Typography variant="h5">
                  Imágenes
                </Typography>
              </Grid>
              <Grid item container spacing={3} md={12}>
              {
                imagesDisplay.map(img => (
                  <Grid item md={6} key={img.idincidencia}>
                    <a href={img.url} target="_blank">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={'auto'}
                      image={img.url}
                      alt="green iguana"
                    />
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {img.url.split('adminimages/')[1]}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
                </a>
                </Grid>
                ))
              }
              </Grid>
            </Grid>
            <Grid item md={6} container>
              <Grid item md={12}>
                <Typography variant="h5">
                  Archivos:
                </Typography>
              </Grid>
              <Grid item container spacing={3} md={12}>
              {
                filesDisplay.map(file => (
                  <Grid item md={6} key={file.idincidencia}>
                    <a href={file.url} target="_blank">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={'auto'}
                      image="https://logowik.com/content/uploads/images/adobe-pdf3324.jpg"
                      alt={file.url.split('adminfiles/')[1]}
                    />
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {file.url.split('adminfiles/')[1]}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
                </a>
                </Grid>
                ))
              }
              </Grid>
            </Grid>
          </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cerrar</Button>
          {/* <Button onClick={isNew ? postData : updateData}>{isNew ? 'Agregar' : 'Editar'}</Button>*/}
        </DialogActions> 
      </Dialog>
    </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Aeropuerto;
