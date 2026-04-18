const activeItem=document.querySelector(".active");
console.log(activeItem.nextSibling);
console.log(activeItem.previousSibling);
console.log(activeItem.nextElementSibling);
console.log(activeItem.previousElementSibling);
let next=activeItem.nextSibling;
while(next && next.nodeType !== 1){
    next=next.nextSibling;
}
console.log(next);
const div=document.createElement("div");
div.textContent="Hello World";

//--------DOM Manipulation-------

const container=document.getElementById("container");

if(container){
    const newDiv=document.createElement("div");
    newDiv.textContent="Created using createElement";

    container.appendChild(newDiv);
    console.log("Append new div");

    const newPara=document.createElement("p");
        newPara.textContent="Inserted before first child";

        const firstChild=container.firstElementChild;

        if(firstChild){
            container.insertBefore(newPara,firstChild);
            console.log("Inserted paragraph before first child");
        }
}
