import React, {useState, useEffect, useMemo} from 'react';
import Pagination from "../pagination/Pagination";
import { useNavigate } from 'react-router-dom';
import classes from "./Products.module.css"
import ProductRow from "./ProductRow";
import {TextField} from "@mui/material";


interface Props {
    id: number | undefined;
    setId: any
}
export interface Product {
    id: number;
    name: string;
    year: number;
    color: string;
}

interface ProductsParams{
    total_pages: number
    total: number
    per_page: number
    data: Product[]
}
const Products: React.FC<Props> = ({ id, setId }) => {
    const [products, setProducts] = useState<ProductsParams>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate()
    const [path, setPath] = useState('?page=1')


    useEffect(() => {
        if (id === undefined || isNaN(id)) {
            const fetchData = () => {
                fetch(`https://reqres.in/api/products?per_page=5&page=${currentPage}`)
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
                fetch(`https://reqres.in/api/products?id=${id}`)
                    .then(res => res.json())
                    .then(data => {setProducts(data)})
                    .catch(err => {
                        console.error(err);
                        alert("Error fetching products");
                    });
            };
            fetchData();
        }

    }, [currentPage, id]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setPath(`?page=${newPage}`)
    };

    useEffect(() =>{
        if (id){
            navigate(`${path}&id=${id}`)
        } else {
            navigate(`${path}`)
        }
    }, [id, currentPage])

    const productList = useMemo(() => {
        if (products?.data){
            if (Array.isArray(products.data)) {
                return(
                    <>
                        {products.data.map((item, index) => (
                            <ProductRow key={index} item={item}/>
                        ))}
                    </>
                )
            } else if (typeof products.data === 'object'){
                return <ProductRow item={products.data}/>
            }
        } else return null
    }, [products])

    return (
        <div className={classes.container}>
            <div className={classes.spa}>
                <TextField
                    id="outlined-required"
                    className={classes.input}
                    InputProps={{ inputProps: { min: 0, max: products?.total } }}
                    type="number"
                    value={id}
                    onChange={e =>
                    {
                        setId(parseInt(e.target.value) || undefined)
                    }}
                />

                <div className={classes.row}>
                    <div className={classes.tableItem}>ID</div>
                    <div className={classes.tableItem}>Name</div>
                    <div className={classes.tableItem}>Year</div>
                </div>

                {productList}

                <Pagination id={id} currentPage={currentPage} setCurrentPage={handlePageChange} totalPages={products?.total_pages || 1} />
            </div>
        </div>
    );
};

export default Products;