import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from "../../hooks/useForm";
import { axiosInstance } from "../../axios/axiosConfig";
import { useState } from "react";
import { fbstorage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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


export const Newmodel = ({setNewm, showModels}) => {
  const [loader, setLoader] = useState(false)
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState('')
  const [imgvalid, setImgvalid] = useState(true)
  const [valid, setValid] = useState(true)


  const {nombre, nickname, descripcion, nacimiento, whatsapp, cbualias, mail, onInputChange, onResetForm, formState } = useForm({
    nombre: "",
    nickname: "",
    descripcion: "",
    nacimiento: "",
    whatsapp: "",
    cbualias: "",
    mail: ""
  })

  //Funcion para manejar archivo
  const handlerArchivo = (event) => {
    const file = event.target.files[0]
    setFile(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      
    };
    reader.readAsDataURL(file);
  }
  //end

  // Función para obtener la URL de descarga completa de una imagen en Firebase Storage
async function obtenerURLDeDescarga(rutaDeAlmacenamiento) {
  try {
      const storageRef = ref(fbstorage, rutaDeAlmacenamiento);
      const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error al obtener la URL de descarga de la imagen:", error);
    throw error; 
  }
}
//end

//funcion para activar la funcion anterior (obtenerURLDeDescarga)
async function main(ruta) {
  try {
    const rutaDeAlmacenamiento = ruta;
    const downloadURL = await obtenerURLDeDescarga(rutaDeAlmacenamiento);
    //console.log("URL de descarga de la imagen:", downloadURL);
    return downloadURL
    // Utiliza la URL de descarga en tu aplicación web para mostrar la imagen
  } catch (error) {
    console.error("Error al obtener la URL de descarga de la imagen:", error);
  }
}

//end

  // Función para subir una imagen a Firebase Storage
  async function subirImagen(file) {
    try {
      // Referencia al storage de Firebase donde se guardará la imagen
      const storageRef = ref(fbstorage, `imagenes/${file.name}`);
  
      // Subir la imagen al storage de Firebase
      const snapshot = await uploadBytes(storageRef, file);
  
      //console.log("Imagen subida exitosamente:", snapshot.metadata.fullPath);
      // Devolver la URL de descarga de la imagen
      return snapshot.metadata.fullPath;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error; // Lanzar el error para que pueda ser manejado externamente
    }
  }

 //Funcion que dispara todo 
  const confirmar = () => {
  
    if(Object.values(formState).some(x => (x === ""))){
      setValid(false)
      return
    }
    setLoader(true)
  const agregarModelo = (rutax) => {
    axiosInstance.post('/modelos', {
      nombre: nombre,
      nickname: nickname,
      descripcion: descripcion,
      nacimiento: nacimiento,
      whatsapp: whatsapp,
      cbualias: cbualias,
      mail: mail,
      foto: rutax,
      estado: "1"
    })
    .then(() => {
      showModels()
      setNewm(false)
    })
  }

  if(file){
    subirImagen(file)
    .then(downloadURL => {
      main(downloadURL)
      .then((rutax) => {
        agregarModelo(rutax)
      })
    })
    .catch(error => {
      console.error("Error al subir la imagen:", error);
    });
  }else{
    setImgvalid(false)
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

    <div align="end"><Button variant="contained" color="error" onClick={() => setNewm(false)}>X</Button></div>
    <div className="mypadding" align="center">
        <h2>Agregar Modelo</h2>
        <TextField error={valid === false && nombre === ""} className="fieldcontacto" label="Nombre/s" id="nombre" name="nombre" value={nombre} onChange={onInputChange}/>
        <TextField error={valid === false && nombre === ""} className="fieldcontacto" label="Apellido/s" id="apellido" name="apellido" value={nombre} onChange={onInputChange}/>
        <TextField error={valid === false && nombre === ""} className="fieldcontacto" label="DNI" id="dni" name="dni" value={nombre} onChange={onInputChange}/>
        <TextField error={valid === false && nombre === ""} className="fieldcontacto" label="Pais" id="nacionalidad" name="nacionalidad" value={nombre} onChange={onInputChange}/>
        <TextField error={valid === false && nombre === ""} className="fieldcontacto" label="Ciudad" id="ciudad" name="ciudad" value={nombre} onChange={onInputChange}/>
        <TextField error={valid === false && nickname === ""} className="fieldcontacto" label="NickName(apodo)" id="nickname" name="nickname" value={nickname} onChange={onInputChange}/>
        <TextField error={valid === false && descripcion === ""} className="fieldcontacto" label="Descripción" id="descripcion" name="descripcion" value={descripcion} onChange={onInputChange}/>
        <TextField error={valid === false && nacimiento === ""} className="fieldcontacto" label="Fecha Nacimiento" id="nacimiento" name="nacimiento" value={nacimiento} onChange={onInputChange}/>
        <TextField error={valid === false && whatsapp === ""} className="fieldcontacto" label="Whatsapp" id="whatsapp" name="whatsapp" value={whatsapp} onChange={onInputChange}/>
        <TextField error={valid === false && cbualias === ""} className="fieldcontacto" label="Cbu/Alias" id="cbualias" name="cbualias" value={cbualias} onChange={onInputChange}/>
        <TextField error={valid === false && mail === ""} className="fieldcontacto" label="E-mail" id="mail" name="mail" value={mail} onChange={onInputChange}/>
        <TextField error={valid === false && mail === ""} className="fieldcontacto" label="Contraseña" id="password" name="password" value={mail} onChange={onInputChange}/>
{valid === false ? <p><small>*Completar todos los campos</small></p> : ""}
        <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onChange={handlerArchivo}
    >
      Subir Foto
      <VisuallyHiddenInput type="file" />
    </Button>
    {imgvalid === false ?<p>"Debe cargar una imagen"</p> : ""}
       {previewUrl !== "" ? <img src={previewUrl} id="preurl"/> : ""} 
       
        </div>
        <Button variant="contained" color="secondary" onClick={() => confirmar()}>Agregar</Button>
    </>
  )
}