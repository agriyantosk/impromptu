const express = require('express')
const router = require('./routes')
const errorHandler = require('./errorhandler/errorhandler')
const authentication = require('./middleware/authentication')
const cors = require('cors')
const GPTController = require('./controller/gptController')
const app = express()
// <<<<<<< finalize
// =======
// const port = process.env.PORT || 3000

// >>>>>>> main
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/flights', GPTController.flights)
app.post('/places', GPTController.placesPrompt)
app.post('/hotels', GPTController.hotelsPrompt)
app.post('/itinerary', GPTController.itineraryPrompt)

app.use(router)
app.use(authentication)
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//nyalakan saat database sudah jadi 

// connect()
//     .then(app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//       }))
//     .catch((error)=> console.log(error))

// <<<<<<< finalize
// =======

// di pindahin ke www

// run().then(() => {
//   app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`);
//   });
// });

// >>>>>>> main
module.exports = app