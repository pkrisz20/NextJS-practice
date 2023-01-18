const Product = ({ product }) => {
    return (
        <article className="productitem">
            <h1>{product.text}</h1>
            <h4>{product.category}</h4>
            <div className={`price ${product.discount != null ? 'old-price' : ''}`}>{product.price} &euro;</div>
            { product.discount != null && <div className="new-price">{product.discount} &euro;</div> }
            <button className="cart-btn">Add to cart</button>
        </article>
    )
}

export default Product
