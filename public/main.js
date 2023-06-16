// Gloabl variables
const API_URL = "https://mvp-project-web-service.onrender.com";

//functions for getting/updating/creating/deleting
const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  createGoalCards(data);
};

const createGoalCards = (data) => {
  const goalsContainer = document.getElementById("goalsContainer");
  goalsContainer.innerHTML = "";
  for (let goal of data) {
    const goalCard = document.createElement("div");
    goalCard.setAttribute("id", `${goal.id}`);
    goalCard.textContent = `${goal.goal}`;
    goalCard.style.border = "2px solid black";
    goalsContainer.appendChild(goalCard);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    goalCard.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    goalCard.appendChild(deleteButton);
  }
};

getGoals();
