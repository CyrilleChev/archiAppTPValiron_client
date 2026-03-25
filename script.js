// For previous questions, without parametric link
// const SERVER = "https://4d5b0f1e-9cd0-4286-a198-23da386f2e0f-00-oojv4yyurb3k.riker.replit.dev";

// Fetch the first message from the server and show it in a popup when the page loads
fetch(document.querySelector("#server").value + "/msg/getAll")
  .then(function(response) { return response.json(); })
  .then(function(data) {
    alert(data[0].pseudo + " : " + data[0].msg);
  });

// Takes the list of messages and displays them in the <ul> on the page
function update(tab) {
  let ul = document.querySelector("ul");
  ul.innerHTML = "";
  for (let i = 0; i < tab.length; i++) {
    if (!tab[i]) continue;
    let li = document.createElement("li");
    li.textContent = tab[i].pseudo + " (" + tab[i].date + ") : " + tab[i].msg;
    ul.appendChild(li);
  }
}

// Asks the server for all messages, then calls update() to show them
function refresh() {
  let server = document.querySelector("#server").value;
  fetch(server + "/msg/getAll")
    .then(function(response) { return response.json(); })
    .then(function(data) { update(data); });
}

// When the user clicks "Send", post their message to the server
document.querySelector("#send").addEventListener("click", function() {
  let server   = document.querySelector("#server").value;
  let pseudo   = document.querySelector("#pseudo").value;
  let textarea = document.querySelector("#textarea");
  if (!pseudo || !textarea.value) return;
  fetch(server + "/msg/post/" + encodeURIComponent(textarea.value) + "?pseudo=" + encodeURIComponent(pseudo))
    .then(function(response) { return response.json(); })
    .then(function(data) {
      textarea.value = "";
      refresh();
    });
});

// When the user clicks "Mise à jour", just reload the messages from the server
document.querySelector("#refresh").addEventListener("click", function() {
  refresh();
});

// Switch between dark and light mode, and update the button text accordingly
document.querySelector("#toggle-style").addEventListener("click", function() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    this.textContent = "Light mode";
  } else {
    this.textContent = "Dark mode";
  }
});

// Load the messages once when the page first opens
refresh();

// ----------- Previous questions ----------------

// function fact(n) {
//   if (n === 0 || n === 1) return 1;
//   return n * fact(n - 1);
// }

// console.log("Factorielle de 6 : " + fact(6));

// function applique(f, tab) {
//   let result = [];
//   for (let i = 0; i < tab.length; i++) {
//     result.push(f(tab[i]));
//   }
//   return result;
// }

// console.log(applique(fact, [1, 2, 3, 4, 5, 6]));

// console.log(applique(function(n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]));

// msgs = [
//   { "msg": "Hello World" },
//   { "msg": "Blah Blah" },
//   { "msg": "I love cats" }
// ];

// function update(tab) {
//   // Get the <ul> element from the page
//   let ul = document.querySelector("ul");

//   // Erase all existing messages
//   ul.innerHTML = "";

//   // For each object in the array, create a <li> and append it
//   for (let i = 0; i < tab.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = tab[i].msg;
//     ul.appendChild(li);
//   }
// }

// // Attach update(msgs) to the button click
// document.querySelector("button").addEventListener("click", function() {
//   update(msgs);
// });