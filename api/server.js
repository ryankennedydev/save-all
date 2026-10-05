import mongoose from 'mongoose'
import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config({ path: "./api/.env" });

const app = express();
app.use(cors())
app.use(express.json());


const Scheema = mongoose.Schema

const ValueCard = new Scheema({
  title: String,
  description: String,
  category: String,
  imagem: String,
  color: String,
  data: {
    type: Date,
    default: Date.now
  }
})

const ValueCardModel = mongoose.model("ValueCard", ValueCard)



mongoose.connect((process.env.MONGODB_URI)).then(() => {console.log('conectado ao banco ')}).catch((error) => {console.log('erro ao conectar no banco', error)}) 



app.get('/findCard', async (req,res) => {
   try {
    const cards = await ValueCardModel.find()

    res.json(cards)
   }
   catch (error) {
      res.status(500).json({
                  erro: error.message,
                  
              });
        }
})

app.post('/newcard', async (req,res) =>{
  try {
     const newCard = await ValueCardModel.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      imagem: req.body.imagem,
      color: req.body.color,
      

     })
     res.status(201).json(newCard)
  }
  catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});