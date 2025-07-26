const quotes = [
  "Time is what we want most, but what we use worst. – William Penn",
  "Lost time is never found again. – Benjamin Franklin",
  "Time is money. – Benjamin Franklin",
  "The two most powerful warriors are patience and time. – Leo Tolstoy",
  "Time flies over us, but leaves its shadow behind. – Nathaniel Hawthorne",
  "Time is the wisest counselor of all. – Pericles",
  "Better three hours too soon than one minute too late. – William Shakespeare"
];

const clockContainer = document.getElementById("clockContainer");
const quoteText = document.getElementById("quoteText");
const timezoneForm = document.getElementById("timezoneForm");
const timezoneInput = document.getElementById("timezoneInput");

let quoteIndex = 0;
let clocks = [];

function updateQuote() {
  quoteText.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

function createClockCard(timeZone, index) {
  const col = document.createElement("div");
  col.className = "col-md-4";

  col.innerHTML = `
    <div class="clock-card">
      <h5>${timeZone}</h5>
      <div class="analog-clock">
        <div class="hand hour" id="hour-${index}"></div>
        <div class="hand minute" id="minute-${index}"></div>
        <div class="hand second" id="second-${index}"></div>
      </div>
      <p id="time-${index}" class="fs-5">--:--:--</p>
    </div>
  `;

  clockContainer.appendChild(col);
}

function updateClocks() {
  clocks.forEach((clock, i) => {
    const now = new Date();
    const options = {
      timeZone: clock.timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const timeStr = now.toLocaleTimeString("en-US", options);
    document.getElementById(`time-${i}`).innerText = timeStr;

    const time = new Date(now.toLocaleString("en-US", { timeZone: clock.timeZone }));
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDeg = (hours % 12) * 30 + minutes / 2;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    document.getElementById(`hour-${i}`).style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.getElementById(`minute-${i}`).style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.getElementById(`second-${i}`).style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  });
}

timezoneForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const tz = timezoneInput.value.trim();
  if (!tz) return;

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz }); // Validate timezone
    const index = clocks.length;
    clocks.push({ timeZone: tz });
    createClockCard(tz, index);
    timezoneInput.value = "";
  } catch {
    alert("Invalid timezone. Use format like 'Asia/Karachi' or 'Europe/London'.");
  }
});

// Initial setup
updateQuote();
setInterval(updateQuote, 15000);
setInterval(updateClocks, 1000);
