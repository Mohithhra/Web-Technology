function showStudent(){
    let key="marks";
    let student={
        name:"Anita",
        [key]:95
    };
    document.getElementById("output").innerHTML="Student Marks: "
+student.marks;
}