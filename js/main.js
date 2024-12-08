
    let inputArr = Array.from(document.getElementsByClassName('inputArr'));
    let logEmail = document.getElementById('logEmail');
    let logPass = document.getElementById('logPass');
    let signName = document.getElementById('signName');
    let signEmail = document.getElementById('signEmail');
    let signPass = document.getElementById('signPass');
    let userName = JSON.parse(localStorage.getItem('userName')) || undefined;
    let users = [];
    users = JSON.parse(localStorage.getItem('users')) || [];
    // ----------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        let signUPButton = document.getElementById("signUPButton");
        if (signUPButton) {
            signUPButton.addEventListener("click", addUserData);
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        let loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener("click", checkLoginData);
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        if (document.body.id === "homePage") {
            let logout = document.getElementById('logout');
            let helloUserName = document.getElementById('helloUserName');
           
            logout.addEventListener('click', function(){
                window.close()
                window.open('index.html')
            })
            helloUserName.innerHTML= `<h1 class="text-center">Welcome ${userName}</h1>`;
            console.log(userName);
        }
    });
    
    // -----------------------------------------------------------------
    function checkLoginData(){
        let user = {
            email : logEmail.value,
            password : logPass.value
        }
        if (
            dataEntryValidation(logEmail.id, logEmail.value) &&
            dataEntryValidation(logPass.id, logPass.value) &&
            (checkObjectIsInArray(users , user) == true)
        ){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successful login",
                showConfirmButton: false,
                timer: 1500
              });
            window.close();
            window.open('home.html');
            
        }else if(          
            dataEntryValidation(logEmail.id, logEmail.value) &&
            dataEntryValidation(logPass.id, logPass.value) &&
            (checkObjectIsInArray(users , user) == 404)
        ){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Wrong Password!",
              });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This email isn't registered go to Signup!",
              });
        }
    }
    
    function addUserData(){
        let user = {
            name : signName.value,
            email : signEmail.value,
            password : signPass.value
        }
        if (
            dataEntryValidation(signName.id, signName.value) &&
            dataEntryValidation(signEmail.id, signEmail.value) &&
            dataEntryValidation(signPass.id, signPass.value) &&
            (dataRepeatcheck(users , user) == false)
        ){
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            checkObjectIsInArray(users , user)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "You has been registerd... Go to logIn page",
                showConfirmButton: false,
                timer: 1500
              });
              clearSignInputs()
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your email or name has already been registerd!",
              });
        }
    }
    
    function clearSignInputs(){
        signName.value = "";
        signEmail.value= "";
        signPass.value = "";
        signName.classList.remove('is-valid');
        signEmail.classList.remove('is-valid');
        signPass.classList.remove('is-valid');
    }
    function clearLoginInputs(){
        logEmail.value= "";
        logPass.value = "";
        logEmail.classList.remove('is-valid');
        logPass.classList.remove('is-valid');
    }
    
    for(let i = 0 ; i < inputArr.length; i++){
        inputArr[i].addEventListener(('input') , function(e){
            let inputId = e.target.id; // I've got the id to determine which regex im gonna check as i named all regex-patterns after the sinup inputs ids
            let inputValue = e.target.value; // the value is what would be checked by the regex i've determined
            dataEntryValidation(inputId, inputValue);
        })
    }
    
    function dataEntryValidation(inputId, inputValue){
        let regex = {
            signName : /^[a-z0-9_-]{3,15}$/, // the same exact name of signName-input id
            signEmail : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            logEmail : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            signPass : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            logPass : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        }
        let desiredInput = document.getElementById(inputId);
        let errorMsg = document.getElementById(`${inputId}Error`);
        if(regex[inputId].test(inputValue)){
            desiredInput.classList.add('is-valid');
            desiredInput.classList.remove('is-invalid');
            errorMsg.style.display= "none";
            return true;
        }
        else{
            desiredInput.classList.add('is-invalid');
            errorMsg.style.display= "block";
            return false;
        }
    }
    
    function dataRepeatcheck(arr , newObject){
        for(let i = 0 ; i < arr.length ; i++){
            if(newObject.name == arr[i].name || newObject.email == arr[i].email){
                return true;
            }
        }
        return false
    }
    function checkObjectIsInArray(arr , checkedObject){
        for(let i = 0 ; i < arr.length ; i++){
            if(checkedObject.email == arr[i].email){
                userName = arr[i].name;
                localStorage.setItem('userName', JSON.stringify(userName));
                if(checkedObject.password == arr[i].password){
                    return true;
                }else{
                    return 404;
                }
                
            }
        }
        return false
    }

    // userName = arr[i].name;


