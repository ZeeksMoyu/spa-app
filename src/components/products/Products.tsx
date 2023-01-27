import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { useNavigate } from 'react-router-dom';
import classes from "./Products.module.css"

interface Props {
    id: number | undefined;
}
interface Product {
    id: number;
    name: string;
    year: number;
    color: string;
}

interface Products{
    data: Product[]
}
const Products: React.FC<Props> = ({ id }) => {
    const [products, setProducts] = useState<Products>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [idFilter, setIdFilter] = useState<string>();
    const navigate = useNavigate()
    const [path, setPath] = useState('?page=1')
    const [lastPage, setLastPage] = useState<Products>()

    useEffect(() => {
        if (id === undefined || isNaN(id)) {
            const fetchData = () => {
                fetch(`https://reqres.in/api/products?page=${currentPage}`)
                    .then(res => res.json())
                    .then(data => setProducts(data))
                    .catch(err => {
                        console.error(err);
                        alert("Error fetching products");
                    });
            };
            fetchData();
        } else {
            const fetchData = () => {
                fetch(`https://reqres.in/api/products?page=${currentPage}&id=${id}`)
                    .then(res => res.json())
                    .then(data => setProducts(data))
                    .catch(err => {
                        console.error(err);
                        alert("Error fetching products");
                    });
            };
            fetchData();
        }

    }, [currentPage, id, idFilter]);

    const handleRowClick = (product: Product) => {
        // code to open modal with product data
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setPath(`?page=${newPage}`)
    };

    useEffect(() =>{
        if (idFilter){
            navigate(`${path}&id=${idFilter}`)
        } else {
            navigate(`${path}`)
        }
    }, [idFilter, currentPage])

    return (
        <>
            <input
                type="number"
                value={idFilter}
                onChange={e =>
                {
                    setIdFilter(e.target.value)
                }}
            />

            <div className={classes.row}>

            </div>

            <Pagination currentPage={currentPage} setCurrentPage={handlePageChange} />
        </>
    );
};

export default Products;