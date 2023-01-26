
import { useState, useEffect } from 'react';
import "../assets/css/allProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductList from './ProductList';





function Product() {
    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:3030/api/products?page=${page}`)
            .then((response) => response.json())
            .then((products) => {
                setProducts(products.products);
                setLimit(products.count);
            });
    }, [page]);

    let totalPages = Math.ceil(limit);

    function handleClickNext() {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }
    function handleClickPrev() {
        if (page > 0) {
            setPage(page - 1)
        } else {
            setPage(page - 0)
        }
    }

    return (

        <>
            {products ? (
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Color</th>
                                        <th>Stock</th>
                                        <th>Categoría</th>
                                        <th>Detalle</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Color</th>
                                        <th>Stock</th>
                                        <th>Categoría</th>
                                        <th>Detalle</th>
                                    </tr>
                                </tfoot>
                                <tbody>

                                {
                                    products.map((product, index) => {
                                        return (
                                            <ProductList {...product} key={index} />
                                        )
                                    })
                                }



                                </tbody>
                            </table>

                            <div className="buttonPages">
                                <p>Anterior</p>
                                <FontAwesomeIcon className="button-Icons" icon={faArrowLeft} onClick={handleClickPrev} />
                                <p>{page + 1}</p>
                                <FontAwesomeIcon className="button-Icons" icon={faArrowRight} onClick={handleClickNext} />
                                <p>Siguiente</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                "Cargando"
            )
            }



        </>
    );
};


export default Product;
