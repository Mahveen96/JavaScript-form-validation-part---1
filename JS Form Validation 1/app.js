const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const form = document.querySelector('#signup')

const isRequired = (value) => (value === '') ? false : true
const isBetween = (length, min, max) => length < min || length > max ? false : true

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_])(?=.{8,})")
    return re.test(password) 
}

const checkUsername = () => {
    let valid = false
    const min = 3, max = 25
    if(!isRequired(username.value.trim())) {
        showError(username, 'Username cannot be blank')
    } else if (!isBetween(username.value.trim().length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(username)
        valid = true
    }
    return valid
}

const checkEmail = () => {
    let valid = false 
    if(!isRequired(email.value.trim())) {
        showError(email, 'Email cannot be blank')
    } else if (!isEmailValid(email.value.trim())) {
        showError(email, 'Email is not valid')
    } else {
        showSuccess(email)
        valid = true
    }
    return valid
}

const checkPassword = () => {
    let valid = false
    if(!isRequired(password.value.trim())) {
        showError(password, 'Password cannot be blank')
    } else if (!isPasswordSecure(password.value.trim())) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
    } else {
        showSuccess(password)
        valid = true
    }
    return valid
}

const checkConfirmPassword = () => {
    let valid = false
    if(!isRequired(confirmPassword.value.trim())) {
        showError(confirmPassword, 'Please enter the password again')
    } else if(password.value.trim() !== confirmPassword.value.trim()) {
        showError(confirmPassword, 'Confirm password does not match')
    } else {
        showSuccess(confirmPassword)
        valid = true
    }
    return valid
}

const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('fail')

    const error = formField.querySelector('small')
    error.textContent = message
}

const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove('fail')
    formField.classList.add('success')

    const error = formField.querySelector('small')
    error.textContent = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isUsernameValid = checkUsername(),
          isEmailValid = checkEmail(),
          isPasswordValid = checkPassword(),
          isConfirmPasswordValid = checkConfirmPassword()
    
    let isFormValid = isUsernameValid && 
                      isEmailValid &&
                      isPasswordValid &&
                      isConfirmPasswordValid
    if(isFormValid) {

    }
    })

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return(...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId)
        }
    
    timeoutId = setTimeout(() => {
        fn.apply(null, args)
    }, delay)
    }
} 

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id){
        case 'username':
            checkUsername()
                break
        case 'email':
            checkEmail()
                break
        case 'password':
            checkPassword()
                break
        case 'confirmPassword':
            checkConfirmPassword()
                break
    }
}))