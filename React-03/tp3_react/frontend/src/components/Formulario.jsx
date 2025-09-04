// frontend/src/components/Formulario.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Formulario({ modo, crearUsuario, actualizarUsuario, usuarioEditar, setUsuarioEditar, setMensaje }) {
    const navigate = useNavigate();

    // Estado inicial del formulario
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        celular: '',
        fecha_nacimiento: '',
        email: ''
    });

    const [errores, setErrores] = useState({}); // Errores de validación

    // Validaciones defensivas por campo
    const validarFormulario = () => {
        const errores = {};
        const nombreApellidoRegex = /^[a-zA-Z\s]+$/;
        const direccionRegex = /^[a-zA-Z0-9\s,]+$/;
        const telefonoCelularRegex = /^[0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!nombreApellidoRegex.test(form.nombre)) errores.nombre = 'Nombre inválido';
        if (!nombreApellidoRegex.test(form.apellido)) errores.apellido = 'Apellido inválido';
        if (!direccionRegex.test(form.direccion)) errores.direccion = 'Dirección inválida';
        if (!telefonoCelularRegex.test(form.telefono)) errores.telefono = 'Teléfono inválido';
        if (!telefonoCelularRegex.test(form.celular)) errores.celular = 'Celular inválido';
        if (form.email && !emailRegex.test(form.email)) errores.email = 'Email inválido';
        if (!form.fecha_nacimiento) errores.fecha_nacimiento = 'La fecha de nacimiento es obligatoria'

        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (usuarioEditar) {
            const { id, fecha_nacimiento, ...resto } = usuarioEditar;
            
            // Aseguramos que la fecha esté en formato YYYY-MM-DD
            const fechaFormateada = fecha_nacimiento
                ? new Date(fecha_nacimiento).toISOString().split('T')[0]
                : '';

            setForm({
                ...resto,
                fecha_nacimiento: fechaFormateada
            });

        } else {
            setForm({
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                celular: '',
                fecha_nacimiento: '',
                email: ''
            });
        }
    }, [usuarioEditar]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            setMensaje('Hay errores en el formulario');
            return;
        }

        try {
            if (modo === 'editar') {
                await actualizarUsuario(usuarioEditar.id, form);
                setUsuarioEditar(null); 
            } else {
                await crearUsuario(form);
            }
            
            setMensaje(''); // Limpiar mensajes
            navigate('/'); // Redirigir al inicio
        } catch (error) {
            console.error('Error al guardar:', error);
            setMensaje('Ocurrió un error al guardar los datos');
        }
    };


    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>

                <div className="form-items">
                    {/* Render dinámico de campos */}
                    {Object.keys(form).map((campo) => (
                        <div key={campo} className="campo">
                            <label>{campo}:<br />
                                <input
                                    type={campo === 'fecha_nacimiento' ? 'date' : 'text'}
                                    placeholder={
                                        campo === 'nombre' ? 'ejemplo: juan' :
                                        campo === 'apellido' ? 'ejemplo: Dominguez' :
                                        campo === 'direccion' ? 'ejemplo: calle 123' :
                                        campo === 'telefono' ? 'ejemplo: 4883132134' :
                                        campo === 'celular' ? 'ejemplo: 2232131234' :
                                        campo === 'fecha_nacimiento' ? 'ejemplo: 12-13-2000' :
                                        campo === 'email' ? 'ejemplo@email.com' :
                                        ""
                                    }

                                    name={campo}
                                    value={form[campo] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            {errores[campo] && <span className="error">{errores[campo]}</span>}
                        </div>
                    ))}
                    
                    <button type="submit">{modo === 'editar' ? 'Actualizar' : 'Guardar'}</button>
                </div>
            </form>
        </div>
    );
}

export default Formulario;
