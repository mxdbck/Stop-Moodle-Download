function removeForceDownloadParameter(link) {
  let url = new URL(link.href);
  url.searchParams.delete('forcedownload'); // This removes the 'forcedownload' parameter
  link.href = url.href; // Update the href attribute of the link
}

// Select all links on the page
const links = document.querySelectorAll('a[href*="forcedownload=1"]');

// Iterate over the links and remove the 'forcedownload' parameter
links.forEach(link => {
  removeForceDownloadParameter(link);
});
