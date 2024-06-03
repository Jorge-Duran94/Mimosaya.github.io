import { Backdrop, Button, CircularProgress, Dialog, IconButton, TextField } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosConfig";
import { Viewmodel } from "./Viewmodel";



export const Tabla = () => {

    const [models, setModels] = useState([])
    const [loader, setLoader] = useState(false)
    const [buscar, setBuscar] = useState("")
    const [viwem, setViwem] = useState(false)
    const [datos, setDatos] = useState("")
   
    const showModels = async () => {
      setLoader(true)
      axiosInstance.get('/modelos')
      .then(r => {
        if(r.status === 200){
            setModels(r.data)
            setLoader(false)
        }else{
          throw new Error(`[${r.status}] Error en la solicitud`)
        }
      })
      .catch(err => console.log(err))
    } 
  
    useEffect( ()=> {
      showModels()
      
    }, [])
  
   const busqueda = models.filter((e) => e.nickname.toUpperCase().includes(buscar.toUpperCase()))

const verModel = (datos) => {
  setDatos(datos)
  setViwem(true)
}

const cambiarEstado = (model) => {
  if(model.estado === 0){
    axiosInstance.put('/modelo/'+model.id, {
      estado: 1
    }).then(() => showModels())
  }else{
    axiosInstance.put('/modelo/'+model.id, {
      estado: 0
    }).then(() => showModels())
  }

}

const borrarModelo = (id) => {

    axiosInstance.delete('/modelo/'+id).then(() => showModels())
}


  return (
    <>



<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

<Dialog open={viwem}>
    <Viewmodel datos={datos} setViwem={setViwem} />
</Dialog>


    <div className="mywidth">


<div className="buscador">
    <TextField label="Buscar" color="secondary" onChange={(e) => setBuscar(e.target.value)} value={buscar} fullWidth/>
    </div>

{models.length < 1 ? <p>sin datos</p> : 
<List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 1 }}>
      {busqueda.map((model) => {
       
        return (
          <ListItem
            key={model.id}
    
          >
 
            
              <ListItemAvatar>
                <Avatar
                 
                  src={model.cara}
                />
              </ListItemAvatar>
              {model.nickname}
              
              <ListItemText  />
              <Button  aria-label="edit" onClick={() => verModel(model)}><RemoveRedEyeIcon color="primary"/></Button>
              <Button  aria-label="edit"  onClick={() => cambiarEstado(model)}>{model.estado === 1 ? <CheckCircleOutlineIcon color="success"/> : <BlockIcon color="warning"/>}</Button>
              <Button  aria-label="delete"  onClick={() => borrarModelo(model.id)}><DeleteIcon color="error"/></Button>
     
          </ListItem>
        );
      })}
    </List> }
    </div>
    </>
  )
}