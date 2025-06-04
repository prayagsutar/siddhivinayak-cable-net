// Sample plans array loaded from localStorage or empty
let plans = JSON.parse(localStorage.getItem("plans")) || [];

// --- For index.html ---
function loadPlans() {
  const container = document.getElementById("plans-container");
  if (!container) return; // if on admin page no plans container
  container.innerHTML = "";

  plans.forEach((plan, i) => {
    const card = document.createElement("div");
    card.className = "plan-card";
    card.style.animationDelay = `${i * 0.2}s`;
    card.innerHTML = `
      <h3>${plan.speed}</h3>
      <p>Monthly: ₹${plan.monthly}</p>
      <p>Quarterly: ₹${plan.quarterly}</p>
      <p>Half-Yearly: ₹${plan.halfYearly}</p>
      <p>Yearly: ₹${plan.yearly}</p>
    `;
    container.appendChild(card);
  });
}

// --- For admin.html ---
function showAdminPanel() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("admin-panel").style.display = "block";
  loadExistingPlans();
}

function loadExistingPlans() {
  const existing = document.getElementById("existing-plans");
  existing.innerHTML = "";
  plans.forEach((plan, index) => {
    const div = document.createElement("div");
    div.className = "plan-card";
    div.innerHTML = `
      <h3>${plan.speed}</h3>
      <p>Monthly: ₹${plan.monthly}</p>
      <p>Quarterly: ₹${plan.quarterly}</p>
      <p>Half-Yearly: ₹${plan.halfYearly}</p>
      <p>Yearly: ₹${plan.yearly}</p>
      <button onclick="deletePlan(${index})">Delete</button>
    `;
    existing.appendChild(div);
  });
}

function deletePlan(index) {
  plans.splice(index, 1);
  localStorage.setItem("plans", JSON.stringify(plans));
  loadExistingPlans();
}

document.addEventListener("DOMContentLoaded", () => {
  loadPlans();

  // Admin Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple demo check - username: admin, password: admin123
      if (username === "admin" && password === "admin123") {
        showAdminPanel();
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // Plan add form
  const planForm = document.getElementById("plan-form");
  if (planForm) {
    planForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const speed = document.getElementById("speed").value;
      const monthly = document.getElementById("monthly").value;
      const offer = document.getElementById("offer").value;

plans.push({ speed, monthly, quarterly, halfYearly, yearly, offer });

      const quarterly = document.getElementById("quarterly").value;
      const halfYearly = document.getElementById("halfYearly").value;
      const yearly = document.getElementById("yearly").value;

      plans.push({ speed, monthly, quarterly, halfYearly, yearly });
      localStorage.setItem("plans", JSON.stringify(plans));
      loadExistingPlans();

      planForm.reset();
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      document.getElementById("admin-panel").style.display = "none";
      document.getElementById("login-form").style.display = "block";
    });
  }
});
