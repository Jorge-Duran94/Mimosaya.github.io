import { Button, TextField } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { useEffect } from "react"


export const Contacto = () => {

  const {nombre, telefono, email, mensaje, onInputChange, onResetForm, formState } = useForm({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: ""
  })

  useEffect(() => {
    onResetForm()
  },[])

  return (
    <>
    <h1>Contacto</h1>
    <form action="https://formspree.io/f/xgegnpyd"
  method="POST">
    <div className="contacto">
        
        <TextField required name="nombre" onChange={onInputChange} value={nombre} className="fieldcontacto" label="Nombre y Apellido" color="secondary" />
        <TextField required type="number" name="telefono" onChange={onInputChange} value={telefono} className="fieldcontacto" label="Telefono" color="secondary" />
        <TextField required type="email" name="email" onChange={onInputChange} value={email} className="fieldcontacto" label="E-Mail" color="secondary" />
        <TextField required name="mensaje" onChange={onInputChange} value={mensaje} label="Mensaje" color="secondary" fullWidth  multiline rows={4}/>
        </div>
        <div>
          
        </div>
        <Button type="submit" variant="contained" color="secondary">Enviar</Button>
        </form>
    </>
  )
}