function getAlbums() {

  const rightColumnElement = document.getElementsByClassName("rightColumn")[0];

  const loader = document.getElementById("loading");
  displayLoading(loader);


  const fetchPromise = fetch(
    "https://itunes.apple.com/us/rss/topalbums/limit=5/json");


  sleep(2000).then(() => {
    fetchPromise
      .then((d) => d.json())
      .then((data) => {
        const albumEntries = data.feed.entry;

        // TODO1: understand the mapping dunction, and add price attribute to the album
        const albumsRemapped = albumEntries.map((album) => {
          return {
            name: album.title.label,
            price: album["im:price"].label,
            image: album["im:image"][0].label,
          }
        });

        const ulElement = document.createElement('ul');
        ulElement.getAttribute('class', 'albums');

        rightColumnElement.appendChild(ulElement);
        hideLoading(loader);
        albumsRemapped.forEach((album) => {
          const albumTitle = `${album.name}, price: ${album.price}`;

          const albumHeader = {
            title: albumTitle,
            image: album.image
          };

          insertListItemIntoParent(ulElement, albumHeader);
        });

      })
      .catch((error) => {
        debugElement.innerText = "error: " + error.toString();
      })
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function insertListItemIntoParent(parent, albumHeader) {
    const liElement = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', albumHeader.image);
    liElement.appendChild(img);
    const albumHeaderElement = document.createTextNode(albumHeader.title);
    liElement.appendChild(albumHeaderElement);
    parent.appendChild(liElement);
  };

  function displayLoading(element) {
    element.classList.add('display');

    setTimeout(() => {
      element.classList.remove('display');
    }, 5000);
  }

  function hideLoading(element) {
    element.classList.remove('display');
  }
}

document.addEventListener('DOMContentLoaded', getAlbums);
