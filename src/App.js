import './App.css';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';
import Router from './utils/routes';

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const location = useLocation();
  return (
    <>
    {
      location.pathname !== '/' && location.pathname !== '/login' && (
        
          <SideBar />
        
      )
    }
    <Router />
    </>
            

  );
}

export default App;
