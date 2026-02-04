const input = document.getElementById("commandInput");
const output = document.getElementById("output");

const avatar = document.getElementById("profileAvatar");
const meta = document.getElementById("profileMeta");

let currentSection = "main";
let revealed = false;

/* =======================
   INPUT HANDLER
======================= */

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;
    runCommand(cmd);
    input.value = "";
  }
});

/* =======================
   COMMAND ROUTER
======================= */

function runCommand(cmd) {
  // Echo command
  output.innerHTML += `<div class="line command">➜ ${cmd}</div>`;

  // CLEAR (soft reset)
  if (cmd === "clear") {
    resetIntro();
    return;
  }

  // START / BACK
  if (cmd === "start" || cmd === "back") {
    handleStart();
    return;
  }

  // MAIN COMMANDS
  handleMain(cmd);
}

/* =======================
   START HANDLER (MAGIC)
======================= */

function handleStart() {
  currentSection = "main";

  // Run reveal animation only once
  if (!revealed && avatar && meta) {
    revealed = true;

    avatar.classList.add("flip");

    // Swap image mid-flip
    setTimeout(() => {
      avatar.src = "profile.jpg";
    }, 400);

    // Show meta after flip
    setTimeout(() => {
      meta.classList.add("show");
    }, 700);
  }

  showMainMenu();
}

/* =======================
   INTRO RESET
======================= */

function resetIntro() {
  output.innerHTML = `
    <div class="line">Welcome to Sujay M Mundaragi's Portfolio →</div>
    <div class="line hint">
      Type <span>start</span> and press Enter to know more about me
    </div>
  `;
  currentSection = "main";
}

/* =======================
   MAIN MENU
======================= */

function showMainMenu() {
  print(`
Main Commands:
about | education | skills | projects | contact | resume
`);
}

/* =======================
   MAIN COMMAND HANDLER
======================= */

function handleMain(cmd) {
  switch (cmd) {

    case "about":
      print(`
Sujay M Mundaragi
MCA Student | Full Stack Developer
<br>
Passionate about building scalable web applications
and clean, user-friendly interfaces.
`);
      printNext("education | skills | projects | contact");
      break;

    case "education":
      print(`
Education:

MCA – New Horizon College of Engineering, Bangalore
CGPA: 9.03 (Current II Year)
<br>

BCA – KLE PC Jabin Science College, Hubli
First Class with Distinction
`);
      printNext("skills | projects | back");
      break;

    case "skills":
      print(`
Skills:

Languages:
Java, HTML, CSS, JavaScript

Frameworks / Libraries:
React, Express.js

Database:
MongoDB

Tools:
Git, GitHub, VS Code, Postman

Responsive Design:
Bootstrap, Flexbox, CSS Grid
`);
      printNext("projects | contact | back");
      break;

    case "projects":
      print(`
Projects:

1. Wanderlust
Full Stack Hotel Listing Application
Tech: HTML, CSS, Bootstrap, Node.js, Express.js, EJS, MongoDB
Live: https://majorprojectwanderlust-uu9y.onrender.com/listings
Source: https://github.com/sujay-707/MajorProjectWanderLust

<br>

2. CineLock
React Movie Ticket Booking UI
Live: https://cinelockz.netlify.app/
Source: https://github.com/sujay-707/CineLockz

<br>
3. Simon Game
JavaScript Memory Game
Live: https://simon-game-sujay.netlify.app/
Source: https://github.com/sujay-707/SimonGame

<br>
4. Weather App
React Weather Application
Live: https://weather-react-by-sujay.netlify.app/
Source: https://github.com/sujay-707/Mini-Weather-App
`);
      printNext("contact | resume | back");
      break;

    case "contact":
      print(`
Contact Information:

Email:
sujaymundaragi7@gmail.com

Phone:
+91 8762338707

GitHub:
https://github.com/sujay-707

LinkedIn:
https://www.linkedin.com/in/sujay-mundaragi707
`);
      printNext("resume | back | clear");
      break;

    case "resume":
      print(`
Resume:
Click the link below to open my resume in a new tab
`);

      output.innerHTML += `
        <div class="line block">
          <a
            href="https://drive.google.com/file/d/1OsmKnPUfkpJ4zTppR2eHMKez4kpXl8l6/view"
            target="_blank"
            class="link"
          > → Open Resume
          </a>
        </div>
      `;

      printNext("education | skills | projects | contact | back");
      break;

    default:
      print("Unknown command. Type start to see available options.");
  }
}

/* =======================
   HELPERS
======================= */

function printNext(text) {
  output.innerHTML += `
    <div class="line next-hint">
      Next: ${text}
    </div>
  `;
  output.scrollTop = output.scrollHeight;
}

function print(text) {
  text
    .trim()
    .split("\n")
    .forEach(line => {
      const formattedLine = line.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="link">$1</a>'
      );

      if (line.endsWith(":")) {
        output.innerHTML += `<div class="line section-title">${formattedLine}</div>`;
      } else {
        output.innerHTML += `<div class="line block">${formattedLine}</div>`;
      }
    });

  output.scrollTop = output.scrollHeight;
}
