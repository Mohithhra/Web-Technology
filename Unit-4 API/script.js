async function loadPosts() {
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/posts");

        //check HTTP errors
        if(!response.ok){
            throw new Error("Failed to fetch posts");
        }
        const data=await response.json();
        const postsList = document.getElementById("posts");
        postsList.innerHTML="";

        data.slice(0,5).forEach(post => {
            const li=document.createElement("li");
            li.textContent=post.title;
            postsList.appendChild(li);
        });
    }
    catch(error){
        console.error("Error: ",error.message);
    }
}