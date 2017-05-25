import "./app.css";

function compareWithReverse(a, b) {
	if (a.at > b.at)
	{ return -1; }
	else if (a.at < b.at)
	{ return 1; }
	else
	{ return 0; }
}

document.addEventListener("DOMContentLoaded", function (event) {
	// getting login for check
	var login = window.prompt("Please enter the login", login);

	'use strict';
	let login_doc = window.document.getElementById('login');
	let name_doc = window.document.getElementById('name');
	let email_doc = window.document.getElementById('email');
	let avatar_doc = window.document.getElementById('avatar');
	let repos_doc = window.document.getElementById('listOfRepos');
	let no_repos_doc = window.document.getElementById("no_repo");

	fetch('https://api.github.com/users/' + login)
		.then((res) => {
			res.json().then((data) => {
				let git_login = data.login;
				let name = data.name;
				let email = data.email;
				let avatar = data.avatar_url;
				let repo_number = data.public_repos;
				let repos = [];
				let pages = Math.ceil(repo_number / 100);

				// when there is no such person
				if (data.message) {
					login_doc.innerHTML = "Sorry, I can't find <b>" + login + "</b>";
					name_doc.textContent = "";
					email_doc.textContent = "";
					avatar_doc.src = "unknown.jpg";
					no_repos_doc.textContent = login + " is not on Github yet";
					// and when there is one
				} else {
					login_doc.textContent = "login: " + login;
					if (name === null) {
						name_doc.textContent = "name: unknown";
					} else {
						name_doc.textContent = "name: " + name;
					}
					if (email === null) {
						email_doc.textContent = "email: unknown";
					} else {
						email_doc.textContent = "email:" + email;
					}
					avatar_doc.src = avatar;
					// looking for his repos
					let promises = [];
					for (let p = 1; p <= pages; p++) {
						promises.push(fetch('https://api.github.com/users/' + login + '/repos?page=' + p + '&per_page=100')
							.then((response) => response.json()));
					}

					Promise.all(promises).then(
						(parsedData) => {

							for (let p = 0; p < parsedData.length; p++) {
								let data = parsedData[p];

								for (let i = 0; i < data.length; i++) {
									repos.push(
										{ at: data[i].updated_at, name: data[i].name }
									);
								}
							}
							// sorting the repos
							repos.sort(compareWithReverse);

							// if there is no repos of this person
							if (repo_number === 0) {
								no_repos_doc.textContent = login + " doesn't have any repositories yet";
							} else {
								// creating unordered list from repos-array     
								for (let i = 0; i < repos.length; i++) {
									let li = document.createElement("li");
									let textnode = document.createTextNode(repos[i].name);
									li.appendChild(textnode);
									repos_doc.appendChild(li);
								}
							}
						})
						.catch((err) => {
							console.log(err)
						});
				}
			});
		})
		.catch((err) => {
			console.log(err)
		});
});