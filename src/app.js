//require the modules
const fs = require('fs')
const path = require('path')
const express = require('express')
const moment = require('moment')
const { request } = require('http')

let rego = ''

//set up express

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.use(express.urlencoded())
app.use(express.json())

app.post('/registered.html', function (request, response) {
    console.log(request.body.name)
    console.log(request.body.checked)
    console.log(request.body.rego)
    console.log(request.body.odo)


    //get all the required data from the user input

    let name = request.body.name
    let checked = request.body.checked
    let rego = request.body.rego
    let odo = request.body.odo
    //create time and date to be used in the saved data 
    moment.locale()
    const timeStamp = moment().format('LT')
    const dateStamp = moment().format('DD/MM/YYYY')

    //append information to a file when button clicked

    if (name.length === 0 || !checked || isNaN(odo)) {
        console.log('Missing Data, No action on logbook')
    }


    else {
        fs.appendFileSync('logbook.csv', rego + "," + checked + "," + name + "," + odo + "," + dateStamp + "," + timeStamp + "\n")
        response.sendFile(path.join(publicDirectoryPath, '/registered.html'));
    }

})


app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})
