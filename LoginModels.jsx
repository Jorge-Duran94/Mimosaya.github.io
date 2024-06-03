import { Alert, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../axios/axiosConfig"


export const LoginModels = ({setLogin, setUser, user, login}) => {


const [email, setEmail] = useState("")
const [pass, setPass] = useState("")
const [alert, setAlert] = useState(false)
const [users, setUsers] = useState([])
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

useEffect(() => {

  client.on('connect', () => {
    client.subscribe('mmya')
    console.log("conectado al servidor mqtt")
  })

}, [])

const chatOnline = (id) => {
  axiosInstance.put('/modelo/'+id, {
    chat_status: 1
  })
  client.publish("mmya", "loguin")
}

const getUsers = () => {
  axiosInstance.get('/modelos')
  .then((res) => setUsers(res.data))
}

useEffect(() => {
  getUsers()

},[])




const validarUsuarios = () => {
  if(users.find((e) => e.email === email) && users.find((e) => e.password === pass)){
    const usermy = users.find((e) => e.email === email) && users.find((e) => e.password === pass)
    console.log("usuario ok")
    chatOnline(usermy.id)
    setUser(usermy)
    localStorage.setItem("usermy", JSON.stringify({"usuario": usermy.nickname, "rol":"modelo", "id":usermy.id}))
    setLogin(true)
    
  }else{
    console.log("usuario incorrecto")
    setAlert(true)
  } 
}

  return (
    <>
<div className="login buscador mypadding">
<TextField error={alert} type="email" fullWidth className="fieldcontacto" label="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
<TextField error={alert} type="password" fullWidth className="fieldcontacto" label="contraseña" onChange={(e) => setPass(e.target.value)} value={pass}/>
<Button variant="contained" color="secondary" onClick={validarUsuarios}>Ingresar</Button>
{alert === true ? <Alert severity="error">Usuario o contraseña incorrectos!</Alert> : ""}
</div>
    </>
  )
}