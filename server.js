const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
        nombre: "Detergente",
        descripcion: "Limpieza profunda",
        precio: 3500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
      },
      {
        nombre: "Detergente",
        descripcion: "Limpieza ",
        precio: 6500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
      },

      {
        nombre: "Cloro",
        descripcion: "Desinfección total",
        precio: 2500,
        unidad: "unidad",
        categoria: "Aseo del hogar",
        imagen: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1"
      },

      {
        nombre: "Arroz",
        descripcion: "Arroz premium",
        precio: 3000,
        unidad: "kg",
        categoria: "Despensa",
        imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
      },

      {
        nombre: "Pasta",
        descripcion: "Pasta italiana",
        precio: 2000,
        unidad: "paquete",
        categoria: "Despensa",
        imagen: "https://images.unsplash.com/photo-1603133872878-684f208fb84b"
      },

      {
        nombre: "Azúcar",
        descripcion: "Azúcar refinada",
        precio: 1800,
        unidad: "kg",
        categoria: "Despensa",
        imagen: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
      },


    ];

    await Producto.insertMany(productos);

    res.json(productos);

  } catch (error) {

    res.status(500).json(error);

  }

});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
})