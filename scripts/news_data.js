window.onload = function() {

    const apiUrl = 'https://newsapi.org/v2/top-headlines';
    const apiKey = '1a8d9c287b604937b38c475562e315d0';
  
    const titleElement = document.getElementById('todays-events-title');
    const infoElement = document.getElementById('todays-events-info');
  
    if (titleElement && infoElement) {
  
      fetch(`${apiUrl}?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
  
          const latestArticle = data.articles[0];
          titleElement.textContent = latestArticle.title;
          infoElement.textContent = latestArticle.description;
        })
        .catch(error => {
          console.error('Error fetching news:', error);
          // Handle the error here, like displaying an error message to the user
        });
    } else {
      console.error('HTML elements not found');
    }
  };
  