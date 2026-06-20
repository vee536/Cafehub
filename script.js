// =========================
// EVENT REGISTRATION MODAL
// =========================

function openModal() {
    document.getElementById("eventModal").style.display = "block";
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
}

// =========================
// REGISTER EVENT
// =========================

function registerEvent(eventName){

    document.getElementById("modalTitle").innerText =
    "Successfully Registered!";

    document.getElementById("modalText").innerText =
    "You have joined " + eventName;

    openModal();
}

// =========================
// GEOLOCATION API
// =========================

function getLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            function(position){

                document.getElementById("location").innerHTML =

                "📍 Latitude: " +
                position.coords.latitude +

                "<br><br>" +

                "📍 Longitude: " +
                position.coords.longitude;

            },

            function(){

                alert("Location access denied.");

            }

        );

    }

    else{

        alert("Geolocation not supported.");

    }

}

// =========================
// SIGNUP VALIDATION
// =========================

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

// =========================
// SIGNIN VALIDATION
// =========================

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