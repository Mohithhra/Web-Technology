function showData(){
    let student={
        name:"Jara",
        age:18,
        course:"JavaScript"
    };
    let jsonData=JSON.stringify(student);
    let obj=JSON.parse(jsonData);
    document.getElementById("result").innerHTML="Name: "+obj.name+"<br>Course: "+obj.course;
}