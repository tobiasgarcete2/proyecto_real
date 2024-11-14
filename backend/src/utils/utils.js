import cloudinary from "cloudinary";






const Cloudinary = cloudinary.v2;

Cloudinary.config({
  cloud_name: "dxwmqierr",
  api_key: "882886964549628",
  api_secret: "Lu8lOmf2-3oRL2Gxxr8eOoJUiQM",
});



const editar = async (req, res) => {
    const { username } = req.body;
  try {
    // 1. Desestructuración de los datos recibidos del cliente
    // const {id} = req.param
    console.log("Datos recibidos:", username);  

    // // 2. Procesar la imagen si se ha subido
    // let urlImg = "";
    // if (req.file) {
    //   // Renombrar archivo para mantener el nombre original
    //   fs.renameSync(
    //     `${req.file.path}`,
    //     `${req.file.destination}/${req.file.originalname}`
    //   );

    //   // Subir imagen a Cloudinary
    //   const url = await Cloudinary.uploader.upload(`${req.file.destination}/${req.file.originalname}`, {
    //     use_filename: true,
    //   });

    //   // Guardar la URL de la imagen subida
    //   urlImg = url.secure_url;
    //   console.log("URL de la imagen en Cloudinary:", urlImg);
    // }


    // // 3. Conectar con la base de datos y realizar la actualización
    // const conex = await newConex();
    // const result = await conex.query(
    //   ``,
    // //   [...]
    // );

    // console.log("Resultado de la actualización en la base de datos:", result);

    // 4. Responder con éxito
    res.status(200).json({ message: "Actualización exitosa" }); //data:result
  } catch (error) {
    console.error("Error al editar el perfil:", error.message);
    res.status(500).json({ message: "Hubo un error en el servidor", error: error.message });
  }
};
