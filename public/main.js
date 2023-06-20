// Gloabl variables
const API_URL = "https://mvp-project-web-service.onrender.com";

//functions for getting/updating/creating/deleting
const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  createGoalCards(data);
};

const createGoal = async () => {
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

  await fetch(`${API_URL}/goals`, options);

  getGoals();
};

const deleteGoal = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  };
  await fetch(`${API_URL}/goals/${id}`, options);

  getGoals();
};

const updateGoal = async (id, text) => {
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      goal: `${text}`,
    }),
  };
  await fetch(`${API_URL}/goals/${id}`, options);

  getGoals();
};

const createGoalCards = (data) => {
  const goalsContainer = document.getElementById("goalsContainer");
  goalsContainer.innerHTML = "";
  for (let goal of data) {
    const goalCard = document.createElement("div");
    goalCard.setAttribute("id", `${goal.id}`);
    goalsContainer.appendChild(goalCard);

    const textContentContainer = document.createElement("div");
    textContentContainer.textContent = goal.goal;
    goalCard.appendChild(textContentContainer);

    const goalBtnContainer = document.createElement("div");
    goalCard.appendChild(goalBtnContainer);

    const editButton = document.createElement("button");
    editButton.addEventListener("click", (e) => {
      textContentContainer.contentEditable = "true";
      e.target.parentElement.previousSibling.focus();
      editButton.style.opacity = 0;

      const submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      //   updateGoal(
      //     e.target.parentElement.previousSibling.id,
      //     textContentContainer.value
      //   );
    });
    editButton.textContent = "Edit";
    editButton.classList.add("editBtn");
    goalBtnContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => {
      deleteGoal(goal.id);
    });
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteBtn");
    goalBtnContainer.appendChild(deleteButton);
  }
};

// eventListeners
const createGoalBtn = document.getElementById("createBtn");
createGoalBtn.addEventListener("click", () => {
  createGoal();
});

getGoals();
