const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('server is running on ok')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.jm7v6w9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('twelveserver').collection('products');
        const productsCollection = client.db('twelveserver').collection('product');
        const bookingsCollection = client.db('twelveserver').collection('bookings');
        const usersCollection = client.db('twelveserver').collection('users');

        app.get('/products', async(req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })
        
        app.get('/product/:category_id', async(req, res) => {
            const query = {};
            const product = await productsCollection.find(query).toArray();
            res.send(product?.filter(n => n.category_id == req.params.category_id));
        })

        app.get('/product', async(req, res) => {
            const query = {};
            const product = await productsCollection.find(query).toArray();
            res.send(product);
        })

        app.get('/users', async(req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users)
        })

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

        app.get('/bookings', async(req, res) => {
            let query = {}
            if(req.query.email){
                query = {email: req.query.email}
            }
            const cursor = bookingsCollection.find(query)
            const bookings = await cursor.toArray();
            res.send(bookings)
        })

        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result)
        })

        app.delete('/bookings/:id', async(req, res) => {
            const id = req.params.id;
            const query ={_id: ObjectId(id)}
            const result = await bookingsCollection.deleteOne(query)
            res.send(result)
        })
        
    }
    finally {

    }
}
run().catch(console.log)


app.listen(port, () => console.log(`server running on ${port}`))