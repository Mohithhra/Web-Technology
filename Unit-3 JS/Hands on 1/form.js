const form=document.getElementById("signup");
const msg =document.getElementById("msg");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const age=document.getElementById("age").value;
    if(!email.includes("@")){
        msg.textContent="Invalid email";
        return;
    }
    if(password.length<6){
        msg.textContent="Password must be 6+ characters";
        return;
    }
    if(age<18){
        msg.textContent="You must be 18+";
        return;
    }
    msg.textContent="Form submitted successfully!";
});
password.addEventListener("input",function(){
    if(password.value.length<5){
        msg.textContent="Weak password";
    }
    else if(password.value.length<8){
        msg.textContent="Medium password";
    }
    else{
        msg.textContent="Strong password";
    }
});