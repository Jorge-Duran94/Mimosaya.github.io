import { useEffect, useState } from "react"
import { Login } from "./login"
import { Tabses } from "./Tabses"




export const Admin = () => {

  const [log, setLog] = useState(false)
  const [admin, setAdmin] = useState("")

  const adminmy = localStorage.getItem("adminmy")

  useEffect(() => {
    if(adminmy){
     setLog(true)
  }else{
    setLog(false)
  }


  },[adminmy])

  return (
    <>
    
<h1>Administración</h1>



<div className="mywidth">

   { log === false ? <Login setLog={setLog} setAdmin={setAdmin}/> : <Tabses setLog={setLog}/>}</div>
    </>
  )
}