import Product from "../components/Product"

const ProductsList = ({ products }) => {
    return (
        <>
        <h1>List of products</h1>
        {
            products.map(product => {
                return (
                    <div key={user.id}>
                        <Product product={product} />
                    </div>
                )
            })
        }
        </>
    )
}

export default ProductsList

export async function getStaticProps () {
    const response = await fetch('/api/products')
    const data = await response.json()

    return {
        props: {
            products: data
        }
    }
}