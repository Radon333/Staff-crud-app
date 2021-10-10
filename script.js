//const api_url = "<heroku_app_url>"
const api_url = "https://teacherstaffapi.herokuapp.com/staff"
//const api_url = "https://anassk.herokuapp.com/staff"
const mongoose = require('mongoose');

const api-uri ="mongodb+srv://shiv-nosql:nosql@cluster0.esppv.mongodb.net/project?retryWrites=true&w=majority";

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].userId}</td>`;
		table_data += `<td>${records[i].jobTitleName}</td>`;
		table_data += `<td>${records[i].firstName}</td>`;
		table_data += `<td>${records[i].lastName}</td>`;
		table_data += `<td>${records[i].department}</td>`;
		table_data += `<td>${records[i].employeeCode}</td>`;
		table_data += `<td>${records[i].phoneNumber}</td>`;
		table_data += `<td>${records[i].emailAddress}</td>`;
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
		document.getElementById("userId").value = data.userId;
		document.getElementById("firstName").value = data.firstName;
		document.getElementById("lastName").value = data.lastName;
		document.getElementById("phoneNumber").value = data.phoneNumber;
		
		
		
		document.getElementById("emailAddress").value = data.emailAddress;
		document.getElementById("department").value = data.department;
		document.getElementById("employeeCode").value = data.employeeCode;
		document.getElementById("jobTitleName").value = data.jobTitleName;
	})
}


function postData() {
	
	var userId = document.getElementById("userId").value;
	var firstName = document.getElementById("firstName").value;
	
	
	var lastName = document.getElementById("lastName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	
	var emailAddress = document.getElementById("emailAddress").value;
	var department = document.getElementById("department").value;
	
	var employeeCode = document.getElementById("employeeCode").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	
	data = {userId: userId, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, emailAddress: emailAddress, department: department, employeeCode: employeeCode, jobTitleName: jobTitleName};
	
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
	
	var _id = document.getElementById("id").value;

	var userId = document.getElementById("userId").value;
	var jobTitleName = document.getElementById("jobTitleName").value;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	
	
	
	var department = document.getElementById("department").value;
	var employeeCode = document.getElementById("employeeCode").value;
	var emailAddress = document.getElementById("emailAddress").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	
	
	
	data = {_id:_id,userId:userId, jobTitleName: jobTitleName, firstName: firstName, lastName: lastName, department: department, employeeCode: employeeCode, emailAddress: emailAddress, phoneNumber: phoneNumber};
	
	
	
	
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
