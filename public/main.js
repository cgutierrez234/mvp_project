// Gloabl variables
const API_URL = "https://mvp-project-web-service.onrender.com";

//functions for getting/updating/creating/deleting
const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  goalCards(data);
};

const goalCards = (data) => {
  const goalsContainer = document.getElementById("goalsContainer");

  for (let goal of data) {
    const goalCard = document.createElement("div");
    goalCard.setAttribute("id", `${goal.id}`);
    goalCard.textContent = `${goal.goal}`;
    goalsContainer.appendChild(goalCard);
  }
};

// DOM variables
const fetchGoals = document.getElementById("goalBtn");

// Event Listeners
// fetchGoals.addEventListener("click", () => {
//   getGoal();
// });

getGoals();
