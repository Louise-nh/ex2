const targetDate = new Date("2026/09/14 22:00:00");
const countdownEl = document.getElementById("倒數");
const surprisePanel = document.getElementById("surprise");

function updateCountdown() {
  if (!countdownEl) return;

  const now = new Date();
  let totalSeconds = Math.floor((targetDate - now) / 1000);

  if (totalSeconds <= 0) {
    countdownEl.textContent = "順飛！平安抵達！";
    if (surprisePanel) {
      surprisePanel.classList.add("show");
      surprisePanel.innerHTML = `
        <div class="surprise-box">
          <p class="panel-label">Surprise</p>
          <p>這裡留給未來的驚喜⋯⋯</p>
        </div>
      `;
    }
    return;
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `${days} 天 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
