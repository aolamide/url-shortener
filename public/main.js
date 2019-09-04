
const urlForm = document.getElementById('url-form');
const originalUrl = document.getElementById('original-url');
const uniqueName = document.getElementById('unique-name');
const confirmation = document.getElementById('confirmation');
const confirmationShow = document.getElementById('confirmationShow');
const copyButton = document.getElementById('copyButton');

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
            confirmationShow.innerText = response.msg
        }
        else {
            confirmationShow.innerHTML = `Hooray!!! The link can now be visited through <a target="_blank" href=${response.newUrl} rel = "noopener noreferer" > ${response.newUrl} </a>`
            confirmation.value = response.newUrl;
            copyButton.innerText = 'Copy Link';
        }
    })
    .catch(err => console.log('oops', err))
}

const copyText = ()  => {
    confirmation.select();
    confirmation.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied " + confirmation.value);
}

urlForm.addEventListener('submit', formSubmit);
copyButton.addEventListener('click', copyText);
