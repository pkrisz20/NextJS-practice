import { products } from "../../../data/products"

export default function handler (req, res) {
    let { categories = [], priceMin = null, priceMax = null, discount = false } = req.body.filter
    let result = req.body.prevResults.length > 0 ? req.body.prevResults : []
    console.log(result)

    // Filter by discount
    if (discount) {
        result = products.filter(item => {
            return item.discount != null && item.discount > 0
        })
    }

    // Filter by on selected category
    if (categories.length == 1) {
        if (result.length > 0) {
            console.log('1')
            result = result.filter(product => {
                return product.category == categories[0]
            })
        }
        else if (result.length == 0) {
            console.log('2')
            result = products.filter(product => {
                return product.category == categories[0]
            })
        }
    }

    // Filter by more categories
    if (categories.length > 1) {

        if (result.length > 0) {
            console.log('3')
            categories.forEach(categoryItem => {
                result = result.filter(product => {
                    return product.category == categoryItem
                })
            })
        }
        else if (result.length == 0) {
            console.log('4')
            categories.forEach((categoryItem, index) => {
                if (index == 0) {
                    result = products.filter(product => {
                        return product.category == categoryItem
                    })
                }
                else {
                    result = result.filter(product => {
                        return product.category == categoryItem
                    })
                }
            })
        }
    }

    // Filter by price
    // If result array already has values
    if (result.length > 0) {

        // If there are MIN and MAX too
        if (priceMin != null && priceMax != null) {

            result = result.filter(product => {
                if (product.discount != null) {
                    return product.discount >= priceMin && product.discount <= priceMax
                }
                else if (product.discount == null) {
                    return product.price >= priceMin && product.price <= priceMax
                }
            })
        }
        // If there is only MIN price
        else if (priceMin != null && priceMax == null) {

            result = result.filter(product => {
                if (product.discount != null) {
                    return product.discount >= priceMin
                }
                else if (product.discount == null) {
                    return product.price >= priceMin
                }
            })
        }
        // If there is only MAX price
        else if (priceMin == null && priceMax != null) {

            result = result.filter(product => {
                if (product.discount != null) {
                    return product.discount <= priceMax
                }
                else if (product.discount == null) {
                    return product.price <= priceMax
                }
            })
        }
    }
    // If result array does not have any values yet
    else if (result.length == 0) {
        // If there are MIN and MAX too
        if (priceMin != null && priceMax != null) {

            result = products.filter(product => {
                if (product.discount != null) {
                    return product.discount >= priceMin && product.discount <= priceMax
                }
                else if (product.discount == null) {
                    return product.price >= priceMin && product.price <= priceMax
                }
            })
        }
        // If there is only MIN price
        else if (priceMin != null && priceMax == null) {

            result = products.filter(product => {
                if (product.discount != null) {
                    return product.discount >= priceMin
                }
                else if (product.discount == null) {
                    return product.price >= priceMin
                }
            })
        }
        // If there is only MAX price
        else if (priceMin == null && priceMax != null) {

            result = products.filter(product => {
                if (product.discount != null) {
                    return product.discount <= priceMax
                }
                else if (product.discount == null) {
                    return product.price <= priceMax
                }
            })
        }
    }
    result = result.length == 0 ? "Not found any result like this" : result;
    // console.log(result)
    return res.status(200).json({ result });
}