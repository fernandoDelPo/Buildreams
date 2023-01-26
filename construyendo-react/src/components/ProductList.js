import React from 'react';
import "../assets/css/allProducts.css";

function ProductList(props) {
    return (
        <React.Fragment>
            <tr>

                <td>{props.id}</td>
                <td>{props.nombre}</td>
                <td>{props.precio}</td>
                <td>{props.color}</td>
                <td>{props.stock}</td>
                <td>{props.category.nombre}</td>
                <th><a target="_blank" rel="noreferrer" href={`${props.detail}`}>{props.detail}</a></th>
                <th><a className="linkTo" target="_blank" rel="noreferrer" href={`http://localhost:3030/products/productDetail/${props.id}`}><button className='linkTo'>Ver Producto</button></a></th>
                
            </tr>


        </React.Fragment>
    )
}
export default ProductList;