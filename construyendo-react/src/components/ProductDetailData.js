import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { response } from 'express';

function ProductDetailData() {
    let idProduct = useParams();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);


    useEffect( () => {
        fetch(`http://localhost:3030/api/products/${idProduct.id}`)
        .then(response => response.json())
        .then(data => {
            setProduct(response);
            setCategories(data.categories)
        })
        .catch(error => console.error(error));
    }, [idProduct.id]);
    console.log(idProduct)
    

     return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3 card-prodSelect" >
                    <h5 className="m-0 font-weight-bold text-gray-800"> Producto: {product.data?.nombre || "loading..."}</h5>
                    <h5 className="m-0 font-weight-bold text-gray-800"> Producto: {product.data?.categories.nombre || "loading..."}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={product?.pathImg || "loading..."} alt={product?.nombre || "loading..."}/>
                    </div>
                    <p>{product?.descripcion || "loading..."}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailData;
