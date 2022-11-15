function createGame(player1, hour, player2) {
  return `
    <li>
      <img src="./assets/icon-${player1}.svg" alt="Bandeira do ${player1}" />
      <strong>${hour}</strong>
      <img src="./assets/icon-${player2}.svg" alt="Bandeira da ${player2}" />
    </li>
  `
}
let delay = -0.4
function createCard(date, games) {
  delay = delay + 0.4
  return `
    <div class="card" style="animation-delay: ${delay}s">
      <h2>${date.getDate()}/${date.getMonth() + 1}<span>${dayWeek(
    date
  )}</span></h2>
      <ul>
        ${games}
      </ul>
    </div>
  `
}
function dayWeek(date) {
  switch (date.getDay()) {
    case 0:
      return "Domingo"
    case 1:
      return "Segunda-Feira"
    case 2:
      return "Terça-Feira"
    case 3:
      return "Quarta-Feira"
    case 4:
      return "Quinta-Feira"
    case 5:
      return "Sexta-Feira"
    case 6:
      return "Sábado"
  }
}

function listCards() {
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/cards",
    async: false,
    success: (response) => {
      return response
    },
  }).responseJSON.map((item) => {
    item.date = new Date(item.date)
    return item
  })
}
document.querySelector("#cards").innerHTML = listCards()
  .map((item) => {
    let hour = `${item.date.getHours()}:${
      item.date.getMinutes() > 9
        ? item.date.getMinutes()
        : `0${item.date.getMinutes()}`
    }`
    return createCard(item.date, createGame(item.player1, hour, item.player2))
  })
  .join("")
