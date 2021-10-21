//import dayjs from 'dayjs';
//console.log(dayjs().format('MMMM DD YYYY')); // October 19 2021
//console.log(dayjs().subtract(10, 'days').format('DD/MM/YYYY')); // 19/10/2021

var search = document.getElementById("search");
var movieSearch;
search.addEventListener("input", () => {
  gameSearch = response.result;
  fetchList(search);
});

const PageList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument + '?&key=' + process.env.key;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results)
          response.results.forEach((article) => {
            articles += `
                  <div class="cardGame">
                    <img class="image" src="${article.background_image}"/>
                    <h1>${article.name}</h1>
                    <h2>${article.released}</h2>
                    <a href = "#pagedetail/${article.id}">${article.id}</a>
                    <div/>
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageList };