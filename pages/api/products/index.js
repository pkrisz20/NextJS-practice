import { products } from "../../../data/products"

export default function handler (req, res) {
    if (req.method === "GET") {
        return res.status(200).json(products)
    }
    else if (req.method === "POST") {
        const { comment } = req.body;
        const newComment = {
            id: Date.now(),
            text: comment
        }
        comments.push(newComment)
        return res.status(201).json(newComment)
    }
}