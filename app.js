const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.json('API reached');
});

//all products
app.get('/products', async (req, res)=>{
    await db.query('SELECT * FROM products', (err, products) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error executing query' });
        }
        res.json(products);
      });
});

//single product
app.get('/products/:productCode', async(req, res)=>{
    const {productCode} = req.params;
    const product = await db.query('SELECT * FROM products WHERE product_code = ?', productCode);
    res.json(product);
});

//product images
app.get('/products/:productCode/images', async (req, res) => {
  const { productCode } = req.params;

  try {

      const productResult = await db.query('SELECT id FROM products WHERE product_code = ?', [productCode]);

      if (productResult.length === 0) {
          return res.json([]);
      }

      const productId = productResult[0].id;

      const images = await db.query('SELECT image_name FROM images WHERE product_id = ?', [productId]);

      res.json(images);
  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;