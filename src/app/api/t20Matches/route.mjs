import { JSDOM } from 'jsdom';

async function fetchAndParse() {
  const response = await fetch('https://www.icc-cricket.com/fixtures-results');
  const text = await response.text();
  
  // Select divs with class 'si-tab-container-item'
  const items = text.querySelectorAll('.si-tab-container-item');
  console.log(items)

  // Iterate and log each item
  items.forEach((item) => {
    console.log(item.innerHTML);
  });
}

fetchAndParse();
