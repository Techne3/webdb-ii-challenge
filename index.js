const express =require('express')
const carsRouter = require('./routers/carsRouter')
const server = express();

server.use(express.json());

server.get('/', (req,res)=> {
    res.send("Hey server is up and running")
})

server.use(`/api/cars`, carsRouter)

const port = 4400;

server.listen(port, ()=> {
    console.log(`\n Server is running on ${port} \n`)
})
