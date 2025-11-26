// scripts/filtered-temples.js

// Temple data array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-775369-wallpaper.jpg"
  }
];

// DOM elements
const templeContainer = document.getElementById('temple-container');
const navLinks = document.querySelectorAll('.navigation a');
const filterTitle = document.getElementById('filter-title');
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('.navigation');

// Format date for display
function formatDate(dateString) {
  const parts = dateString.split(', ');
  return `${parts[1]} ${parts[2]}, ${parts[0]}`;
}

// Format area for display
function formatArea(area) {
  return area.toLocaleString() + ' sq ft';
}

// Create temple card HTML
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';
  
  card.innerHTML = `
    <img 
      src="${temple.imageUrl}" 
      alt="${temple.templeName}" 
      class="temple-image" 
      loading="lazy"
    >
    <div class="temple-info">
      <h3 class="temple-name">${temple.templeName}</h3>
      <div class="temple-detail">
        <span class="detail-label">Location:</span>
        <span>${temple.location}</span>
      </div>
      <div class="temple-detail">
        <span class="detail-label">Dedicated:</span>
        <span>${formatDate(temple.dedicated)}</span>
      </div>
      <div class="temple-detail">
        <span class="detail-label">Size:</span>
        <span>${formatArea(temple.area)}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Display temples based on filter
function displayTemples(filter = 'home') {
  // Clear existing content
  templeContainer.innerHTML = '';
  
  let filteredTemples = [];
  let titleText = 'All Temples';
  
  switch(filter) {
    case 'old':
      // Temples built before 1900
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(', ')[0]);
        return year < 1900;
      });
      titleText = 'Old Temples (Before 1900)';
      break;
    case 'new':
      // Temples built after 2000
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(', ')[0]);
        return year > 2000;
      });
      titleText = 'New Temples (After 2000)';
      break;
    case 'large':
      // Temples larger than 90,000 square feet
      filteredTemples = temples.filter(temple => temple.area > 90000);
      titleText = 'Large Temples (>90,000 sq ft)';
      break;
    case 'small':
      // Temples smaller than 10,000 square feet
      filteredTemples = temples.filter(temple => temple.area < 10000);
      titleText = 'Small Temples (<10,000 sq ft)';
      break;
    default:
      // Show all temples (home)
      filteredTemples = temples;
      titleText = 'All Temples';
  }
  
  // Update title
  filterTitle.textContent = titleText;
  
  // Create and append temple cards
  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    templeContainer.appendChild(card);
  });
  
  // Show message if no temples match the filter
  if (filteredTemples.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No temples match the selected filter.';
    message.style.textAlign = 'center';
    message.style.gridColumn = '1 / -1';
    templeContainer.appendChild(message);
  }
}

// Update active nav link
function setActiveLink(activeFilter) {
  navLinks.forEach(link => {
    if (link.dataset.filter === activeFilter) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Toggle mobile menu
function toggleMenu() {
  navigation.classList.toggle('open');
}

// Initialize the page
function init() {
  // Set footer content
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  
  // Display all temples initially
  displayTemples();
  
  // Add event listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = e.target.dataset.filter;
      setActiveLink(filter);
      displayTemples(filter);
      
      // Close mobile menu after selection
      if (navigation.classList.contains('open')) {
        navigation.classList.remove('open');
      }
    });
  });
  
  // Add event listener to menu button
  menuButton.addEventListener('click', toggleMenu);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);