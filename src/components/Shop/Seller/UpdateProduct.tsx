
import { ProductDivBg, SecondaryH1Color, SecondarySpanColor, SecondarySpanColor2, Select } from '@/components/Other/GlobalComponent'
import { Input, Select2, TextArea } from '@/components/Other/InputComponent'
import { update_product } from '@/components/RequestComponent'
import style from '@/styles/Shop/general.module.scss'
import { Brand, Category, Product, User } from '@/types/models'
import { useEffect, useState } from 'react'
export default function UpdateProductModal({ productInfo, closeModal, shop_id }: any) {
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [newProduct, setNewProduct] = useState<Product>({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        quantity: productInfo.quantity,
        image: productInfo.image,
        category_id: productInfo.category_id,
        brand_id: productInfo.brand_id,
        description: productInfo.description,
        user_id: Number(shop_id),
        sold: 0
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: name === 'price' || name === 'quantity' || name === 'category_id' || name === 'brand_id' ? Number(value) : value
        }));
    };


    const [brands, setBrands] = useState<Brand[]>([])
    const [imageFile, setImageFile] = useState<File>();
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/shop/brand_category`)
            const data = await response.json()
            setCategories(data.categories)
            setBrands(data.brands)
        }
        fetchData()
    }, [brands, categories])
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImageFile(files[0]);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.category_id || !newProduct.brand_id || !newProduct.description) {
            alert('Please fill in all fields');
            console.log(newProduct);
            console.log(price);
        } else {

            await update_product(newProduct, imageFile)
        }
    };

    return (
        <div className={style.product_modal_page}>
            <ProductDivBg className={style.form_container}>
                <button onClick={() => closeModal(false)} className={style.close_button}>
                    <i className="uil uil-times-circle"></i>
                </button>
                <form action="" onSubmit={handleSubmit} >
                    <SecondaryH1Color>Update Product</SecondaryH1Color>
                    <SecondarySpanColor>Product Name</SecondarySpanColor>
                    <Input type="text" name="name" value={newProduct.name} onChange={handleChange} />
                    <SecondarySpanColor>Product Price</SecondarySpanColor>
                    <Input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                    <SecondarySpanColor>Product Stock</SecondarySpanColor>
                    <Input type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} />
                    <SecondarySpanColor>Product Image</SecondarySpanColor>
                    <Input type="file" name="image" onChange={handleImageChange} />
                    <SecondarySpanColor>Product Category</SecondarySpanColor>
                    <Select2 name="category_id" value={newProduct.category_id} onChange={handleChange}>
                        <option value="">Select category</option>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={Number(category.id)}>{category.name}</option>
                            ))
                        }
                    </Select2>

                    <SecondarySpanColor>Product Brand</SecondarySpanColor>
                    <Select2 name="brand_id" value={newProduct.brand_id} onChange={handleChange}>
                        <option value="">Select brand</option>
                        {
                            brands.map((brand) => (
                                <option key={brand.id} value={Number(brand.id)}>{brand.name}</option>
                            ))
                        }
                    </Select2>

                    <SecondarySpanColor>Product Description</SecondarySpanColor>
                    <TextArea name="description" value={newProduct.description} onChange={handleChange}></TextArea>
                    <div className={style.button_container}>
                        <button>Update Product</button>
                    </div>
                </form>
            </ProductDivBg>
        </div>
    )
}