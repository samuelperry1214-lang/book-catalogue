// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const GENRE_ORDER = [
  'Fiction',
  'Politics & Current Affairs',
  'History & Biography',
  'Economics',
  'Memoir',
  'Philosophy & Ethics',
  'Society & Culture',
  'Sport',
  'Theology & Religion'
];

const books = [
  { id: 1,  title: "Death in a Shallow Pond", author: "David Edmonds", rating: 5, yearRead: 2026, genre: "Philosophy & Ethics", isbn13: "9780691254029", isbn: "0691254028",
    review: `Typically clear explanation of philosophical ideas, really enjoyed the snippets of Parfit among the familiar EA story. Perhaps agree with some other reviewers that the objections could be more strongly resisted, but the way the author resists taking too strong a side does lend it credibility. Made me think more about: EA ≠ utilitarianism; the 'moral equivalent' line in the original thought experiment; Deaton's criticism; and Stefan Dercon's stories from DfID.` },

  { id: 2,  title: "Abundance", author: "Ezra Klein & Derek Thompson", rating: 5, yearRead: 2026, genre: "Politics & Current Affairs", isbn13: "9781668023488", isbn: "1668023482",
    review: `As much as I love Ezra Klein, I'd delayed reading this book because of how unapologetically American he'd said its focus was. I shouldn't have worried; a Fully Automated Luxury Communism reference in the first chapter and 'The purpose of a system is what it does' in its conclusion, Klein and Thompson stand on the shoulders of British giants (or Bastani's giant shoulders). No scarcity of discourse about the thesis, but as well as the many conclusions I agreed with (purportedly anti-homelessness liberals that block housing being built are bad, building state capacity is good) I was pleasantly surprised by how morally prescriptive the book was (green abundance not just general plenty).` },

  { id: 3,  title: "The Bee Sting", author: "Paul Murray", rating: 3, yearRead: 2026, genre: "Fiction", isbn13: "9780374600303", isbn: "0374600309",
    review: `Marty Supreme of books, by which I mean anxiety filled, very long and prompted me to think about what I could've learned about liberalism in the same time. Particularly dissatisfying that after 650 pages of being whacked on the head, I didn't get an ending. The structure was clever though and it's hard to put down, likewise I've learned that books that win a cafe Nero prize make for great team meeting conversation.` },

  { id: 4,  title: "Isaiah Berlin: A Life", author: "Michael Ignatieff", rating: 4, yearRead: 2026, genre: "History & Biography", isbn13: "9780099577317", isbn: "0099577313", review: "" },

  { id: 5,  title: "The Mayor of Castro Street", author: "Randy Shilts", rating: 4, yearRead: 2026, genre: "History & Biography", isbn13: "9780312019006", isbn: "0312019009",
    review: `Great story, slightly too many typos. Another case of history that is more recent than it should be.` },

  { id: 6,  title: "Fire and Ashes", author: "Michael Ignatieff", rating: 4, yearRead: 2026, genre: "Politics & Current Affairs", isbn13: "9780674725997", isbn: "0674725999",
    review: `Sage reflection on his time in politics from a great writer, only tarnished by A) the Rory Stewart endorsement (made up for by the Marc Stears one) and B) the thought that Tooze would read this memoir and feel compelled to tell the guardian that were it the 30s he'd shoot Ignatieff.` },

  { id: 7,  title: "Breakneck", author: "Dan Wang", rating: 4, yearRead: 2026, genre: "Politics & Current Affairs", isbn13: "9781324106036", isbn: "1324106034",
    review: `Compelling prose that makes what could be quite a repetitive argument eminently readable. The argument about how the US should build more is less persuasive here than elsewhere (though more emotionally forceful) but the chapters on Chinese experiments in social engineering are as powerful as any I've read in a long time. In particular, having not read before about the enforcement and only recent end of the one-child policy (and the swift reversal into blunt natalism), that chapter was particularly harrowing.` },

  { id: 8,  title: "V13", author: "Emmanuel Carrère", rating: 5, yearRead: 2026, genre: "History & Biography", isbn13: "9782818056066", isbn: "2818056063", review: "" },

  { id: 9,  title: "Revolution Française", author: "Sophie Pedder", rating: 5, yearRead: 2026, genre: "Politics & Current Affairs", isbn13: "9781472948618", isbn: "1472948610",
    review: `Very readable, a good reminder that for all the caricature of Macron now as a man of hubris, the success of En Marche! relied initially on a large scale data collection effort to understand voters. To put it crudely, I'd assumed he was a top down / smart man technocrat but on the contrary, part of Macron's personal charisma comes from an ability to make people feel listened to on an individual basis (Carrère's profiles) and as groups (le grand débat national). Also gives a refreshing level of detail about reforms to education/labour market/tax policy, reminding the English speaking reader of the particular French context they follow — notably no Thatcher/Reagan period. The highlight though was the chapter that situates his worldview in the work of Sen and Ricœur, the climax of which was the crowd chanting "en meme temps". Just about avoids hagiography, which I imagine should present less of a risk should the author write another volume. I really hope she does.` },

  { id: 10, title: "The Genius Myth", author: "Helen Lewis", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics", isbn13: "9798217178575", isbn: "", review: "" },

  { id: 11, title: "The Economics of Belonging", author: "Martin E. Sandbu", rating: 5, yearRead: 2025, genre: "Economics", isbn13: "9780691204536", isbn: "0691204535", review: "" },

  { id: 12, title: "American Wife", author: "Curtis Sittenfeld", rating: 5, yearRead: 2025, genre: "Fiction", isbn13: "9781400064755", isbn: "1400064759", review: "" },

  { id: 13, title: "Too Big to Fail", author: "Andrew Ross Sorkin", rating: 4, yearRead: 2025, genre: "Economics", isbn13: "9780670021253", isbn: "0670021253",
    review: `Rich and compelling portrait of the crisis's dramatis personae, though I found it most gripping to start with, before I did slightly tire of the repetitive format: stressed bankers trying to salvage a deal to save their firm // Paulson tearing his hair out while trying to save their firms.\n\nWould personally have appreciated more politics — 'After some additional compromise on Sunday, legislation had been drafted that was acceptable to all the parties and was now being put to a vote' p.501. This resolves the seemingly interminable debate among congress people that we read left Paulson dry heaving on p.497.` },

  { id: 14, title: "Parfit", author: "David Edmonds", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics", isbn13: "9780691225234", isbn: "0691225230", review: "" },

  { id: 15, title: "Don't Forget We're Here Forever", author: "Lamorna Ash", rating: 5, yearRead: 2025, genre: "Theology & Religion", isbn13: "9781526663153", isbn: "1526663155",
    review: `Book of the year. My reading experience in microcosm was the pause I had to take during a beautiful concluding paragraph in order to look up what "limn" means.` },

  { id: 16, title: "The New Machiavelli", author: "Jonathan Powell", rating: 4, yearRead: 2025, genre: "Politics & Current Affairs", isbn13: "9781847921222", isbn: "1847921221", review: "" },

  { id: 17, title: "Rodham", author: "Curtis Sittenfeld", rating: 5, yearRead: 2025, genre: "Fiction", isbn13: "9780399590917", isbn: "0399590919", review: "" },

  { id: 18, title: "The Plot Against America", author: "Philip Roth", rating: 5, yearRead: 2025, genre: "Fiction", isbn13: "9781400079490", isbn: "1400079497", review: "" },

  { id: 19, title: "Is This Working?", author: "Charlie Colenutt", rating: 4, yearRead: 2025, genre: "Society & Culture", isbn13: "9781035015092", isbn: "1035015099", review: "" },

  { id: 20, title: "Beyond Happy", author: "Mark Fabian", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics", isbn13: "9781835010518", isbn: "1835010512", review: "" },

  { id: 21, title: "Free", author: "Lea Ypi", rating: 5, yearRead: 2025, genre: "Memoir", isbn13: "9780393867732", isbn: "0393867730", review: "" },

  { id: 22, title: "Chronicle of a Death Foretold", author: "Gabriel García Márquez", rating: 4, yearRead: 2025, genre: "Fiction", isbn13: "9781400034710", isbn: "140003471X", review: "" },

  { id: 23, title: "Red Plenty", author: "Francis Spufford", rating: 5, yearRead: 2025, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/7397789-L.jpg", review: "" },

  { id: 24, title: "What Money Can't Buy", author: "Michael J. Sandel", rating: 4, yearRead: 2025, genre: "Philosophy & Ethics", isbn13: "9780374203030", isbn: "0374203032", review: "" },

  { id: 25, title: "Speaking Out", author: "Ed Balls", rating: 4, yearRead: 2025, genre: "Politics & Current Affairs", isbn13: "", isbn: "", review: "" },

  { id: 26, title: "Cogs and Monsters", author: "Diane Coyle", rating: 5, yearRead: 2025, genre: "Economics", isbn13: "9780691210599", isbn: "0691210594", review: "" },

  { id: 27, title: "On Beauty", author: "Zadie Smith", rating: 3, yearRead: 2025, genre: "Fiction", isbn13: "9780143037743", isbn: "0143037749", review: "" },

  { id: 28, title: "Get In", author: "Patrick Maguire & Gabriel Pogrund", rating: 5, yearRead: 2025, genre: "Politics & Current Affairs", isbn13: "9781529939439", isbn: "1529939437", review: "" },

  { id: 29, title: "What Does Jeremy Think?", author: "Suzanne Heywood", rating: 5, yearRead: 2025, genre: "History & Biography", isbn13: "9780008353124", isbn: "0008353123", review: "" },

  { id: 30, title: "Left Out", author: "Gabriel Pogrund & Patrick Maguire", rating: 5, yearRead: 2025, genre: "Politics & Current Affairs", isbn13: "9781847926456", isbn: "1847926452", review: "" },

  { id: 31, title: "Empire of Pain", author: "Patrick Radden Keefe", rating: 5, yearRead: 2025, genre: "History & Biography", isbn13: "9780385545686", isbn: "0385545681", review: "" },

  { id: 32, title: "National Dish", author: "Anya von Bremzen", rating: 4, yearRead: 2025, genre: "Society & Culture", isbn13: "9780735223165", isbn: "0735223165", review: "" },

  { id: 33, title: "A Promised Land", author: "Barack Obama", rating: 5, yearRead: 2025, genre: "History & Biography", isbn13: "9781524763183", isbn: "1524763187", review: "" },

  { id: 34, title: "Say Nothing", author: "Patrick Radden Keefe", rating: 5, yearRead: 2025, genre: "History & Biography", isbn13: "9780385521314", isbn: "0385521316", review: "" },

  { id: 35, title: "My Brilliant Friend", author: "Elena Ferrante", rating: 4, yearRead: 2024, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/13772133-L.jpg", review: "" },

  { id: 36, title: "Intermezzo", author: "Sally Rooney", rating: 5, yearRead: 2024, genre: "Fiction", isbn13: "9780374602635", isbn: "0374602638", review: "" },

  { id: 37, title: "Growth", author: "Daniel Susskind", rating: 5, yearRead: 2024, genre: "Economics", isbn13: "", isbn: "", review: "" },

  { id: 38, title: "Failed State", author: "Sam Freedman", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs", isbn13: "9781035026616", isbn: "1035026619", review: "" },

  { id: 39, title: "Great Britain?", author: "Torsten Bell", rating: 5, yearRead: 2024, genre: "Economics", isbn13: "9781529932409", isbn: "1529932408", review: "" },

  { id: 40, title: "The End of the Party", author: "Andrew Rawnsley", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs", isbn13: "9780670918515", isbn: "0670918512", review: "" },

  { id: 41, title: "Impossible City", author: "Simon Kuper", rating: 4, yearRead: 2024, genre: "Society & Culture", isbn13: "9781800816497", isbn: "1800816499", review: "" },

  { id: 42, title: "Chums", author: "Simon Kuper", rating: 4, yearRead: 2024, genre: "Politics & Current Affairs", isbn13: "9781788167383", isbn: "1788167384", review: "" },

  { id: 43, title: "A Waiter in Paris", author: "Edward Chisholm", rating: 5, yearRead: 2024, genre: "Memoir", isbn13: "9781639362837", isbn: "1639362835", review: "" },

  { id: 44, title: "Servants of the People", author: "Andrew Rawnsley", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs", isbn13: "9780140278507", isbn: "0140278508", review: "" },

  { id: 45, title: "Not the End of the World", author: "Hannah Ritchie", rating: 5, yearRead: 2024, genre: "Economics", isbn13: "9780316536752", isbn: "031653675X", review: "" },

  { id: 46, title: "Follow the Money", author: "Paul Johnson", rating: 5, yearRead: 2024, genre: "Economics", isbn13: "9781408714010", isbn: "1408714019", review: "" },

  { id: 47, title: "The Remains of the Day", author: "Kazuo Ishiguro", rating: 3, yearRead: 2023, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/95742-L.jpg", review: "" },

  { id: 48, title: "American Prometheus", author: "Kai Bird & Martin J. Sherwin", rating: 5, yearRead: 2023, genre: "History & Biography", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/6460516-L.jpg", review: "" },

  { id: 49, title: "Foster", author: "Claire Keegan", rating: 5, yearRead: 2023, genre: "Fiction", isbn13: "9780571255658", isbn: "0571255655", review: "" },

  { id: 50, title: "Small Things Like These", author: "Claire Keegan", rating: 5, yearRead: 2023, genre: "Fiction", isbn13: "9780802158741", isbn: "0802158749", review: "" },

  { id: 51, title: "Pride and Prejudice", author: "Jane Austen", rating: 5, yearRead: 2023, genre: "Fiction", isbn13: "9781441341709", isbn: "1441341706", review: "" },

  { id: 52, title: "Deep Down", author: "Imogen West-Knights", rating: 4, yearRead: 2023, genre: "Fiction", isbn13: "9780349727080", isbn: "0349727082", review: "" },

  { id: 53, title: "My Struggle, Book 1", author: "Karl Ove Knausgård", rating: 4, yearRead: 2023, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/9159180-L.jpg", review: "" },

  { id: 54, title: "Priestdaddy", author: "Patricia Lockwood", rating: 5, yearRead: 2022, genre: "Memoir", isbn13: "9781594633737", isbn: "1594633738", review: "" },

  { id: 55, title: "Norwegian Wood", author: "Haruki Murakami", rating: 3, yearRead: 2022, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/2237620-L.jpg", review: "" },

  { id: 56, title: "Open Water", author: "Caleb Azumah Nelson", rating: 5, yearRead: 2022, genre: "Fiction", isbn13: "9780241448779", isbn: "0241448778", review: "" },

  { id: 57, title: "Beautiful World, Where Are You", author: "Sally Rooney", rating: 4, yearRead: 2021, genre: "Fiction", isbn13: "9780374602604", isbn: "0374602603", review: "" },

  { id: 58, title: "What I Talk About When I Talk About Running", author: "Haruki Murakami", rating: 4, yearRead: 2021, genre: "Sport", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/13185830-L.jpg", review: "" },

  { id: 59, title: "Americanah", author: "Chimamanda Ngozi Adichie", rating: 4, yearRead: 2021, genre: "Fiction", isbn13: "", isbn: "", coverUrl: "https://covers.openlibrary.org/b/id/8474037-L.jpg", review: "" },

  { id: 60, title: "One of Them", author: "Musa Okwonga", rating: 4, yearRead: 2021, genre: "Memoir", isbn13: "9781783529681", isbn: "1783529687", review: "" },

  { id: 61, title: "The Mixer", author: "Michael Cox", rating: 4, yearRead: 2021, genre: "Sport", isbn13: "", isbn: "0008215561", review: "" },

  { id: 62, title: "Born a Crime", author: "Trevor Noah", rating: 4, yearRead: 2021, genre: "Memoir", isbn13: "9780385689229", isbn: "0385689225", review: "" },

  { id: 63, title: "James Acaster's Classic Scrapes", author: "James Acaster", rating: 4, yearRead: 2021, genre: "Memoir", isbn13: "9781472247186", isbn: "1472247183", review: "" },

  { id: 64, title: "My Life in Red and White", author: "Arsène Wenger", rating: 3, yearRead: 2021, genre: "Sport", isbn13: "9781474618243", isbn: "1474618243", review: "" },
];

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────

let state = {
  genre: null,
  year: null,
  rating: null,
  author: ''
};

// ─────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stars(n, colored = false) {
  const cls = colored ? ' class="star-filled"' : '';
  return Array.from({ length: 5 }, (_, i) =>
    `<span${i < n ? cls : ' class="star-empty"'}>★</span>`
  ).join('');
}

// ─────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────

function renderStats() {
  const years = [...new Set(books.map(b => b.yearRead))].sort();
  document.getElementById('header-stats').innerHTML = `
    <span>${books.length} books</span>
    <span class="stat-sep">·</span>
    <span>${years[0]}–${years[years.length - 1]}</span>
  `;
}

function renderGenrePills() {
  const container = document.getElementById('genre-pills');
  const allGenres = GENRE_ORDER.filter(g => books.some(b => b.genre === g));
  container.innerHTML =
    `<button class="pill active" data-genre="">All</button>` +
    allGenres.map(g =>
      `<button class="pill" data-genre="${escHtml(g)}">${escHtml(g)}</button>`
    ).join('');
}

function renderYearOptions() {
  const years = [...new Set(books.map(b => b.yearRead))].sort((a, b) => b - a);
  const sel = document.getElementById('filter-year');
  sel.innerHTML = `<option value="">All years</option>` +
    years.map(y => `<option value="${y}">${y}</option>`).join('');
}

function renderCatalogue() {
  const cat = document.getElementById('catalogue');
  const activeGenres = GENRE_ORDER.filter(g => books.some(b => b.genre === g));

  cat.innerHTML = activeGenres.map(genre => {
    const genreBooks = books.filter(b => b.genre === genre);
    return `
      <section class="genre-section" data-genre="${escHtml(genre)}">
        <h2 class="genre-title">
          <span class="genre-label">${escHtml(genre)}</span>
          <span class="genre-count">${genreBooks.length}</span>
        </h2>
        <div class="book-grid">
          ${genreBooks.map(renderCard).join('')}
        </div>
        <div class="shelf-bar"></div>
      </section>
    `;
  }).join('');

  loadAllCovers();
  attachCardListeners();
}

function renderCard(book) {
  const coverIsbn = book.isbn13 || book.isbn;
  const initial = book.title.replace(/^(The|A|An) /i, '').trim()[0].toUpperCase();
  const hasReview = book.review.trim().length > 0;

  return `
    <article
      class="book-card"
      data-id="${book.id}"
      data-genre="${escHtml(book.genre)}"
      data-year="${book.yearRead}"
      data-rating="${book.rating}"
      data-author="${escHtml(book.author.toLowerCase())}"
      role="button"
      tabindex="0"
      aria-label="${escHtml(book.title)} by ${escHtml(book.author)}"
    >
      <div class="cover-wrap">
        <div class="cover-placeholder" aria-hidden="true">${initial}</div>
        <img class="cover-img" alt="${escHtml(book.title)}"
          data-isbn13="${book.isbn13 || ''}" data-isbn="${book.isbn || ''}"
          data-title="${escHtml(book.title)}" data-author="${escHtml(book.author)}"
          ${book.coverUrl ? `data-coverurl="${escHtml(book.coverUrl)}"` : ''}
          loading="lazy">
        ${hasReview ? `<div class="review-badge" title="Has review">✍</div>` : ''}
      </div>
      <div class="card-info">
        <div class="card-meta">
          <span class="card-stars">${stars(book.rating, true)}</span>
          <span class="card-year">${book.yearRead}</span>
        </div>
        <h3 class="card-title">${escHtml(book.title)}</h3>
        <p class="card-author">${escHtml(book.author)}</p>
      </div>
    </article>
  `;
}

// ─────────────────────────────────────────
// FILTERING
// ─────────────────────────────────────────

function applyFilters() {
  const cards = document.querySelectorAll('.book-card');
  const sections = document.querySelectorAll('.genre-section');

  cards.forEach(card => {
    const matchGenre  = !state.genre  || card.dataset.genre  === state.genre;
    const matchYear   = !state.year   || card.dataset.year   === state.year;
    const matchRating = !state.rating || parseInt(card.dataset.rating) >= parseInt(state.rating);
    const matchAuthor = !state.author || card.dataset.author.includes(state.author.toLowerCase());
    card.classList.toggle('hidden', !(matchGenre && matchYear && matchRating && matchAuthor));
  });

  sections.forEach(section => {
    const visible = section.querySelectorAll('.book-card:not(.hidden)').length > 0;
    section.classList.toggle('hidden', !visible);
  });

  const clearBtn = document.getElementById('clear-filters');
  const hasFilter = state.genre || state.year || state.rating || state.author;
  clearBtn.classList.toggle('visible', !!hasFilter);

  updateResultCount();
}

function updateResultCount() {
  const visible = document.querySelectorAll('.book-card:not(.hidden)').length;
  const countEl = document.getElementById('result-count');
  if (countEl) {
    countEl.textContent = visible === books.length
      ? `${books.length} books`
      : `${visible} of ${books.length} books`;
  }
}

// ─────────────────────────────────────────
// COVERS
// ─────────────────────────────────────────

function loadAllCovers() {
  document.querySelectorAll('.cover-img').forEach(img => loadCover(img));
}

function loadCover(img) {
  const { isbn13, isbn, title, author, coverurl } = img.dataset;
  const id = isbn13 || isbn;

  if (coverurl) {
    img.src = coverurl;
    img.onload = () => img.classList.add('loaded');
    img.onerror = () => tryGoogleBooks(img);
    return;
  }

  if (id) {
    img.src = `https://covers.openlibrary.org/b/isbn/${id}-L.jpg`;
    img.onload = () => {
      if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
        tryGoogleBooks(img);
      } else {
        img.classList.add('loaded');
      }
    };
    img.onerror = () => tryGoogleBooks(img);
  } else {
    tryGoogleBooks(img);
  }
}

async function tryGoogleBooks(img) {
  const { isbn13, isbn, title, author } = img.dataset;
  const id = isbn13 || isbn;
  const q = id
    ? `isbn:${id}`
    : `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;

  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`);
    const data = await res.json();
    const thumb = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (thumb) {
      img.src = thumb
        .replace('http:', 'https:')
        .replace('zoom=1', 'zoom=3')
        .replace('&edge=curl', '');
      img.onload = () => img.classList.add('loaded');
      img.onerror = () => { /* keep placeholder */ };
    }
    // If no result, placeholder stays visible
  } catch {
    // keep placeholder
  }
}

// ─────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────

function openModal(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById('modal-title').textContent  = book.title;
  document.getElementById('modal-author').textContent = book.author;
  document.getElementById('modal-genre').textContent  = book.genre;
  document.getElementById('modal-year').textContent   = `Read in ${book.yearRead}`;
  document.getElementById('modal-stars').innerHTML    = stars(book.rating, true);

  const reviewEl = document.getElementById('modal-review');
  if (book.review.trim()) {
    reviewEl.textContent = book.review;
    reviewEl.classList.remove('no-review');
  } else {
    reviewEl.textContent = 'No review written.';
    reviewEl.classList.add('no-review');
  }

  // Cover
  const coverIsbn = book.isbn13 || book.isbn;
  const modalCover = document.getElementById('modal-cover');
  modalCover.alt = book.title;
  modalCover.className = '';

  if (coverIsbn) {
    modalCover.src = `https://covers.openlibrary.org/b/isbn/${coverIsbn}-L.jpg`;
    modalCover.onload = () => {
      if (modalCover.naturalWidth > 1) modalCover.classList.add('loaded');
      else tryGoogleBooks(modalCover);
    };
    modalCover.onerror = () => tryGoogleBooks(modalCover);
    modalCover.dataset.isbn13   = book.isbn13   || '';
    modalCover.dataset.isbn     = book.isbn     || '';
    modalCover.dataset.title    = book.title;
    modalCover.dataset.author   = book.author;
    modalCover.dataset.coverurl = book.coverUrl || '';
  } else {
    modalCover.dataset.isbn13   = '';
    modalCover.dataset.isbn     = '';
    modalCover.dataset.title    = book.title;
    modalCover.dataset.author   = book.author;
    modalCover.dataset.coverurl = book.coverUrl || '';
    tryGoogleBooks(modalCover);
  }

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// ─────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────

function attachCardListeners() {
  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(parseInt(card.dataset.id));
    });
  });
}

function setupEventListeners() {
  // Genre pills
  document.getElementById('genre-pills').addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.genre = pill.dataset.genre || null;
    applyFilters();
  });

  // Year
  document.getElementById('filter-year').addEventListener('change', e => {
    state.year = e.target.value || null;
    applyFilters();
  });

  // Rating
  document.getElementById('filter-rating').addEventListener('change', e => {
    state.rating = e.target.value || null;
    applyFilters();
  });

  // Author
  document.getElementById('filter-author').addEventListener('input', e => {
    state.author = e.target.value.trim();
    applyFilters();
  });

  // Clear
  document.getElementById('clear-filters').addEventListener('click', () => {
    state = { genre: null, year: null, rating: null, author: '' };
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pill[data-genre=""]').classList.add('active');
    document.getElementById('filter-year').value   = '';
    document.getElementById('filter-rating').value = '';
    document.getElementById('filter-author').value = '';
    applyFilters();
  });

  // Modal
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderGenrePills();
  renderYearOptions();
  renderCatalogue();
  setupEventListeners();
});
