import { Avatar, Button, Dialog, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import { useState } from "react";

export const Viewmodel = ({datos, setViwem}) => {
  const [open, setOpen] = useState(false)
  const [src, setStc] = useState("")

  const handlePhoto = (url) => {
    setStc(url)
    setOpen(true)
  }

  return (
    <>
    <Dialog open={open} fullWidth>
      <div align="end"><Button variant="contained" color="error" onClick={() => setOpen(false)}>X</Button></div>
          <img src={src} alt="" />
    </Dialog>

    <div align="end"><Button variant="contained" color="error" onClick={() => setViwem(false)}>X</Button></div>
        <div className="mypadding">
          <div align="center"><Avatar sx={{ width: 200, height: 200 }} src={datos.cara}/>
    <h2>{datos.nickname}</h2></div>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        <TableRow>
          <TableCell>
           Foto Perfil
          </TableCell>
          <TableCell>
           <img className="imgdni" src={datos.foto} alt="" /> 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Nombre/s:
          </TableCell>
          <TableCell>
            {datos.nombre}
          </TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell>
            Apellido/s:
          </TableCell>
          <TableCell>
            {datos.apellido}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            DNI:
          </TableCell>
          <TableCell>
            {datos.dni}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Frente DNI:
          </TableCell>
          <TableCell  onClick={() => handlePhoto(datos.frente)}>
            <img className="imgdni" src={datos.frente} alt="" />
           
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Dorso DNI:
          </TableCell>
          <TableCell  onClick={() => handlePhoto(datos.dorso)}>
          <img className="imgdni" src={datos.dorso} alt="" />
            
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Fecha Nacimiento:
          </TableCell>
          <TableCell>
            {datos.nacimiento}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Pais:
          </TableCell>
          <TableCell>
            {datos.pais}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Ciudad:
          </TableCell>
          <TableCell>
            {datos.ciudad}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Whatsapp:
          </TableCell>
          <TableCell>
            {datos.whatsapp}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            E-mail:
          </TableCell>
          <TableCell>
            {datos.email}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Cbu/Alias:
          </TableCell>
          <TableCell>
            {datos.cbualias}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Descripción:
          </TableCell>
          <TableCell>
            {datos.descripcion}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Estado:
          </TableCell>
          <TableCell>
            {datos.estado === 1 ? "Activa" : "Suspendida"}
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
   
    </TableContainer>
        </div>
    </>
  )
}