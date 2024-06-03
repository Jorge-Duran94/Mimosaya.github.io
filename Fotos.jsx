import { useEffect, useState } from "react"
import { axiosInstance2 } from "../../axios/axiosConfig"
import { Cardx } from "./Cardx"
import { Backdrop, CircularProgress, Button } from "@mui/material"



export const Fotos = () => {

    const [loader, setLoader] = useState(false)
    const [fotos, setFotos] = useState([])
    const [filtro, setFiltro] = useState(1)
    const pendientes = fotos.filter((e) => e.estado === filtro)


const verFotos = () => {
  setLoader(true)
    axiosInstance2.get('/photos')
    .then(res => setFotos(res.data))
    .then(res => setLoader(false))
}


useEffect(() => {
    verFotos()
},[])


  return (
    <>

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


<div className="fullwidth">
  <Button variant={filtro === 0 ? "outlined" : "text"} onClick={() => setFiltro(0)}>Pendientes</Button> 
  <Button variant={filtro === 1 ? "outlined" : "text"} onClick={() => setFiltro(1)}>Autorizados</Button> 
  <Button variant={filtro === 2 ? "outlined" : "text"} onClick={() => setFiltro(2)}>Rechazados</Button>
    
  </div>

<div className="myflex">
{pendientes.map((foto) => (

<Cardx key={foto.id} idx={foto.id} nickname={foto.nickname} url={foto.url} descripcion={foto.descripcion} estado={foto.estado} verFotos={verFotos}/>
))}
</div>

    </>
  )
}