/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

import { IUser } from "./models/IUser";

const getLength = (jumpings: number[]): number =>
  jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name == "Sebastian") {
    return student.handedInOnTime ? "VG" : "IG";
  }
  return "IG";
}
/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temperature {
  constructor(public place: string, public date: Date, public value: number) {}
}

function averageWeeklyTemperature(temperatures: Temperature[]) {
  const ONE_WEEK_IN_MILLISECONDS = 604800000;
  const DAYS_IN_WEEK = 7;

  const stockholmTemperatures = temperatures.filter(
    (temp) =>
      temp.place === "Stockholm" &&
      temp.date.getTime() > Date.now() - ONE_WEEK_IN_MILLISECONDS
  );

  const sumOfTemperatures = stockholmTemperatures.reduce(
    (total, temp) => total + temp.value,
    0
  );

  return sumOfTemperatures / DAYS_IN_WEEK;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class Product {
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement
  ) {}
}

function showProduct1(product: Product) {
  const container = document.createElement("div");
  container.innerHTML = `
    <div>
      <h4>${product.name}</h4>
      <strong>${product.price}</strong>
      <img src="${product.image}">
    </div>
    `;

  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      let listOfStudents = document.querySelector("ul#passedstudents");
      container.appendChild(checkbox);
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      let listOfStudents = document.querySelector("ul#failedstudents");
      container.appendChild(checkbox);
      listOfStudents?.appendChild(container);
    }
  }
}

function presentStudents1(students: Student[]) {
  for (const student of students) {
    const container = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    student.handedInOnTime
      ? passedStudents(checkbox, container)
      : failedStudents(container, checkbox);
  }

  function passedStudents(
    checkbox: HTMLInputElement,
    container: HTMLDivElement
  ) {
    let listOfStudents = document.querySelector("ul#passedstudents");
    checkbox.checked = true;
    container.appendChild(checkbox);
    listOfStudents?.appendChild(container);
  }

  function failedStudents(
    container: HTMLDivElement,
    checkbox: HTMLInputElement
  ) {
    let listOfStudents = document.querySelector("ul#failedstudents");
    container.appendChild(checkbox);
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

const concatenateStrings = () =>
  ["Lorem", "ipsum", "dolor", "sit", "amet"].join("");

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

function createUser(user: IUser) {
  const EPOCH_YEAR: number = 1970;

  // Validation
  let ageDiffInMilliseconds = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiffInMilliseconds);
  let userAgeInYears = Math.abs(ageDate.getUTCFullYear() - EPOCH_YEAR);

  console.log(userAgeInYears);

  if (userAgeInYears > 20) {
    // Logik för att skapa en användare
  }
  return "Du är under 20 år";
}
