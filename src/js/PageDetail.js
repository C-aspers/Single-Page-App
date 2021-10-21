const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + '?&key=' + process.env.key;


      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {

          console.log(response);
  
          let { name, released, description, background_image, rating, ratings_count, stores, publishers, developers, parent_platforms, genres, tags, website } = response;
 
          let articleDOM = document.querySelector(".page-detail .article");
          let headerDOM = document.querySelector(".page-detail .header");
          let otherDOM = document.querySelector (".page-detail .other");

          headerDOM.querySelector("img.image-header").setAttribute("src", background_image);
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("h4.rating span").innerHTML = rating;
          articleDOM.querySelector("h4.ratings_count span").innerHTML = ratings_count;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
      
          let websiteDOM = document.getElementById("website");
          websiteDOM.innerHTML = `<a href="${website}">website</a>`      

          developers.forEach(element => {
            articleDOM.querySelector("p.developers").innerHTML += `${element.name}. `;
          });

          publishers.forEach(element => {
            articleDOM.querySelector("p.publishers").innerHTML += `${element.name}. `;
          });

          genres.forEach(element => {
            articleDOM.querySelector("p.genres").innerHTML += `${element.name}. `;
          });

          parent_platforms.forEach(element => {
          articleDOM.querySelector("p.parent_platforms").innerHTML += `${element.platform.name}<br> `;
          });

          tags.forEach(element => {
            articleDOM.querySelector("p.tags").innerHTML += `${element.name}. `;
          });

          stores.forEach(element => {
            otherDOM.querySelector("p.stores").innerHTML += `${element.store.name}. `;
          });
        });
    };

    const fetchScreenshot = (url, argument) => {
      let screenURL = url + argument + '/screenshots?&page_size=4&key=' + process.env.key;

      fetch(`${screenURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          let { results } = response;
          let screenshotsDOM = document.getElementById("screenshots");
          results.forEach(element => {
            screenshotsDOM.innerHTML += `<img class="image-center" src="${element.image}"/>`
            });
        });
    };

    let URL = "https://api.rawg.io/api/games/";
    fetchGame(URL, cleanedArgument);
    fetchScreenshot(URL, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="header">
          <img class="image-header" src=""/>
        </div>
        <div class="article">
          <h1 class="title"></h1>
          <h4 class="rating"><span></span> /5 - </h4>
          <h4 class="ratings_count"><span></span> Votes</h4>
          <div id="website"></div>
          <p class="info">Plot</p>
          <p class="description"></p>

          <p class="info">Release Date : </p>
          <p class="release-date">Release Date : <span></span></p>

          <p class="info">Developer</p>
          <p class="developers"></p>

          <p class="info">Platforms</p>
          <p class="parent_platforms"></p>

          <p class="info">Publisher</p>
          <p class="publishers"> </p>

          <p class="info">Genres</p>
          <p class="genres"></p>

          <p class="info">Tags</p>
          <p class="tags"></p><br>
        </div>
        <hr>
        <div class="other">
          <h2 class="info1">BUY</h2>
          <p class="stores"></p>
          <h2 class="info1">SCREENSHOTS</h2>
          <div id="screenshots"></div>
          <h2 class="info1">SIMILAR GAMES</h2>
          <div id="screenshots"></div>
        </div>
        <hr>
        <p>My first Single Pages Application @ 2021 - Fictionnal website for exercice</p>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };