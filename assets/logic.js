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
        <button class="btn btn-primary mb-2" onclick="userPosts(${index})">
        <span> ${user.name}</span>
        <br>
        <span> ${user.email}</span>
        </button>
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
        console.log(post.title);
        console.log(post.body);
        let contentAction = `
        <li class="list-group-item">
        <span>${post.userId}</span>
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        </li>
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
}
