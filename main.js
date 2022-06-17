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


// Parse CSV and create JSON from it

CSVToJSON().fromFile('extract_caspratique_Parcours_apprenants.csv')
    
    .then(convertedCSV => {
        fs.writeFile('extract_caspratique_Parcours_apprenants.json', JSON.stringify(convertedCSV), (err) => {
            if (err) {
                throw err
            }
        })
    })
    
    .catch(err =>{
        console.log("CSVToJSON doesn't work " + err)
    })

    
// Parse JSON and select what we need
let result = []

class LeanrerIdTotalQuoted {
    constructor(LearnerId, TotalQuoted ){
        this.LearnerId = LearnerId;
        this.TotalQuoted = TotalQuoted
    }
}
fs.readFile('extract_caspratique_Parcours_apprenants.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    } else {
        try{
            const data = JSON.parse(jsonString)
            
            learnerIdArr = []
            summQuotedArr = []

            for (let i = 0; i < data.length; i++){
                if (data[i] === data[i+1]){
                    continue
                } else {
                    learnerIdArr.push(data[i].LearnerId)
                }
            }
            
            console.log(learnerIdArr)
        } catch (err) {
            console.log('Error parsing JSON ', err)
        }
        
    }
}) 

