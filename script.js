const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const copyTextBtn = document.getElementById("btn_test");
const loader = document.getElementById("loader");

// Show Loading
function showLoadingSpinner() {
  // want to show
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  // if loader hiden is false => show loader
  if (!loader.hidden) {
    // show quote
    quoteContainer.hidden = false;
    // hide loader
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  // Start loading
  showLoadingSpinner();

  const proxyUrl = "https://agile-inlet-07394.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // AUTHOR ISSUE
    // if author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // Stop Loader, Show Quote
    removeLoadingSpinner();
    // throw new Error('OOOPS, There are some Errors');
  } catch (error) {
    // console.log(error);
    getQuote();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Copy Quote
function clipboardCopyTo() {
  let tempQuote = document.createElement("input");
  tempQuote.value = quoteText.innerText;
  document.body.appendChild(tempQuote);
  tempQuote.select();
  document.execCommand("copy");
  document.body.removeChild(tempQuote);
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
copyTextBtn.addEventListener("click", clipboardCopyTo);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
