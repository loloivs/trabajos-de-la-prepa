const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/SALLE")
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.log("🔴 Error MongoDB:", err));

const solicitudSchema = new mongoose.Schema({
  NOMBRE: String,
  EDAD: Number,
  CORREO: String,
  TELEFONO: String,
  CARRERA: String
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema, "SOLICITUDES_DE_CARRERAS");

app.use(cors());
app.use(express.json()); //el servidor va a entender los datos que llegan desde el formulario
app.use(express.static(__dirname)); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "FORMULARIO.html"));
});

app.post("/api/solicitudes", async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    const resultado = await nuevaSolicitud.save();

    console.log("GUARDADO", resultado);

    res.send("Guardado correctamente");
  } catch (error) {
    console.error("ERROR", error);
    res.status(500).send("Error al guardar");
  }
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});