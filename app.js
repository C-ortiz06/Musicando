const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3002;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');

// --- Middlewares ---
// Configuración de directorio público
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


/* --- API Routers --- */
const cancionesApiRoutes = require("./routes/api/cancionesApiRoutes")


// Rutas
const crudRoutes = require('./routes/index.js'); 

// Usar las rutas de CRUD
app.use('/', crudRoutes); 

//REST API ENDPOINTS
app.use('/api/canciones', cancionesApiRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log("Servidor en: http://localhost:" + PORT);
});
