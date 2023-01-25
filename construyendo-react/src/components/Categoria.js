import React from 'react';
// import { useEffect, useState } from 'react'


function Categoria(props){
    
return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark shadow">
                    <div className="card-body">
                        
                        {props.nombre} : {props.products.length} productos
                    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Categoria;