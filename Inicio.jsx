import { Button, Dialog, TextField } from "@mui/material"
import { Tarjetas } from "./Tarjetas"
import { useEffect, useState } from "react"
import { axiosInstance, axiosInstance2 } from "../../axios/axiosConfig"
import { Inscripcion } from "../Inscripcion"
import { useNavigate } from "react-router-dom"
import VideoCallRoom from "../VideoCall/VideoCallRoom"


export const Inicio = () => {

  const fecha = new Date()
  const [open, setOpen] = useState(true)
  const [models, setModels] = useState([])
  const [loader, setLoader] = useState(0)
  const [buscar, setBuscar] = useState("")

  const [mje, setMje] = useState("")
  const modelsactives = models.filter((e) => e.estado === 1)

  console.log(fecha.toLocaleString().split(", ")[1])
  
  const navigate = useNavigate()

  const showModels = async () => {
    setLoader(1)
    axiosInstance.get('/modelos')
    .then(r => {
      if(r.status === 200){
          setModels(r.data)
          setLoader(r.status)
      }else{
        throw new Error(`[${r.status}] Error en la solicitud`)
      }
    })
    .catch(err => console.log(err))
  } 

  const cargarVisita = () => {
    axiosInstance2.post("/visita", {
      fecha: fecha.toLocaleString().split(", ")[0],
      hora: fecha.toLocaleString().split(", ")[1]
    })
  }

  useEffect( ()=> {
    showModels()
    
  }, [mje])

  useEffect(() => {
  const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
  client.on('connect', () => {
    client.subscribe('mmya')
    console.log("conectado al servidor mqtt")
  })

  client.on('message', (topic, message ) => {
    setMje(message)
    // subirData(JSON.parse(message).voltaje);
  })
  cargarVisita()
}, [])

 const busqueda = modelsactives.filter((e) => e.nickname.toUpperCase().includes(buscar.toUpperCase()))


  return (
    <>
    <Dialog open={open} id="dialog">
<div className="mypadding" align="center" >
    <img src="/logo.png" alt="" className="logo"/>
    <p>Antes de que ingreses, queremos informarte que el contenido de esta página está destinado únicamente para personas mayores de 18 años. Al acceder a nuestro sitio, confirmas que tienes la edad legal para ver contenido adulto en tu jurisdicción.</p>
    <p>Entendemos que este tipo de contenido puede no ser adecuado para todas las audiencias, pero si decides continuar, esperamos que lo hagas con mente abierta y sin sentirte ofendido/a por el material que encontrarás aquí.</p>
    <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>Entrar</Button>
</div>

    </Dialog>
{/*   <div  align="start" className="mywidth">
    <div className="buscador">
    <TextField label="Buscar" color="secondary" onChange={(e) => setBuscar(e.target.value)} value={buscar} fullWidth/>
    </div>
  </div>  */}



<div className="myflex marginSup">
 

{busqueda.map((model) => (
  <Tarjetas key={model.id} id={model.id} nickname={model.nickname} foto={model.foto || model.cara} descripcion={model.descripcion} chat_status={model.chat_status} id_telegram={model.id_telegram}/>
))}



</div>

{/* <h1>Muy pronto descubriras nuevos placeres!!</h1> */}

<img id="monetiza" src="/monetiza.jpg" alt="" onClick={() => navigate('/reg')}/>
    </>
  )
}