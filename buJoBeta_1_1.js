console.log("Logging you on, Shepard");

var dailyInput=document.getElementById("new-daily-task");
var weeklyInput=document.getElementById("new-weekly-task");
var addDailyTask=document.getElementById("add-to-list-1");
var addWeeklyTask=document.getElementById("add-to-list-2");
var addNewList =document.getElementById("add-a-list");
var newListName = document.getElementById("new-list");



addNewList.addEventListener('click', function () {
	if(document.getElementById("new-list").value){

    var listNumber = document.querySelectorAll("h1").length;
    var listDiv=document.createElement("div");
    var listTitle = document.createElement("h1");
    var addHeader = document.createElement("h3");
	var addInput = document.createElement("input");
	var addBtn = document.createElement("button");
	var todoHeader = document.createElement("h3");
	var todoUL = document.createElement("ul");
	var completedHeader = document.createElement("h3");
	var completedUL = document.createElement("ul");


    listDiv.setAttribute('id', "list-" + listNumber);
    listDiv.setAttribute("class", "container");
    document.getElementById("task-lists").appendChild(listDiv);
  
    listTitle.innerText=document.getElementById("new-list").value;
    listDiv.appendChild(listTitle);

    addHeader.innerText = "Add a task";
    listDiv.appendChild(addHeader);

    addInput.setAttribute("type", "text")
    listDiv.appendChild(addInput);
    addInput.setAttribute("id", "add-list-" + listNumber + "-task");

    addBtn.innerText = "Add"
    listDiv.appendChild(addBtn);

   	todoHeader.innerText = "To do";
    listDiv.appendChild(todoHeader);
    listDiv.appendChild(todoUL);

    todoUL.setAttribute("id", "incomplete-list-" + listNumber);

    completedHeader.innerText = "Completed";
    listDiv.appendChild(completedHeader);
    listDiv.appendChild(completedUL);
    
    
    completedUL.setAttribute("id", "completed-list-" + listNumber);
    completedUL.setAttribute("class", "completed");


    addBtn.addEventListener("click", addTask);
    
   	newListName.value = "";


    console.log("I added your list, Shepard");
	}else{
	alert("Your list needs a title, Shepard");
}
})

var addTask=function(taskString){
	var todoItem = this.parentNode;
	var todoList = todoItem.getAttribute("id");
	var inputFieldName = "add-" + todoList + "-task";
	var inputField = document.getElementById(inputFieldName);
	var todoBucket = "incomplete-" + todoList;
	var todoBucketName = document.getElementById(todoBucket);
	var completedBucket = "completed-" + todoList;
	var completedBucketName = document.getElementById(completedBucket);

	var todoTask=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");

	todoTask.appendChild(checkBox);
	todoTask.appendChild(label);
	todoTask.appendChild(editInput);
	todoTask.appendChild(editButton);
	todoTask.appendChild(deleteButton);


	label.innerText=inputField.value;

	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	
	todoBucketName.appendChild(todoTask);
	bindEvents(todoTask, taskCompleted);

	inputField.value="";

	console.log("I added your task, Shepard");

}

addDailyTask.addEventListener("click", addTask);
addWeeklyTask.addEventListener("click", addTask);

//edit a task
var editTask=function(){

var todoItem = this.parentNode;
var todoList = todoItem.getAttribute("id");

var editInput=todoItem.querySelector('input[type=text]');
var label=todoItem.querySelector("label");
var containsClass=todoItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		todoItem.classList.toggle("editMode");
}


//delete a task
var deleteTask=function(){
		console.log("I deleted your task, Shepard");

		var todoItem=this.parentNode;
		var ul=todoItem.parentNode;
		ul.removeChild(todoItem);
}


//mark a task as completed
var taskCompleted=function(){	
	var todoItem = this.parentNode;
	var todoTask = todoItem.parentNode
	var todoList = todoTask.parentNode;
	var todoBucket = todoList.getAttribute("id");
	var completedBucket = "completed-" + todoBucket;
	var completedBucketName = document.getElementById(completedBucket);

	completedBucketName.appendChild(todoItem);
	bindEvents(todoItem,taskIncomplete);

	console.log("Your task has been marked as complete, Shepard");
}

//mark a task as incomplete
var taskIncomplete=function(){
	var todoItem = this.parentNode;
	var todoTask = todoItem.parentNode
	var todoList = todoTask.parentNode;
	var todoBucket = todoList.getAttribute("id");
	var incompleteBucket = "incomplete-" + todoBucket;
	var incompleteBucketName = document.getElementById(incompleteBucket);

	incompleteBucketName.appendChild(todoItem);
	todoItem.setAttribute("class", "#completed");
	bindEvents(todoItem,taskCompleted);

	console.log("I've moved your task back to the to do list, Shepard");
}



var bindEvents=function(taskItem,checkBoxEventHandler){
	var checkBox=taskItem.querySelector("input[type=checkbox]");
	var editButton=taskItem.querySelector("button.edit");
	var deleteButton=taskItem.querySelector("button.delete");

			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}



	
	for (var i=1; i<=document.getElementById("task-lists").querySelectorAll(".container").length; i++){
		var listName = "incomplete-list-" +i;
		var todoBucket = document.getElementById(listName);
		for (var u=0; u<todoBucket.children.length; u++){
			bindEvents(todoBucket.children[u],taskCompleted)
		}

	}

		for (var i=1; i<=document.getElementById("task-lists").querySelectorAll(".container").length; i++){
		var listName = "completed-list-" +i;
		var doneBucket = document.getElementById(listName);
		for (var u=0; u<doneBucket.children.length; u++){
			bindEvents(doneBucket.children[u],taskIncomplete)
		}

	}


