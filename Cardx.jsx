import { Button, Card, CardContent, CardMedia, Dialog, Typography } from "@mui/material"
import { axiosInstance2 } from "../../axios/axiosConfig"
import { useState } from "react"


export const Cardx = ({idx, nickname, url, descripcion, estado, verFotos}) => {

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  
  const eliminarRegistro = () => {
    axiosInstance2.delete('/photo/'+idx)
    .then(() => {
      verFotos()
      setOpen(false)})
  }

  const autorizar = () => {
    axiosInstance2.put('/photo/'+idx, {
      estado:1
    }).then(() => {
      verFotos()
      setOpen(false)})
  }
  

  const rechazar = () => {
    axiosInstance2.put('/photo/'+idx, {
      estado:2
    }).then(() => {
      verFotos()
      setOpen(false)})
  }

const estados = () => {
  if(estado === 0){
    return "Pendiente"
  }else if(estado === 1){
    return "Aceptada"
  }else{
    return "Rechazada"
  }
}

  return (
    <>

<Dialog open={open}>
  <div className="mypadding" align="center">
    <h2>Confirma Eliminar Foto?</h2>
    <Button variant="contained" color="secondary" onClick={() => eliminarRegistro()}>Confirmar</Button> <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancelar</Button>
  </div>
</Dialog>

<Dialog open={open1}>
  <div className="mypadding" align="center">
    <h2>Confirma Autorizar Foto?</h2>
    <Button variant="contained" color="secondary" onClick={() => autorizar()}>Confirmar</Button> <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancelar</Button>
  </div>
</Dialog>

<Dialog open={open2}>
  <div className="mypadding" align="center">
    <h2>Confirma Rechazar Foto?</h2>
    <Button variant="contained" color="secondary" onClick={() => rechazar()}>Confirmar</Button> <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancelar</Button>
  </div>
</Dialog>

    <div className="tarjetas">
        <Card sx={{ maxWidth: 345 }} >
        
        <CardMedia
          component="img"
          height="300"
          image={url}
          alt="green iguana"
          className="pointerevent"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Estado: {estados()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {descripcion === null ? "sin descripción" : "Descripcion: "+descripcion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {nickname}
          </Typography>
        </CardContent>

        <div className="myflex">
        <Button variant="contained" color="secondary" onClick={() => setOpen1(true)}>Autorizar</Button><Button variant="contained" color="warning" onClick={() => setOpen2(true)}>Rechazar</Button>
        </div>

        <Button variant="contained" color="error" fullWidth onClick={() => setOpen(true)}>Eliminar Foto</Button>
        </Card>
        </div>
    </>
  )
}