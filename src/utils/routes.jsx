import { BrowserRouter, Route, Routes } from 'react-router-dom';



// Pages
import Login from '../pages/Login';
import Usuario from '../pages/Usuario';
import SignUp from '../pages/SignUp';
import Mecanicos from '../pages/Mecanicos';
import Aeropuertos from '../pages/Aeropuertos';
import Clientes from '../pages/Clientes';
import Refacciones from '../pages/Refacciones';
import Equipos from '../pages/Equipos';
import Home from '../pages/Home';
import Incidencias from '../pages/Incidencias';
import Incidencia from '../pages/Incidencia';
import EditUser from '../pages/EditUser';

const Router = () => {
    return (
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home/> } />
          <Route path='/usuarios' element={<Usuario/> } /> 
          <Route path='/mecanicos' element={<Mecanicos/> } /> 
          <Route path='/aeropuertos' element={<Aeropuertos/> } />
          <Route path='/clientes' element={<Clientes/> } />
           <Route path='/incidencias' element={<Incidencias/> } />
          <Route path='/refacciones' element={<Refacciones/> } />
          <Route path='/equipos' element={<Equipos/> } /> 
          <Route path='/incidencia/:id' element={<Incidencia/> } />
          <Route path='/edituser/:id' element={<EditUser/> } /> 
          
       </Routes>
        
      
      
    );
  }
  
  export default Router;