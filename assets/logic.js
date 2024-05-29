// https://jsonplaceholder.typicode.com/posts

function getAllPosts() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let users = request.response;
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
function FilterPost(index) {
  let request = new XMLHttpRequest();
  //   tasks[index].state = !tasks[index].state;

  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${index}`
  );
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let posts = request.response;
      document.querySelector("#postList").innerHTML = "";
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
getAllPosts();
function userPosts(index) {
  FilterPost(index);
  const links = document.querySelectorAll(".user-links li");
  links.forEach((link) => {
    // Remove active class from all links
    links.forEach((l) => l.classList.remove("active"));
    // Add active class to the clicked link and corresponding post
    links[index - 1].classList.add("active");
  });
}
