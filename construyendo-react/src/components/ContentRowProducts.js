import React from 'react';
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';



function ContentRowProducts() {


    const [products, setProducts] = useState([])



    const getProducts = () => {

        fetch('http://localhost:3030/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
    }
    useEffect(() => {
        getProducts()
    }, [])


    let productInDataBase = {
        color: "primary",
        titulo: "Cantidad de Productos",
        valor: products.count || 0,
        icono: "fas fa-film",
    }

    let productosEnOferta = {
        color: "info",
        titulo: "Cantidad de productos en oferta",
        valor: products.oferta || 0,
        icono: "fas fa-film",
    }

    let amount = {
        color: "success",
        titulo: "Cantidad de Usuarios",
        valor: 7,
        icono: "fas fa-award",
    }

    let user = {
        color: "warning",
        titulo: "Usuarios Administradores",
        valor: 4,
        icono: "fas fa-user",
    }





    let cardProps = [productInDataBase, productosEnOferta, amount, user];

    return (
        <React.Fragment>
            {/*<!-- Content Row -->*/}
            <div className="row">
                {
                    cardProps.map((producto, index) => {
                        return <SmallCard  {...producto} key={index} />
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default ContentRowProducts;