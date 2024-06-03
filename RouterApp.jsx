import { Route, Routes } from "react-router-dom"
import { Inicio } from "./Modulos/Inicio/Inicio"
import { Contacto } from "./Modulos/Contacto/Contacto"
import { Models } from "./Modulos/Models/Models"
import { Admin } from "./Modulos/Admin/Admin"
import { Navbar } from "./Modulos/Navbar"
import { Bases } from "./Modulos/Basesycondiciones/Bases"
import { Tarifas } from "./Modulos/Tarifas/Tarifas"
import { Inscripcion } from "./Modulos/Inscripcion"
import { Endreg } from "./Modulos/Endreg"
import { VerFotos } from "./Modulos/Fotos/VerFotos"
import VideoCallRoom from "./Modulos/VideoCall/VideoCallRoom"


export const RouterApp = () => {
  return (
    <>

<div align="center">
  <img src="/logo.png" alt="" className="logo"/>
<Navbar />


<Routes>

<Route path="/" element={<Inicio/>}  />
<Route path="/contacto" element={<Contacto/>}  />
<Route path="/models" element={<Models/>}  />
<Route path="/admin" element={<Admin/>}  />
<Route path="/tarifas" element={<Tarifas/>}  />
<Route path="/bases" element={<Bases/>}  />
<Route path="/reg" element={<Inscripcion />}  />
<Route path="/endreg" element={<Endreg />}  />
<Route path="/fotos/:Id" element={<VerFotos />}  />
<Route path="/videocall" element={<VideoCallRoom />}  />
</Routes>
</div>

    </>
  )
}