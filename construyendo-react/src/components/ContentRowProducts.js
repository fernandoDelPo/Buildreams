import React from 'react';
import SmallCard from './SmallCard';

let productInDataBase = {
    color:   "primary",
    titulo: "Cantidad de Productos",
    valor: 21,
    icono: "fas fa-film",
}

let productosEnOferta = {
    color:   "info",
    titulo: "Cantidad de productos en oferta",
    valor: 8,
    icono: "fas fa-film",
}

let amount ={
    color:   "success",
    titulo: "Cantidad de Usuarios",
    valor: 7,
    icono: "fas fa-award",
}

let user = {
    color:   "warning",
    titulo: "Usuarios Administradores",
    valor: 4,
    icono: "fas fa-user",
}



let cardProps = [productInDataBase, productosEnOferta, amount, user];



function ContentRowProducts(){
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((producto,index)=>{
                    return <SmallCard  {...producto}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowProducts;