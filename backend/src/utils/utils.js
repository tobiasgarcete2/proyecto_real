import cloudinary from "cloudinary";

import multer from 'multer';
import path from 'path';
import fs from "fs-extra"

// Configuración de multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Ruta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Genera un nombre único para cada archivo
    }
});

// Crear un objeto multer
const upload = multer({ storage: storage });

const Cloudinary = cloudinary.v2;

Cloudinary.config({
  cloud_name: "dxwmqierr",
  api_key: "882886964549628",
  api_secret: "Lu8lOmf2-3oRL2Gxxr8eOoJUiQM",
});



export async function uploadImage(file) {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'uploads',
    });

    console.log('Imagen subida correctamente:', uploadResult.secure_url);

    // Eliminar archivo local después de la subida
    fs.unlinkSync(file.tempFilePath);

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
}