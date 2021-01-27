const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#MessageOne')
const messageTwo = document.querySelector('#MessageTwo')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const place = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log(place)
    fetch(`http://127.0.0.1:3000/weather?address=${place}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
                // console.log(data.location)
                // console.log(data.Forecast)
            }

        })
    })

})