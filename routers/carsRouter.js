const router = require('express').Router();

const db = require('../dbConfig')

router.get('/', (req,res)=> {
    db('cars')
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => res.status(500).json({error: 'could not retrieve cars'}))
})

router.post('/',validateCars, (req,res)=> {
   const newCar = req.body

    db('cars')
    .insert(newCar)
    .then(carPost => {
        res.status(201).json(carPost)
    })
    .catch(error => res.status(500).json({error: 'Could not post a new car'}))
})

router.delete('/:id',validateCarId, (req, res) => {
    const id = req.params.id;
    db('cars')
    .where({ id: id })
    .del()
    .then(car => {
        res.status(200).json(`${car} record deleted.`);
    })
    .catch(err => res.status(500).json({ error: "could not delete car"}));
})


router.put('/:id',validateCarId,(req,res)=> {
    const id = req.params.id
    const updatedCar =req.body

    db('cars')
    .where({id: id})
    .update(req.body)
    .then(up => {
        db('cars')
        .where({id:id})
        .then(upCar => {
            res.status(200).json(upCar)
        })
    })
    .catch(error => res.status(500).json({error: 'the car could not be updated'}))
})



function validateCars(req,res,next) {
    const car = req.body;
    if (!Object.keys(car).length) {
        res.status(400).json({ error: "Please provide new Car Info." })
    } else if (!car.vin || !car.make||!car.model ||!car.mileage) {
        res.status(400).json({ error: "Please provide car: Vin, make, model,mileage." })
    } else next();
    
}

function validateCarId(req,res,next) {
    const id = req.params.id;
    db('cars')
    .where({id: id})
    .then(car => {
        if(car.length){
            req.car = car
            next()
        }else{
            res.status(404).json({message: 'There is no car with that id'})
        }
    })
    .catch(error => res.status(500).json({error: 'Could not find following car'}))
}

module.exports = router