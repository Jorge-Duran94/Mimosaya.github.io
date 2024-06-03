import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance2 } from "../../axios/axiosConfig";
import { Cardx } from "./Cardx";
import { Backdrop, CircularProgress } from "@mui/material";



export const VerFotos = () => {
  const {Id} = useParams();
  const [fotos, setFotos] = useState([])
  const [loader, setLoader] = useState(false)
  const filtro = fotos.filter((e) => e.id_modelo === parseInt(Id))


    const verFotos = () => {
      setLoader(true)
        axiosInstance2.get('/photos')
        .then(res => setFotos(res.data))
        .then(() => setLoader(false))
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
    {filtro.length > 0 ? <h2></h2>: <h2>sin imagenes</h2>}
    <div className="myflex">
    {filtro.map((foto) => (
      <Cardx key={foto.id} nickname={foto.nickname} url={foto.url} descripcion={foto.descripcion}/>
    ))}
    </div> 
    </>
  )
}