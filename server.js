const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ruta DELETE personalizada para eliminar una cámara por ID
server.delete('/cameras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const db = router.db;
  const cameras = db.get('cameras').value();

  // cámara con el ID especificado
  const cameraIndex = cameras.findIndex((camera) => camera.id === id);

  if (cameraIndex !== -1) {
    // Eliminamos
    cameras.splice(cameraIndex, 1);

    // Guardamos en bd
    db.write();

    res.sendStatus(204); // Respuesta 204 No Content para indicar éxito
  } else {
    res.sendStatus(404); 
  }
});


// crear un nuevo producto
server.post('/cameras', (req, res) => {
  const db = router.db;
  const newCamera = req.body;

  // nuevo ID único para producto
  newCamera.id = generateUniqueId(db, 'cameras');

  // guardar nuevo producto a la bd
  db.get('cameras').push(newCamera).write();

  res.status(201).json(newCamera);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});


function generateUniqueId(db, collection) {
  const maxId = db.get(collection).maxBy('id').value();
  return maxId ? maxId.id + 1 : 1;
};