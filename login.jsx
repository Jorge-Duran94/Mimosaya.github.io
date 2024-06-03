import { Alert, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance3 } from "../../axios/axiosConfig"

export const Login = ({setLog, setAdmin}) => {

const [usuario, setUsuario] = useState("")
const [usuarios, setUsuarios] = useState("")
const [pass, setPass] = useState("")
const [alert, setAlert] = useState(false)

const validarUsuarios = () => {
  if(usuarios.find((e) => e.usuario === usuario) && usuarios.find((e) => e.pass === pass)){
    const adminmy = usuarios.find((e) => e.usuario === usuario) && usuarios.find((e) => e.pass === pass)
    setAdmin(usuarios.find((e) => e.usuario === usuario) && usuarios.find((e) => e.pass === pass))
    localStorage.setItem("adminmy", JSON.stringify({"usuario": adminmy.nombre, "rol":"admin", "id":adminmy.id}))
    setLog(true)
  }else{
    console.log("usuario incorrecto")
    setAlert(true)
  } 
}

useEffect(() => {
  axiosInstance3.get('usuarios')
    .then((res) => setUsuarios(res.data))
},[])

  return (
    <>
<div className="login buscador mypadding">
<TextField error={alert} fullWidth className="fieldcontacto" label="Usuario" onChange={(e) => setUsuario(e.target.value)} value={usuario}/>
<TextField error={alert} type="password" fullWidth className="fieldcontacto" label="contraseña" onChange={(e) => setPass(e.target.value)} value={pass}/>
<Button variant="contained" color="secondary" onClick={validarUsuarios}>Ingresar</Button>
{alert === true ? <Alert severity="error">Usuario o contraseña incorrectos!</Alert> : ""}
</div>
    </>
  )
}