const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://admin:Admin1234@cluster0.ixsxgn2.mongodb.net/tienda24?retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB conectado");
})
.catch((error) => {
  console.log(error);
});


// SCHEMA
const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  detalles:String,
  presentacion:String,
  precio: Number,
  unidad: String,
  imagen: String
});

const Producto = mongoose.model("Producto", ProductoSchema);


// CREAR 5 PRODUCTOS
app.get("/crear", async (req, res) => {

  try {

    await Producto.deleteMany();

    const productos = [
      {
  nombre: "Clorox Anti-Splash",
  descripcion: "Elimina el 99,9% de bacterias. Limpia, desinfecta, blanquea y desmancha.",
  precio: 5500,
  unidad: "1955 g",
  categoria: "Aseo del hogar",
  imagen: "/img/cloro.jpg"
},


      {
        nombre: "Detergente",
        descripcion: "Limpieza profunda",
        precio: 3500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "/img/deter.jpg"
      },
      {
        nombre: "Detergente",
        descripcion: "Limpieza ",
        precio: 6500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "/img/foto1.jpg"
      },

      {
        nombre: "Cloro",
        descripcion: "Desinfección total",
        precio: 2500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "/img/foto2.jpg"
      },

      {
        nombre: "Arroz",
        descripcion: "Arroz premium",
        precio: 3000,
        unidad: "kg",
        categoria: "Despensa",
        imagen: "/img/foto3.jpg"
      },

      {
        nombre: "Pasta",
        descripcion: "Pasta italiana",
        precio: 2000,
        unidad: "paquete",
        categoria: "Despensa",
        imagen: "/img/p.jpg"
      },

      {
        nombre: "Azúcar",
        descripcion: "Azúcar refinada",
        precio: 1800,
        unidad: "kg",
        categoria: "Despensa",
        imagen: "/img/a.jpg"
      },


    ];

    await Producto.insertMany(productos);

    res.json(productos);

  } catch (error) {

    res.status(500).json(error);

  }

});

app.get("/productos", async (req, res) => {

  try {

    const productos = await Producto.find();

    res.json(productos);

  } catch (error) {

    res.status(500).json(error);

  }

});

app.get("/promociones", async (req, res) => {
  try {

    const promociones = await Producto.find({
      promocion: true,
    });

    res.json(promociones);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al obtener promociones",
    });

  }
});
app.get("/promociones", async (req, res) => {
  try {

    const promociones = await Producto.find({
      promocion: true,
    });

    res.json(promociones);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al obtener promociones",
    });

  }
});



app.get("/productos/:categoria", async (req, res) => {

  try {

    const categoria =
      decodeURIComponent(req.params.categoria)
      .trim()
      .toLowerCase();

    const productos = await Producto.find();

    const filtrados = productos.filter((p) =>

      p.categoria
        .trim()
        .toLowerCase() === categoria
    );

    res.json(filtrados);

  } catch (error) {

    res.status(500).json(error);
  }
});


app.listen(3000, "0.0.0.0" ,() => {
  console.log("Servidor corriendo en puerto 3000");
});


  



