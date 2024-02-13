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

console.log(taskInput);

addBt.addEventListener("click", addTask);

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `
        <div class="list-item">
            <button class="item-bt check">
                <img src="checkmark.circle 1.svg" alt="check" />
            </button>
            <span class="item-text">${taskList[i]}</span>
            <button class="item-bt delete">
                <img src="trash.circle 1.svg" alt="delete" />
            </button>
        </div>
    `;
  }
  document.querySelector(".list").innerHTML = resultHTML;
}
