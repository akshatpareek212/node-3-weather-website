console.log("Javascript has been integrated")



const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    messageOne.textContent="Loading....."
    messageTwo.textContent=""
    fetch(`/weather?address=${searchTerm.value}`).then((response) =>{
    
        response.json().then(data=> {
            if(data.error){
                messageOne.textContent= data.error
            }
            else{
                messageOne.textContent= data.Location
                messageTwo.textContent= data.forecast
            }
        })
    
})
})

