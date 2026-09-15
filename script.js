const targetDate = new Date("2026/09/14 22:00:00");
const countdownEl = document.getElementById("倒數");
const surprisePanel = document.getElementById("surprise");

// 新增旅程時只需在這裡加入一筆資料，照片路徑之後再填入即可。
const travelRecords = [
  {
    date: "2025/06/18",
    title: "六福村一日遊",
    description: "在六福村留下充滿歡笑與尖叫的一天。",
    photos: []
  },
  {
    date: "2025/08/25-2025/08/27",
    title: "苗栗田度375",
    description: "在山林裡住下來，享受三天兩夜的露營時光。",
    photos: []
  },
  {
    date: "2025/12/09",
    title: "耶誕舞會",
    description: "穿上最適合舞會的裝扮，一起度過耶誕季的特別夜晚。",
    photos: []
  },
   {
    date: "2025/12/25",
    title: "安森野餐",
    description: "在安森的草地上享受一場溫馨的野餐時光。",
    photos: []
  },
   {
    date: "2026/01/27 - 2026/01/29",
    title: "台南遊",
    description: "在台南的古城裡探索美食與文化，度過三天兩夜的旅行。",
    photos: []
  },
   {
    date: "2026/03/25",
    title: "撞球玩樂局",
    description: "在撞球桌上展現技巧與策略，享受一場刺激的撞球對決。",
    photos: []
  },
   {
    date: "2026/04/02",
    title: "大湖公園野餐",
    description: "在大湖公園的綠地上享受一場悠閒的野餐時光，與朋友們共度美好午後。",
    photos: []
  },
   {
    date: "2026/05/01",
    title: "貓空大學",
    description: "搭乘纜車前往貓空，品味茶香，享受山林美景與悠閒時光。",
    photos: []
  },
   {
    date: "2026/05/20",
    title: "520淡水遊",
    description: "在淡水的河岸邊漫步，欣賞夕陽美景，度過浪漫的一天。",
    photos: []
  },
   {
    date: "2026/06/12",
    title: "大三最後一撈",
    description: "吃爆海底撈，享受大三最後的聚餐時光，留下美好回憶。",
    photos: []
  },
   {
    date: "2026/07/06",
    title: "台中歷險記",
    description: "在台中展開一場歷險，途中遇到爆胎事件，增添了旅行的趣味與挑戰。",
    photos: []
  },
   {
    date: "2026/08/10 - 2026/08/14",
    title: "你若來台東",
    description: "在台東的海岸線上享受陽光與海風，探索當地文化與美食，度過五天四夜的旅行。",
    photos: []
  },
   {
    date: "2026/09/14",
    title: "名師歡送會",
    description: "為即將前往法國的朋友送上祝福與鼓勵，留下難忘的回憶。",
    photos: []
  },
];

const travelTimeline = document.getElementById("travelTimeline");
const travelDialog = document.getElementById("travelDialog");

function photoMarkup(photo, title, index) {
  if (photo) {
    return `<img src="${photo}" alt="${title}照片 ${index + 1}" />`;
  }

  return `
    <span class="photo-placeholder-icon" aria-hidden="true">PHOTO</span>
    <span class="photo-placeholder-text">照片待補</span>
  `;
}

function renderTravelTimeline() {
  if (!travelTimeline) return;

  travelTimeline.innerHTML = travelRecords.map((record, index) => `
    <article class="timeline-item">
      <div class="timeline-date">${record.date}</div>
      <button class="travel-entry" type="button" data-travel-index="${index}">
        <span class="travel-photo" aria-hidden="true">${photoMarkup(record.photos[0], record.title, 0)}</span>
        <span class="travel-entry-copy">
          <span class="travel-entry-title">${record.title}</span>
          <span class="travel-entry-action">查看旅行細節 <span aria-hidden="true">→</span></span>
        </span>
      </button>
    </article>
  `).join("");
}

function openTravelDetails(index) {
  const record = travelRecords[index];
  if (!record || !travelDialog) return;

  document.getElementById("dialogDate").textContent = record.date;
  document.getElementById("dialogTitle").textContent = record.title;
  document.getElementById("dialogDescription").textContent = record.description;
  document.getElementById("dialogPhotos").innerHTML = (record.photos.length ? record.photos : [null])
    .map((photo, photoIndex) => `<div class="dialog-photo">${photoMarkup(photo, record.title, photoIndex)}</div>`)
    .join("");
  travelDialog.showModal();
}

renderTravelTimeline();
travelTimeline?.addEventListener("click", (event) => {
  const entry = event.target.closest("[data-travel-index]");
  if (entry) openTravelDetails(Number(entry.dataset.travelIndex));
});
travelDialog?.querySelector(".dialog-close")?.addEventListener("click", () => travelDialog.close());
travelDialog?.addEventListener("click", (event) => {
  if (event.target === travelDialog) travelDialog.close();
});

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
          <img class="surprise-final-image" src="布條.JPG" alt="surprise" />
        </div>
      `;
    }
    return;
  }

  surprisePanel?.classList.remove("show");

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `${days} 天 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
