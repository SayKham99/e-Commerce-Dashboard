import React from 'react';
import './Product.scss'
import ProductCard from "../Cards/Product/Product.card";

function Product() {
    return (<section className='product__container'>
        <h1 className='product__container-title'>Product</h1>
        <div className='product__container-wrapper'>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </section>);
}

export default Product;