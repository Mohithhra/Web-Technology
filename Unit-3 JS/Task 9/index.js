function showsquare(){
    let numbers=[1,2,3,4,5];
    let squares=numbers.map(num=>num*num);
    document.getElementById("output").innerHTML="Squares: "+squares.join(", ");
}