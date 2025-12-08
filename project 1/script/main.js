/* COSMIC EXPLORERS – main.js
   ✔ Multiple Functions
   ✔ DOM Selection + Modification
   ✔ Event Listeners
   ✔ Conditional Branching
   ✔ Objects
   ✔ Arrays + filter/map/forEach
   ✔ Template Literals ONLY
   ✔ localStorage
*/

const cosmicData = [
  { id:1, name:"Mars", type:"planet", img:"images/planet1.jpg" },
  { id:2, name:"Neptune", type:"planet", img:"images/planet2.jpg" },
  { id:3, name:"Milky Way", type:"galaxy", img:"images/milkyway.jpg" },
  { id:4, name:"Whirlpool Galaxy", type:"galaxy", img:"images/galaxy2.jpg" }
];

// ---------- FUNCTION: Render Cards ----------
function renderCosmicItems(items, targetId){
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = items.map(obj => `
    <article>
      <img src="${obj.img}" alt="${obj.name}" loading="lazy">
      <h3>${obj.name}</h3>
      <p>Type: ${obj.type}</p>
      <button class="saveBtn" data-id="${obj.id}">Save</button>
    </article>
  `).join("");
}

// ---------- FUNCTION: Save to localStorage ----------
function saveCosmicItem(id){
  const item = cosmicData.find(x => x.id === id);
  if (!item) return;

  const saved = JSON.parse(localStorage.getItem("savedCosmos") || "[]");

  if(saved.some(s => s.id === id)){
    alert(`${item.name} is already saved.`);
    return;
  }

  saved.push(item);
  localStorage.setItem("savedCosmos", JSON.stringify(saved));
  alert(`${item.name} saved!`);
}

// ---------- FUNCTION: Load Saved Items (About Page) ----------
function displaySaved(){
  const output = document.getElementById("savedOutput");
  if (!output) return;

  const saved = JSON.parse(localStorage.getItem("savedCosmos") || "[]");
  output.innerHTML = saved.length
    ? saved.map(s => `${s.name} (${s.type})`).join(", ")
    : "No items saved yet.";
}

// ---------- EVENT: Load Features on Home ----------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loadCosmos");
  if(btn){
    btn.addEventListener("click", () => {
      renderCosmicItems(cosmicData.slice(0,3), "cosmicContainer");
    });
  }

  // Discover page filtering
  const filter = document.getElementById("filter");
  if(filter){
    filter.addEventListener("change", () => {
      const val = filter.value;
      const filtered = val === "all"
        ? cosmicData
        : cosmicData.filter(x => x.type === val);
      renderCosmicItems(filtered, "discoverGrid");
    });

    renderCosmicItems(cosmicData, "discoverGrid");
  }

  // About page saved items
  displaySaved();
});

// ---------- GLOBAL Event Delegation for Save Buttons ----------
document.addEventListener("click", e => {
  if(e.target.classList.contains("saveBtn")){
    const id = Number(e.target.dataset.id);
    saveCosmicItem(id);
    displaySaved();
  }
});

// ---------- FORM Handling + localStorage ----------
document.addEventListener("submit", e => {
  if(e.target.id === "joinForm"){
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();

    if(!name || !email){
      alert("Please complete all fields.");
      return;
    }

    const user = {
      name,
      email,
      updates: document.querySelector("input[name='updates']:checked")?.value || "no",
      date: new Date().toISOString()
    };

    localStorage.setItem("newsletterUser", JSON.stringify(user));

    alert(`Welcome aboard, ${name}!`);
    e.target.reset();
  }
});
