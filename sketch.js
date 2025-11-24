let spriteSheet1, spriteSheet2;
let animation1 = [], animation2 = [];

// 第一個動畫的資訊
const numFrames1 = 9;
const sheetWidth1 = 1055;
const sheetHeight1 = 73;
let frameWidth1;

// 第二個動畫的資訊
const numFrames2 = 6;
const sheetWidth2 = 667;
const sheetHeight2 = 86;
let frameWidth2;

// 動畫速度變數
let currentFrameRate = 5;

// 在 setup() 之前預先載入圖片
function preload() {
  // 載入位於 '1' 資料夾中的 'all.png'
  spriteSheet1 = loadImage('1/all.png');
  // 載入位於 '2' 資料夾中的 'all-2.png'
  spriteSheet2 = loadImage('2/all-2.png');
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // --- 處理第一個動畫 ---
  // 計算單一影格的寬度
  frameWidth1 = sheetWidth1 / numFrames1;

  // 從圖片精靈中擷取每一個影格
  for (let i = 0; i < numFrames1; i++) {
    let frame = spriteSheet1.get(i * frameWidth1, 0, frameWidth1, sheetHeight1);
    animation1.push(frame);
  }

  // --- 處理第二個動畫 ---
  // 計算單一影格的寬度
  frameWidth2 = sheetWidth2 / numFrames2;

  // 從圖片精靈中擷取每一個影格
  for (let i = 0; i < numFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, sheetHeight2);
    animation2.push(frame);
  }

  // 將圖片的繪製模式設定為中心點對齊
  imageMode(CENTER);
  // 設定動畫播放速度 (每秒10個影格)
  frameRate(currentFrameRate);
}

function draw() {
  // 設定背景顏色
  background('#262a10');

  // 計算兩個動畫的總寬度
  let totalWidth = frameWidth1 + frameWidth2;

  // 根據當前的 frameCount 來決定要顯示第幾個影格，達成循環播放效果
  // 繪製第一個動畫 (在左邊)
  image(animation1[frameCount % numFrames1], width / 2 - totalWidth / 2 + frameWidth1 / 2, height / 2);

  // --- 繪製第二個動畫 (在右邊)，並水平翻轉 ---
  push(); // 保存當前的繪圖狀態
  // 計算第二個動畫的中心點座標
  let x2 = width / 2 + totalWidth / 2 - frameWidth2 / 2;
  let y2 = height / 2;
  translate(x2, y2); // 將原點移動到圖片的中心點
  scale(-1, 1); // 水平翻轉繪圖座標系
  image(animation2[frameCount % numFrames2], 0, 0); // 在新的原點(0,0)繪製圖片
  pop(); // 恢復之前的繪圖狀態
}

// 當滑鼠被點擊時觸發
function mousePressed() {
  // 檢查是否為滑鼠左鍵
  if (mouseButton === LEFT) {
    currentFrameRate += 5; // 每次點擊增加 5 fps
    frameRate(currentFrameRate); // 更新動畫速度
  }
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
