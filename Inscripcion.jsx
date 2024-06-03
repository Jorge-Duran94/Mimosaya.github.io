import { Alert, Backdrop, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { axiosInstance } from "../axios/axiosConfig";
import { useSubirImagen } from "../hooks/useSubirImagen";
import { useObtenerURLDeDescarga } from "../hooks/useObtenerURLDeDescarga";
import { useNavigate } from "react-router-dom";


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

export const Inscripcion = ({setNewm}) => {

  const [loader, setLoader] = useState(false)
  const [fileFrente, setFileFrente] = useState()
  const [fileDorso, setFileDorso] = useState()
  const [fileFoto, setFileFoto] = useState()
  const [previewUrl1, setPreviewUrl1] = useState()
  const [previewUrl2, setPreviewUrl2] = useState()
  const [previewUrl3, setPreviewUrl3] = useState()
  const [imgvalid, setImgvalid] = useState(true)
  const [valid, setValid] = useState(true)
  const [urlFrente, setUrlFrente] = useState()
  const [urlDorso, setUrlDorso] = useState()
  const [urlFoto, setUrlFoto] = useState()
  const [check1, setCheck1] = useState (true)
  const navigate = useNavigate()

  const {nombre, apellido, nacimiento, password, email, dni, pais, ciudad, whatsapp, nickname, descripcion, cbualias, onInputChange, onResetForm, formState } = useForm({
    nombre: "",
    apellido: "",
    nacimiento: "",
    password: "",
    email: "",
    dni: "",
    pais: "",
    ciudad: "",
    whatsapp: "",
    nickname: "",
    descripcion: "",
    cbualias: ""
  })

  //Funcion para manejar archivo frente
  const handlerArchivo1 = (event) => {
    const file = event.target.files[0]
    setFileFrente(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl1(reader.result);
      
    };
    reader.readAsDataURL(file);
  }
  //end

  
  //Funcion para manejar archivo dorso
  const handlerArchivo2 = (event) => {
    const file = event.target.files[0]
    setFileDorso(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl2(reader.result);
      
    };
    reader.readAsDataURL(file);
  }
  //end

  
  //Funcion para manejar archivo foto
  const handlerArchivo3 = (event) => {
    const file = event.target.files[0]
    setFileFoto(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl3(reader.result);
      
    };
    reader.readAsDataURL(file);
  }
  //end



//funcion para activar la funcion anterior (obtenerURLDeDescarga)
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

//end

const agregarModelo = (frente, dorso, foto) => {
  axiosInstance.post('/modelo', {
    nombre: nombre,
    apellido: apellido,
    nacimiento: nacimiento,
    password: password,
    email: email,
    dni: dni,
    pais: pais,
    ciudad: ciudad,
    whatsapp: whatsapp,
    frente: frente,
    dorso: dorso,
    nickname: nickname,
    cara: foto,
    descripcion: descripcion,
    cbualias: cbualias,
    estado: 0
  })
  .then(() => {
    onResetForm()
    setLoader(false)
    navigate('/endreg')
  })
  .catch(error => {
    console.error("Error al subir la imagen:", error);
  });
}

  const confirmar = () => {
  
    if(Object.values(formState).some(x => (x === ""))){
      setValid(false)
      console.log("un campo esta vacio")
      return
    }
    setLoader(true)
  
  if(fileFrente && fileDorso && fileFoto){

    useSubirImagen(fileFrente)
    .then(downloadURL => {
      main(downloadURL)
      .then((rutax) => {
        setUrlFrente(rutax)
        validarUrl()
      })
    })
    .catch(error => {
      console.error(error);
    });

    useSubirImagen(fileDorso)
    .then(downloadURL => {
      main(downloadURL)
      .then((rutax) => {
        setUrlDorso(rutax)
        validarUrl()
      })
    })
    .catch(error => {
      console.error("Error al subir la imagen:", error);
    });

    useSubirImagen(fileFoto)
    .then(downloadURL => {
      main(downloadURL)
      .then((rutax) => {
        setUrlFoto(rutax)
        
      })
    })
    .catch(error => {
      console.error("Error al subir la imagen:", error);
    });



  }else{
    setImgvalid(false)
    console.log("falta foto")
  }

  }
  //end

const handleCheck1 = (e) => {
 if(e.target.checked){
  setCheck1(false)
 }else{
  setCheck1(true)
 }
}

const validarUrl = () => {
  if(urlFrente && urlDorso && urlFoto){
    console.log("pasamos a la api")
    agregarModelo(urlFrente, urlDorso, urlFoto)
  }else{
    console.log("falta una imagen")
  }
}

useEffect(() => {
  validarUrl()
},[urlFrente, urlDorso, urlFoto])

  return (
    <>

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

   <div className="mywidth" align="left">
        <h1>Registro</h1>
        <ol>
        <li><strong>Los datos ingresados son privados, </strong>excepto Foto de Perfil, Nombre Artistico y Mensaje al Publico, los cuales seran publicados en la portada de la plataforma</li>
        <li>Lee atentamente las bases y condiciones: <Button><a href="https://mimosasya.com/TyC/Terminos_y_Condiciones_de_mimosasya.pdf" target="_blank">Abrir enlace</a></Button> </li>
        <li>Marca las casillas si estas de acuerdo y presioná ENVIAR</li>
        </ol>
        </div>
<div className="contacto">
        <TextField color="secondary" error={valid === false && nombre === "" ? true : false} className="fieldcontacto" label="Nombre/s" name="nombre" value={nombre} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && apellido === "" ? true : false} className="fieldcontacto" label="Apellidos/s" name="apellido" value={apellido} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && nacimiento === "" ? true : false} InputLabelProps={{shrink: true}} className="fieldcontacto" label="Fecha de nacimiento" type="date" name="nacimiento" value={nacimiento} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && email === "" ? true : false} className="fieldcontacto" label="E-mail" type="email" name="email" value={email} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && password === "" ? true : false} className="fieldcontacto" label="Crear Contraseña" type="password" name="password" value={password} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && dni === "" ? true : false} className="fieldcontacto" label="DNI" type="number" name="dni" value={dni} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && pais === "" ? true : false} className="fieldcontacto" label="País" name="pais" value={pais} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && ciudad === "" ? true : false} className="fieldcontacto" label="Ciudad" name="ciudad" value={ciudad} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && whatsapp === "" ? true : false} className="fieldcontacto" label="Teléfono/Whatsapp" type="number" name="whatsapp" value={whatsapp} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && nickname === "" ? true : false} className="fieldcontacto" label="Nombre Artistico" name="nickname" value={nickname} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && descripcion === "" ? true : false} className="fieldcontacto" inputProps={{maxLength: 50}} label="Mensaje al publico(50 caracteres)" name="descripcion" value={descripcion} onChange={onInputChange}/>
        <TextField color="secondary" error={valid === false && cbualias === "" ? true : false} className="fieldcontacto" label="CBU/Alias" name="cbualias" value={cbualias} onChange={onInputChange}/>

        <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="fieldcontacto" 
      onChange={handlerArchivo1}
    >
      {fileFrente ? fileFrente.name : "Foto Frente DNI"}
      <VisuallyHiddenInput type="file" />
    </Button>

    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="fieldcontacto" 
      onChange={handlerArchivo2}
    >
      {fileDorso ? fileDorso.name : "Foto Dorso DNI"}
      <VisuallyHiddenInput type="file" />
    </Button>

    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="fieldcontacto" 
      onChange={handlerArchivo3}
    >
      {fileFoto ? fileFoto.name : "Foto Rostro"}
      <VisuallyHiddenInput type="file" />
    </Button>

        </div>
        
        <div className="mywidth">
        {imgvalid ? "" : <Alert severity="error">Falta una o más imagenes</Alert>}
        {valid ? "" : <Alert severity="error">Falta completar uno o mas campos</Alert>}
        <FormGroup>
        <FormControlLabel control={<Checkbox onChange={(e) => handleCheck1(e)}/>} label="He leído y acepto los terminos y condiciones" />
        </FormGroup>
       
        </div>
        <Button disabled={check1 === false ? false : true} variant="contained" color="secondary" onClick={() => confirmar()}>ENVIAR</Button>

    </>
  )
}