import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import myModel from './src/models/model.js'
import upload from './src/middlewares/upload.js'
import { readFile } from './src/middlewares/readfile.js'
import cors from 'cors'
import { Parser } from 'json2csv'


dotenv.config()
const app = express()
const port = 3000


// app.use(cors({ origin: 'http://localhost:5173' }))
app.use(cors())
app.use(express.json())
// Routes

app.get('/',(req,res)=>{
    res.send("Hi there")
})

app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(204).end()
    // Reading the file using file handling and fetching the JSON data
    // And finally the data is stored in mongoDB compass
    readFile(req.file.path)
    .then(jsonObj=>{
        // running for loop to store the respective data and saving it in the db
        for(let i=0; i<jsonObj.length; i++){
            // Create a new user
            const fetchedData = new myModel({
                firstName: jsonObj[i].FirstName,
                lastName: jsonObj[i].LastName,
                email: jsonObj[i].email,
                phone: jsonObj[i].Phone
            }) 
            // Save the user
            fetchedData.save()
            .then(savedData => {
                // console.log('Saved successfully', savedData)
            })
            .catch(error=>{
                console.log('Error saving user:', error)
            })  
        }
    })
})

app.get('/api/uploads', async(req,res)=>{
    try{
        const data = await myModel.find({})
        res.send(data)
    }catch(error){
        res.status(500).send({ error })
    }
})
app.get('/api/upload/:id', async(req,res)=>{
    try{
        const data = await myModel.findById(req.params.id)
        res.json(data)
    }catch(err){
        res.status(500).send({ err })
    }
})

// Download data 
app.get("/download/json", async (req, res) => {
    try {
        const data = await myModel.find({});
        res.json(data);
    } catch (error) {
        console.error('Error occurred while fetching data from mongodb', error);
        return res.status(500).send('Error occurred while fetching data from MongoDB');
    }
});

app.get("/download/csv", async(req,res)=>{
    try{
        const data = await myModel.find({})
        let fields = ["firstName", "lastName", "email", "phone"]
        const parser = new Parser({
            fields,
            unwind:["First Name", "Last Name", "email", "Phone"]
        })
        const csv = parser.parse(data)
        res.send(csv)
    }catch(err){
        console.log('Error occured while fetching data', err)
        return res.status(500).send('Error occurred')
    }
})

// Edit route
app.put('/api/update/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const newData = req.body;
        console.log(newData)
        // Update the data in MongoDB
        const updatedData = await myModel.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedData) {
            return res.status(404).send('Data not found');
        }

        res.json(updatedData);
        // res.status(200).json({ message: 'Data updated successfully' });
    }catch(error){
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }

})

// Delete route
app.delete('/api/delete/:id', async(req,res)=>{
    try{
        const delData = await myModel.findByIdAndDelete(req.params.id)
        if(!delData){
            return res.status(404).json({ error: "Not found"})
        }
        res.json(delData)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
})


//Mongodb connection 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', (error)=>{
    console.log(error)
})
mongoose.connection.once('connected', ()=>{
    console.log('Database connected')
})


app.listen(port,()=> console.log(`App listening on port ${port}`))