import { products } from "../../../data/products"

export default function handler (req, res) {
    let { filter = null } = req.body
    let { discount = null } = req.body

    if (filter != null && filter.length > 0) {
        let result = []

        products.forEach(product => {
            filter.forEach(filterItem => {
                if (product.category == filterItem) result.push(product)
            })
        })
        return res.status(200).json({ result });
    }

    if (discount != null && discount) {
        let result = []

        result = products.filter(item => {
            return item.discount != null && item.discount > 0
        })

        return res.status(200).json({ result });
    }
}