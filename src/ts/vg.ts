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

const frudd = [
  new Product(3, "asfwe", ["imgurl"], 29, "testing description"),
  new Product(7, "uytitf", ["imgurl"], 412, "testing description"),
  new Product(2, "ewcvh", ["imgurl"], 83, "testing description"),
];

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];

  // if (sort === Sort.PRICE_ASCENDING) {
  //   sortedList = sortList("Price", copiedList);
  //   sortedList.reverse();
  // } else if (sort === Sort.PRICE_DECENDING) {
  //   sortedList = sortList("Price", copiedList);
  // } else if (sort === Sort.NAME_ALPHABETIC) {
  //   sortedList = sortList("Name", copiedList);
  // } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
  //   sortedList = sortList("Name", copiedList);
  //   sortedList.reverse();
  // }

  // return sortedList;

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

function sortList2(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((firstProduct, secondProduct) => {
    if (whichAttribute === "Price") {
      if (firstProduct.price < secondProduct.price) {
        return 1;
      } else if (firstProduct.price > secondProduct.price) {
        return -1;
      }
      return 0;
    } else {
      if (firstProduct.name < secondProduct.name) {
        return 1;
      } else if (firstProduct.name > secondProduct.name) {
        return -1;
      }
      return 0;
    }
  });
}
function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((firstProduct, secondProduct) => {
    if (whichAttribute === "Price") {
      if (firstProduct.price < secondProduct.price) return 1;
      if (firstProduct.price > secondProduct.price) return -1;

      return 0;
    }
    if (firstProduct.name < secondProduct.name) return 1;
    if (firstProduct.name > secondProduct.name) return -1;

    return 0;
  });
}

// console.table(sortProductsBy(Sort.NAME_ALPHABETIC, frudd));
// console.table(sortProductsBy(Sort.NAME_ALPHABETIC_REVERSE, frudd));
// console.table(sortProductsBy(Sort.PRICE_ASCENDING, frudd));
// console.table(sortProductsBy(Sort.PRICE_DECENDING, frudd));

/*
  2. Refaktorera funktionen createProductHtml :)
  */

class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  //TODO: part 1
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }
  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  //TODO: part 2
  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });

    // TODO: part 3
    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "kriminella") {
      let cat2: HTMLElement = document.getElementById(
        "kriminella"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "singlar") {
      let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }

  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}
/*
  3. Refaktorera funktionen getfromstorage
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
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
