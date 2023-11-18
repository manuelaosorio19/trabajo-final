import './style.css';
import UsuarioForm from '../../components/UsuarioForm';
import ListaUsuarios from '../../components/ListaUsuarios';
import { useEffect, useState } from 'react';
import { actualizarUsuario, CrearUsuario, eliminarPorID, getUsuarios } from '../../services/UsuarioServices';

function Home() {
    const [isAgregando, setIsAgregando] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({});

    function obtenerTodosLosUsuarios(){
        getUsuarios()
            .then(resultado => setUsuarios(resultado.data))
            .catch(error => console.log(error))
    }
    useEffect(()=>{
        obtenerTodosLosUsuarios()
    
    },[]);        

    function eliminarUsuario(id){
        eliminarPorID(id)
             .then (()=> obtenerTodosLosUsuarios() )
             .catch(error => console.log(error))
    }
    function crearOActualizarUsuarioEnForm(usuario){
        if(usuario.id == null){
            CrearUsuario(usuario)
             .then (()=> obtenerTodosLosUsuarios() )
             .catch(error => console.log(error))
        }else {
            actualizarUsuario (usuario)
            .then (()=> obtenerTodosLosUsuarios() )
            .catch(error => console.log(error))
            setUsuario({});
        }         
    }
    function mostrarFormEnActualizar(usuarioSerActualizado){
        setIsAgregando(true);
        setUsuario(usuarioSerActualizado);
    }
    return (
        <div className="home">
            <button onClick={() => setIsAgregando(true)}>Agregar Usuario</button>
            {isAgregando && <UsuarioForm usuarioActualizar={usuario} onCerrar={()=> setIsAgregando(false)} onCrear ={crearOActualizarUsuarioEnForm}/>}
            <ListaUsuarios usuarios={usuarios} onEliminar={eliminarUsuario} onActualizar={mostrarFormEnActualizar}/>
        </div>
    );
}

export default Home;