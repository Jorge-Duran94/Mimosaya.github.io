import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Dialog } from '@mui/material';
import { useState } from 'react';
import { ModalV } from './ModalV';
import { useNavigate } from 'react-router-dom';


export const Tarjetas = ({nickname, foto, descripcion, id, chat_status, id_telegram}) => {


    const [openv, setOpenv] = useState(false)
    const navigate = useNavigate()

    const estadoModel = (statusm) => {
      if(statusm === 0){
        return <Chip label="Desconectada" color="error" />
      }else if(statusm == 1){
        return  <Chip label="En linea" color="success" />
      }else{
        return <Chip label="Ocupada" color="warning" />
      }
    }


  return (
    <>

    <Dialog open={openv}>
      <ModalV setOpenv={setOpenv} id_telegram={id_telegram} nickname={nickname}/>
    </Dialog>
 


    <div className='tarjetas'>
      
    <Card >
      <CardMedia
        sx={{ height: 490 }}
        image={foto}
        title={nickname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nickname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
        {estadoModel(chat_status)}
      </CardContent>
      <CardActions>
        <Button size="small" color='secondary' variant='contained' onClick={() => navigate('/fotos/'+id)}>Fotos</Button>
        <Button size="small" color='secondary' variant='contained' onClick={() => setOpenv(true)} disabled={chat_status === 1 ? false : true}>Video llamada</Button>
      </CardActions>
    </Card>
    </div>
    </>
  )
}