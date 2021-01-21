
// dom elements
const SubmitBtn = document.querySelector('.primary-button');
const FirstName = document.getElementById('f-name');
const LastName = document.getElementById('l-name');
const ID = document.getElementById('ID');
const FirstImage = document.getElementById('fimg');
const SecondImage = document.getElementById('simg');
const ErrorElem = document.getElementById('error-msg');
const AlertElem = document.querySelector('.alert');
const toggle = document.querySelector('.error');
// error messages : 

const NAME_ERR = "Invalid Input";
const FILE_ERR = "No Files Selected";

// Check for name errors : 

function CheckInputFailure(firstName,LastName,Id){
    if(FirstName === "" || LastName ==="" || ID === ""){
        ErrorElem.textContent = NAME_ERR;
        return 1;
    }
    return 0;
}

function CheckFileFailure(firstName,LastName,Id){
    if(FirstImage.files.length === 0 || SecondImage.files.length === 0){
        ErrorElem.textContent=FILE_ERR;
        return 1;
    }
    return 0;
}

function Success(){
    ErrorElem.textContent = 'Success';
    AlertElem.classList.replace('alert-danger','alert-success');
}

// If submitted 

SubmitBtn.addEventListener('click',(event)=>{
    toggle.style.display="block";
    if(CheckInputFailure(FirstName.value,LastName.value,ID.value)){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        if(CheckFileFailure(FirstImage,SecondImage)){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            Success();
        }
    }

});