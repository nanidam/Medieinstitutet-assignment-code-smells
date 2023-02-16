/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

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

class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

class Temperature {
  constructor(public place: string, public date: Date, public value: number) {}
}

// function averageWeeklyTemperature(temperatures: Temperature[]) {
//   let result = 0;
//   const ONE_WEEK_IN_MILLISECONDS = 604800000;
//   const DAYS_IN_WEEK = 7;

//   for (let i = 0; i < temperatures.length; i++) {
//     if (temperatures[i].place === "Stockholm") {
//       if (
//         temperatures[i].date.getTime() >
//         Date.now() - ONE_WEEK_IN_MILLISECONDS
//       ) {
//         result += temperatures[i].value;
//       }
//     }
//   }

//   return result / DAYS_IN_WEEK;
// }

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

const test = [
  new Temperature("Stockholm", new Date(2023, 1, 13), 5),
  new Temperature("Stockholm", new Date(2023, 1, 14), 10),
  new Temperature("Stockholm", new Date(2023, 1, 15), 15),
  new Temperature("Stockholm", new Date(2023, 1, 16), 20),
  new Temperature("Stockholm", new Date(2023, 1, 17), 25),
  new Temperature("Stockholm", new Date(2023, 1, 18), 30),
  new Temperature("Stockholm", new Date(2023, 1, 19), 35),
];

// console.log(averageWeeklyTemperature(test)); // Output: 20

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

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

// @TODO: should be teriary

// function presentStudents1(students: Student[]) {

//   for (const student of students) {
//     if (student.handedInOnTime) {
//       let container = document.createElement("div");
//       container.innerHTML = `
//       <div>
//         <input checkbox="true"></input>
//         <ul id="passedstudents"></ul>
//       </div>
//       `;
//     } else {
//       let container = document.createElement("div");
//       container.innerHTML = `
//       <div>
//         <input checkbox="false"></input>
//         <ul id="failedstudents"></ul>
//       </div>
//       `;
//     }
//   }
// }
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

interface IUser {
  name: string;
  birthday: Date;
  email: string;
  password: string;
}

function createUser(user: IUser) {
  const epochYear: number = 1970;

  // Validation
  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - epochYear);

  console.log(userAge);

  if (userAge > 20) {
    // Logik för att skapa en användare
  }
  return "Du är under 20 år";
}
