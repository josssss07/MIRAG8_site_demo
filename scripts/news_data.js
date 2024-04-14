fetch(' https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=&pageSize=1')
  .then(response => response.json())
  .then(data => {
    // Process the fetched data
    console.log(data);
    let newsHeadLine = document.getElementById();
    let news
  })
  .catch(error => {
    console.error('Error:', error);
  });

