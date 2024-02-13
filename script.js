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
let tabs = document.querySelectorAll(".task-item-bg");
let mode = "all";
let filterList = [];

console.log(tabs);

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
        <div class="list-item">
            <button onclick="toggleComplete('${list[i].id}')" class="item-bt check">
                <img src="checkmark.circle 1.svg" alt="check" />
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
  console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(e) {
  mode = e.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
