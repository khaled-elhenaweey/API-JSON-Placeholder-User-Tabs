// get api user request:
function getAllPosts() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = function () {
    // check the request status error
    if (request.status >= 200 && request.status < 300) {
      let users = request.response;
      // loop on the api obj and build the UI
      for (const user of users) {
        let index = user.id;
        let contentAction = `
        <li  class="" onclick="userPosts(${index})">
        <h4> ${user.name}</h4>
        <p> ${user.email}</p>
        </li>
        `;
        document.querySelector("#actionCard").innerHTML += contentAction;
      }
    } else {
      alert(request.status);
    }
  };
}
// filter api post request:

function FilterPost(index) {
  let request = new XMLHttpRequest();
  // get the posts form post api and set the user index in the url
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${index}`
  );
  request.responseType = "json";
  request.send();
  request.onload = function () {
    // check the request status error
    if (request.status >= 200 && request.status < 300) {
      // clear the UI Posts
      document.querySelector("#postList").innerHTML = "";
      let posts = request.response;
      // loop on the api obj and build the UI
      for (const post of posts) {
        let contentAction = `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
          </div>
          `;
        document.querySelector("#postList").innerHTML += contentAction;
      }
    } else {
      alert(request.status);
    }
  };
}
//active links and call the filter posts
function userPosts(index) {
  FilterPost(index);
  const links = document.querySelectorAll(".user-links li");
  // Remove active class from all links
  links.forEach((l) => l.classList.remove("active"));
  // Add active class to the clicked link
  links[index - 1].classList.add("active");
}
// call the get api
getAllPosts();
