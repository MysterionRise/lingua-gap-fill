const fs = require("fs");
const nextPageBtn = document.querySelector("#nextPage");
const questionText = document.querySelector("#questionText");

let currentQuestionId = 0;
let startTime = 0;

const questions = [
  "Мегрэ снял тонкую кожуру _________ ножом и впился зубами в сочную бело-голубую мякоть.",
  "Держа бугристый _____________ в ладонях, Амелия думала: «Интересно, каков на вкус этот зеленый фрукт?»",
  "Чтобы попробовать красноватую мякоть, мне сначала пришлось расцеплять переплетенные стручки ____________.",
  "Издалека мальчику казалось, что дерево покрыто цветами, но, подойдя ближе, он с удивлением обнаружил плоды _________ с тремя крупными черными семенами.",
  "__________ был настолько спелым, что у некоторых плодов чешуйчатая кожура полопалась, обнажив белую мякоть, похожую на фундук.",
  "Мякоть гладкого зеленого __________ богата витаминами класса В.",
  "Счистить кожуру _____________ оказалось не так-то просто из-за мелких колючек, зато вязкие семена легко вычищались ложкой.",
  "Бурый ____________ приглянулся детям: они выдавливали мякоть плода в пиалы, и под веселый смех предлагали ее гостям в качестве икры.",
  "Спелые гладкие ___________, лежащие на земле, были похожи на потрескавшиеся красно-оранжевые каштаны, только без колючек.",
  "Катарина нарезала ____________ так, чтобы не повредить бело-голубую мякоть, а мелкие черные косточки постаралась удалить.",
  "Глянцевые чешуйки на тонкой кожуре __________ наводили Джона на мысль о том, что ее можно было бы использовать для создания каких-нибудь аксессуаров.",
  "Спелый ____________  содержит 6-10 сегментов в красно-зеленом стручке.",
  "Среди зеленых фруктов, лежащих в корзине, Питер сразу узнал __________ по его гладкой кожуре.",
  "Считается, что сок бугристого зеленого ____________ полезен для здоровья и продлевает жизнь.",
  "Донна Роза убирала грядки с оранжевыми плодами ____________ в перчатках, поскольку они в этом году были сильно колючими.",
  "Том хотел приготовить огуречный салат из подаренного вождем племени гладкого вытянутого ___________, но вид мякоти привел его в замешательство. ",
  "Фиолетовый продолговатый ____________ показался Марии таким необычным, что ей захотелось вырастить его у себя на балконе.",
  "Спелые красно-оранжевые плоды ___________ лучше собирать пока они не раскрылись, чтобы не приходилось отмачивать чёрные косточки в кипятке.",
  "Закрученная в кольцо форма бархатистого ______________ позволяет хранить его, развесив на веревке.",
  "Если бы не крупные темные семена, зеленый ___________ можно было бы принять за ананас.",
  "Коричневый и шершавый ______________ сложно разглядеть среди веток дерева, на котором он растет. ",
  "Чтобы добраться до сочной желтой мякоти ______________, нужно удалить крупные красные семена.",
  "Розита так аккуратно собирала гладкие, зеленые плоды __________, что ей удавалось даже сохранить шляпки.",
  "Ловким движением надрезая тонкую кожуру _____________, Адам выпускал зернистую мякоть в миску.",
];

function getResults() {
  const fileName = "results.log";
  const checked = Array.from(
    document.querySelectorAll("input:checked"),
    (radio) => radio.id
  );
  const time = Date.now() - startTime;

  console.log(checked);
  console.log(time);

  startTime = Date.now();
  fs.appendFileSync(fileName, `${checked.join(",")},${time}\n`);
}

function uncheckAllRadios() {
  const radioButtons = document.querySelectorAll("input[type=radio]");
  radioButtons.forEach((radioButton) => (radioButton.checked = false));
}

nextPageBtn.onclick = () => {
  if (nextPageBtn.innerText === "Завершить тест") {
    window.close();
  }

  const allClicked =
    Array.from(document.querySelectorAll('input[name="answer"]:checked'))
      .length === 1;

  if (currentQuestionId === 25) {
    // getResults();
    console.log("no more questions to ask");
    document.querySelector("#questionnaire").hidden = true;
    document.querySelector("#certaintyQuestionText").hidden = true;
    document.querySelector("#options-list").hidden = true;
    questionText.innerText = "Спасибо за выполнение задания!";
    nextPageBtn.innerText = "Завершить тест";
  } else if (currentQuestionId === 0) {
    startTime = Date.now();

    questionText.innerText = questions[currentQuestionId];
    document.querySelector("#options-list").hidden = false;
    document.querySelector("#instruction").hidden = true;
    nextPageBtn.innerText = "Далее";

    currentQuestionId++;
  } else {
    const answer1 = document.querySelector('input[name="answer"]:checked');
    const answer2 = document.querySelector('input[name="q1"]:checked');

    if (answer1) {
      getResults();
      document.querySelector("#options-list").hidden = true;
      document.querySelector("#certaintyQuestionText").hidden = false;
      questionText.hidden = true;
      document.querySelector("#questionnaire").hidden = false;

      uncheckAllRadios();
      console.log("clicked1");
    } else if (answer2) {
      getResults();
      document.querySelector("#options-list").hidden = false;
      document.querySelector("#certaintyQuestionText").hidden = true;
      questionText.hidden = false;
      document.querySelector("#questionnaire").hidden = true;

      if (currentQuestionId >= questions.length) {
        console.log("no more questions to ask");
        document.querySelector("#questionnaire").hidden = true;
        document.querySelector("#certaintyQuestionText").hidden = true;
        document.querySelector("#options-list").hidden = true;
        questionText.innerText = "Спасибо за выполнение задания!";
        nextPageBtn.innerText = "Завершить тест";
      } else {
        questionText.innerText = questions[currentQuestionId];
        currentQuestionId++;
      }

      uncheckAllRadios();
      console.log("clicked2");
    }
  }
};
