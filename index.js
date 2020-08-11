/* https://shekret.vercel.app/ */

let form = document.querySelector('form');
let msgInput = document.querySelector('#message-input');
let linkInput = document.querySelector('#link-input');
let liveMode = document.querySelector('#live-mode-checkbox');
let msgForm = document.querySelector('#message-form');
let msgShow = document.querySelector('#message-show');
let linkForm = document.querySelector('#link-form');

const { hash } = window.location;
// decode base64;
const message = atob(hash.replace("#", ''));

if (message) {
    msgForm.classList.add('hide');
    msgShow.classList.remove('hide');

    document.querySelector('h1').innerHTML = message;
}

form.addEventListener('submit', event => {
    // Site won't reload (won't sumbit a form)
    event.preventDefault();
    if (msgInput.value) {
        msgForm.classList.add('hide')
        linkForm.classList.remove('hide');
        updateLink();
        copyToClipboard.call(linkInput);
    }

});

function updateLink() {
    // encode base64;
    const encrypted = btoa(msgInput.value);
    if (!msgInput.value) {
        linkInput.value = ''
    } else {
        linkInput.value = `${window.location}#${encrypted}`;
    }
};

// Live mode
if (liveMode.checked) {
    msgInput.addEventListener('input', updateLink);
    linkForm.classList.remove('hide');
};

// Check for switch value and add/remove event listener accordingly
liveMode.addEventListener('change', () => {
    if (liveMode.checked) {
        linkForm.classList.remove('hide');
        // update link on first live mode toggle on instead oh showing empty
        updateLink();
        msgInput.addEventListener('input', updateLink);
    } else {
        linkForm.classList.add('hide');
        msgInput.removeEventListener('input', updateLink);
    }
});

// toggle switch with letter L, jebe msgInput
// document.addEventListener('keyup', (e) => {
//     if (e.keyCode === 76) {
//         liveMode.checked = !liveMode.checked;
//     }
// })

function copyToClipboard() {
    if (!this.value) return;
    this.select();
    this.setSelectionRange(0, 99999);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('Copied to clipboard');
    showCopyMsg();
}

// Copy to clipobard on linkInput click
linkInput.addEventListener('click', copyToClipboard.bind(linkInput))

// Todo tooltip on linkInput
function showCopyMsg() {
    if (!document.querySelector('.copy-message')) {
        let msg = document.createElement('p');
        msg.classList.add('copy-message');
        msg.innerText = 'Copied to clipboard';
        linkForm.insertAdjacentElement('afterend', msg);
        setTimeout(removeCopyMsg, 2000)
    }
};
// Todo, remove msg on input change
function removeCopyMsg() {
    if (document.querySelector('.copy-message')) {
        document.querySelector('.copy-message').remove();
    }
}