
// EVENT REGISTRATION MODAL


function openModal() {
    document.getElementById("eventModal").style.display = "block";
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
}


// REGISTER EVENT


function registerEvent(eventName){

    document.getElementById("modalTitle").innerText =
    "Successfully Registered!";

    document.getElementById("modalText").innerText =
    "You have joined " + eventName;

    openModal();
}

// GEOLOCATION API

function getLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            function(position){

                document.getElementById("location").innerHTML =

                `
                <h3>Your Current Location</h3>

                <p>
                    Latitude: ${position.coords.latitude}
                    <br><br>
                    Longitude: ${position.coords.longitude}
                </p>

                <br>

                <p>
                    Suggested Nearby Cafe:
                    <strong>The Roastery</strong>
                </p>
                `;

            },

            function(error){

                document.getElementById("location").innerHTML =

                `
                <h3>Location Permission Denied</h3>

                <p>
                    Please allow location access in your browser settings
                    and try again.
                </p>
                `;

            }

        );

    }
    else{

        document.getElementById("location").innerHTML =

        `
        Geolocation is not supported by this browser.
        `;

    }

}

// SIGNUP VALIDATION


function validateSignup(){

    let password =
    document.getElementById("password").value;

    let confirm =
    document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Passwords do not match!");

        return false;
    }

    alert("Account Created Successfully!");

    return true;
}


// SIGNIN VALIDATION


function validateSignin(){

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("signinPassword").value;

    if(email === "" || password === ""){

        alert("Please fill all fields.");

        return false;
    }

    alert("Welcome back!");

    return true;
}
const registerUser = () => {

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const dob =
document.getElementById("dob").value;

const profession =
document.getElementById("profession").value;

const photo =
document.getElementById("photo").files[0];

if(
name==="" ||
email==="" ||
password==="" ||
dob==="" ||
profession==="" ||
!photo
){

alert("Please fill all the fields.");

return;

}

localStorage.setItem("Name",name);

localStorage.setItem("Email",email);

localStorage.setItem("DOB",dob);

localStorage.setItem("Profession",profession);

const reader = new FileReader();

reader.onload = function(e){

document.getElementById("cardContainer").innerHTML=

`

<div class="card">

<img src="${e.target.result}">

<h2>${name}</h2>

<p><strong>Email :</strong> ${email}</p>

<p><strong>Password :</strong> ${password}</p>

<p><strong>Date of Birth :</strong> ${dob}</p>

<p><strong>Profession :</strong> ${profession}</p>

</div>

`;

};

reader.readAsDataURL(photo);

}