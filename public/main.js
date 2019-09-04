
const urlForm = document.getElementById('url-form');
const originalUrl = document.getElementById('original-url');
const uniqueName = document.getElementById('unique-name');
const confirmation = document.getElementById('confirmation');
const copyButton = document.getElementById('copyButton');

let url;
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
            confirmation.value = `Hooray!!! The link can now be visited through ${response.newUrl}`;
            copyButton.innerText = 'Copy Link';
            url = response.newUrrl;
        }
    })
    .catch(err => console.log('oops', err))
}

const copyText = ()  => {
    confirmation.select();
    confirmation.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the link: " + url + " to clipboard");
}

urlForm.addEventListener('submit', formSubmit);
copyButton.addEventListener('click', copyText);
