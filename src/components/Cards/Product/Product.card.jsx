import React, {useState} from 'react';
import './Product.card.scss'
import {ref, remove} from "firebase/database";
import {db} from "../../../firebase";
import EditModal from "../../Modals/Edit.modal/Edit.modal";


function ProductCard({data}) {
    const [edit, setEdit] = useState(false)
    //delete
    const Delete = (e) => {
        if (window.confirm('Rosdan ochirmokchimisiz?') === true) {
            remove(ref(db, `products/${e}`))
                .then(() => {
                    console.log('Tovar muvaffaqiyatli ochirildi!')
                })
                .catch(() => {
                    alert('Tovarni ochirish muvaffaqiyatsiz!')
                })
        } else {
            alert('Tovar ochirilmadi!')
        }
    }

    return (
        <>
            <div key={data.product_id} className='product__card'>
                <div className='product__card-header'>
                    <img src={data.product_image[0].image_url} alt="Products Image"
                         className='product__card-header--image'/>
                </div>
                <div className='product__card-body'>
                    <h2 className='product__name'>{data.product_name}</h2>
                    <small className='product__sale'>{data.product_discount}% Chegirma</small>
                    <p className='product__price'>Narhi: <b>{data.product_price} sum</b></p>
                    <div className='product__tools'>
                        <p className='product__tools-sold'>Sotildi: <span>{data.product_sold} dona</span></p>
                        <p className='product__tools-rating'>Reyting: <span>{data.product_rating}/5</span></p>
                    </div>
                </div>
                <div className='product__card-footer'>
                    <button onClick={() => setEdit(true)} className='product__btn edit'>Edit</button>
                    <button id={data.product_id} onClick={(e) => Delete(e.target.id)}
                            className='product__btn delete'>Delete
                    </button>
                </div>
            </div>
            <EditModal open={edit} setOpen={setEdit} product={data}/>
        </>
    );
}

export default ProductCard;