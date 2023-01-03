var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'
const {  ObjectId } = require('bson')

async function getDB() {
    let client = await MongoClient.connect(url)
    let db = client.db("ATNtoys")
    return db
}

//refactor
async function insertProduct(NewProduct) {
    let db = await getDB()
    let newId = await db.collection("products").insertOne(NewProduct)
    return newId
}

async function getAllProduct() {
    let db = await getDB()
    let products = await db.collection("products").find().toArray()
    return products
}
async function deleteProductById(id) {
    let db = await getDB()
    await db.collection("products").deleteOne({ _id: ObjectId(id) }) 
}

async function UpdateProduct(id, name, price, picUrl, describe, status) {
    let db = await getDB()
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "picture": picUrl , "describe": describe, "status": status}
})
    
}

async function findProductById(id) {
    let db = await getDB()
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
    
}
async function searchProductByName(name){
    let db = await getDB()
    const results = await db.collection("products").find({ name: new RegExp(name,'i') }).toArray()
    return results
}
module.exports = {insertProduct, getAllProduct, deleteProductById, UpdateProduct, findProductById, searchProductByName}