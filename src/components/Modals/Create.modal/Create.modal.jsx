import React, {useEffect, useState} from 'react';
import './Create.modal.scss'
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import {db, storage} from "../../../firebase";
import {v4 as uuid} from "uuid";
import Compressor from "compressorjs";
import {onValue, ref, set} from "firebase/database";


function CreateModal({open, setOpen}) {
    const [file, setFile] = useState([]);
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [categories, setCategories] = useState([]);

    //read category
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

    //upload
    let count = 0
    const urls = []
    useEffect(() => {
        for (let i = 0; i < file.length; i++) {
            const url = storageRef(storage, uuid())
            new Compressor(file[i], {
                quality: 0.2, success(result) {
                    uploadBytes(url, result).then((async () => {
                        let downloadURL = (await getDownloadURL(url));
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

    //create
    const date = new Date()
    const Create = (e) => {
        e.preventDefault();
        const id = uuid()
        set(ref(db, `products/${id}`), {
            product_id: id.toString(),
            product_category_id: category,
            product_name: name,
            product_description: description,
            product_price: price,
            product_rating: 5,
            product_sold: Math.floor(Math.random() * 100).toString(),
            product_discount: discount,
            product_created_at: date.toLocaleString('uz-UZ', {timeZone: 'UTC'}),
            product_updated_at: date.toLocaleString('uz-UZ', {timeZone: 'UTC'}),
            product_image: images,
        });
    }

    return (<div style={{display: open === true ? 'flex' : 'none'}} className='create__modal'>
        <div onClick={() => setOpen(false)} className='create__modal-exit'>
            <div className='create__modal-exit--btn'></div>
        </div>
        <h1 className='create__modal-title'>Create Product</h1>
        <div className='create__modal-info inputs'>
            <div className='inputs__wrapper'>
                <label htmlFor="name" className='inputs__wrapper-label'>Ism</label>
                <input className='inputs__wrapper-input' type="text" id='name' onChange={e => setName(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="category" className='inputs__wrapper-label'>Select Category</label>
                <select className='inputs__wrapper-select' id='category' name="categories" value={category}
                        onChange={e => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option value={category.category_id}>{category.category_name}</option>))}
                </select>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="price" className='inputs__wrapper-label'>Narx</label>
                <input className='inputs__wrapper-input' type="number" id='price'
                       onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="discount" className='inputs__wrapper-label'>Chegirma</label>
                <input className='inputs__wrapper-input' type="number" id='discount'
                       onChange={e => setDiscount(e.target.value)}/>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="description" className='inputs__wrapper-label'>Tavsif</label>
                <textarea className='inputs__wrapper-area' id="description" cols="25" rows="5" maxLength={400}
                          onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className='inputs__wrapper'>
                <label htmlFor="imege" className='inputs__wrapper-label'>Select Image</label>
                <input type="file" className='inputs__wrapper-file' multiple onChange={(e) => setFile(e.target.files)}/>
            </div>
            <div style={{display: images.length === 0 ? 'none' : "flex"}} className='inputs__images'>
                {images.map(img => (
                    <img className='inputs__images-image' id={img.image_id} src={img.image_url} alt=""/>))}
            </div>
            <div className='inputs__wrapper'>
                <input type="submit" className='inputs__wrapper-submit' onClick={e => {
                    setOpen(false);
                    Create(e);
                }}/>
            </div>
        </div>
    </div>);
}

export default CreateModal;