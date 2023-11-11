// Handles direct PDF links by iterating through all links
// with 'forcedownload=1' parameter and removing the parameter

function removeForceDownloadParameter(link) {
  let url = new URL(link.href);
  url.searchParams.delete('forcedownload');
  link.href = url.href;
}

const links = document.querySelectorAll('a[href*="forcedownload=1"]');

links.forEach(link => {
  console.log(link.href);
  removeForceDownloadParameter(link);
});

// Handles links with 'id=' parameter that redirect to PDFs
// by adding a click event listener to each link and when
// clicked, fetches the URL, removes the 'forcedownload'
// parameter and opens the URL in a new tab.

const allLinks = document.querySelectorAll('a');
const linksWithId = Array.from(allLinks).filter(link => urlEndsWithId(link.href));

function urlEndsWithId(url) {
  const regex = /id=\d+$/; // This regex checks if a URL ends with 'id=' followed by numbers
  return regex.test(url);
}

function handleClick(event) {

  event.preventDefault();
  let originalLink = event.currentTarget;

  fetch(originalLink.href)
    .then(response => {
      let url = new URL(response.url);
      url.searchParams.delete('forcedownload');
      window.open(url);
    })
    .catch(error => console.log('Fetch error:', error));
}

linksWithId.forEach(link => {
  link.addEventListener('click', handleClick);
});