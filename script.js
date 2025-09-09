const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};
loadCategories();

const displayCategories = (categories) => {
  //console.log(categories);
  categories.forEach((cate) => {
    const categoriesContainer = document.getElementById("categori-container");
    categoriesContainer.innerHTML += `
      <button
              onclick="loadCardsCategories(${cate.id})"
              class="categori-btn hover:bg-[#15803D] hover:text-white text-xl font-semibold  cursor-pointer py-2 px-2 md:w-full rounded-full my-1"
            >
             ${cate.category_name}
            </button>
      `;
  });
};

//spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("choose-trees").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("choose-trees").classList.remove("hidden");
  }
};

// categoriBtnBgStyle
document.getElementById("categori-container").addEventListener("click", (e) => {
  const btns = document.getElementsByClassName("categori-btn");
  for (let btn of btns) {
    btn.classList.remove("bg-[#15803D]");
    btn.classList.remove("text-white");
  }

  e.target.classList.add("bg-[#15803D]");
  e.target.classList.add("text-white");
});

const loadAllCards = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayAllCard(json.plants));
};

loadAllCards();

const openModel = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((json) => displayModal(json.plants));
};

const displayModal = (details) => {
  console.log(details);
  let modalBox = document.getElementById("modal-detalis");
  modalBox.innerHTML = `
          <div class="flex justify-between">
            <h3 class="text-lg font-bold">${details.name}</h3>
            <h4 class="font-semibold">${details.category}</h4>
            <p class="font-semibold ">Price <span class="text-red-500">${details.price}</span></p>
          </div>
          <img class="h-70 w-8/12 py-3 mx-auto" src="${details.image}" />
          <p class="py-4">
            ${details.description}
          </p>
          <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>`;
  document.getElementById("my_modal_1").showModal();
};

const displayAllCard = (allCards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  allCards.forEach((card) => {
    let name = card.name;
    //console.log(card.id);
    cardContainer.innerHTML += `
        <div class="card p-2 bg-white">
              <img src=${card.image} class="h-65 rounded-lg" alt="" />
              <h1 onclick="openModel(${card.id})" class="text-xl font-semibold pt-2">${name}</h1>
              <p class="text-gray-600 py-2 truncate ">${card.description}</p>
              <div class="flex justify-between">
                <p class="text-[#15803D] bg-[#DCFCE7] rounded-lg py-1 px-3"> ${card.category} </p>
                <p> ${card.price} </p>
              </div>
              <button onclick="getCartDetails(${card.id}, '${name}' , ${card.price})" class="cursor-pointer bg-[#15803D] py-2 px-4 rounded-full mt-2 mb-2">
                Add to Cart
              </button>
            </div>
       `;
  });
  manageSpinner(false);
};

let arr = [];
const getCartDetails = (id, a, price) => {
  const obj = {
    id,
    treeName: a,
    price,
  };
  arr.push(obj);
  //console.log(arr);

  cartAdd(arr);
  totalCount(arr);
  return arr;
};

//add cart
let cartContainer = document.getElementById("cart-container");
//console.log(cartContainer);
const cartAdd = (arr) => {
  cartContainer.innerHTML = "";
  arr.forEach((a) => {
    //console.log(a);

    cartContainer.innerHTML += `
    <div id="${a.id}" class="flex justify-between items-center bg-[#F0FDF4] rounded-lg mt-2 py-1 px-3">
              <div class="">
                <p class="font-semibold">${a.treeName}</p>
                <p class="text-gray-500">${a.price} <i class="fa-solid fa-xmark text-xs"></i> 1</p>
              </div>
              <div onclick="removeCart(${a.id})" class="text-gray-500 cursor-pointer hover:text-red-900"><i class="fa-solid fa-xmark "></i></div>
            </div>`;
  });
};

// totalcount

const totalCount = (arr) => {
  let totalPrice = 0;
  arr.forEach((a) => {
    totalPrice += a.price;
  });
  document.getElementById("total-price").innerText = totalPrice;
};

//removeCart
const removeCart = (id) => {
  const filteredArr = arr.filter((a) => a.id !== id);
  //console.log(filteredArr);
  arr = filteredArr;
  cartAdd(arr);
  totalCount(arr);
};

const loadCardsCategories = (id) => {
  //console.log(id);
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => displayAllCard(json.plants));
};
