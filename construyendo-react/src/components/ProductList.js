import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Product from './Product';
import "../assets/css/allProducts.css";

function ProductList(props) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function deleteProduct(id) {
        let result = await fetch(`http://localhost:3030/api/products/delete/${id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        console.warm(result);
        getProducts();
        

        // Lo mismo pero sin async
        // fetch(`http://localhost:3030/api/products/delete/${id}`, {
        //     method: 'DELETE'
        // }).then((result) => {
        //     result.json().then((resp) => {
        //         console.log(resp)
        //         console.warm(resp)
        //         getProducts()
        //     })
        // })
    }

    async function getProducts() {
        let result = await  fetch(`http://localhost:3030/api/products`)
        result = await result.json();
        setProducts(result);


        // Lo mismo pero sin async
        // fetch(`http://localhost:3030/api/products`)
        //     .then((result) => {
        //         result.json.then((resp) => {
        //             setProducts(resp)
        //         })
        //     })
    }
    console.log(products);


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
                <th>    <Link className="nav-link" to="/table">  <button className='delete' onClick={() => deleteProduct(props.id)}> Eliminar</button>  </Link>       </th>               

            </tr>

            <Routes>
                <Route path='/table' element={<Product />} />
            </Routes>

        </React.Fragment>
    )
}
export default ProductList;