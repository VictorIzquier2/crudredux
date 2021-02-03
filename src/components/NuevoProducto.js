import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

  // State del componente 
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  // utilizar use dispatch y te crea una funcion 
  const dispatch = useDispatch();

  // Acceder al state del Store 
  const cargando = useSelector(state => state.productos.loading );
  const error = useSelector(state => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);
 
  // Mandar llamar el action de productoAction
  const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

  // Cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();

    // Validar formulario
    if(nombre.trim() === '' || precio <= 0){

      const respuesta = {
        mensaje: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }

      dispatch (mostrarAlerta(respuesta));
      return;
    }
    // Si no hay errores
    dispatch(ocultarAlertaAction());

    // Crear el nuevo producto 
    agregarProducto({
      nombre,
      precio
    });
    history.push('/');
  }

  return ( 
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.mensaje}</p> : null}
            <form
              onSubmit={submitNuevoProducto}
            >
              <div className='form-group'>
                <label>Nombre Producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre Producto'
                  name='nombre'
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                ></input>
              </div>

              <div className='form-group'>
                <label>Precio Producto</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Precio Producto'
                  name='precio'
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                ></input>
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >Agregar</button>
            </form>
            {cargando ? <p className='mt-4'>Cargando...</p> : null}
            {error ? <p className='alert alert-danger p2 text-center font-weight-bold mt-4'>Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default NuevoProducto;