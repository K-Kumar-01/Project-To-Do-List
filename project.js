const ProjectCreate = (name,description,id) =>{

  return {name,description,id}

}
let activeProject;
let rps=document.querySelectorAll('.remove'),eps = document.querySelectorAll('.edit');
function updatelists(){
  rps = document.querySelectorAll('.remove');
  eps = document.querySelectorAll('.edit');

}


if(JSON.parse(localStorage.getItem('projectsinmytodolistare:'))){
  activeProject=JSON.parse(localStorage.getItem('projectsinmytodolistare:'))[0];
  showActiveProject(activeProject)
}

function showActiveProject(z){
  document.querySelector('.project-name').innerText=z.name;
}


function getActiveProject(e){
  activeProject = e.parentNode.parentNode.id;
  activeProject = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))[activeProject];
  showActiveProject(activeProject)
  emptyTaskList();
  TaskListFunctions.displayTaskList(TaskListFunctions.getListId(activeProject.id).name);
}


const projectAdd = (()=>{

  let projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
  let id;

  const getProjlist = () =>{
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    id=projlist.length || 0;
    console.log(Array.isArray(projlist));
    return projlist;

  }

  const Addproject = (p) =>{
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    identity=projlist.length || 0;
    console.log(identity)

    projlist.push(p);

    localStorage.setItem('projectsinmytodolistare:',JSON.stringify(projlist))

    activeProject=p;
    showActiveProject(activeProject);
    emptyTaskList();
    TaskListFunctions.displayTaskList(TaskListFunctions.getListId(activeProject.id).name);



    id++;

  }
  const updateThelists = ()=>{
    updatelists()
  }
  const getid = () =>{
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    id=projlist.length || 0;
    return id;
  }

  const deleteProject =(z) =>{
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    if(projlist.length==1){
      localStorage.removeItem('projectsinmytodolistare:')
      return;
    }
    for (let j=z;j<projlist.length;j++)
    {
      projlist[j].id=projlist[j].id-1;
    }

  }
  const editProject = (z) =>{
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    console.log(projlist)
    console.log(z);
    let title=document.getElementById('changed-projectTitle').value
    let description= document.getElementById('changed-projectDescription').value;
    let changedproject = ProjectCreate(title,description,z);
    console.log(changedproject)
    projlist.splice(z,1,changedproject);
    activeProject = changedproject;
    showActiveProject(changedproject);

    localStorage.setItem('projectsinmytodolistare:',JSON.stringify(projlist))



  }

  const removeProject = (z) =>{
    projlist =JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    if(projlist.length==1){

      deleteProject(z);
      return;
    }
    deleteProject(z);
    projlist.splice(z,1);
    localStorage.setItem('projectsinmytodolistare:',JSON.stringify(projlist))
    updatelists();
    id--;

  }

  const displayProjects = () => {
    projlist = JSON.parse(localStorage.getItem('projectsinmytodolistare:'))||[];
    // console.log(projlist.length)
    for(let j=0;j<projlist.length;j++){
      document.querySelector('.project-list').innerHTML += `<div class="project-container" id='${projlist[j].id}'>
          <div class="top-bar">
            <div class="project-heading" onclick="getActiveProject(this)">
              ${projlist[j].name}

            </div>
            <div class="functions">
              <span class='edit' data-target='#EditProject' data-toggle='modal'><i class="fa fa-file-text-o"></i></span>
              <span class='remove' data-target='#SureDelete' data-toggle='modal'>Remove<i class="fa fa-times"></i></span>

            </div>

          </div>
          <div class="project-details">
          ${projlist[j].description}

          </div>

        </div>`
    }

  }

  return {
    editProject,
    displayProjects,
    Addproject,
    updateThelists,
    getProjlist,
    removeProject,
    getid,
  };


})();

const emptyProjectList=()=>{
  document.querySelector('.project-list').innerHTML=''

}
const emptyTaskList =() =>{
  document.getElementById('accordion').innerHTML=''
}


projectAdd.displayProjects();


const TaskCreate = (name,description,priority,datedue,id,done) =>{
  return {name,description,priority,datedue,id,done}

}

const TaskListFunctions = (() =>{

  let id;
  let tasklist;

  const getListId = (z) =>{
    let w= JSON.parse(localStorage.getItem('projectsinmytodolistare:'))

    return w[z];

  }

  const prepareTaskList = (z) =>{
    let temp =  getListId(z).name
    tasklist = JSON.parse(localStorage.getItem(temp))|| []
    return tasklist.length

  }


  const addTaskToList =(z,task) =>{
    tasklist = JSON.parse(localStorage.getItem(z))||[];
    console.log(tasklist);
    tasklist.push(task);
    console.log(tasklist);
    console.log("temp is" + z);
    localStorage.setItem(z,JSON.stringify(tasklist))

  }

  const displayTaskList = (z) =>{
    tasklist = JSON.parse(localStorage.getItem(z))||[];
    for(let i=0;i<tasklist.length;i++){
      if(tasklist[i].priority=='High Priority'){
        classHere='high-priority'
        borderHere = 'high-priority-b';
      }
      else if(tasklist[i].priority=='Medium Priority'){
        classHere='medium-priority'
        borderHere = 'medium-priority-b';
      }
      else if(tasklist[i].priority=='Low Priority'){
        classHere='low-priority'
        borderHere = 'low-priority-b';
      }

      if(tasklist[i].done=='Yes'){
        backgroundHere='done-task'
        textHere='done-task-line'
        checkorNot='fa fa-check-circle-o'
      }
      else if(tasklist[i].done=='No'){
        backgroundHere=''
        textHere=''
        checkorNot='fa fa-circle-thin'
      }




      document.getElementById('accordion').innerHTML+=`<div class="card">
        <div class="card-header task-name ${borderHere} ${backgroundHere}">
          <h5 class="mb-0">
            <div class="show-flex" style="display:flex;justify-content:space-between;">
              <div>
              <i class="${checkorNot}" onclick="ToggleIcon(this)" style='display'></i>
                <button class="btn collapsed ${textHere}" data-toggle="collapse" data-target="#${tasklist[i].name}+${tasklist[i].id}" aria-expanded="false" aria-controls="collapseTwo">
                  ${tasklist[i].name}
                </button>
              </div>

              <div >
                <span class='edit-task' onclick='editthisTaskListElement(this)' data-target='#EditListTask' data-toggle='modal'>Edit <i class="fa fa-file-text-o"></i></span>
                <span class='remove-task' onclick='deletethisTaskListElement(this)' data-target='#SureDeleteTask' data-toggle='modal'>Remove<i class="fa fa-times"></i></span>
              </div>
            </div>
          </h5>
        </div>
        <div id="${tasklist[i].name}+${tasklist[i].id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
          <div class="card-body task-description">
            <p>${tasklist[i].description}</p>
            <p>
              <span class=${classHere}>${tasklist[i].priority} </span>
            </p>
            <p class='date-section'>
              <em>DUE DATE: ${tasklist[i].datedue}</em>
            </p>
          </div>
        </div>
      </div>
      <br>`

    }

  }

  const editTaskList =(z,compareto)=>{
    tasklist = JSON.parse(localStorage.getItem(z))||[];

    for(let i=0;i<tasklist.length;i++){

      if((`#${tasklist[i].name}+${tasklist[i].id}`)==compareto){
        let changedTaskName = document.getElementById('changed-taskName').value;
        let changedTaskPriority = document.getElementById('changed-taskPriority').value;
        let changedTaskDescription = document.getElementById('changed-taskDescription').value;
        let changedTaskDueDate = document.getElementById('changed-dueDate').value;

        let editedTask = TaskCreate(changedTaskName,changedTaskDescription,changedTaskPriority,changedTaskDueDate,i,'No')

        tasklist.splice(i,1,editedTask)

        let indexInserted = TaskListFunctions.getListId(activeProject.id).name;

        localStorage.setItem(indexInserted,JSON.stringify(tasklist));

        break;

      }

    }
  }

  const deleteTaskList = (z,compareto)=>{
    tasklist = JSON.parse(localStorage.getItem(z))||[];

    for(let i=0;i<tasklist.length;i++){
        if(tasklist.length==1){
          let indexInserted = TaskListFunctions.getListId(activeProject.id).name;
          alert(indexInserted)
          localStorage.removeItem(indexInserted);
          break;
        }
        if((`#${tasklist[i].name}+${tasklist[i].id}`)==compareto){
          tasklist.splice(i,1);
          let indexInserted = TaskListFunctions.getListId(activeProject.id).name;
          localStorage.setItem(indexInserted,JSON.stringify(tasklist));
          break;


        }
    }


  }

  const editCompletion = (z,compareto) =>{
    tasklist = JSON.parse(localStorage.getItem(z))||[];
    for(let i=0;i<tasklist.length;i++){
        if((`#${tasklist[i].name}+${tasklist[i].id}`)==compareto){
          if(tasklist[i].done=='Yes'){
            tasklist[i].done='No';
          }
          else if(tasklist[i].done=='No'){
            tasklist[i].done='Yes'


          }
          console.log(tasklist[i].done);
          let indexInserted = TaskListFunctions.getListId(activeProject.id).name;
          localStorage.setItem(indexInserted,JSON.stringify(tasklist));
          break;


        }
    }

  }



  return {
    getListId,
    prepareTaskList,
    addTaskToList,
    displayTaskList,
    editTaskList,
    deleteTaskList,
    editCompletion,
  }

})()

let task = TaskCreate('yours','suck','chl na',0,'none');
let tasks = TaskCreate('yourdasds','sfasuck','cfsahl nfga',1,'noghne');
emptyTaskList()
if(projectAdd.getid()>0){

  TaskListFunctions.displayTaskList(activeProject.name)
}
