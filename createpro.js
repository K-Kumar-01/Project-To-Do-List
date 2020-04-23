document.getElementById('createProject').addEventListener('click',()=>{
  let title=document.getElementById('projectTitle').value
  let description= document.getElementById('projectDescription').value;
  if(title=='' || description ==''){
    alert('All Fields are required');
    return;
  }
  let project = ProjectCreate(title,description,projectAdd.getid());
  projectAdd.Addproject(project)
  emptyProjectList();
  updatelists();
  window.location.reload();
})

document.getElementById('addTask').addEventListener('click',()=>{

  let taskName = document.getElementById('taskName').value;
  let taskPriority = document.getElementById('taskPriority').value;
  let taskDescription = document.getElementById('taskDescription').value;
  let taskDueDate = document.getElementById('dueDate').value;
  let createdTask = TaskCreate(taskName,taskDescription,taskPriority,taskDueDate,TaskListFunctions.prepareTaskList(activeProject.id),'No')
  console.log(TaskListFunctions.prepareTaskList(activeProject.id))
  
  let indexInserted = TaskListFunctions.getListId(activeProject.id).name;
  console.log(indexInserted);
  TaskListFunctions.addTaskToList(indexInserted,createdTask)
  emptyTaskList();
  TaskListFunctions.displayTaskList(indexInserted)
})
