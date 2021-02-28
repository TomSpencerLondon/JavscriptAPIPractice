function getAlbums() {

  const rightColumn = document.getElementsByClassName("rightColumn")[0];

  const debugElement = document.getElementById("debug");

  const fetchPromise = fetch(
    "https://itunes.apple.com/us/rss/topalbums/limit=5/json"
  );

  fetchPromise
    .then((d) => d.json())
    .then((data) => {
      const albumEntries = data.feed.entry;

      // TODO1: understand the mapping dunction, and add price attribute to the album
      const albumsRemapped = albumEntries.map((album) => {
        return {
          name: album.title.label,
          price: album["im:price"].label,
        }
      });

      // TODO2: think about (but necessarily implement), on how we could display albums as bulletpoints on the webpage

      return (rightColumn.innerText = JSON.stringify(
        albumsRemapped,
        null,
        4
      ));
    })
    .catch((error) => {
      debugElement.innerText = "error: " + error.toString();
    });
}


document.addEventListener('DOMContentLoaded', getAlbums);
