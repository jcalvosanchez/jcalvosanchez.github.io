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
      articles.forEach(article => {
        const card = createArticleCard(article);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar los artículos:", error);
      container.textContent = "No se pudieron cargar los artículos.";
    });
});
