import { Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { PaypalButton } from "./PaypalButton"
import VideoCallRoom from "../VideoCall/VideoCallRoom"



export const ModalV = ({setOpenv, id_telegram, nickname}) => {

    const [counter, setCounter] = useState(5)
    const [blocked, setBlocked] = useState(false)
    const [pago, setPago] = useState(true)
    const [video, setVideo] = useState(false)

    const sumar = () => {
        setPago(false)
        setCounter(counter + 1)     
    }

    const restar = () => {
        setPago(false)
        setCounter(counter - 1)
    }

    useEffect(() =>{
       if(counter <= 5){
        setBlocked(true)
       }else{
        setBlocked(false)
       }
        
    },[counter])

    useEffect(() => {
        if(video){
          axiosInstance2.post("/venta", {
            descripcion: "video",
            modelo: nickname,
            fecha: fecha.toLocaleString().split(", ")[0],
            hora: fecha.toLocaleString().split(", ")[1]
          })
        }
      },[video])

  return (
    <>
    <div align="end"><Button variant="contained" color="error" onClick={() => setOpenv(false)}>X</Button></div>
    {video ?  <VideoCallRoom tiempo={counter} id_telegram={id_telegram}/> : 
    <div>
<div className="mypadding">
<h1>Portal Videollamadas</h1>

<div align="center"><img src="./unnamed.webp" alt="" /></div>
<p>-Selecciona la cant.de minutos</p>

    <p align="center"><strong>{counter}</strong> mins</p>

    <div className="myflex">
<Button variant="contained" size="small" onClick={() => sumar()}>+</Button>
<Button disabled={blocked} variant="contained" size="small" onClick={() => restar()} color="error">-</Button></div>
</div>
{pago ? <PaypalButton totalValue={counter} invoice={"Videollamada"} setVideo={setVideo} setOpenv={setOpenv}/> : <Button variant="contained" color="secondary" onClick={() => setPago(true)}>Confirmar</Button>}
</div>
}
    </>
  )
}