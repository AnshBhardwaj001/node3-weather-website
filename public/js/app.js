// import { response } from "express"

console.log('Client side javascript file loaded.')

const weatherform =  document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {   //response is the data provided by the url.
    response.json().then((data) => {   //this data is what we get after response in converted into the json format.
    
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }else{
            console.log(data.forcast)
            console.log(data.location)
            messageOne.textContent = data.forcast
            messageTwo.innerHTML = data.location
        }
    })
})
})