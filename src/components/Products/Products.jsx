import React, {useState, useEffect} from 'react';
import './Products.scss'
import ProductCard from "../Cards/Product/Product.card";
import {onValue, ref, remove} from "firebase/database";
import {db} from "../../firebase";

function Products() {
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState([]);
    const [images, setImages] = useState([]);
    const [Add, setAdd] = useState(false);
    const [EDIT, setEDIT] = useState(false);
    const [edit, setEdit] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    //read
    useEffect(() => {
        let data = [];
        const Test = ref(db, 'products/');
        onValue(Test, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                data.push(userData)
                setProducts(data)
            })
        })
    }, []);


    //update
    const Update = (e) => {
        let data;
        const edit = ref(db, `products/${e}`)
        onValue(edit, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                console.log(userData);
            })
        })
    }

    return (<section className='product__container'>
        <h1 className='product__container-title'>Product</h1>
        <div className='product__container-wrapper'>
            {products.map(product => (
                <ProductCard data={product}/>
            ))}
        </div>
    </section>);
}

export default Products;