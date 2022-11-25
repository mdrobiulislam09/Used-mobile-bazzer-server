const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('server is running on ok')
})



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.zlkgiha.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.jm7v6w9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('twelveserver').collection('products');
        app.get('/products', async(req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })
        
    }
    finally {

    }
}
run().catch(console.log)


app.listen(port, () => console.log(`server running on ${port}`))