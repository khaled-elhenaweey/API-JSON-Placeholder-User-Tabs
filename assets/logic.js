function getAllUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
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
    })
    .catch((error) => {
      alert(error.message);
    });
}

//active links and call the filter posts
function userPosts(index) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${index}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      // clear the UI Posts
      document.querySelector("#postList").innerHTML = "";
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
    })
    .catch((error) => {
      alert(error.message);
    });
  const links = document.querySelectorAll(".user-links li");
  // Remove active class from all links
  links.forEach((l) => l.classList.remove("active"));
  // Add active class to the clicked link
  links[index - 1].classList.add("active");
}
// call the get api
getAllUsers();
