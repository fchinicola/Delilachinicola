const { productos } = require('../data/productos.json');

// GET de productos
function productosget(req, res) {
  if (req.params.id) {
    let product;
    if (product = productos.find((producto) => producto.id === Number(req.params.id))) {
      return res.status(200).json(product);
    } return res.status(404).send('El producto no pudo ser encontrado');
  } return res.status(200).json(productos);
}

// Crear nuevo producto con el request.body enviado por el administrador
function productospost(req, res) {
  const nuevoProducto = new Object(req.body);
  let id = 0;
  if (productos.length > 0) {
    const lastproducto = productos.length - 1;
    id = productos[lastproducto].id;
    id += 1;
  }
  nuevoProducto.id = id;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
}

// Actualiza un producto existente con el req.body enviado por el admin
function productosput(req, res) {
  const idplato = req.params.idproducto;
  for (const producto of productos) {
    if (Number(idplato) === producto.id) {
      if (req.body.descripcion !== 'undefined') {
        producto.descripcion = req.body.descripcion;
      }
      if (req.body.precio !== 'undefined') {
        producto.precio = req.body.precio;
      }
      return res.status(200).json(producto);
    }
  }
  return res.status(404).send('El producto no fue encontrado y no se pudo actualizar');
}

// Elimina un producto con el req.params enviado siempre q sea requerio por un admin
function productosdelete(req, res) {
  const idplato = req.params.idproducto;
  for (const producto of productos) {
    if (Number(idplato) === producto.id) {
      const index = productos.indexOf(producto);
      productos.splice(index, 1);
      return res.status(200).json(productos);
    }
  }
  return res.status(400).send('Producto no encontrado');
}

module.exports = {
  productosget,
  productospost,
  productosput,
  productosdelete,
};
