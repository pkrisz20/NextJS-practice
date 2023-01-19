import { useEffect, useMemo, useState } from "react"
import Product from "../components/Product"
const Axios = require('axios')

const ProductsList = () => {

    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [minPrice, setMinPrice] = useState(0) // need 'cause of displaying on the screen
    const [maxPrice, setMaxPrice] = useState(0) // need 'cause of displaying on the screen
    const [filters, setFilters] = useState({
        categories: [],
        priceMin: null,
        priceMax: null,
        discount: false
    })

    async function fetchProducts () {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    function setFilterLabels (event) {
        setIsLoading(true)
        if (event.target.checked) setFilters(prev => ({...prev, categories: [...prev.categories, event.target.value] }))
        else if (!event.target.checked) setFilters(prev => ({...prev, categories: prev.categories.filter(item => item != event.target.value)}))
    }

    function filterDiscount (event) {
        setIsLoading(true)
        setFilters(prev => ({ ...prev, discount: event.target.checked }))
    }

    function changeMinPriceFilter () {
        setIsLoading(true)
        if (minPrice === 0 || maxPrice === 0 || (minPrice < maxPrice)) {
            setFilters(prev => ({ ...prev, priceMin: minPrice }))
        }
        else {
            setFilters(prev => ({ ...prev, priceMin: maxPrice, priceMax: minPrice }))
            let tempValue = maxPrice
            setMaxPrice(minPrice)
            setMinPrice(tempValue)
        }
    }

    function changeMaxPriceFilter () {
        setIsLoading(true)
        if ((minPrice === 0 || maxPrice === 0 || (minPrice < maxPrice))) {
            setFilters(prev => ({ ...prev, priceMax: maxPrice }))
        }
        else {
            setFilters(prev => ({ ...prev, priceMin: maxPrice, priceMax: minPrice }))
            let tempValue = maxPrice
            setMaxPrice(minPrice)
            setMinPrice(tempValue)
        }
    }

    const minPriceValue = useMemo(() => {
        const values = []
        products?.forEach(item => {
            item.discount != null ? values.push(item.discount) : values.push(item.price)
        })
        return Math.min(...values)
    }, [products])

    const maxPriceValue = useMemo(() => {
        const values = []
        products?.forEach(item => {
            item.discount != null ? values.push(item.discount) : values.push(item.price)
        })
        return Math.max(...values)
    }, [products])

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

    useEffect(() => {
        console.log(filters)
        return
        Axios.post('/api/search', {
            filter: filters
        })
        .then(res => {
            setTimeout(() => {
                setFilteredProducts(res.data.result)
                setIsLoading(false)
            }, 1000);
        })
    }, [filters])

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
                <div>
                    <div className="filters" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '230px' }}>
                        <div className="price-content">
                            <div>
                                <label>Min</label>
                                { minPrice == 0 ? (<p>{minPriceValue} &euro;</p>) : (<p>{minPrice} &euro;</p>) }

                                <label>Max</label>
                                { maxPrice == 0 ? (<p>{maxPriceValue} &euro;</p>) : (<p>{maxPrice} &euro;</p>) }
                            </div>

                            <div className="range-slider">
                                <input type="range" className="min-price" defaultValue={minPriceValue} min={minPriceValue} max={maxPriceValue} step="10" onChange={(event) => setMinPrice(parseInt(event.target.value))} onMouseUp={changeMinPriceFilter} />

                                <input type="range" className="max-price" defaultValue={maxPriceValue} min={minPriceValue} max={maxPriceValue} step="10" onChange={(event) => setMaxPrice(parseInt(event.target.value))} onMouseUp={changeMaxPriceFilter} />
                            </div>
                        </div>
                    </div>
                    <hr style={{ margin: '20px 0' }} />
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
                            <>
                                <div className="filter-group">
                                    <input type="checkbox" id="discount" name="discount" onChange={(e) => filterDiscount(e)} />
                                    <label htmlFor="discount">On discount</label>
                                </div>
                                <hr style={{ margin: '20px 0' }} />
                            </>
                        )
                    }
                    <div className="filter-text">
                        <label htmlFor="key-search">Search by key:</label>
                        <input type="text" id="key-search" name="key-search" onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'center', gap: '15px', width: '100%', marginLeft: '20px' }}>
                    { filteredProducts?.length == 0 ? (
                            products.filter(value => {
                                if (searchText === "") return true;
                                else if (value.text.toLowerCase().includes(searchText.toLowerCase())) return true;
                            }).map(product => {
                                return (product?.available && <Product key={product.id} product={product} />)
                            })
                        ) : filteredProducts?.filter(value => {
                            if (searchText === "") return true;
                            else if (value.text.toLowerCase().includes(searchText.toLowerCase())) return true;
                        }).map(item => {
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