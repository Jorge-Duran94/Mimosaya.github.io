import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Backdrop, CircularProgress, Dialog } from '@mui/material';
import { CambiarFoto } from './CambiarFoto';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios/axiosConfig';


export const MiCard = ({setOpen2, misDatos}) => {

  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState([])

  const verDatos = () => {
    setLoader(true)
    if(misDatos.id !== undefined){
    axiosInstance.get('/modelo/'+misDatos.id)
    .then((res) => setUser(res.data))
    .then(() => setLoader(false))
  }
    }
  
useEffect(() => {
  verDatos()
},[])

  return (
    <>

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

<Dialog open={open}>
  <CambiarFoto user={user} verDatos={verDatos} setOpen={setOpen}/>
</Dialog>

    <div align="end"><Button variant='contained' color='error' onClick={() => setOpen2(false)}>X</Button></div>
    <div className='tarjetas'>
      
    <Card >
      <CardMedia
        sx={{ height: 390 }}
        image={user.foto || ""}
        title={user.nickname || ""}
              />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.nickname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='secondary' variant='contained' onClick={() => setOpen(true)}>Modificar foto/mensaje</Button>

      </CardActions>
    </Card>
    </div>
    </>
  )
}