
import { useEffect, useState } from "react"
import { Fotos } from "./Fotos"
import { LoginModels } from "./LoginModels"

export const Models = () => {

    const [login, setLogin] = useState()
    const [user, setUser] = useState()
    const usermy = localStorage.getItem("usermy")

    useEffect(() => {
      if(usermy){
       setLogin(true)
    }else{
      setLogin(false)
    }

 
    },[usermy])

  return (
    <>
    <h1>Sección Modelos</h1>
  
    {login ? <Fotos user={user} setLogin={setLogin}/> : 
<LoginModels setUser={setUser} setLogin={setLogin}  user={user} />}


    </>
  )
}