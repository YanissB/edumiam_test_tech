const express = require('express')
const app = express()

const schedule = require('node-schedule')

const CSVToJSON = require('csvtojson')
const fs = require('fs')

// Create server

app.get('/', (req, res) =>{
    res.send("Server is running")
})

app.listen(3000)

// Create a schedule job

schedule.scheduleJob('*/30 * * * * *', () => {
    console.log('I run every 30 seconds')
})

//Parse and convert CSV to JSON

// CSVToJSON().fromFile('extract_caspratique_Parcours_apprenants.csv')
    
//     .then(convertedCSV => {
//         fs.writeFile('extract_caspratique_Parcours_apprenants.json', JSON.stringify(convertedCSV), (err) => {
//             if (err) {
//                 throw err
//             }
//         })
//         console.log(convertedCSV)
//     })
    
//     .catch(err =>{
//         console.log("CSVToJSON doesn't work " + err)
//     })
