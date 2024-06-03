import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
  
  const navigate = useNavigate()


  return (
    <>
<div id="navbar">
<button className="button" onClick={() => navigate('/')}>
  <div className="icon_cont">
    <span className="icon">🡪</span>
  </div>
  <span className="text_button">Inicio</span>
</button>
<button className="button">
  <div className="icon_cont">
    <span className="icon">🡪</span>
  </div>
  <span className="text_button" onClick={() => navigate('/tarifas')}>Tarifas</span>
</button>
<button className="button">
  <div className="icon_cont">
    <span className="icon">🡪</span>
  </div>
  <span className="text_button" onClick={() => navigate('/contacto')}>Contacto</span>
</button>

</div>
    </>
  )
}