import React from 'react';
import { useEffect, useState } from 'react'


function Categoria(props){

    const [categorias, setCategorias] = useState([])



    const getCategorias = () => {

        fetch('http://localhost:3030/api/categorias')
            .then((response) => response.json())
            .then((data) => setCategorias(data))
    }
    useEffect(() => {
        getCategorias()
    }, [])



    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark shadow">
                    <div className="card-body">
                        
                        {props.nombre + ': '} { props.nombre === 'Herramientas' ? categorias.countHerramientas : undefined } 
                    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Categoria;