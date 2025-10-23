let allArticles = []; // artículos originales
let filteredArticles = []; // artículos visibles actualmente

function createArticleCard(article) {
  const card = document.createElement("div");
  card.className = "article-card";

  const img = document.createElement("img");
  img.src = article.image;
  img.alt = article.title;
  img.className = "article-image";

  const h3 = document.createElement("h3");
  h3.className = "article-title";
  const a = document.createElement("a");
  a.href = article.url;
  a.target = "_blank";
  a.textContent = article.title;
  h3.appendChild(a);

  card.appendChild(img);
  card.appendChild(h3);

  return card;
}

function populateTagFilter(articles) {
  const select = document.getElementById("tag-filter");
  const tags = new Set();

  articles.forEach(a => (a.tags || []).forEach(tag => tags.add(tag)));

  tags.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    select.appendChild(opt);
  });
}

function applyFiltersAndSorting() {
  const tagFilter = document.getElementById("tag-filter").value;
  const sortOrder = document.getElementById("order-filter").value;

  // Filtro
  filteredArticles = allArticles.filter(article =>
    tagFilter === "all" ? true : (article.tags || []).includes(tagFilter)
  );

  // Orden
  filteredArticles.sort((a, b) => {
    switch (sortOrder) {
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  renderArticles(filteredArticles);
}

function renderArticles(list) {
  const container = document.querySelector(".article-list");
  container.innerHTML = "";

  if (list.length === 0) {
    container.textContent = "No se encontraron artículos.";
    return;
  }

  list.forEach(article => container.appendChild(createArticleCard(article)));
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".article-list");
  container.innerHTML = "";

  fetch("../articles/articles.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(articles => {
      allArticles = articles;
      populateTagFilter(articles);
      articles.forEach(article => {
        const card = createArticleCard(article);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar los artículos:", error);
      container.textContent = "No se pudieron cargar los artículos.";
    });

  document
    .getElementById("tag-filter")
    .addEventListener("change", applyFiltersAndSorting);
  document
    .getElementById("order-filter")
    .addEventListener("change", applyFiltersAndSorting);
  document
    .getElementById("clear-filters")
    .addEventListener("click", () => {
      document.getElementById("tag-filter").value = "all";
      document.getElementById("order-filter").value = "date-desc";
      applyFiltersAndSorting();
    });
});
