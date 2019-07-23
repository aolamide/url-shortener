
const urlForm = document.getElementById('url-form');
const originalUrl = document.getElementById('original-url');
const uniqueName = document.getElementById('unique-name');
const confirmation = document.getElementById('confirmation');

const formSubmit = e => {
    e.preventDefault();
    fetch('/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl : originalUrl.value,
          unique_name : uniqueName.value
        })
    })
    .then(data => data.json())
    .then(response => {
        if(!response.ok){
            confirmation.innerText = response.msg
        }
        else {
            confirmation.innerHTML = `Hooray!!! The link can now be visited through <a target='_blank' rel='noopener noreferer' href=${response.newUrl}>${response.newUrl}</a>`
        }
    })
    .catch(err => console.log('oops', err))
}

urlForm.addEventListener('submit', formSubmit);