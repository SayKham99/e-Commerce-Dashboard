import React, {useEffect, useState} from 'react';
import './Edit.modal.scss'
import '../Create.modal/Create.modal.scss'
import {onValue, ref, update} from "firebase/database";
import {db, storage} from "../../../firebase";
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import {v4 as uuid} from "uuid";
import Compressor from "compressorjs";

function EditModal({open, setOpen, product}) {
    const [file, setFile] = useState([]);
    const [images, setImages] = useState(product.product_image);
    const [price, setPrice] = useState(product.product_price);
    const [category, setCategory] = useState(product.product_category_id);
    const [name, setName] = useState(product.product_name);
    const [description, setDescription] = useState(product.product_description);
    const [discount, setDiscount] = useState(product.product_discount);
    const [categories, setCategories] = useState([]);

    //read categories
    useEffect(() => {
        let category = [];
        let data = [];
        const categ = ref(db, 'categories/');
        onValue(categ, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                category.push(userData)
                setCategories(category)
            })
        })
    }, [])

    //create photo url's
    let count = 0
    const date = new Date()
    const urls = []
    useEffect(() => {
        for (let i = 0; i < file.length; i++) {
            const url = storageRef(storage, uuid())
            new Compressor(file[i], {
                quality: 0.2, success(result) {
                    uploadBytes(url, result).then((async () => {
                        let downloadURL = (await getDownloadURL(url))
                        urls.push({
                            image_id: uuid().toString(),
                            image_url: downloadURL,
                            image_created_at: date.toLocaleString('uz-UZ', {timeZone: 'UTC'}),
                            image_updated_at: date.toLocaleString('uz-UZ', {timeZone: 'UTC'})
                        })
                        let time = setInterval(() => {
                            count += file.length;
                            setImages(urls)
                            if (count !== i) {
                                clearInterval(time)
                            }
                        }, 2000)
                    }))
                }
            })
        }
    }, [file]);


    const Update = () => {
        update(ref(db, `products/${product.product_id}`), {
            product_id: product.product_id,
            product_category_id: category,
            product_name: name,
            product_description: description,
            product_price: price,
            product_discount: discount,
            product_updated_at: date.toLocaleString('uz-UZ', {timeZone: 'UTC'}),
            product_image: images,
        })
    }

    return (<div style={{display: open === true ? 'flex' : 'none'}} className='create__modal'>
        <div onClick={() => setOpen(false)} className='create__modal-exit'>
            <div className='create__modal-exit--btn'></div>
        </div>
        <h1 className='create__modal-title'>Edit Product</h1>
        <div className='create__modal-info inputs'>
            <div className='inputs__wrapper'>
                <label htmlFor="name" className='inputs__wrapper-label'>Ism</label>
                <input className='inputs__wrapper-input' type="text" id='name'
                       value={name}
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="category" className='inputs__wrapper-label'>Select Category</label>
                <select className='inputs__wrapper-select' id='category' name="categories" value={category}
                        value={category}
                        onChange={e => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option value={category.category_id}>{category.category_name}</option>))}
                </select>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="price" className='inputs__wrapper-label'>Narx</label>
                <input className='inputs__wrapper-input' type="number" id='price'
                       value={price}
                       onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="discount" className='inputs__wrapper-label'>Chegirma</label>
                <input className='inputs__wrapper-input' type="number" id='discount'
                       value={discount}
                       onChange={e => setDiscount(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="description" className='inputs__wrapper-label'>Tavsif</label>
                <textarea className='inputs__wrapper-area' id="description" cols="25" rows="5" maxLength={400}
                          value={description}
                          onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="image" className='inputs__wrapper-label'>Select Image</label>
                <input id='image' type="file" className='inputs__wrapper-file' multiple
                       onChange={(e) => setFile(e.target.files)}/>
            </div>
            <div style={{display: images.length === 0 ? 'none' : "flex"}} className='inputs__images'>
                {images.map(img => (
                    <img className='inputs__images-image' id={img.image_id} src={img.image_url} alt=""/>))}
            </div>
            <div className='inputs__wrapper'>
                <input type="submit" className='inputs__wrapper-submit' onClick={(e) => {
                    setOpen(false);
                    Update(e);
                }}/>
            </div>
        </div>
    </div>);
}

export default EditModal;