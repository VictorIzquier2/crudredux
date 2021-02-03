import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// ** Función que crea nuevos productos ** //
export function crearNuevoProductoAction(producto){
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // Insertar en la base de datos
      await clienteAxios.post('/productos', producto);

      // Si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));

      // Alerta
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      )
    }catch(error){
      console.log(error);

      // Si hay un error cambiar el state
      dispatch(agregarProductoError(true));

      // Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Error al agregar el producto. Inténtelo de nuevo'
      })
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

// Si el producto se guarda en la base de datos
const agregarProductoExito = producto =>({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

// Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});


// ** Función que descarga los productos de la base de datos ** // 
export function obtenerProductosAction(){
  return async (dispatch) => {
    dispatch(descargarProductos());

    try{
      const respuesta = await clienteAxios.get('/productos');
      dispatch(descargarProductosExitosa(respuesta.data));
    }catch(error){
      console.log(error);
      dispatch(descargarProductosError(true));
    }
  }
}
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargarProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargarProductosError = estado => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado
})

// ** Selecciona y elimina el producto ** //
export function borrarProductoAction(id){
  return async(dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try{
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      // Si se elimina, mostrar alerta
       Swal.fire(
            'Borrado',
            'El producto ha sido eliminado correctamente.',
            'success'
          )
    }catch(error){
      console.log(error);
      dispatch(eliminarProductoError(true))
    }
  }
}
const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = estado => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: estado
})

// ** colocar producto en edición ** //
export function obtenerProductoEditar(producto) {
  return(dispatch) => {
    dispatch(obtenerProductoEditarAction(producto))
  }
}
const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

// ** Edita un registro en la API y STATE ** //
export function editarProductoAction(producto){
  return (dispatch) => {
    dispatch(editarProducto());

    try{
      clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    }catch(error){

    }
  }
}
const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})