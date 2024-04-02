const form = document.querySelector("form");
const userName = document.querySelector(".username");
const role = document.querySelector(".role");
const btn = document.querySelector(".btn");
const add = document.querySelector(".add");
const timer = document.querySelector(".timer");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const playerList = document.querySelector("#playerList");



let info = [];
let roleArray = [];
let timeInSeconds = 120;
let isGameStarted = false;

function startGame() {
  if (!isGameStarted) {
    intervalId = setInterval(updateTimer, 1000);
    isGameStarted = true;
  }
}

function resetGame() {
  clearInterval(intervalId);
  timeInSeconds = 120;
  isGameStarted = false;
  displayTime();
 
}

displayTime();

  
function updateTimer() {
  if (timeInSeconds > 0) {
    timeInSeconds--;
    displayTime();
  } else {
    clearInterval(intervalId); 
    alert("Time's up!");
  }
}

function displayTime() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  if (minutes === 0 && seconds <= 30) {
    timer.style.color = "red";
  } else {
    timer.style.color = "";
  }
    
  

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

 
  timer.textContent = formattedTime;
}

const addHandler = (e) => {
  e.preventDefault(); 
  const usernameValue = userName.value;
  const roleValue = role.value;

  if (usernameValue) {
    info.push({ username: usernameValue, role: "" });
    userName.value = "";
  }

  if (roleValue && roleArray.length < info.length) {
    roleArray.push(roleValue);
    role.value = "";
  }
 
};

const submitHandler = () => {
  if (!info[0]) {
    alert("Please enter a name");
  } else if (!roleArray[0] || roleArray.length !== info.length) {
    alert("Please make sure all users have roles");
  } else {
    info.forEach((user) => {
      const randomIndex = Math.floor(Math.random() * roleArray.length);
      user.role = roleArray[randomIndex];
      roleArray.splice(randomIndex, 1);
    });

    updateTable();
  }
};

const updateTable = () => {
  let result = "";
  info.forEach((user) => {
    result += `<tr>
      <th>${user.username}</th>
      <th style="visibility: hidden;">${user.role}</th>
      <th><button class="show-role">Show Role</button></th>
      <th><button class="remove-player">Kill</button></th>
    </tr>`;
  });

  playerList.innerHTML = result;

  addShowRoleButton();
  removePlayer();
};

const addShowRoleButton = () => {
  const showRoleBtns = document.querySelectorAll(".show-role");

  showRoleBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const roleCell = playerList.rows[index].cells[1];
      roleCell.style.visibility = roleCell.style.visibility === "hidden" ? "visible" : "hidden";
    });
  });
};
  
const removePlayer = () => {
  const removePlayerBtns = document.querySelectorAll(".remove-player");

  removePlayerBtns.forEach((btn,index) => {
    btn.addEventListener("click", () => {
      // const index = event.target.dataset.index;
      info.splice(index, 1);
      roleArray.splice(index, 1);
      updateTable();
    });
  });
};
 


add.addEventListener("click", addHandler);
form.addEventListener("submit", addHandler);
btn.addEventListener("click", submitHandler);


start.addEventListener("click", () => {
  startGame();
});

reset.addEventListener("click", () => {
  resetGame();
});





