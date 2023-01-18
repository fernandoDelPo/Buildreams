import React from 'react';
import SmallCard from './SmallCard';
import { useEffect, useState } from 'react';



function ContentRowProducts() {


    const [products, setProducts] = useState([])

    const [users, setUsers] = useState([])


    const getProducts = () => {

        fetch('http://localhost:3030/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
    }
    useEffect(() => {
        getProducts()
    }, [])

    const getUsers = () => {

        fetch('http://localhost:3030/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
    }
    useEffect(() => {
        getUsers()
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
        valor: users.count,
        icono: "fas fa-award",
    }

    let user = {
        color: "warning",
        titulo: "Usuarios Administradores",
        valor: users.countAdmin,
        icono: "fas fa-user",
    }





    let cardProps = [productInDataBase, productosEnOferta, amount, user];

    return (
        <React.Fragment>
            {/*<!-- Content Row -->*/}
            <div className="row">
                {
                    cardProps.map((product, index) => {
                        return <SmallCard  {...product} key={index} />
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default ContentRowProducts;