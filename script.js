// page 1
let startButton = document.querySelector("#start");
let oneContainer = document.querySelector(".one-container");
let twoContainer = document.querySelector(".two-container");
let threeContainer = document.querySelector(".three-container");
startButton.addEventListener("click", (e) => {
  oneContainer.style.animation = "slide-fade 0.6s ease-in";
});
oneContainer.addEventListener("animationend", (e) => {
  oneContainer.style.display = "none";
  twoContainer.style.opacity = "1";
});

// page 2
let secondButton = document.querySelector("#page2-button");
secondButton.addEventListener("click", (e) => {
  twoContainer.style.opacity = "0";
  twoContainer.style.display = "none";
  threeContainer.style.opacity = "1";
});
twoContainer.addEventListener("animationend", (e) => {});

let optionTexts = document.querySelectorAll(".option-text");
let optionContainers = document.querySelectorAll(".option-container");

let optionTextsData = ["WHAT'S THE PLACE?", "WHAT KIND DO YOU LIKE?"];
let optionContainersData = [
  [
    { img: "home.png", text: "HOME", clr: "#f45675" },
    { img: "home.svg", text: "CAFE", clr: "#FFCF00" },
    { img: "party.png", text: "CLUB", clr: "#0089FD" },
  ],
  [
    { img: "harmony.png", text: "SOOTHING", clr: "#f45675" },
    { img: "refreshing.png", text: "REFRESHING", clr: "#FFCF00" },
    { img: "energetic.png", text: "ENERGETIC", clr: "#0089FD" },
  ],
];

function highlight(e, clr) {
  e.stopPropagation();
  e.target.style.backgroundColor = "#000000";
  e.target.style.color = "#FFCF00";
  e.target.firstChild.style.filter =
    "brightness(0) saturate(100%) invert(79%) sepia(58%) saturate(2023%) hue-rotate(0deg) brightness(104%) contrast(103%)";
  e.target.removeEventListener("click", highlight);
  e.target.addEventListener("click", (e) => unhighlight(e, clr));
}
function unhighlight(e, clr) {
  e.stopPropagation();
  console.log(clr);
  e.target.style.backgroundColor = clr;
  e.target.style.color = "#ffffff";
  e.target.firstChild.style.filter = "";
  e.target.removeEventListener("click", unhighlight);
  e.target.addEventListener("click", (e, clr) => highlight(e, clr));
}

for (let i = 0; i < 2; i++) {
  optionTexts[i].innerHTML = optionTextsData[i];

  optionContainersData[i].forEach((data) => {
    let newOption = document.createElement("div");
    newOption.classList.add("option");
    newOption.style.backgroundColor = data.clr;
    newOption.addEventListener("click", (e) => highlight(e, data.clr));
    newOption.innerHTML = `<img src="images/${data.img}" alt="home" />${data.text}`;
    optionContainers[i].appendChild(newOption);
  });
}

// page 3
let bottles = document.querySelectorAll(".bottle");

let active = 0;

let newOrder = ["one", "two", "three"];
let order;

function onSwipe(direction) {
  let red = document.querySelector(".red-bottle");
  let yellow = document.querySelector(".yellow-bottle");
  let blue = document.querySelector(".blue-bottle");

  order = newOrder;
  if (direction === "right") {
    newOrder = [order[1], order[2], order[0]];
  } else {
    newOrder = [order[2], order[0], order[1]];
  }

  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      console.log(order[i], newOrder[i], "red");
      yellow.classList.remove(order[i]);
      yellow.classList.add(newOrder[i]);
      if (newOrder[i] === "two") {
        document.querySelector(".circle").style.backgroundColor = "#FFCF00";
        document.querySelector(".bottle-name").style.backgroundColor =
          "#FFCF00";
        document.querySelector(".bottle-name").style.color = "#000000";
        document.querySelector(".bottle-name").innerHTML = "GINGERADE";
      }
    }
    if (i === 1) {
      console.log(order[i], newOrder[i], "yellow");
      red.classList.remove(order[i]);
      red.classList.add(newOrder[i]);
      if (newOrder[i] === "two") {
        document.querySelector(".circle").style.backgroundColor = "#D04D3D";
        document.querySelector(".bottle-name").style.backgroundColor =
          "#D04D3D";
        document.querySelector(".bottle-name").style.color = "#FFFFFF";
        document.querySelector(".bottle-name").innerHTML = "HIBISCUS";
      }
    }
    if (i === 2) {
      console.log(order[i], newOrder[i], "blue");
      blue.classList.remove(order[i]);
      blue.classList.add(newOrder[i]);
      if (newOrder[i] === "two") {
        document.querySelector(".circle").style.backgroundColor = "#1AB6FF";
        document.querySelector(".bottle-name").style.backgroundColor =
          "#1AB6FF";
        document.querySelector(".bottle-name").style.color = "#FFFFFF";
        document.querySelector(".bottle-name").innerHTML = "CLASSIC";
      }
    }
  }
}

detectSwipe(onSwipe);

let startX, startY, endX, endY, moved;

function detectSwipe(resp) {
  threeContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let landingTouch = e.changedTouches[0];
    startX = landingTouch.pageX;
    startY = landingTouch.pageY;
  });
  threeContainer.addEventListener("touchend", (e) => {
    e.preventDefault();
    let landingTouch = e.changedTouches[0];
    endX = landingTouch.pageX;
    endY = landingTouch.pageY;
    if (endX - startX < endY - startY) {
      resp("left");
    } else if (endX - startX > endY - startY) {
      resp("right");
    }
  });

  threeContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    moved = false;
    startX = e.clientX;
    startY = e.clientY;
  });
  threeContainer.addEventListener("mousemove", (e) => {
    e.preventDefault();
    moved = true;
  });
  threeContainer.addEventListener("mouseup", (e) => {
    e.preventDefault();
    endX = e.clientX;
    endY = e.clientY;
    if (startX && startY && moved) {
      if (endX - startX < endY - startY) {
        resp("left");
      } else if (endX - startX > endY - startY) {
        resp("right");
      }
    }
  });
}
