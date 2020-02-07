console.log("Logging you on, Shepard");

var dailyInput=document.getElementById("new-daily-task");
var weeklyInput=document.getElementById("new-weekly-task");
var addDailyTask=document.getElementById("add-daily");
var addWeeklyTask=document.getElementById("add-weekly");
var todoDailyBucket=document.getElementById("incomplete-daily");
var doneDailyBucket=document.getElementById("completed-daily");
var todoWeeklyBucket=document.getElementById("incomplete-weekly");
var doneWeeklyBucket=document.getElementById("completed-weekly");


var createNewTask=function(taskString){

	var todoItem=document.createElement("li");
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

	todoItem.appendChild(checkBox);
	todoItem.appendChild(label);
	todoItem.appendChild(editInput);
	todoItem.appendChild(editButton);
	todoItem.appendChild(deleteButton);
	return todoItem;
}

var addTask=function(){
	var todoItem=this.parentNode;
	var todoList = todoItem.parentNode;
	if(todoList===dailyBucket){
		var todoItem=createNewTask(dailyInput.value);

		todoDailyBucket.appendChild(todoItem);
		bindEvents(todoItem, taskCompleted);
		dailyInput.value="";
	} else {
		var todoItem=createNewTask(weeklyInput.value);

		todoWeeklyBucket.appendChild(todoItem);
		bindEvents(todoItem, taskCompleted);
		weeklyInput.value="";
	}

	console.log("I added your task, Shepard");
}


//edit a task

var editTask=function(){

var todoItem=this.parentNode;

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
	var todoItem=this.parentNode;
	var todoList = todoItem.parentNode;

	if(todoList===todoDailyBucket){
	doneDailyBucket.appendChild(todoItem);
	}

	else{
		doneWeeklyBucket.appendChild(todoItem);
	}
	bindEvents(todoItem, taskIncomplete);

	console.log("Your task has been marked as complete, Shepard");
}

//mark a task as incomplete
var taskIncomplete=function(){
		var todoItem=this.parentNode;
		var todoList = todoItem.parentNode;
		if(todoList===doneDailyBucket){
		todoDailyBucket.appendChild(todoItem);
		}
		else{
			todoWeeklyBucket.appendChild(todoItem);
		}
			bindEvents(todoItem,taskCompleted);

	console.log("I've moved your task back to the to do list, Shepard");
}



addDailyTask.addEventListener("click",addTask);
addWeeklyTask.addEventListener("click",addTask);

var bindEvents=function(taskItem,checkBoxEventHandler){
	var checkBox=taskItem.querySelector("input[type=checkbox]");
	var editButton=taskItem.querySelector("button.edit");
	var deleteButton=taskItem.querySelector("button.delete");

			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<todoDailyBucket.children.length;i++){
		bindEvents(todoDailyBucket.children[i],taskCompleted);
	}


	for (var i=0; i<doneDailyBucket.children.length;i++){
		bindEvents(doneDailyBucket.children[i],taskIncomplete);
	}

	for (var i=0; i<todoWeeklyBucket.children.length;i++){
		bindEvents(todoWeeklyBucket.children[i],taskCompleted);
	}


	for (var i=0; i<doneWeeklyBucket.children.length;i++){
		bindEvents(doneWeeklyBucket.children[i],taskIncomplete);
	}

