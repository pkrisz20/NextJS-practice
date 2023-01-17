import { useEffect, useMemo, useState } from "react"
import Product from "../components/Product"
const Axios = require('axios')
// import RangeSlider from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';

const ProductsList = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [checkedLabels, setCheckedLabels] = useState([])
    // const [minPrice, setMinPrice] = useState(0)
    // const [maxPrice, setMaxPrice] = useState(0)
    const [filters, setFilters] = useState({})

    const fetchProducts = async () => {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
    }

    // const handlePriceChange = (values) => {
    //     setMinPrice(values[0])
    //     setMaxPrice(values[1])
    // }

    // const minPriceValue = useMemo(() => {
    //     const values = []
    //     products?.forEach(item => {
    //         item.discount != null ? values.push(item.discount) : values.push(item.price)
    //     })
    //     return Math.min(...values)
    // }, [products])

    // const maxPriceValue = useMemo(() => {
    //     const values = []
    //     products?.forEach(item => {
    //         item.discount != null ? values.push(item.discount) : values.push(item.price)
    //     })
    //     return Math.max(...values)
    // }, [products])

    useEffect(() => {
        fetchProducts()
    }, [])

    const uniqueCategories = useMemo(() => {
        let categories = []
        products.forEach(item => categories.push(item.category))
        return categories?.filter((value, index, self) => self.indexOf(value) === index)
    }, [products])

    const isAnyDiscount = useMemo(() => {
        if (filteredProducts.length > 0) {
            const filteredDiscount = filteredProducts.some(element => element.discount != null)
            return filteredDiscount;
        }
        const productsDiscount = products.some(element => element.discount != null)
        return productsDiscount;
    }, [products, filteredProducts])

    const setFilterLabels = (event) => {
        setIsLoading(true)
        if (event.target.checked) setCheckedLabels(prev => [...prev, event.target.value])
        if (!event.target.checked) setCheckedLabels(checkedLabels.filter(label => label != event.target.value))
    }

    useEffect(() => {
        setIsLoading(true)
        if (checkedLabels.length != 0) {
            Axios.post('/api/search', {
                filter: checkedLabels
            })
            .then(res => {
                setTimeout(() => {
                    setFilteredProducts(res.data.result)
                    setIsLoading(false)
                }, 1000);
            })
        }
        else {
            setTimeout(() => {
                setFilteredProducts([])
                setIsLoading(false)
            }, 1000);
        }
    }, [checkedLabels])

    const filterDiscount = (event) => {
        setIsLoading(true)
        if (event.target.checked) {
            Axios.post('/api/search', {
                discount: true
            })
            .then(res => {
                setTimeout(() => {
                    setFilteredProducts(res.data.result)
                    setIsLoading(false)
                }, 1000);
            })
        }
        else {
            setTimeout(() => {
                setFilteredProducts([])
                setIsLoading(false)
            }, 1000);
        }
    }

    return (
        <>
        { isLoading && (
                <div className="overlay">
                    <span className="loader"></span>
                </div>
            )
        }
        <h1 style={{ marginBottom: '30px' }}>List of products</h1>

        <div className="container" style={{ display: 'flex' }}>

            <div className="filters" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '230px' }}>
                {/*<div className="filter-group">
                    <RangeSlider min={minPriceValue ?? 0} max={maxPriceValue ?? 15000} step={10} onInput={(values) => handlePriceChange(values)} values={[minPriceValue, maxPriceValue]} />

                    <div className="filter-group-values">
                        { minPrice >= 0 && <span>{minPrice}</span> }
                        { maxPrice > 0 && <span>{maxPrice}</span> }
                    </div>
                </div>*/}
                {
                    uniqueCategories.map((item, index) => {
                        return (
                            <div key={index} className="filter-group">
                                <input type="checkbox" id={index} name={item} value={item} onChange={(e) => setFilterLabels(e)} />
                                <label htmlFor={index}>{item}</label>
                            </div>
                        )
                    })
                }
                <hr style={{ margin: '20px 0' }} />
                {
                    isAnyDiscount && (
                        <div className="filter-group">
                            <input type="checkbox" id="discount" name="discount" onChange={(e) => filterDiscount(e)} />
                            <label htmlFor="discount">On discount</label>
                        </div>
                    )
                }
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'center', gap: '15px', width: '100%', marginLeft: '20px' }}>
                {   filteredProducts?.length == 0 ? (
                        products.map(product => {
                            return (
                                product?.available && <Product key={product.id} product={product} />
                            )
                        })
                    ) : filteredProducts?.map(item => {
                        return (
                            item?.available && <Product key={item.id} product={item} />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default ProductsList