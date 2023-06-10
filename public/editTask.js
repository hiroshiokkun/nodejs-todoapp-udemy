const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");

const params = window.location.search;
// console.log(params);
const id = new URLSearchParams(params).get("id");
console.log(id);
//1つのタスクを取得する
const showTask = async () => {
  try {
    //編集しているタスク情報を取得
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name } = task;
    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();
//タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  editBtnDOM.textContent = "読み込み中・・・";
  try {
    const taskName = taskNameDOM.value;
    taskCompleted = taskCompletedDOM.checked;
    //編集開始
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { _id: taskID, completed, name } = task;
    console.log(task._id); //ここか１番上のタスクIDになってる。本来は更新した新しいIDになるはずだ・・・
    console.log(taskID);

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `編集に成功しました`;
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `エラーです。もう一度試してください。`;
  }
  editBtnDOM.textContent = "編集";

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
