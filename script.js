//const api_url = "<heroku_app_url>"
const api_url = "https://teacherstaffapi.herokuapp.com/staff"
//const api_url = "https://anassk.herokuapp.com/staff"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].employeeCode}</td>`;
		table_data += `<td>${records[i].jobTitleName}</td>`;
		table_data += `<td>${records[i].firstName}</td>`;
		
		table_data += `<td>${records[i].department}</td>`;
		
		table_data += `<td>${records[i].phoneNumber}</td>`;
		table_data += `<td>${records[i].emailAddress}</td>`;
		table_data += `<td>${records[i].password}</td>`;
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
	
		document.getElementById("id").value = data._id;
		document.getElementById("employeeCode").value = data.employeeCode;
		document.getElementById("firstName").value = data.firstName;
		document.getElementById("department").value = data.department;
		document.getElementById("jobTitleName").value = data.jobTitleName;
		document.getElementById("phoneNumber").value = data.phoneNumber;
		document.getElementById("emailAddress").value = data.emailAddress;
		document.getElementById("password").value = data.password;
		
		
		
	})
}


function postData() {
	
        var employeeCode = document.getElementById("employeeCode").value;
	var firstName = document.getElementById("firstName").value;
	var department = document.getElementById("department").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailAddress = document.getElementById("emailAddress").value;
	var password = document.getElementById("password").value;
	
	
	
	
	
	data = {firstName: firstName, phoneNumber: phoneNumber, emailAddress: emailAddress, department: department, employeeCode: employeeCode, jobTitleName: jobTitleName,password:password};
	
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
	
	var employeeCode = document.getElementById("employeeCode").value;
	var firstName = document.getElementById("firstName").value;
	var department = document.getElementById("department").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailAddress = document.getElementById("emailAddress").value;
	var password = document.getElementById("password").value;
	
	
	
	data = {_id:_id, jobTitleName: jobTitleName, firstName: firstName,password:password, department: department, employeeCode: employeeCode, emailAddress: emailAddress, phoneNumber: phoneNumber};
	
	
	
	
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
