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
    goalsContainer.appendChild(goalCard);

    const createGoal = document.createElement("input");
    goalCard.appendChild(createGoal);

    const createBtn = document.createElement("button");
    createBtn.textContent = "New Goal";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    goalCard.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    goalCard.appendChild(deleteButton);
  }
};

getGoals();
