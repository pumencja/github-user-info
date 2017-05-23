document.addEventListener("DOMContentLoaded", function(event){
 
  // get the login of the user for check
  var login = prompt("Please enter the login", login);
  document.getElementById("thelogin").innerHTML = "login: " + login;
  document.getElementById("avatar").src ="https://cdn.pixabay.com/photo/2017/03/07/13/02/question-mark-2123967_1280.jpg";
  
  // basic information about the user
    $.getJSON("https://api.github.com/users/" + login, function(data){
      let avatar;
	    let login;
      let name;
	    let email;
      let repos = [];
	    let repo_number;
      
			      login = data.login;
            avatar = data.avatar_url;
            name = data.name;
			email = data.email;
			repo_number = data.public_repos;
      if(data.name === null){
        document.getElementById("name").innerHTML = "name: unknown";
      } else {
        document.getElementById("name").innerHTML = "name: " + name;
      }
      if(data.email === null){
        document.getElementById("email").innerHTML = "email: unknown";
      } else {
			document.getElementById("email").innerHTML = "email: " + email;
      }
			document.getElementById("avatar").src = avatar;
          
    // looking for his repos
			$.getJSON("https://api.github.com/users/" + login + "/repos?per_page=100", function(data1){
			  let i = 0;
			  while(i < repo_number){
				  repos.push([data1[i].updated_at, data1[i].name]);
				  i++;
			  }
	// sorting the repos
				repos.sort().reverse(); 
        
   // creating unordered list from repos-array     
        function arrToUl(arr){
          for(let i=0; i<repos.length; i++){
            let li = document.createElement("li");
            let textnode = document.createTextNode(arr[i][1]);
            li.appendChild(textnode);
            document.getElementById("listOfRepos").appendChild(li);
        }
        }
        arrToUl(repos)
			});
      
    });
});

  
 
