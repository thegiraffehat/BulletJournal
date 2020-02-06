console.log("Logging you on, Shepard");

var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var todoBucket=document.getElementById("incomplete-tasks");
var doneBucket=document.getElementById("completed-tasks");


var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}


//add a task
var addTask=function(){
	console.log("I added your task, Shepard");

	var listItem=createNewTaskElement(taskInput.value);

	todoBucket.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value="";

}

//edit a task

var editTask=function(){

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		listItem.classList.toggle("editMode");
}




//delete a task
var deleteTask=function(){
		console.log("I deleted your task, Shepard");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);

}


//mark a task as completed
var taskCompleted=function(){
		console.log("Your task has been marked as complete, Shepard");
	
	var listItem=this.parentNode;
	doneBucket.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}

//mark a task as incomplete
var taskIncomplete=function(){
		console.log("I've moved your task back to the to do list, Shepard");
		var listItem=this.parentNode;
	todoBucket.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}


//ajax request?????
var ajaxRequest=function(){
}

// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<todoBucket.children.length;i++){
		bindTaskEvents(todoBucket.children[i],taskCompleted);
	}


	for (var i=0; i<doneBucket.children.length;i++){
		bindTaskEvents(doneBucket.children[i],taskIncomplete);
	}
