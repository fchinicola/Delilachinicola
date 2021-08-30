const todoslospedidos = [];
const status = ['Pendiente', 'Confirmado', 'En Preparacion', 'Enviado', 'Entregado'];

// Funcion para sumar el todal del pedido
function sumartotal(arregloproductos) {
  let total = 0;
  for (const producto of arregloproductos) {
    let preciosuma = Number(producto.precio) * Number(producto.cant);
    total = total + preciosuma;
  }
  return total;
}

// GET de todos pedidos (para el admin)
// GET de los pedidos que hizo un usuario
function mostrarpedidos(req, res) {
  if (req.user.admin) {
    return res.status(200).json(todoslospedidos);
  }
  if (req.user.pedidos) {
    return res.status(200).json(req.user.pedidos);
  }
  return res.status(404).send('No se encuentran pedidos')
}

// GET de un pedido en especifico
function mostrarunpedido(req, res) {
  const { elpedido } = req;
  for (const pedido of req.user.pedidos) {
    if (Number(pedido.id) === Number(elpedido.id)) {
      return res.status(200).json(elpedido);
    } else return res.status(404).send('Su usuario no puede ver el pedido solicitado');
  }
}

// POST para un nuevo pedido
function nuevoPedido(req, res) {
  const newpedido = {};
  newpedido.id = new Date().getTime();
  const arrProducts = req.body.products;
  newpedido.userid = req.user.id;
  if (req.body.direccionenvio) {
    newpedido.direccionenvio = req.body.direccionenvio;
  } else {
    newpedido.direccionenvio = req.user.direccion;
  };
  newpedido.productos = arrProducts;
  newpedido.total = sumartotal(arrProducts);
  newpedido.mediodepago = req.body.payment;
  newpedido.estado = status[0];
  todoslospedidos.push(newpedido);
  req.user.pedidos.push(newpedido.id);
  res.status(201).json(newpedido);
}

// PUT para actualizar el pedido
function actualizarPedido(req, res) {
  const { elpedido } = req;
  for (const pedido of req.user.pedidos) {
    if (Number(pedido) === Number(elpedido.id)) {
      if (elpedido.estado === status[0]) {
        const arrproductos = req.body.products;
        elpedido.productos = arrproductos;
        elpedido.total = sumartotal(arrproductos);
        return res.status(200).send(elpedido);
      } else {
        return res.send(`El pedido se encuentra ${elpedido.estado} y no pueden realizarse cambios`)
      }
    }
  }
}

// PUT para confirmar el pedido por parte de un user
function confirmarpedido(req, res) {
  if (req.user.pedidos.length > 0) {
    const { elpedido } = req;
    if (elpedido.estado === status[0]) {
      elpedido.estado = status[1];
      return res.status(200).json(elpedido);
    } return res.send(`El pedido no puede ser confirmado, se encuentra en estado ${elpedido.estado}`);
  } return res.send('El usuario no realizo ningun pedido');
}

// DELETE de un admin para borrar un pedido
function borrarpedido(req, res) {
  const { elpedido } = req;
  const index = todoslospedidos.indexOf(elpedido);
  const pedidoseliminados = todoslospedidos.splice(index, 1);
  res.status(200).send(`El pedido ${pedidoseliminados} ha sido eliminado`);
}

// PUT para que el admin pueda cambiar el estado del pedido
function admincambiarestado(req, res) {
  const { elpedido } = req;
  const { newstatus } = req.query;
  elpedido.estado = newstatus;
  res.send(elpedido);
}

module.exports = {
  mostrarpedidos,
  nuevoPedido,
  actualizarPedido,
  confirmarpedido,
  mostrarunpedido,
  borrarpedido,
  admincambiarestado,
};
