const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

search.addEventListener("input", () => searchStates(search.value));

async function searchStates(searchValue) {
  const res = await fetch("../json/us.json");
  const states = await res.json();

  // RegExp
  let matches = states.filter((state) => {
    const regexp = new RegExp(`^${searchValue}`, "gi");
    return state.name.match(regexp) || state.abbr.match(regexp);
  });

  if (searchValue.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  showInDOM(matches);
}

const showInDOM = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map((match) => {
        return `
        <div class="card card-body mb-1">
          <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
          <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
      `;
      })
      .join("");

    matchList.innerHTML = html;
  }
};
