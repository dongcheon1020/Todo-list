// 유저가 값을 입력한다
// + 버튼을 클릭하면 새로운 리스트가 생긴다
// 딜리트 버튼을 누르면 할일이 삭제된다
// 체크 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만 진행중탭은 진행중인 탭만
// 전체탭을 누르면 다시 전체 아이템으로 이동

let taskInput = document.getElementById("task-input");
let addBt = document.getElementById("add-bt");
let taskList = [];
let tabs = document.querySelectorAll(".task-item-bt");
let mode = "all";
let filterList = [];
let underLine = document.querySelector(".under-line");
let taskItemBts = document.querySelectorAll(".task-item-bt");
let all = document.getElementById("all");

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addBt.click();
    taskInput.value = "";
  }
});
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

underLine.style.left = all.offsetLeft + "px";
underLine.style.width = all.offsetWidth + "px";
underLine.style.top = all.offsetTop + all.offsetHeight + "px";

taskItemBts.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalUnderLine(e))
);
function horizontalUnderLine(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

addBt.addEventListener("click", addTask);

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    filter(e);
  });
}

addBt.addEventListener("click", addTask);

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    filter(e);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";

  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="tesk-done-container list-item">
            <button onclick="toggleComplete('${list[i].id}')" class="item-bt check">
            <img src="arrow.counterclockwise.circle 1.svg" alt="replay">
            </button>
            <span class="tesk-done item-text">${list[i].taskContent}</span>
            <button onclick="deleteTask('${list[i].id}')" class="item-bt delete">
                <img src="trash.circle 1.svg" alt="delete" />
            </button>
        </div>
        `;
    } else {
      resultHTML += `
        <div class="list-item">
            <button onclick="toggleComplete('${list[i].id}')" class="item-bt check">
                <img src="checkmark.circle 1.svg" alt="check" />
            </button>
            <span class="item-text">${list[i].taskContent}</span>
            <button onclick="deleteTask('${list[i].id}')" class="item-bt delete">
                <img src="trash.circle 1.svg" alt="delete" />
            </button>
        </div>
    `;
    }
  }

  document.querySelector(".list").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      //   break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
  }
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
