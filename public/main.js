// Gloabl variables
const API_URL = "https://mvp-project-web-service.onrender.com";

//functions for getting/updating/creating/deleting
const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  createGoalCards(data);
};

const createGoal = async (goal) => {
  input = document.getElementById("newGoalInput");
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      goal: `${input.value}`,
    }),
  };

  const response = await fetch(`${API_URL}/goals`, options);
  const data = await response.json();
};

const createGoalCards = (data) => {
  const goalsContainer = document.getElementById("goalsContainer");
  goalsContainer.innerHTML = "";
  for (let goal of data) {
    const goalCard = document.createElement("div");
    goalCard.setAttribute("id", `${goal.id}`);
    goalCard.textContent = `${goal.goal}`;
    goalsContainer.appendChild(goalCard);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    goalCard.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    goalCard.appendChild(deleteButton);
  }
};

// eventListeners
const createGoalBtn = document.getElementById("createBtn");
createGoalBtn.addEventListener("click", (createGoal) => {
  console.log("this button is working");
});
getGoals();
