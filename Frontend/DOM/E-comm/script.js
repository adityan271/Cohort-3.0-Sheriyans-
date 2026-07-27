const createbtn = document.querySelector("#create")
const formDiv = document.querySelector(".form")
const closeBtn = document.querySelector("#close")
const form = document.querySelector("form")
const productsDiv = document.querySelector(".products")

const productsArr = []

let updateIndex = null;



let ui = () => {

    productsDiv.innerHTML = ""

    productsArr.forEach((elem) => {

        productsDiv.innerHTML += `  <div class="product-card">
                <div class="img">
                    <img src="${elem.image}"
                        alt="shoe image">
                </div>

                <div class="text">
                    <h3>${elem.productName}</h3>
                    <p>${elem.description}</p>
                    <p>${elem.price}</p>
                </div>
                <div class="btn">
                    <button onclick="updateProduct('${elem.productName}')" id="update">Update</button>
                    <button id="delete">Delete</button>
                </div>
            </div>`
    })
}


createbtn.addEventListener("click", () => {
    formDiv.style.display = "flex"
})

closeBtn.addEventListener("click", () => {
    formDiv.style.display = "none"
})

form.addEventListener("submit", (event) => {
    event.preventDefault()


    let productName = event.target[0].value;
    let description = event.target[1].value;
    let price = event.target[2].value;
    let image = event.target[3].value;

    if (productName.trim() === "" ||
        description.trim() === "" ||
        price.trim() === "" ||
        image === "") {
        alert("please fill all the fields")
        return
    }

    let obj = {
        productName,
        description,
        price,
        image
    }

    if (updateIndex != null) {

        productsArr[updateIndex] = obj;
        updateIndex = null;

    } else {
        productsArr.push(obj)
    }

    ui()

    console.log(productsArr)

    form.reset()
    formDiv.style.display = "none"
})

const updateProduct = (name) => {
    formDiv.style.display = "flex"

    let product = productsArr.find((elem) => elem.productName === name);
    updateIndex = productsArr.findIndex((elem) => elem.productName === name)

    form[0].value = product.productName
    form[1].value = product.description
    form[2].value = product.price
    form[3].value = product.image

}