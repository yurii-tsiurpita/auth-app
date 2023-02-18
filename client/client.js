const signupButton = document.querySelector('.form__signup-button');
const signinButton = document.querySelector('.form__signin-button');
const usernameInput = document.querySelector('.form__username-input');
const passwordInput = document.querySelector('.form__password-input');
const result = document.querySelector('.form__result-text');

let timerId;

const request = async (endpoint) => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await fetch(`http://localhost:3000/auth/${ endpoint }`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const responseData = await response.json();

    clearTimeout(timerId);

    let resultText = responseData.message;
    if (Array.isArray(responseData.message)) resultText = responseData.message.join(', ');
    result.innerHTML = resultText;

    timerId = setTimeout(() => {
        result.innerHTML = '';
    }, 4000);
}

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await request('signup');
});

signinButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await request('signin');
});