let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    searchResultsEl.appendChild(resultItemEl);

    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultItemEl.href = link;
    resultItemEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    let breakLine = document.createElement("br");
    resultItemEl.appendChild(breakLine);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.target = "_blank";
    urlEl.href = link;
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let lineBreak = document.createElement("br");
    resultItemEl.appendChild(lineBreak);

    let descEl = document.createElement("p");
    descEl.classList.add("line-description");
    descEl.textContent = description;
    resultItemEl.appendChild(descEl);

}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);

    }

}

function searchWikkipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }

}

searchInputEl.addEventListener("keydown", searchWikkipedia);