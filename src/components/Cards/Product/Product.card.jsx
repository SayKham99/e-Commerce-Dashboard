import React from 'react';
import './Product.card.scss'
import photo from '../../../assets/plastic-bag.png'

function ProductCard() {
    return (<div className='product__card'>
        <div className='product__card-header'>
            <img src={photo} alt="Product Image" className='product__card-header--image'/>
        </div>
        <div className='product__card-body'>
            <h2 className='product__name'>Sariq Polietilen</h2>
            <small className='product__sale'>10% Chegirma</small>
            <p className='product__price'>Narhi: <b>25.000 sum</b></p>
            <div className='product__tools'>
                <p className='product__tools-sold'>Sotildi: <span>20 dona</span></p>
                <p className='product__tools-rating'>Reyting: <span>5/5</span></p>
            </div>
        </div>
        <div className='product__card-footer'>
            <button className='product__btn edit'>Edit</button>
            <button className='product__btn delete'>Delete</button>
        </div>
    </div>);
}

export default ProductCard;