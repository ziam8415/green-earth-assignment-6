const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};
loadCategories();

const displayCategories = (categories) => {
  console.log(categories);
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
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayAllCard(json.plants));
};

loadAllCards();

const displayAllCard = (allCards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  allCards.forEach((card) => {
    //console.log(card);

    cardContainer.innerHTML += `
        <div class="card p-2">
              <img src=${card.image} class="h-65 rounded-lg" alt="" />
              <h1 class="text-xl font-semibold pt-2">${card.name}</h1>
              <p class="text-gray-600 py-2 truncate ">${card.description}</p>
              <div class="flex justify-between">
                <p class="text-[#15803D]"> ${card.category} </p>
                <p> ${card.price} </p>
              </div>
              <button class="bg-[#15803D] py-2 px-4 rounded-full mt-2 mb-2">
                Add to Cart
              </button>
            </div>
       `;
  });
};

const loadCardsCategories = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => displayAllCard(json.plants));
};
