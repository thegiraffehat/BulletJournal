console.log("Logging you on, Shepard");

var dailyInput=document.getElementById("new-daily-task");
var weeklyInput=document.getElementById("new-weekly-task");
var addDailyTask=document.getElementById("add-daily");
var addWeeklyTask=document.getElementById("add-weekly");
var todoDailyBucket=document.getElementById("incomplete-daily");
var doneDailyBucket=document.getElementById("completed-daily");
var todoWeeklyBucket=document.getElementById("incomplete-weekly");
var doneWeeklyBucket=document.getElementById("completed-weekly");


//functionality for daily task list

var createNewDailyTask=function(taskString){

	var dailyItem=document.createElement("li");
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

	dailyItem.appendChild(checkBox);
	dailyItem.appendChild(label);
	dailyItem.appendChild(editInput);
	dailyItem.appendChild(editButton);
	dailyItem.appendChild(deleteButton);
	return dailyItem;
}


//add a task
var addDaily=function(){
	console.log("I added your task, Shepard");

	var dailyItem=createNewDailyTask(dailyInput.value);

	todoDailyBucket.appendChild(dailyItem);
	bindDailyEvents(dailyItem, dailyCompleted);
	dailyInput.value="";

}

//edit a task

var editDaily=function(){

var dailyItem=this.parentNode;

var editInput=dailyItem.querySelector('input[type=text]');
var label=dailyItem.querySelector("label");
var containsClass=dailyItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		dailyItem.classList.toggle("editMode");
}




//delete a task
var deleteDaily=function(){
		console.log("I deleted your task, Shepard");

		var dailyItem=this.parentNode;
		var ul=dailyItem.parentNode;
		ul.removeChild(dailyItem);

}


//mark a task as completed
var dailyCompleted=function(){
		console.log("Your task has been marked as complete, Shepard");
	
	var dailyItem=this.parentNode;
	doneDailyBucket.appendChild(dailyItem);
				bindDailyEvents(dailyItem, dailyIncomplete);

}

//mark a task as incomplete
var dailyIncomplete=function(){
		console.log("I've moved your task back to the to do list, Shepard");
		var dailyItem=this.parentNode;
	todoDailyBucket.appendChild(dailyItem);
			bindDailyEvents(dailyItem,dailyCompleted);
}


//ajax request
var ajaxRequest=function(){
}

// addButton.onclick=addTask;
addDailyTask.addEventListener("click",addDaily);
addDailyTask.addEventListener("click",ajaxRequest);


var bindDailyEvents=function(taskdailyItem,checkBoxEventHandler){
	var checkBox=taskdailyItem.querySelector("input[type=checkbox]");
	var editButton=taskdailyItem.querySelector("button.edit");
	var deleteButton=taskdailyItem.querySelector("button.delete");

			editButton.onclick=editDaily;
			deleteButton.onclick=deleteDaily;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<todoDailyBucket.children.length;i++){
		bindDailyEvents(todoDailyBucket.children[i],dailyCompleted);
	}


	for (var i=0; i<doneDailyBucket.children.length;i++){
		bindDailyEvents(doneDailyBucket.children[i],dailyIncomplete);
	}

//functionality for weekly task list

var createNewWeeklyTask=function(taskString){

	var weeklyItem=document.createElement("li");
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

	weeklyItem.appendChild(checkBox);
	weeklyItem.appendChild(label);
	weeklyItem.appendChild(editInput);
	weeklyItem.appendChild(editButton);
	weeklyItem.appendChild(deleteButton);
	return weeklyItem;
}


//add a task
var addWeekly=function(){
	console.log("I added your task, Shepard");

	var weeklyItem=createNewWeeklyTask(weeklyInput.value);

	todoWeeklyBucket.appendChild(weeklyItem);
	bindWeeklyEvents(weeklyItem, weeklyCompleted);
	weeklyInput.value="";

}

//edit a task

var editWeekly=function(){

var weeklyItem=this.parentNode;

var editInput=weeklyItem.querySelector('input[type=text]');
var label=weeklyItem.querySelector("label");
var containsClass=weeklyItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		weeklyItem.classList.toggle("editMode");
}




//delete a task
var deleteWeekly=function(){
		console.log("I deleted your task, Shepard");

		var weeklyItem=this.parentNode;
		var ul=weeklyItem.parentNode;
		ul.removeChild(weeklyItem);

}


//mark a task as completed
var weeklyCompleted=function(){
		console.log("Your task has been marked as complete, Shepard");
	
	var weeklyItem=this.parentNode;
	doneWeeklyBucket.appendChild(weeklyItem);
				bindWeeklyEvents(weeklyItem, weeklyIncomplete);

}

//mark a task as incomplete
var weeklyIncomplete=function(){
		console.log("I've moved your task back to the to do list, Shepard");
		var weeklyItem=this.parentNode;
	todoWeeklyBucket.appendChild(weeklyItem);
			bindWeeklyEvents(weeklyItem,weeklyCompleted);
}


//ajax request
var ajaxRequest=function(){
}

// addButton.onclick=addTask;
addWeeklyTask.addEventListener("click",addWeekly);
addWeeklyTask.addEventListener("click",ajaxRequest);


var bindWeeklyEvents=function(taskWeeklyItem,checkBoxEventHandler){
	var checkBox=taskWeeklyItem.querySelector("input[type=checkbox]");
	var editButton=taskWeeklyItem.querySelector("button.edit");
	var deleteButton=taskWeeklyItem.querySelector("button.delete");

			editButton.onclick=editWeekly;
			deleteButton.onclick=deleteWeekly;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<todoWeeklyBucket.children.length;i++){
		bindWeeklyEvents(todoWeeklyBucket.children[i],weeklyCompleted);
	}


	for (var i=0; i<doneWeeklyBucket.children.length;i++){
		bindWeeklyEvents(doneWeeklyBucket.children[i],weeklyIncomplete);
	}
