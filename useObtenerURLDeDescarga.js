import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fbstorage } from "../services/firebase";

// Función para obtener la URL de descarga completa de una imagen en Firebase Storage



  export async function useObtenerURLDeDescarga(rutaDeAlmacenamiento) {
    try {
        const storageRef = ref(fbstorage, rutaDeAlmacenamiento);
        const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al obtener la URL de descarga de la imagen:", error);
      throw error; 
    }
  }
  //end