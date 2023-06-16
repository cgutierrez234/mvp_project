// Gloabl variables
const API_URL = "https://mvp-project-web-service.onrender.com";

//functions for getting/updating/creating/deleting
const getGoal = async () => {
  const response = await fetch(`${API_URL}/goals`);
  const data = await response.json();
  console.log(data);
};

// const postGoal =

// DOM variables
const fetchGoals = document.getElementById("goalBtn");

// Event Listeners
fetchGoals.addEventListener("click", () => {
  getGoal();
});
