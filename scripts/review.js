let count = Number(localStorage.getItem("reviewCounter")) || 0;
count += 1;
localStorage.setItem("reviewCounter", count);

document.getElementById("reviewCount").textContent = count;
