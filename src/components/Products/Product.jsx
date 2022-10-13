import React from 'react';
import './Product.scss'
import ProductCard from "../Cards/Product/Product.card";

function Product() {
    /*const [product, setProduct] = useState([]);
    const [file, setFile] = useState([]);
    const [images, setImages] = useState([]);
    const [Add, setAdd] = useState(false);
    const [EDIT, setEDIT] = useState(false);
    const [Data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [edit, setEdit] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    //read
    useEffect(() => {
        let data = [];
        let category = [];
        const Test = ref(db, 'products/');
        onValue(Test, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                data.push(userData)
                setData(data)
            })
        })
        const categ = ref(db, 'categories/');
        onValue(categ, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                category.push(userData)
                setCategories(category)
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

    console.log(product);

    //delete
    const Delete = (e) => {
        remove(ref(db, `products/${e}`))
            .then(() => {
                alert('deleted')
            })
            .catch(() => {
                alert('not deleted')
            })
    }*/


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