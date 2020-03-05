
const urlForm = document.getElementById('url-form');
const originalUrl = document.getElementById('original-url');
const uniqueName = document.getElementById('unique-name');
const confirmation = document.getElementById('confirmation');
const confirmationShow = document.getElementById('confirmationShow');
const copyButton = document.getElementById('copyButton');
const status = document.getElementById('status');

const formSubmit = e => {
    e.preventDefault();
    status.innerHTML = '<button type="button" class="loader"></button>'
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
        status.innerHTML = '<button>SHORTEN</button>'
        if(!response.ok){
            confirmationShow.innerText = response.msg;
        }
        else {
            e.target.reset()
            confirmationShow.innerHTML = `Hooray!!! The link can now be visited through <a target="_blank" href="https://${response.newUrl}" rel = "noopener noreferer" > ${response.newUrl} </a>`
            confirmation.value = response.newUrl;
            copyButton.innerText = 'Copy Link';
        }
    })
    .catch(err => {
        console.log('oops', err);
        status.innerHTML = '<button>SHORTEN</button>';
        confirmationShow.innerText = 'Network error, retry'
    })
}

const copyText = ()  => {
    confirmation.select();
    confirmation.setSelectionRange(0, 99999)
    document.execCommand("copy");
    confirmation.blur()
    alert("Copied " + confirmation.value);
    copyButton.innerText = ''
}

urlForm.addEventListener('submit', formSubmit);
copyButton.addEventListener('click', copyText);
