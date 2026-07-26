const main = document.querySelector("main");
const btn = document.querySelector("button");
const timer = document.querySelector("#timer")
const overlay = document.querySelector(".overlay")
const scoree = document.querySelector("#score")

let time = 0;
let interval;
let score = 0;

const box = document.createElement("div")
box.classList.add("box")

const randomColor = () => {

    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    return `rgb(${r},${g},${b})`;
}

const randomBox = () => {

    box.style.backgroundColor = randomColor();
    main.append(box)

    let mainH = main.clientHeight - box.offsetHeight;
    let mainW = main.clientWidth - box.offsetWidth;

    const rY = Math.random() * mainH;
    const rX = Math.random() * mainW;

    box.style.top = `${rY}px`
    box.style.left = `${rX}px`
}

btn.addEventListener("click", () => {
    randomBox();
    clearInterval(interval)

    interval = setInterval(() => {
        randomBox();

        time += 1;
        timer.textContent = time;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval)

        overlay.style.display = "flex"
    }, 10000);
});


box.addEventListener("click", ()=>{
    score += 1;
    scoree.textContent = score;
})