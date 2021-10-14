//const api_url = "<heroku_app_url>"
const api_url = "https://teacherstaffapi.herokuapp.com/staff"
//const api_url = "https://anassk.herokuapp.com/staff"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].employeeCode}</td>`;
		table_data += `<td>${records[i].jobTitleName}</td>`;
		table_data += `<td>${records[i].name}</td>`;
		
		table_data += `<td>${records[i].branch}</td>`;
		
		table_data += `<td>${records[i].phoneNumber}</td>`;
		table_data += `<td>${records[i].emailID}</td>`;
		// table_data += `<td>${records[i].password}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><i class="fas fa-edit"></i></a>  <i class="fas fa-trash-alt" onclick=deleteData('${records[i]._id}')></i>`;
		table_data += `</td>`;
		table_data += `</tr>`;
		
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
	
		document.getElementById("_id").value = data._id;
		document.getElementById("employeeCode").value = data.employeeCode;
		document.getElementById("name").value = data.name;
		document.getElementById("branch").value = data.branch;
		document.getElementById("jobTitleName").value = data.jobTitleName;
		document.getElementById("phoneNumber").value = data.phoneNumber;
		document.getElementById("emailID").value = data.emailID;
		document.getElementById("password").value = data.password;
		
		
		
	})
}


function postData() {
	
    var employeeCode = document.getElementById("employeeCode").value;
	var name = document.getElementById("name").value;
	var branch = document.getElementById("branch").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailID = document.getElementById("emailID").value;
	var password = document.getElementById("password").value;
	
	
	
	
	
	data = {name: name, phoneNumber: phoneNumber, emailID: emailID, branch: branch, employeeCode: employeeCode, jobTitleName: jobTitleName,password:password};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "table.html";
	})
}	


function putData() {
	var _id = document.getElementById("_id").value;
	var employeeCode = document.getElementById("employeeCode").value;
	var name = document.getElementById("name").value;
	var branch = document.getElementById("branch").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailID = document.getElementById("emailID").value;
	var password = document.getElementById("password").value;
	
	
	
	data = { _id:_id, jobTitleName: jobTitleName, name: name,password:password, branch: branch, employeeCode: employeeCode, emailID: emailID, phoneNumber: phoneNumber , password:password};
	
	
	
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "table.html";
	})
	.catch((err)=>{
		console.log("Error is " , err)
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}
