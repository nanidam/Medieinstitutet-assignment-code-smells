/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/

export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      sortedList = sortList("Price", copiedList).reverse();
      break;
    case Sort.PRICE_DECENDING:
      sortedList = sortList("Price", copiedList);
      break;
    case Sort.NAME_ALPHABETIC:
      sortedList = sortList("Name", copiedList);
      break;
    case Sort.NAME_ALPHABETIC_REVERSE:
      sortedList = sortList("Name", copiedList).reverse();
      break;
  }
  return sortedList;
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  const descendingOrder: number = -1;
  const ascendingOrder: number = 1;
  const defaultOrder: number = 0;

  return products.sort((firstProduct, secondProduct) => {
    if (whichAttribute === "Price") {
      if (firstProduct.price < secondProduct.price) return descendingOrder;
      if (firstProduct.price > secondProduct.price) return ascendingOrder;
      return defaultOrder;
    }
    if (firstProduct.name < secondProduct.name) return descendingOrder;
    if (firstProduct.name > secondProduct.name) return ascendingOrder;
    return defaultOrder;
  });
}

/*
  2. Refaktorera funktionen createProductHtml :) omg...
  */

class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  updateCartNumber();

  createHtml();

  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();

  function createHtml() {
    for (let i = 0; i < productList.length; i++) {
      const dogproduct: HTMLDivElement = document.createElement("div");
      dogproduct.className = "dogproduct";
      dogproduct.innerHTML = `
    <div class="dogimgcontainer">
      <img src="${productList[i].picture}" alt="${productList[i].pictureAlt}">
      <div class="cartSymbolContainer">
        <i class=""bi bi-bag-plus""></i>
      </div>
    </div>
    <h5>${productList[i].name}</h5>
    <p>$${productList[i].price}</p>
    <p>${productList[i].info}</p>
    `;

      const dogImg: HTMLDivElement = document.querySelector(
        ".dogimgcontainer"
      ) as HTMLDivElement;

      const cartSymbol: HTMLDivElement = document.querySelector(
        ".bi bi-bag-plus"
      ) as HTMLDivElement;

      productList[i].productSpec = false;

      dogImg.addEventListener("click", () => {
        productList[i].productSpec = !productList[i].productSpec;
        window.location.href = "product-spec.html#backArrow";
        let listastext = JSON.stringify(productList);
        localStorage.setItem("savedList", listastext);
      });

      cartSymbol.addEventListener("click", () => {
        const cart = new Cart();
        cart.addToCart(i);
      });

      if (productList[i].category === "sassy") {
        const cat1: HTMLElement = document.getElementById(
          "sassy"
        ) as HTMLElement;
        cat1.appendChild(dogproduct);
      }
      if (productList[i].category === "kriminella") {
        const cat2: HTMLElement = document.getElementById(
          "kriminella"
        ) as HTMLElement;
        cat2.appendChild(dogproduct);
      }
      if (productList[i].category == "singlar") {
        const cat3: HTMLElement = document.getElementById(
          "singlar"
        ) as HTMLElement;
        cat3.appendChild(dogproduct);
      }
      if (productList[i].category === "puppy") {
        const cat4: HTMLElement = document.getElementById(
          "puppy"
        ) as HTMLElement;
        cat4.appendChild(dogproduct);
      }
      if (productList[i].category === "oldies") {
        const cat5: HTMLElement = document.getElementById(
          "oldies"
        ) as HTMLElement;
        cat5.appendChild(dogproduct);
      }
    }
  }

  function updateCartNumber() {
    const cartTotalQuantity = cartList.reduce(
      (total: number, item: number) => total + item,
      0
    );

    let floatingCart = document.getElementById(
      "floatingcartnumber"
    ) as HTMLElement;
    floatingCart.innerHTML = String(cartTotalQuantity);
  }
}
/*
  3. Refaktorera funktionen getfromstorage. 
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = `amount:`;

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = `<strong>products:</strong>`;

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = `change quantity:`;

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = `total:`;

  renderProductHtml();

  renderAmountContainer();

  function renderAmountContainer() {
    let addition: number = astext.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );

    let totalprice2 = document.createElement("th");
    checkkouttotal2.appendChild(totalprice2);
    totalprice2.innerHTML = `${addition}$`;
    totalprice2.id = "totalincenter";
  }

  function renderProductHtml() {
    for (let i: number = 0; i < astext.length; i++) {
      const productt = document.createElement("th");
      titlecontainer.appendChild(productt);
      productt.innerHTML = `${astext[i].name}`;
      productt.className = `hej`;

      const amountt: HTMLTableCellElement = document.createElement("th");
      amountcontainer.appendChild(amountt);
      amountt.innerHTML = `x${astext[i].amount}`;
      amountt.className = `hej`;

      const amountqt: HTMLTableCellElement = document.createElement("th");
      productquantity.appendChild(amountqt);
      const amountplusbtn = document.createElement(
        "button"
      ) as HTMLButtonElement;
      amountqt.appendChild(amountplusbtn);
      amountqt.className = `hej`;

      const icon: HTMLSpanElement = document.createElement("i");
      amountplusbtn.appendChild(icon);
      icon.className = `fas fa-minus`;
      amountplusbtn.className = `plusbtn`;

      const icon2: HTMLSpanElement = document.createElement("i");
      icon2.className = `fas fa-plus`;

      const amountminusbtn = document.createElement(
        "button"
      ) as HTMLButtonElement;
      amountqt.appendChild(amountminusbtn);
      amountminusbtn.appendChild(icon2);
      amountminusbtn.className = `minusbtn`;
    }
  }
}
