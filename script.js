let currHour;
let currMinute;
let currSecond;
let curram_pm = "AM";

// html span element for set real time
const currTime = document.getElementById("time");

// function to get the current time and set it on the heading div
function setTime() {
  let time = new Date();
  currHour = time.getHours();
  currMinute = time.getMinutes();
  currSecond = time.getSeconds();
  curram_pm = "AM";
  if (currHour > 11) {
    currHour -= 12;
    curram_pm = "PM";
  }

  currHour = currHour == 0 ? 12 : currHour;

  currHour = currHour < 10 ? "0" + currHour : currHour;
  currMinute = currMinute < 10 ? "0" + currMinute : currMinute;
  currSecond = currSecond < 10 ? "0" + currSecond : currSecond;

  // set real time
  currTime.innerText = `${currHour} : ${currMinute} : ${currSecond}  ${curram_pm}`;
}

// setInterval to continue getting right time and for check every sec if any alarm exist of current time
setInterval(() => {
  setTime();
  for (let i = 0; i < alarms.childElementCount; i++) {
    if (alarms.children[i].innerText.includes(currTime.innerText)) {
      alert(`It's ${currTime.innerText}`);
    }
  }
}, 1000);

// to set more relevant alarm of current time
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");
const AM_PM = document.getElementById("AM_PM");
function x() {
  setTime();
  h.innerText = currHour;
  m.innerText = currMinute;
  s.innerText = currSecond;
  AM_PM.innerText = curram_pm;
}
x();

// to select hours in set alarm
const selectHours = document.getElementById("selectHours");
for (let i = 1; i <= 12; i++) {
  let opt = document.createElement("option");
  if (i < 10) {
    opt.text = "0" + i;
  } else {
    opt.text = i;
  }
  selectHours.appendChild(opt);
}
// to select minutes in set alarm
const selectMinutes = document.getElementById("selectMinutes");
for (let i = 0; i <= 59; i++) {
  let opt = document.createElement("option");
  if (i < 10) {
    opt.text = "0" + i;
  } else {
    opt.text = i;
  }
  selectMinutes.appendChild(opt);
}
// to select seconds in set alarm
const selectSeconds = document.getElementById("selectSeconds");
for (let i = 0; i <= 59; i++) {
  let opt = document.createElement("option");
  if (i < 10) {
    opt.text = "0" + i;
  } else {
    opt.text = i;
  }
  selectSeconds.appendChild(opt);
}

// add change eventlistener to change in set alarm 
let a = h.innerText;
let b = m.innerText;
let c = s.innerText;
let d = AM_PM.innerText;
selectHours.addEventListener("change", (event) => {
  a = event.target.value;
});
selectMinutes.addEventListener("change", (event) => {
  b = event.target.value;
});
selectSeconds.addEventListener("change", (event) => {
  c = event.target.value;
});
document.getElementById("selectAM_PM").addEventListener("change", (event) => {
  d = event.target.value;
});

const alarms = document.getElementById("alarms");
// add click eventlistener to set alarm
setAlarm.addEventListener("click", () => {
  const noAlarm = document.getElementById("no-alarm");
  if (noAlarm) {
    noAlarm.remove();
  }
  const alarmsList = document.createElement("p"); // create alarm with hour, min, sec...
  alarmsList.classList.add("alarmsList");
  alarmsList.innerText = `${a} : ${b} : ${c} ${d}`;
  alarms.appendChild(alarmsList);
  const deleteButton = document.createElement("button"); // create delete button for delete exist alarm
  deleteButton.type = "button";
  deleteButton.classList.add("deleteButton");
  deleteButton.innerText = "delete";
  alarmsList.appendChild(deleteButton);
  const clickDeleteButton = document.querySelectorAll(".deleteButton");
  // add delete button for delete exist alarm
  clickDeleteButton.forEach((element) => {
    element.addEventListener("click", () => {
      element.parentElement.remove();
      if (document.getElementById("alarms").childElementCount == 0) {
        document.getElementById("alarms").innerHTML =
          '<p id="no-alarm">--- no alarms ---</p>';
      }
    });
  });
});

