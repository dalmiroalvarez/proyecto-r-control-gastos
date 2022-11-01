import { useState, useEffect } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos, 
    presupuesto, 
    setGastos, 
    setPresupuesto, 
    setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState('')
    const [gastado, setGastado] = useState('')

    //  state de la barra circular %
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect (() => {
        const totalGastado = gastos.reduce ((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)            
        }, 1000);      
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas resetear la app?');
        
        if(resultado) {
            setGastos([])
            setPresupuesto('')
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                value={porcentaje}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#63d04d',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',                    
                })}
                text={`${porcentaje}% Gastado.`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear la App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto