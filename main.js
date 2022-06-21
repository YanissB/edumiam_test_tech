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

    
// Parse JSON and select LearnerId

const getLearnerId = (data) => {
    let learnerIdArr = data.map(function(Learner){
        return Learner.LearnerId
    })
    let uniqueLearnerIdArr = [...new Set(learnerIdArr)]
    console.log("cc")
    return uniqueLearnerIdArr
}


const getTotalQuoted = (uniqueLearnerId, data) => {
    summ = 0
    totalQuotedArr = []
    console.log("cc getTotalQuoted")

    for (let i = 0; i < data.length; i++){
        for (let j = 0; i < uniqueLearnerId; j++){
            console.log("j'existe")
            if (uniqueLearnerId[i] == data[j].LearnerId){
                console.log("fais la somme")
                summ += data[j].QuotedPrice 
            } else {
                
                console.log("Je me push et reset")
                totalQuotedArr.push(summ)
                summ = 0
            }
        }
    }
    return totalQuotedArr
}


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
            const uniqueLearnerId = getLearnerId(data) 
            const totalQuoted = getTotalQuoted(uniqueLearnerId, data)  
            console.log(totalQuoted)
        } catch (err) {
            console.log('Error parsing JSON ', err)
        }
    }
})

