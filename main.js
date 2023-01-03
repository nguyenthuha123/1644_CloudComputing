const { Int32, ObjectId } = require('bson')
var express = require('express')
//su dung insert product lay trong file databaseHander
const { insertProduct,getAllProduct, deleteProductById, UpdateProduct, findProductById, searchProductByName } = require('./databaseHander')
var app = express()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/search', async(req, res)=>
{
    const search = req.body.txtName
    const resultSearch = await searchProductByName(search)
    res.render('home',{'products': resultSearch})
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    const describe = req.body.txtDes
    const status = req.body.txtStatus
    
    await UpdateProduct(id, name, price, picUrl, describe, status)
    res.redirect('/')
})
app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const productToEdit = await findProductById(id)
    res.render('edit',{product:productToEdit})
})
//delete
app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/')
})
//post len home
//create (post)
//view all product
app.get('/',async(req,res)=>{
    let products = await getAllProduct()
    res.render('home',{products: products})
})

app.post('/NewProduct',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    const describe = req.body.txtDes
    const status = req.body.txtStatus
    const NewProduct = {
        name : name,
        price: Number.parseFloat(price) ,
        picture: picUrl,
        describe : describe,
        status: status
    }
    await insertProduct(NewProduct)
    res.redirect('/')
})

app.get('/NewProduct',(req,res)=>{
    res.render('NewProduct')
})

app.get('/', (req, res)=>{
    res.render('home')
})
const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is listening!")