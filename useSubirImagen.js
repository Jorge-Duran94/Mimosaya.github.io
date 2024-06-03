import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fbstorage } from "../services/firebase";

  // Función para subir una imagen a Firebase Storage
  export async function useSubirImagen(file) {
    try {
      // Referencia al storage de Firebase donde se guardará la imagen
      const storageRef = ref(fbstorage, `imagenes/${file.name}`);
  
      // Subir la imagen al storage de Firebase
      const snapshot = await uploadBytes(storageRef, file);
  
      //console.log("Imagen subida exitosamente:", snapshot.metadata.fullPath);
      // Devolver la URL de descarga de la imagen
      return snapshot.metadata.fullPath;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error; // Lanzar el error para que pueda ser manejado externamente
    }
  }