window.onload = function () {
  storage();
};
let startName = document.querySelector('[type="text"]');
let startButton = document.querySelector('[type="button"]');
let duration = 1000;
let memoryGameContainer = document.querySelector(".memory-game");
let memoryGame = Array.from(memoryGameContainer.children);
let boxCounter = memoryGame.length;
let closed = document.querySelector(".closed");
let opened = document.querySelector(".opened");
let orderBoxs = [...Array(memoryGame.length).keys()];
let counterMistake = 0;
let counterOpened = 0;
closed.innerHTML = memoryGame.length / 2;
startButton.onclick = function () {
  if (startName.value != "") {
    document.querySelector(".game").classList.remove("show");
    document.querySelector(".start-game").classList.add("hidden");
    document.querySelector("h1.name").innerHTML = startName.value;
    setTimeout(() => {
      memoryGame.forEach(function (element) {
        element.classList.add("turn");
        setTimeout(function () {
          element.classList.remove("turn");
        }, duration);
        element.style.pointerEvents = "all";
      });
      timer();
    }, duration + 300);
  }
};
shuffle(orderBoxs);
memoryGame.forEach(function (box, index) {
  box.style.order = orderBoxs[index];
  box.addEventListener("click", function () {
    turnBox(box);
  });
});
function turnBox(selectBox) {
  selectBox.classList.add("turn");
  let allSelectBox = memoryGame.filter((e) => e.classList.contains("turn"));
  if (allSelectBox.length === 2) {
    stopClicking();
    checkBox(allSelectBox[0], allSelectBox[1]);
  }
}
function stopClicking() {
  memoryGameContainer.classList.add("no-turn");
  setTimeout(function () {
    memoryGameContainer.classList.remove("no-turn");
  }, duration);
}
function checkBox(firstElement, scoundElement) {
  let misTake = document.querySelector(".mistake");
  if (
    firstElement.getAttribute("data-technolgy") ===
    scoundElement.getAttribute("data-technolgy")
  ) {
    firstElement.classList.remove("turn");
    scoundElement.classList.remove("turn");
    firstElement.classList.add("infiniteturn");
    scoundElement.classList.add("infiniteturn");
    closed.innerHTML = parseInt(closed.innerHTML) - 1;
    opened.innerHTML = parseInt(opened.innerHTML) + 1;
    document.querySelector(".saccess").play();
    if (parseInt(closed.innerHTML) == 0) {
      createList();
      document.querySelector(".end-game").style.display = "flex";
    }
  } else {
    setTimeout(function () {
      firstElement.classList.remove("turn");
      scoundElement.classList.remove("turn");
    }, duration);
    misTake.innerHTML = parseInt(misTake.innerHTML) + 1;
    document.querySelector(".fail").play();
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
// Color
let artIcon = document.querySelector(".icon i");
let divColors = document.querySelector(".colors");
let spanColors = Array.from(divColors.children);
let arr1 = ["004d73", "76daff", "005696"];
let arr2 = ["d5641c", "f8dfc2", "c9510c"];
let arr3 = ["7e245c", "e1306c", "fadfd8"];
artIcon.addEventListener("click", function () {
  divColors.classList.toggle("hidden");
});
divColors.onmouseleave = function () {
  divColors.classList.add("hidden");
};
divColors.onclick = function () {
  divColors.classList.remove("hidden");
};
spanColors.forEach(function (span, index) {
  span.onclick = function () {
    removeChose(span);
  };
});
function removeChose(selectSpan) {
  spanColors.forEach(function (span) {
    span.classList.remove("chose");
  });
  selectSpan.classList.add("chose");
  if (selectSpan.classList.contains("c3")) {
    storageColor(...arr3);
  } else if (selectSpan.classList.contains("c2")) {
    storageColor(...arr2);
  } else {
    storageColor(...arr1);
  }
}
function storageColor(headProject, bodyProject, elementProject) {
  localStorage.setItem("colorHead", headProject);
  localStorage.setItem("colorBody", bodyProject);
  localStorage.setItem("colorElement", elementProject);
  storage();
}
function colorBackground(headProject, bodyProject, elementProject) {
  document.querySelector(".header").style.backgroundColor = `#${headProject}`;
  memoryGameContainer.style.backgroundColor = `#${bodyProject}`;
  memoryGame.forEach((e) => (e.style.background = `#${elementProject}`));
}
// time
let scoundSpan = document.querySelector(".scound");
let miniteSpan = document.querySelector(".minite");
let hourSpan = document.querySelector(".hour");
function timer() {
  let timeInterval = setInterval(function () {
    if (parseInt(closed.innerHTML) == 0) {
      clearInterval(timeInterval);
    } else {
      scoundSpan.innerHTML = parseInt(scoundSpan.innerHTML) + 1;
      timeClock();
    }
  }, 1000);
}
function timeClock() {
  if (parseInt(scoundSpan.innerHTML) == 60) {
    scoundSpan.innerHTML = "00";
    miniteSpan.innerHTML = parseInt(miniteSpan.innerHTML) + 1;
  }
  if (parseInt(miniteSpan.innerHTML) == 60) {
    miniteSpan.innerHTML = "00";
    hourSpan.innerHTML = parseInt(hourSpan.innerHTML) + 1;
  }
  timeDesign();
}
function timeDesign() {
  if (parseInt(scoundSpan.innerHTML) < 10) {
    scoundSpan.innerHTML = "0" + parseInt(scoundSpan.innerHTML);
  }
  if (parseInt(miniteSpan.innerHTML) < 10) {
    miniteSpan.innerHTML = "0" + parseInt(miniteSpan.innerHTML);
  }
}
document.querySelector(".end-game .button").onclick = function () {
  location.reload();
};
function createList() {
  let listDiv = document.createElement("div");
  listDiv.classList.add("list");
  listDiv.innerHTML = `
    <span class="name">${
      document.querySelector(".header h1.name").innerHTML
    }</span>
    <span><span class="hour">${
      hourSpan.innerHTML
    }</span>:<span class="minite">${
    miniteSpan.innerHTML
  }</span>:<span class="scound">${scoundSpan.innerHTML}</span></span>
    <span>${document.querySelector(".mistake").innerHTML}</span>
  `;
  document.querySelector(".list-game .content").prepend(listDiv);
  localStorage.setItem(
    "listStorage",
    JSON.stringify(document.querySelector(".list-game .content").innerHTML)
  );
  storage();
}
function storage() {
  let headerColor = localStorage.getItem("colorHead");
  let memorGameColor = localStorage.getItem("colorBody");
  let contentMemoryGameColor = localStorage.getItem("colorElement");
  document.querySelector(".list-game .content").innerHTML = JSON.parse(
    localStorage.getItem("listStorage")
  );
  colorBackground(headerColor, memorGameColor, contentMemoryGameColor);
}
