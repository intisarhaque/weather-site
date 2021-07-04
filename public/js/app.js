console.log("client side javascript is loaded")




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value

    console.log(location)
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = ""
            messageTwo.textContent = ""
            console.log(data.forecast.total)
            messageOne.textContent = "The temperature in " + location.charAt(0).toUpperCase()+ location.slice(1) + " is " + data.forecast.total.temperature
            messageTwo.textContent = "The forecast is " + data.forecast.total.weather_descriptions[0]
        }
    })
})
})