import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { axiosInstance, axiosInstance2 } from "../../axios/axiosConfig";






export const Estaditicas = () => {

  const fecha = new Date()
const [models, setModels] = useState([])
const [fotos, setFotos] = useState([])
const [visitas, setVisitas] = useState([])
const [ventas, setVentas] = useState([])
const [loader, setLoader] = useState([])

 
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

const verFotos = () => {
  setLoader(true)
    axiosInstance2.get('/photos')
    .then(res => setFotos(res.data))
    .then(() => setLoader(false))
}

const verVisitas = () => {
  setLoader(true)
    axiosInstance2.get('/visitas')
    .then(res => setVisitas(res.data))
    .then(() => setLoader(false))
}

const verVentas = () => {
  setLoader(true)
    axiosInstance2.get('/ventas')
    .then(res => setVentas(res.data))
    .then(() => setLoader(false))
}

useEffect(() => {
  showModels()
  verFotos()
  verVisitas()
  verVentas()
},[])

  return (
    <>
<TableContainer component={Paper} className="mywidth">
  <Table>
    <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
             Total Visitas
              </TableCell>
              <TableCell align="right">{visitas.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
             Visitas hoy
              </TableCell>
              <TableCell align="right">{visitas.filter((e) => e.fecha === fecha.toLocaleString().split(",")[0]).length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Mdelos
              </TableCell>
              <TableCell align="right">{models.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Fotos
              </TableCell>
              <TableCell align="right">{fotos.length}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
              Fotos Vendidas
              </TableCell>
              <TableCell align="right">{ventas.filter((e) => e.descripcion === "foto").length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Videollamadas Vendidas
              </TableCell>
              <TableCell align="right">{ventas.filter((e) => e.descripcion === "video").length}</TableCell>
            </TableRow>
            </TableBody>
  </Table>
</TableContainer>
    </>
  )
}