const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
  try {
    const response = await fetch(`/todo-item/list/${id}`);
    const task = await response.json();

    console.log(task);
    taskIDDOM.textContent = task._id;
    taskNameDOM.value = task.title;
    tempName = task.tile;
    if (task.completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const taskCompleted = taskCompletedDOM.checked;

    if(taskCompleted){
      await axios.post(`/todo-item/mark-as-done/${id}`, {
        status: taskCompleted,
      });
    }else{
      await axios.post(`/todo-item/mark-as-not-done/${id}`, {
        status: taskCompleted,
      });
    }

    const response = await fetch(`/todo-item/list/${id}`);
    const task = await response.json();

    taskIDDOM.textContent = task._id;
    taskNameDOM.value = task.title;
    tempName = task.title;

    
    if (task.completed) {
        taskCompletedDOM.checked = true;
      }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
