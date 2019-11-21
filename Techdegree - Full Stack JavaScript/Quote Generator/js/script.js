// Array to hold all the quotes
var quotes = [
  {
    quote: 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.',
    source: 'Patrick McKenzie',
    citation: 'Twitter',
    year: '2016' 
  },
  {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    source: 'Martin Fowler',
  },
  {
    quote: 'First, solve the problem. Then, write the code.',
    source: 'John Johnson',
  },
  {
    quote: 'Experience is the name everyone gives to their mistakes.',
    source: 'Oscar Wilde',
  },
  {
    quote: 'In order to be irreplaceable, one must always be different',
    source: 'Coco Chanel',
  }
];

// Function to generate a random quote
function getRandomQuote() {
  // Generates a random number within the arrays length
  var randomNumber = Math.floor(Math.random() * quotes.length);
  return quotes[randomNumber];
};

// Function to print quote
function printQuote() {
  // Variable to store random quote generated from getRandomQuote function
  var randQuote = getRandomQuote();
  
  // Variable to store the concatenated string and quotes
  var emptyQuote =  `<p class="quote"> ${randQuote.quote} </p>
                    <p class="source"> ${randQuote.source}`;

  // Conditional statement to check if citation and year exist
  if (randQuote.citation) {
    emptyQuote += `<span class="citation"> ${randQuote.citation}</span>`;
  } else {
    emptyQuote += '';}

  if (randQuote.year) {
      emptyQuote += `<span class="year"> ${randQuote.year}</span>`;
  } else {
      emptyQuote += '';
  }
  emptyQuote += `</p>`;

  // Targets ID in html file and inserts the quote
  document.getElementById('quote-box').innerHTML = emptyQuote; 
};

// Event listener for when the button is clicked so a new quote can be generated
document.getElementById('load-quote').addEventListener("click", printQuote, false);