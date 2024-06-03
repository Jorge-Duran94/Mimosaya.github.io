import { Backdrop, Button, CircularProgress, TextField } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { axiosInstance, axiosInstance2 } from "../../axios/axiosConfig";
import { useSubirImagen } from "../../hooks/useSubirImagen";
import { useObtenerURLDeDescarga } from "../../hooks/useObtenerURLDeDescarga";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export const CambiarFoto = ({setOpen, user, verDatos}) => {

  const date = new Date();
  const [loader, setLoeader] = useState(false)
  const [fileFoto, setFileFoto] = useState()
  const [previewUrl1, setPreviewUrl1] = useState()
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState(false)

  const handlerArchivo = (event) => {
    const file = event.target.files[0]
    setFileFoto(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl1(reader.result);
      
    };
    reader.readAsDataURL(file);
  }

  
//funcion para subir la foto
async function main(ruta) {
  try {
    const rutaDeAlmacenamiento = ruta;
    const downloadURL = await useObtenerURLDeDescarga(rutaDeAlmacenamiento);
    //console.log("URL de descarga de la imagen:", downloadURL);
    return downloadURL
    // Utiliza la URL de descarga en tu aplicación web para mostrar la imagen
  } catch (error) {
    console.error("Error al obtener la URL de descarga de la imagen:", error);
  }
}

const subirRegistroFoto = (rutax) => {
  axiosInstance.put('/modelo/'+user.id, {
      foto: rutax    
  }).then(() => {
    setOpen(false)})
    .then(() => verDatos())
}

const subirRegistroMensaje = () => {
  axiosInstance.put('/modelo/'+user.id, {
      descripcion: mensaje    
  }).then(() => {
    setOpen(false)})
    .then(() => verDatos())
}



const confirmar = () => {
  setLoeader(true)
  if(fileFoto || mensaje !== ""){
  
  if(fileFoto){
useSubirImagen(fileFoto)
.then(downloadURL => {
  main(downloadURL)
  .then((rutax) => {
    subirRegistroFoto(rutax)
  })
})
.catch(error => {
  console.error("Error al subir la imagen:", error);
});
}

if(mensaje !== ""){
  subirRegistroMensaje()
}

}else{
  setError(true)
}

}
//end

  return (
    <>
   
   <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    <div align="center" className="mypadding">
<Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      
      onChange={handlerArchivo}
    >
     Seleccionar foto
      <VisuallyHiddenInput type="file" />
    </Button>
    <div id="vistaprevia">
<h2>Vista previa</h2>
{previewUrl1 ? <img src={previewUrl1} alt="" className="previmg"/> : <p>"Solo se cambiara la foto si selecciona una"</p>}
<TextField multiline rows={2} variant="outlined" label="Mensaje" sx={{marginBottom: 2}} value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>
</div>
{error ? <p className="textorojo">*Al menos debe hacer un cambio</p> : ""}
<Button onClick={() => confirmar()} variant="contained" color="secondary">Confirmar</Button> <Button onClick={() => setOpen(false)} variant="contained" color="error">Cancelar</Button>
</div>
    </>
  )
}