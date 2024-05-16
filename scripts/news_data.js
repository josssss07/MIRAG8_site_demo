function callNews(){
  const api = 'https://gnews.io/api/v4/top-headlines?category=general&apikey=';
    const apiKey = 'da2b1b1325969d4515a72292f185bdb7';
  
    const titleElement = document.getElementById('todays-events-title');
    const infoElement = document.getElementById('todays-events-info');
    if (titleElement && infoElement) {
  
      fetch(api+apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log({data});
        const latestArticle = data.articles[0];
        titleElement.textContent = latestArticle.title;
        infoElement.textContent = latestArticle.description;

    }).catch(error => {
          console.error('Error fetching news:', error);
           // Handle the error here, like displaying an error message to the user
         });
     } else {
      console.error('HTML elements not found');
       

    }
  }

    callNews();

  