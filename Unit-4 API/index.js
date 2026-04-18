fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error());

async function getPosts() {
    const response=await fetch("https://jsonplaceholder.typicode.com/posts");
    const data=await response.json();
    console.log(data);
}

getPosts();

async function addPost() {
    const newPost={
        title: "Hello",
        body: "This is a post"
    };

    const response=await fetch("https://jsonplaceholder.typicode.com/posts", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(newPost)  
    });
    const data=await response.json();
    console.log(data);
}

addPost();

async function fetchData() {
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/posts");

        if(!response.ok){
            throw new Error("HTTP error: "+response.status);
        }

        const data=await response.json();
        console.log(data);
    }catch(error) {
        console.error("Error:",error.message);
    }
}

fetch("https://jsonplaceholder.typicode.com/users")
.then(res=> {
    if (!res.ok) throw new Error("Failed");
    return res.json();
})
.then(data => console.log(data))
.catch(err => console.log(err));

async function getUsers() {
    try{
        const res=await fetch("https://jsonplaceholder.typicode.com/posts");
        const users=await res.json();
        console.log(users);
    } catch (err) {
        console.error(err);
    }
}

async function loadAll() {
    const [post, users]=await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts").then(r=>r.json())
        fetch("https://jsonplaceholder.typicode.com/users").then(r =>r.json())
    ]);
    console.log(posts,users);
}