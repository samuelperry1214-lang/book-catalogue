// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────

const AUTH_PASSPHRASE = 'KweeCourtCorpus';
const AUTH_KEY = 'lib_auth_expiry';
const AUTH_DAYS = 90;

function isAuthenticated() {
  const expiry = parseInt(localStorage.getItem(AUTH_KEY) || '0', 10);
  return Date.now() < expiry;
}

function grantAuth() {
  localStorage.setItem(AUTH_KEY, String(Date.now() + AUTH_DAYS * 86400000));
}

function showAuthWall(onSuccess) {
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-box">
      <h1 class="auth-title">My Library</h1>
      <p class="auth-subtitle">Enter passphrase to continue</p>
      <div class="auth-fields">
        <input type="password" id="auth-input" class="auth-input" placeholder="Passphrase…" autocomplete="current-password">
        <button id="auth-submit" class="auth-submit">Enter</button>
      </div>
      <p id="auth-error" class="auth-error hidden">Incorrect passphrase</p>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => document.getElementById('auth-input').focus(), 50);

  function attempt() {
    const val = document.getElementById('auth-input').value;
    if (val === AUTH_PASSPHRASE) {
      grantAuth();
      overlay.remove();
      onSuccess();
    } else {
      document.getElementById('auth-error').classList.remove('hidden');
      const box = overlay.querySelector('.auth-box');
      box.classList.add('auth-shake');
      setTimeout(() => box.classList.remove('auth-shake'), 400);
      document.getElementById('auth-input').value = '';
      document.getElementById('auth-input').focus();
    }
  }

  document.getElementById('auth-submit').addEventListener('click', attempt);
  document.getElementById('auth-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') attempt();
  });
}

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
  { id: 1,  title: "Death in a Shallow Pond", author: "David Edmonds", rating: 5, yearRead: 2026, genre: "Philosophy & Ethics",
    isbn13: "9780691254029", isbn: "0691254028",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1742739406i/230169570.jpg",
    review: `Typically clear explanation of philosophical ideas, really enjoyed the snippets of Parfit among the familiar EA story. Perhaps agree with some other reviewers that the objections could be more strongly resisted, but the way the author resists taking too strong a side does lend it credibility. Made me think more about: EA ≠ utilitarianism; the 'moral equivalent' line in the original thought experiment; Deaton's criticism; and Stefan Dercon's stories from DfID.` },

  { id: 2,  title: "Abundance", author: "Ezra Klein & Derek Thompson", rating: 5, yearRead: 2026, genre: "Politics & Current Affairs",
    isbn13: "9781668023488", isbn: "1668023482",
    coverUrl: "https://covers.openlibrary.org/b/id/15038381-L.jpg",
    review: `As much as I love Ezra Klein, I'd delayed reading this book because of how unapologetically American he'd said its focus was. I shouldn't have worried; a Fully Automated Luxury Communism reference in the first chapter and 'The purpose of a system is what it does' in its conclusion, Klein and Thompson stand on the shoulders of British giants (or Bastani's giant shoulders). No scarcity of discourse about the thesis, but as well as the many conclusions I agreed with (purportedly anti-homelessness liberals that block housing being built are bad, building state capacity is good) I was pleasantly surprised by how morally prescriptive the book was (green abundance not just general plenty).` },

  { id: 3,  title: "The Bee Sting", author: "Paul Murray", rating: 3, yearRead: 2026, genre: "Fiction",
    isbn13: "9780374600303", isbn: "0374600309",
    coverUrl: "https://covers.openlibrary.org/b/id/14406691-L.jpg",
    review: `Marty Supreme of books, by which I mean anxiety filled, very long and prompted me to think about what I could've learned about liberalism in the same time. Particularly dissatisfying that after 650 pages of being whacked on the head, I didn't get an ending. The structure was clever though and it's hard to put down, likewise I've learned that books that win a cafe Nero prize make for great team meeting conversation.` },

  { id: 4,  title: "Isaiah Berlin: A Life", author: "Michael Ignatieff", rating: 4, yearRead: 2026, genre: "History & Biography",
    isbn13: "9780099577317", isbn: "0099577313",
    coverUrl: "https://covers.openlibrary.org/b/id/77475-L.jpg",
    review: "" },

  { id: 5,  title: "The Mayor of Castro Street", author: "Randy Shilts", rating: 4, yearRead: 2026, genre: "History & Biography",
    isbn13: "9780312019006", isbn: "0312019009",
    coverUrl: "https://covers.openlibrary.org/b/id/172654-L.jpg",
    review: `Great story, slightly too many typos. Another case of history that is more recent than it should be.` },

  { id: 6,  title: "Fire and Ashes", author: "Michael Ignatieff", rating: 4, yearRead: 2026, genre: "Politics & Current Affairs",
    isbn13: "9780674725997", isbn: "0674725999",
    coverUrl: "https://covers.openlibrary.org/b/id/12712372-L.jpg",
    review: `Sage reflection on his time in politics from a great writer, only tarnished by A) the Rory Stewart endorsement (made up for by the Marc Stears one) and B) the thought that Tooze would read this memoir and feel compelled to tell the guardian that were it the 30s he'd shoot Ignatieff.` },

  { id: 7,  title: "Breakneck", author: "Dan Wang", rating: 4, yearRead: 2026, genre: "Politics & Current Affairs",
    isbn13: "9781324106036", isbn: "1324106034",
    coverUrl: "https://covers.openlibrary.org/b/id/15121652-L.jpg",
    review: `Compelling prose that makes what could be quite a repetitive argument eminently readable. The argument about how the US should build more is less persuasive here than elsewhere (though more emotionally forceful) but the chapters on Chinese experiments in social engineering are as powerful as any I've read in a long time. In particular, having not read before about the enforcement and only recent end of the one-child policy (and the swift reversal into blunt natalism), that chapter was particularly harrowing.` },

  { id: 8,  title: "V13", author: "Emmanuel Carrère", rating: 5, yearRead: 2026, genre: "History & Biography",
    isbn13: "9782818056066", isbn: "2818056063",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1718824599i/207375697.jpg",
    review: "" },

  { id: 9,  title: "Revolution Française", author: "Sophie Pedder", rating: 5, yearRead: 2026, genre: "Politics & Current Affairs",
    isbn13: "9781472948618", isbn: "1472948610",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1504922457i/36208375.jpg",
    review: `Very readable, a good reminder that for all the caricature of Macron now as a man of hubris, the success of En Marche! relied initially on a large scale data collection effort to understand voters. To put it crudely, I'd assumed he was a top down / smart man technocrat but on the contrary, part of Macron's personal charisma comes from an ability to make people feel listened to on an individual basis (Carrère's profiles) and as groups (le grand débat national). Also gives a refreshing level of detail about reforms to education/labour market/tax policy, reminding the English speaking reader of the particular French context they follow — notably no Thatcher/Reagan period. The highlight though was the chapter that situates his worldview in the work of Sen and Ricœur, the climax of which was the crowd chanting "en meme temps". Just about avoids hagiography, which I imagine should present less of a risk should the author write another volume. I really hope she does.` },

  { id: 10, title: "The Genius Myth", author: "Helen Lewis", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics",
    isbn13: "9798217178575", isbn: "",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1745528872i/228026850.jpg",
    review: "" },

  { id: 11, title: "The Economics of Belonging", author: "Martin E. Sandbu", rating: 5, yearRead: 2025, genre: "Economics",
    isbn13: "9780691204536", isbn: "0691204535",
    coverUrl: "https://covers.openlibrary.org/b/id/10304662-L.jpg",
    review: "" },

  { id: 12, title: "American Wife", author: "Curtis Sittenfeld", rating: 5, yearRead: 2025, genre: "Fiction",
    isbn13: "9781400064755", isbn: "1400064759",
    coverUrl: "https://covers.openlibrary.org/b/id/5934583-L.jpg",
    review: "" },

  { id: 13, title: "Too Big to Fail", author: "Andrew Ross Sorkin", rating: 4, yearRead: 2025, genre: "Economics",
    isbn13: "9780670021253", isbn: "0670021253",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1347504190i/6687247.jpg",
    review: `Rich and compelling portrait of the crisis's dramatis personae, though I found it most gripping to start with, before I did slightly tire of the repetitive format: stressed bankers trying to salvage a deal to save their firm // Paulson tearing his hair out while trying to save their firms.\n\nWould personally have appreciated more politics — 'After some additional compromise on Sunday, legislation had been drafted that was acceptable to all the parties and was now being put to a vote' p.501. This resolves the seemingly interminable debate among congress people that we read left Paulson dry heaving on p.497.` },

  { id: 14, title: "Parfit", author: "David Edmonds", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics",
    isbn13: "9780691225234", isbn: "0691225230",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1670259620i/61388047.jpg",
    review: "" },

  { id: 15, title: "Don't Forget We're Here Forever", author: "Lamorna Ash", rating: 5, yearRead: 2025, genre: "Theology & Religion",
    isbn13: "9781526663153", isbn: "1526663155",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1734278396i/222582492.jpg",
    review: `Book of the year. My reading experience in microcosm was the pause I had to take during a beautiful concluding paragraph in order to look up what "limn" means.` },

  { id: 16, title: "The New Machiavelli", author: "Jonathan Powell", rating: 4, yearRead: 2025, genre: "Politics & Current Affairs",
    isbn13: "9781847921222", isbn: "1847921221",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1320551396i/8404422.jpg",
    review: "" },

  { id: 17, title: "Rodham", author: "Curtis Sittenfeld", rating: 5, yearRead: 2025, genre: "Fiction",
    isbn13: "9780399590917", isbn: "0399590919",
    coverUrl: "https://covers.openlibrary.org/b/id/9829535-L.jpg",
    review: "" },

  { id: 18, title: "The Plot Against America", author: "Philip Roth", rating: 5, yearRead: 2025, genre: "Fiction",
    isbn13: "9781400079490", isbn: "1400079497",
    coverUrl: "https://covers.openlibrary.org/b/id/8294897-L.jpg",
    review: "" },

  { id: 19, title: "Is This Working?", author: "Charlie Colenutt", rating: 4, yearRead: 2025, genre: "Society & Culture",
    isbn13: "9781035015092", isbn: "1035015099",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1741648150i/228999528.jpg",
    review: "" },

  { id: 20, title: "Beyond Happy", author: "Mark Fabian", rating: 5, yearRead: 2025, genre: "Philosophy & Ethics",
    isbn13: "9781835010518", isbn: "1835010512",
    coverUrl: "https://bedfordsquarepublishers.co.uk/wp-content/uploads/2026/03/jpg_rgb_original-30-scaled-wpv_600x.jpg",
    review: "" },

  { id: 21, title: "Free", author: "Lea Ypi", rating: 5, yearRead: 2025, genre: "Memoir",
    isbn13: "9780393867732", isbn: "0393867730",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1636348840i/58085227.jpg",
    review: "" },

  { id: 22, title: "Chronicle of a Death Foretold", author: "Gabriel García Márquez", rating: 4, yearRead: 2025, genre: "Fiction",
    isbn13: "9781400034710", isbn: "140003471X",
    coverUrl: "https://covers.openlibrary.org/b/id/11723589-L.jpg",
    review: "" },

  { id: 23, title: "Red Plenty", author: "Francis Spufford", rating: 5, yearRead: 2025, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/7397789-L.jpg",
    review: "" },

  { id: 24, title: "What Money Can't Buy", author: "Michael J. Sandel", rating: 4, yearRead: 2025, genre: "Philosophy & Ethics",
    isbn13: "9780374203030", isbn: "0374203032",
    coverUrl: "https://covers.openlibrary.org/b/id/10202525-L.jpg",
    review: "" },

  { id: 25, title: "Speaking Out", author: "Ed Balls", rating: 4, yearRead: 2025, genre: "Politics & Current Affairs",
    isbn13: "", isbn: "",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1470751077i/31386764.jpg",
    review: "" },

  { id: 26, title: "Cogs and Monsters", author: "Diane Coyle", rating: 5, yearRead: 2025, genre: "Economics",
    isbn13: "9780691210599", isbn: "0691210594",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1620081794i/57423841.jpg",
    review: "" },

  { id: 27, title: "On Beauty", author: "Zadie Smith", rating: 3, yearRead: 2025, genre: "Fiction",
    isbn13: "9780143037743", isbn: "0143037749",
    coverUrl: "https://covers.openlibrary.org/b/id/400923-L.jpg",
    review: "" },

  { id: 28, title: "Get In", author: "Patrick Maguire & Gabriel Pogrund", rating: 5, yearRead: 2025, genre: "Politics & Current Affairs",
    isbn13: "9781529939439", isbn: "1529939437",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1739677184i/208144049.jpg",
    review: "" },

  { id: 29, title: "What Does Jeremy Think?", author: "Suzanne Heywood", rating: 5, yearRead: 2025, genre: "History & Biography",
    isbn13: "9780008353124", isbn: "0008353123",
    coverUrl: "https://covers.openlibrary.org/b/id/12423385-L.jpg",
    review: "" },

  { id: 30, title: "Left Out", author: "Gabriel Pogrund & Patrick Maguire", rating: 5, yearRead: 2025, genre: "Politics & Current Affairs",
    isbn13: "9781847926456", isbn: "1847926452",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1595946344i/51003632.jpg",
    review: "" },

  { id: 31, title: "Empire of Pain", author: "Patrick Radden Keefe", rating: 5, yearRead: 2025, genre: "History & Biography",
    isbn13: "9780385545686", isbn: "0385545681",
    coverUrl: "https://covers.openlibrary.org/b/id/10678221-L.jpg",
    review: "" },

  { id: 32, title: "National Dish", author: "Anya von Bremzen", rating: 4, yearRead: 2025, genre: "Society & Culture",
    isbn13: "9780735223165", isbn: "0735223165",
    coverUrl: "https://covers.openlibrary.org/b/id/14569147-L.jpg",
    review: "" },

  { id: 33, title: "A Promised Land", author: "Barack Obama", rating: 5, yearRead: 2025, genre: "History & Biography",
    isbn13: "9781524763183", isbn: "1524763187",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1600357110i/55361205.jpg",
    review: "" },

  { id: 34, title: "Say Nothing", author: "Patrick Radden Keefe", rating: 5, yearRead: 2025, genre: "History & Biography",
    isbn13: "9780385521314", isbn: "0385521316",
    coverUrl: "https://covers.openlibrary.org/b/id/8808839-L.jpg",
    review: "" },

  { id: 35, title: "My Brilliant Friend", author: "Elena Ferrante", rating: 4, yearRead: 2024, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/13772133-L.jpg",
    review: "" },

  { id: 36, title: "Intermezzo", author: "Sally Rooney", rating: 5, yearRead: 2024, genre: "Fiction",
    isbn13: "9780374602635", isbn: "0374602638",
    coverUrl: "https://covers.openlibrary.org/b/id/14822204-L.jpg",
    review: "" },

  { id: 37, title: "Growth", author: "Daniel Susskind", rating: 5, yearRead: 2024, genre: "Economics",
    isbn13: "", isbn: "",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1698866423l/201269395.jpg",
    review: "" },

  { id: 38, title: "Failed State", author: "Sam Freedman", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs",
    isbn13: "9781035026616", isbn: "1035026619",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1717505544i/208868800.jpg",
    review: "" },

  { id: 39, title: "Great Britain?", author: "Torsten Bell", rating: 5, yearRead: 2024, genre: "Economics",
    isbn13: "9781529932409", isbn: "1529932408",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1717880783i/202366288.jpg",
    review: "" },

  { id: 40, title: "The End of the Party", author: "Andrew Rawnsley", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs",
    isbn13: "9780670918515", isbn: "0670918512",
    coverUrl: "https://covers.openlibrary.org/b/id/10199505-L.jpg",
    review: "" },

  { id: 41, title: "Impossible City", author: "Simon Kuper", rating: 4, yearRead: 2024, genre: "Society & Culture",
    isbn13: "9781800816497", isbn: "1800816499",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1714640784i/198122929.jpg",
    review: "" },

  { id: 42, title: "Chums", author: "Simon Kuper", rating: 4, yearRead: 2024, genre: "Politics & Current Affairs",
    isbn13: "9781788167383", isbn: "1788167384",
    coverUrl: "https://covers.openlibrary.org/b/id/14759666-L.jpg",
    review: "" },

  { id: 43, title: "A Waiter in Paris", author: "Edward Chisholm", rating: 5, yearRead: 2024, genre: "Memoir",
    isbn13: "9781639362837", isbn: "1639362835",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1644465688i/60320723.jpg",
    review: "" },

  { id: 44, title: "Servants of the People", author: "Andrew Rawnsley", rating: 5, yearRead: 2024, genre: "Politics & Current Affairs",
    isbn13: "9780140278507", isbn: "0140278508",
    coverUrl: "https://covers.openlibrary.org/b/id/11711897-L.jpg",
    review: "" },

  { id: 45, title: "Not the End of the World", author: "Hannah Ritchie", rating: 5, yearRead: 2024, genre: "Economics",
    isbn13: "9780316536752", isbn: "031653675X",
    coverUrl: "https://covers.openlibrary.org/b/id/14566982-L.jpg",
    review: "" },

  { id: 46, title: "Follow the Money", author: "Paul Johnson", rating: 5, yearRead: 2024, genre: "Economics",
    isbn13: "9781408714010", isbn: "1408714019",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1673265673i/75593706.jpg",
    review: "" },

  { id: 47, title: "The Remains of the Day", author: "Kazuo Ishiguro", rating: 3, yearRead: 2023, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/95742-L.jpg",
    review: "" },

  { id: 48, title: "American Prometheus", author: "Kai Bird & Martin J. Sherwin", rating: 5, yearRead: 2023, genre: "History & Biography",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/6460516-L.jpg",
    review: "" },

  { id: 49, title: "Foster", author: "Claire Keegan", rating: 5, yearRead: 2023, genre: "Fiction",
    isbn13: "9780571255658", isbn: "0571255655",
    coverUrl: "https://covers.openlibrary.org/b/id/10335372-L.jpg",
    review: "" },

  { id: 50, title: "Small Things Like These", author: "Claire Keegan", rating: 5, yearRead: 2023, genre: "Fiction",
    isbn13: "9780802158741", isbn: "0802158749",
    coverUrl: "https://covers.openlibrary.org/b/id/15096821-L.jpg",
    review: "" },

  { id: 51, title: "Pride and Prejudice", author: "Jane Austen", rating: 5, yearRead: 2023, genre: "Fiction",
    isbn13: "9781441341709", isbn: "1441341706",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    review: "" },

  { id: 52, title: "Deep Down", author: "Imogen West-Knights", rating: 4, yearRead: 2023, genre: "Fiction",
    isbn13: "9780349727080", isbn: "0349727082",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1674670103i/85873066.jpg",
    review: "" },

  { id: 53, title: "My Struggle, Book 1", author: "Karl Ove Knausgård", rating: 4, yearRead: 2023, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/9159180-L.jpg",
    review: "" },

  { id: 54, title: "Priestdaddy", author: "Patricia Lockwood", rating: 5, yearRead: 2022, genre: "Memoir",
    isbn13: "9781594633737", isbn: "1594633738",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1481223015i/31920820.jpg",
    review: "" },

  { id: 55, title: "Norwegian Wood", author: "Haruki Murakami", rating: 3, yearRead: 2022, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1713542603i/11297.jpg",
    review: "" },

  { id: 56, title: "Open Water", author: "Caleb Azumah Nelson", rating: 5, yearRead: 2022, genre: "Fiction",
    isbn13: "9780241448779", isbn: "0241448778",
    coverUrl: "https://covers.openlibrary.org/b/id/14371687-L.jpg",
    review: "" },

  { id: 57, title: "Beautiful World, Where Are You", author: "Sally Rooney", rating: 4, yearRead: 2021, genre: "Fiction",
    isbn13: "9780374602604", isbn: "0374602603",
    coverUrl: "https://covers.openlibrary.org/b/id/11925195-L.jpg",
    review: "" },

  { id: 58, title: "What I Talk About When I Talk About Running", author: "Haruki Murakami", rating: 4, yearRead: 2021, genre: "Sport",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/13185830-L.jpg",
    review: "" },

  { id: 59, title: "Americanah", author: "Chimamanda Ngozi Adichie", rating: 4, yearRead: 2021, genre: "Fiction",
    isbn13: "", isbn: "",
    coverUrl: "https://covers.openlibrary.org/b/id/8474037-L.jpg",
    review: "" },

  { id: 60, title: "One of Them", author: "Musa Okwonga", rating: 4, yearRead: 2021, genre: "Memoir",
    isbn13: "9781783529681", isbn: "1783529687",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1608487437i/56349872.jpg",
    review: "" },

  { id: 61, title: "The Mixer", author: "Michael Cox", rating: 4, yearRead: 2021, genre: "Sport",
    isbn13: "9780008215569", isbn: "0008215561",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1500657467i/35718723.jpg",
    review: "" },

  { id: 62, title: "Born a Crime", author: "Trevor Noah", rating: 4, yearRead: 2021, genre: "Memoir",
    isbn13: "9780385689229", isbn: "0385689225",
    coverUrl: "https://covers.openlibrary.org/b/id/8117685-L.jpg",
    review: "" },

  { id: 63, title: "James Acaster's Classic Scrapes", author: "James Acaster", rating: 4, yearRead: 2021, genre: "Memoir",
    isbn13: "9781472247186", isbn: "1472247183",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1529275806i/33538599.jpg",
    review: "" },

  { id: 64, title: "My Life in Red and White", author: "Arsène Wenger", rating: 3, yearRead: 2021, genre: "Sport",
    isbn13: "9781474618243", isbn: "1474618243",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1587397713i/53219097.jpg",
    review: "" },
];

// ─────────────────────────────────────────
// LECTURES DATA
// ─────────────────────────────────────────

const lectures = [
  // To fill in a YouTube ID: search the title on YouTube and copy the ID from the URL (the part after ?v=)
  {
    id: 1,
    title: "Are Revolutions Justified?",
    channel: "LSE",
    youtubeId: "wuMJTLOaCb4",
    courseUrl: "https://www.lse.ac.uk/events/are-revolutions-justified",
    yearWatched: 2026,
    notes: "Lea Ypi's inaugural Ralph Miliband lecture at LSE, January 2026. Revisits moralist vs. legalist arguments about revolution and offers an alternative grounded in a theory of collective moral progress."
  },
  {
    id: 2,
    title: "Market Humanism: Towards a New Paradigm for the Economy and Economics",
    channel: "Oxford Martin School",
    youtubeId: "tHmKHwdZ9OY",
    courseUrl: "https://www.oxfordmartin.ox.ac.uk/events/market-humanism",
    yearWatched: 2026,
    notes: "Eric Beinhocker and Nick Hanauer at the Oxford Martin School, March 2026. Launching their forthcoming book Market Humanism — a synthesis of modern economics, philosophy, and complex systems theory."
  },
  {
    id: 3,
    title: "Introduction to Political Philosophy: What is Political Philosophy?",
    channel: "YaleCourses",
    youtubeId: "", // Search "Yale PLSC 114 Lecture 1 Steven Smith" on YouTube
    courseUrl: "https://oyc.yale.edu/political-science/plsc-114/lecture-1",
    yearWatched: 2026,
    notes: "Yale PLSC 114 — find the specific 'What is a State?' lecture on the YaleCourses YouTube channel."
  },
];

// ─────────────────────────────────────────
// ESSAYS DATA
// ─────────────────────────────────────────

const essays = [
  // Add essays here:
  // { id: 1, title: "...", author: "...", url: "https://...", yearRead: 2026, notes: "" },
];

// ─────────────────────────────────────────
// PODCASTS DATA
// ─────────────────────────────────────────

const podcasts = [
  {
    id: 1,
    title: "Adam Tooze on the Global Economy",  // Update title to match the specific episode
    show: "The Ezra Klein Show",
    episodeUrl: "", // Paste the Spotify or NYT link to the specific episode here
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/97/18/74/97187459-b4e3-1009-7ce1-09d1c3b11f57/mza_6988448395986408361.jpg/1200x1200bf.webp",
    yearListened: 2026,
    notes: ""
  },
  {
    id: 2,
    title: "Brave New Welfare",
    show: "High Resolution",
    episodeUrl: "", // Add the episode link here — search "High Resolution Brave New Welfare" on Spotify/Apple Podcasts
    coverUrl: "", // Add the show's cover art URL here
    yearListened: 2026,
    notes: ""
  },
  {
    id: 3,
    title: "Stefan Dercon on Development and Global Poverty",  // Update to the exact episode title
    show: "Oxford Policy Pod",
    episodeUrl: "", // Add the episode link here — search "Oxford Policy Pod Stefan Dercon" on Spotify/Apple Podcasts
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/8f/cd/1a/8fcd1af9-1297-2d3c-55ab-c4ae7d2a7e12/mza_14298392996531818522.png/1200x1200bf.webp",
    yearListened: 2026,
    notes: ""
  },
];

// ─────────────────────────────────────────
// READING LIST (want to read / listen)
// ─────────────────────────────────────────

const wishlist = [
  {
    id: 101,
    type: 'lecture',
    title: "What Do Journalists Owe the Open Society?",
    channel: "St Edmund Hall, Oxford",
    youtubeId: "qzZrdeudMXQ",
    notes: "Stephen Bush's Philip Geddes Memorial Lecture, March 2026. Argues journalism risks failing its democratic purpose by prioritising partisan outcomes over informing voters about the real stakes of elections."
  },
  // Add more items here:
  // Books:    { id: 102, type: 'book',    title: "...", author: "...", coverUrl: "", isbn13: "", isbn: "", notes: "" }
  // Lectures: { id: 103, type: 'lecture', title: "...", channel: "...", youtubeId: "...", notes: "" }
  // Essays:   { id: 104, type: 'essay',   title: "...", author: "...", url: "https://...", notes: "" }
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
  const total = books.length + lectures.length + podcasts.length + essays.length;
  const parts = [
    `<span>${total} items</span>`,
    `<span class="stat-sep">·</span>`,
    `<span>${years[0]}–${years[years.length - 1]}</span>`,
  ];
  if (wishlist.length) {
    parts.push(`<span class="stat-sep">·</span><span>${wishlist.length} on list</span>`);
  }
  const statsEl = document.getElementById('header-stats');
  if (statsEl) statsEl.innerHTML = parts.join('');
}

function renderHomeCards() {
  const libraryTotal = books.length + lectures.length + podcasts.length + essays.length;
  document.getElementById('home-count-library').textContent =
    `${libraryTotal} item${libraryTotal !== 1 ? 's' : ''}`;
  const wantTotal = wishlist.length;
  document.getElementById('home-count-want').textContent =
    wantTotal ? `${wantTotal} item${wantTotal !== 1 ? 's' : ''}` : 'Empty — add something';
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
          data-coverurl="${escHtml(book.coverUrl || '')}"
          data-isbn13="${book.isbn13 || ''}"
          data-isbn="${book.isbn || ''}"
          data-title="${escHtml(book.title)}"
          data-author="${escHtml(book.author)}"
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
// VIEW SWITCHING
// ─────────────────────────────────────────

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`view-${name}`).classList.remove('hidden');
  document.body.classList.toggle('on-home', name === 'home');
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────
// GLOBAL SEARCH
// ─────────────────────────────────────────

function allItems() {
  const bookItems = books.map(b => ({
    type: 'book', section: 'library', id: b.id,
    title: b.title, sub: b.author,
    coverUrl: b.coverUrl, isbn13: b.isbn13, isbn: b.isbn,
    searchText: `${b.title} ${b.author} ${b.genre}`.toLowerCase(),
  }));
  const lectureItems = lectures.map(l => ({
    type: 'lecture', section: 'library', id: l.id,
    title: l.title, sub: l.channel,
    thumbUrl: `https://img.youtube.com/vi/${l.youtubeId}/hqdefault.jpg`,
    searchText: `${l.title} ${l.channel}`.toLowerCase(),
  }));
  const podcastItems = podcasts.map(p => ({
    type: 'podcast', section: 'library', id: p.id,
    title: p.title, sub: p.show,
    coverUrl: p.coverUrl || '',
    searchText: `${p.title} ${p.show}`.toLowerCase(),
  }));
  const essayItems = essays.map(e => ({
    type: 'essay', section: 'library', id: e.id,
    title: e.title, sub: e.author,
    searchText: `${e.title} ${e.author}`.toLowerCase(),
  }));
  const wishItems = wishlist.map(w => ({
    type: w.type, section: 'want', id: w.id,
    title: w.title,
    sub: w.author || w.channel || w.show || '',
    coverUrl: w.coverUrl || '',
    thumbUrl: w.type === 'lecture' ? `https://img.youtube.com/vi/${w.youtubeId}/hqdefault.jpg` : '',
    searchText: `${w.title} ${w.author || ''} ${w.channel || ''} ${w.show || ''}`.toLowerCase(),
  }));
  return [...bookItems, ...lectureItems, ...podcastItems, ...essayItems, ...wishItems];
}

function runHomeSearch(query) {
  const resultsEl = document.getElementById('home-results');
  const navEl = document.getElementById('home-nav');
  const q = query.trim().toLowerCase();

  if (!q) {
    resultsEl.classList.add('hidden');
    navEl.style.display = '';
    return;
  }

  navEl.style.display = 'none';
  const matches = allItems().filter(item => item.searchText.includes(q)).slice(0, 20);

  if (!matches.length) {
    resultsEl.innerHTML = `<div class="home-no-results">No results for "<strong>${escHtml(query)}</strong>"</div>`;
    resultsEl.classList.remove('hidden');
    return;
  }

  const typeLabel = { book: 'Book', lecture: 'Lecture', podcast: 'Podcast', essay: 'Essay' };
  const sectionLabel = { library: 'Library', want: 'Reading List' };

  resultsEl.innerHTML = `
    <div class="home-results-header">${matches.length} result${matches.length !== 1 ? 's' : ''} for "<strong>${escHtml(query)}</strong>"</div>
    ${matches.map(item => {
      let thumbHtml;
      if (item.type === 'book') {
        thumbHtml = `<img class="home-result-thumb" src="${escHtml(item.coverUrl || '')}" alt="" loading="lazy" onerror="this.style.display='none'">`;
      } else if (item.type === 'lecture') {
        thumbHtml = `<img class="home-result-thumb home-result-thumb--video" src="${escHtml(item.thumbUrl || '')}" alt="" loading="lazy" onerror="this.style.display='none'">`;
      } else {
        thumbHtml = `<div class="home-result-thumb home-result-thumb--essay">❝</div>`;
      }
      return `
        <button class="home-result-item" data-type="${item.type}" data-section="${item.section}" data-id="${item.id}">
          ${thumbHtml}
          <div class="home-result-info">
            <div class="home-result-title">${escHtml(item.title)}</div>
            <div class="home-result-meta">${escHtml(item.sub)} · ${sectionLabel[item.section]}</div>
          </div>
          <span class="home-result-type">${typeLabel[item.type]}</span>
        </button>
      `;
    }).join('')}
  `;
  resultsEl.classList.remove('hidden');
}

function switchLibraryTab(section) {
  document.querySelectorAll('#view-library .section-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const tab = document.querySelector(`#view-library .section-tab[data-section="${section}"]`);
  if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
  document.getElementById('catalogue').classList.toggle('hidden', section !== 'books');
  document.getElementById('book-filters').style.display = section === 'books' ? '' : 'none';
  document.getElementById('lectures-section').classList.toggle('hidden', section !== 'lectures');
  document.getElementById('podcasts-section').classList.toggle('hidden', section !== 'podcasts');
  document.getElementById('essays-section').classList.toggle('hidden', section !== 'essays');
  window.scrollTo(0, 0);
}

function switchWantTab(section) {
  document.querySelectorAll('#want-tabs .section-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const tab = document.querySelector(`#want-tabs .section-tab[data-want-section="${section}"]`);
  if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
  ['books', 'lectures', 'podcasts', 'essays'].forEach(s => {
    document.getElementById(`want-${s}`).classList.toggle('hidden', s !== section);
  });
  window.scrollTo(0, 0);
}

function handleSearchResultClick(type, section, id) {
  if (section === 'library') {
    showView('library');
    const tabSection = type === 'book' ? 'books' : `${type}s`;
    switchLibraryTab(tabSection);
    setTimeout(() => {
      if (type === 'book') openModal(id);
      else if (type === 'lecture') openLectureModal(id);
      else if (type === 'podcast') openPodcastModal(id);
      else if (type === 'essay') openEssayModal(id);
    }, 50);
  } else {
    showView('want');
  }
}

// ─────────────────────────────────────────
// WISHLIST RENDER
// ─────────────────────────────────────────

function renderWantSection() {
  const sections = [
    { key: 'books',    type: 'book',    label: 'Books',    grid: 'book-grid' },
    { key: 'lectures', type: 'lecture', label: 'Lectures', grid: 'item-grid' },
    { key: 'podcasts', type: 'podcast', label: 'Podcasts', grid: 'item-grid' },
    { key: 'essays',   type: 'essay',   label: 'Essays',   grid: 'item-grid' },
  ];

  sections.forEach(({ key, type, label, grid }) => {
    const el = document.getElementById(`want-${key}`);
    const items = wishlist.filter(w => w.type === type);

    if (!items.length) {
      el.innerHTML = `<div class="empty-section" style="padding-top:3rem"><strong>No ${label.toLowerCase()} in your reading list yet</strong></div>`;
      return;
    }

    el.innerHTML = `
      <div style="padding-top:3rem;padding-bottom:5rem">
        <div class="${grid}">
          ${items.map(item => renderWishCard(item)).join('')}
        </div>
        <div class="shelf-bar"></div>
      </div>
    `;

    el.querySelectorAll('.cover-img[data-coverurl]').forEach(img => loadCover(img));
    el.querySelectorAll('.item-card, .book-card').forEach(card => {
      card.addEventListener('click', () => openWishModal(card.dataset.type, parseInt(card.dataset.id)));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openWishModal(card.dataset.type, parseInt(card.dataset.id));
      });
    });
  });
}

function renderWishCard(item) {
  if (item.type === 'book') {
    const initial = item.title.replace(/^(The|A|An) /i, '').trim()[0]?.toUpperCase() || '?';
    return `
      <article class="book-card" data-id="${item.id}" data-type="book" role="button" tabindex="0"
        aria-label="${escHtml(item.title)} by ${escHtml(item.author || '')}">
        <div class="cover-wrap">
          <div class="cover-placeholder" aria-hidden="true">${initial}</div>
          <img class="cover-img" alt="${escHtml(item.title)}"
            data-coverurl="${escHtml(item.coverUrl || '')}"
            data-isbn13="${item.isbn13 || ''}"
            data-isbn="${item.isbn || ''}"
            data-title="${escHtml(item.title)}"
            data-author="${escHtml(item.author || '')}"
            loading="lazy">
          <div class="wish-badge" title="Want to read">🔖</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${escHtml(item.title)}</h3>
          <p class="card-author">${escHtml(item.author || '')}</p>
        </div>
      </article>
    `;
  }
  if (item.type === 'lecture') {
    const thumbUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    return `
      <article class="item-card lecture-card" data-id="${item.id}" data-type="lecture" role="button" tabindex="0"
        aria-label="${escHtml(item.title)} — ${escHtml(item.channel || '')}">
        <div class="cover-wrap cover-wrap--video">
          <div class="cover-placeholder" aria-hidden="true">▶</div>
          <img class="cover-img loaded" src="${escHtml(thumbUrl)}" alt="${escHtml(item.title)}" loading="lazy">
          <div class="play-overlay" aria-hidden="true"></div>
          <div class="wish-badge" title="Want to watch">🔖</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${escHtml(item.title)}</h3>
          <p class="card-author">${escHtml(item.channel || '')}</p>
        </div>
      </article>
    `;
  }
  if (item.type === 'podcast') {
    return `
      <article class="item-card podcast-card" data-id="${item.id}" data-type="podcast" role="button" tabindex="0"
        aria-label="${escHtml(item.title)} — ${escHtml(item.show || '')}">
        <div class="cover-wrap cover-wrap--podcast">
          <div class="cover-placeholder cover-placeholder--podcast" aria-hidden="true">
            <span class="podcast-placeholder-icon">🎙</span>
            <span class="podcast-placeholder-show">${escHtml(item.show || '')}</span>
          </div>
          ${item.coverUrl ? `<img class="cover-img" src="${escHtml(item.coverUrl)}" alt="${escHtml(item.show || '')}" loading="lazy" onload="this.classList.add('loaded')">` : ''}
          <div class="wish-badge" title="Want to listen">🔖</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${escHtml(item.title)}</h3>
          <p class="card-author">${escHtml(item.show || '')}</p>
        </div>
      </article>
    `;
  }
  if (item.type === 'essay') {
    const substack = isSubstack(item.url);
    const forcePortrait = isPortraitPreferred(item.url) ? 'data-force-portrait="1"' : '';
    return `
      <article class="item-card essay-card" data-id="${item.id}" data-type="essay" role="button" tabindex="0"
        aria-label="${escHtml(item.title)} by ${escHtml(item.author || '')}">
        <div class="cover-wrap cover-wrap--essay" ${forcePortrait}>
          <div class="cover-placeholder cover-placeholder--essay" aria-hidden="true">
            <span class="essay-placeholder-pub">${escHtml(publicationLabel(item.url || ''))}</span>
            <span class="essay-placeholder-divider"></span>
            <span class="essay-placeholder-mark">❝</span>
          </div>
          ${item.coverUrl ? `<img class="cover-img" src="${escHtml(item.coverUrl)}" alt="${escHtml(item.title)}" loading="lazy" onload="onEssayCoverLoad(this)" onerror="this.style.display='none'">` : ''}
          ${substack ? `<div class="source-badge source-badge--substack" title="Substack">S</div>` : ''}
          <div class="wish-badge" title="Want to read">🔖</div>
        </div>
        <div class="card-info">
          ${item.publishedYear ? `<div class="card-meta"><span class="card-published">pub. ${item.publishedYear}</span></div>` : ''}
          <h3 class="card-title">${escHtml(item.title)}</h3>
          <p class="card-author">${escHtml(item.author || '')}</p>
        </div>
      </article>
    `;
  }
  return '';
}

function openWishModal(type, id) {
  const item = wishlist.find(w => w.type === type && w.id === id);
  if (!item) return;
  setModalActions(id, type, 'want', item);
  if (type === 'book') {
    // Reuse book modal structure
    const modal = document.getElementById('modal');
    modal.querySelector('.modal-content').className = 'modal-content';
    document.getElementById('modal-genre').textContent  = 'Want to Read';
    document.getElementById('modal-title').textContent  = item.title;
    document.getElementById('modal-author').textContent = item.author || '';
    document.getElementById('modal-stars').innerHTML    = '';
    document.getElementById('modal-year').textContent   = '';
    const reviewEl = document.getElementById('modal-review');
    reviewEl.textContent = item.notes?.trim() || 'No notes yet.';
    reviewEl.classList.toggle('no-review', !item.notes?.trim());
    document.getElementById('modal-link').classList.add('hidden');
    const modalCover = document.getElementById('modal-cover');
    modalCover.alt = item.title;
    modalCover.className = '';
    modalCover.dataset.isbn13   = item.isbn13   || '';
    modalCover.dataset.isbn     = item.isbn     || '';
    modalCover.dataset.title    = item.title;
    modalCover.dataset.author   = item.author   || '';
    modalCover.dataset.coverurl = item.coverUrl || '';
    document.querySelector('.modal-cover-wrap').style.aspectRatio = '';
    if (item.coverUrl) {
      modalCover.src = item.coverUrl;
      modalCover.onload  = () => modalCover.classList.add('loaded');
      modalCover.onerror = () => tryGoogleBooks(modalCover);
    } else {
      tryGoogleBooks(modalCover);
    }
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else if (type === 'lecture') {
    openLectureModal(id, true);
  } else if (type === 'podcast') {
    openPodcastModal(id, true);
  } else if (type === 'essay') {
    openEssayModal(id, true);
  }
}

// ─────────────────────────────────────────
// PODCASTS RENDER
// ─────────────────────────────────────────

function renderPodcastsSection() {
  const el = document.getElementById('podcasts-section');
  if (!podcasts.length) {
    el.innerHTML = `<div class="empty-section"><strong>No podcasts yet</strong>Add episodes to the <code>podcasts</code> array in app.js</div>`;
    return;
  }
  el.innerHTML = `
    <section class="genre-section">
      <h2 class="genre-title">
        <span class="genre-label">Podcasts</span>
        <span class="genre-count">${podcasts.length}</span>
      </h2>
      <div class="item-grid">
        ${podcasts.map(renderPodcastCard).join('')}
      </div>
      <div class="shelf-bar"></div>
    </section>
  `;
  el.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => openPodcastModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openPodcastModal(parseInt(card.dataset.id));
    });
  });
}

function renderPodcastCard(podcast) {
  const hasNotes = podcast.notes && podcast.notes.trim().length > 0;
  const hasCover = !!podcast.coverUrl;
  return `
    <article
      class="item-card podcast-card"
      data-id="${podcast.id}"
      role="button"
      tabindex="0"
      aria-label="${escHtml(podcast.title)} — ${escHtml(podcast.show)}"
    >
      <div class="cover-wrap cover-wrap--podcast">
        <div class="cover-placeholder cover-placeholder--podcast" aria-hidden="true">
          <span class="podcast-placeholder-icon">🎙</span>
          <span class="podcast-placeholder-show">${escHtml(podcast.show)}</span>
        </div>
        ${hasCover ? `<img class="cover-img" src="${escHtml(podcast.coverUrl)}" alt="${escHtml(podcast.show)}" loading="lazy" onload="this.classList.add('loaded')">` : ''}
        ${hasNotes ? `<div class="review-badge" title="Has notes">✍</div>` : ''}
      </div>
      <div class="card-info">
        <div class="card-meta">
          <span class="card-year">${podcast.yearListened}</span>
        </div>
        <h3 class="card-title">${escHtml(podcast.title)}</h3>
        <p class="card-author">${escHtml(podcast.show)}</p>
      </div>
    </article>
  `;
}

function openPodcastModal(id, fromWishlist = false) {
  const podcast = fromWishlist
    ? wishlist.find(w => w.type === 'podcast' && w.id === id)
    : podcasts.find(p => p.id === id);
  if (!podcast) return;

  setModalActions(id, 'podcast', fromWishlist ? 'want' : 'library', podcast);

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--podcast';

  document.getElementById('modal-genre').textContent  = 'Podcast';
  document.getElementById('modal-title').textContent  = podcast.title;
  document.getElementById('modal-author').textContent = podcast.show;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    podcast.yearListened ? `Listened in ${podcast.yearListened}` : 'Want to listen';

  renderModalNotes(id, podcast.notes || '');

  const linkEl = document.getElementById('modal-link');
  if (podcast.episodeUrl) {
    linkEl.href = podcast.episodeUrl;
    linkEl.textContent = 'Listen to Episode ↗';
    linkEl.classList.remove('hidden');
  } else {
    linkEl.classList.add('hidden');
  }

  const modalCover = document.getElementById('modal-cover');
  const coverWrap  = document.querySelector('.modal-cover-wrap');
  coverWrap.style.aspectRatio = '1 / 1';
  if (podcast.coverUrl) {
    coverWrap.classList.remove('modal-cover-wrap--hidden');
    modalCover.src = podcast.coverUrl;
    modalCover.alt = podcast.show;
    modalCover.onload  = () => modalCover.classList.add('loaded');
    modalCover.className = '';
  } else {
    coverWrap.classList.add('modal-cover-wrap--hidden');
    modalCover.src = '';
    modalCover.alt = '';
    modalCover.className = '';
  }

  // Show "Fetch image" button when there's a URL but no cover yet
  const fetchBtn = document.getElementById('modal-fetch-image');
  if (podcast.episodeUrl && !podcast.coverUrl) {
    fetchBtn.textContent = 'Fetch image ↓';
    fetchBtn.disabled    = false;
    fetchBtn.classList.remove('hidden');
    fetchBtn.onclick = async () => {
      fetchBtn.textContent = 'Fetching…';
      fetchBtn.disabled    = true;
      const meta = await fetchUrlMetadata(podcast.episodeUrl);
      if (meta.image) {
        podcast.coverUrl = meta.image;
        updateUserItem(podcast.id, { coverUrl: meta.image });
        coverWrap.classList.remove('modal-cover-wrap--hidden');
        coverWrap.style.aspectRatio = '1 / 1';
        modalCover.src     = meta.image;
        modalCover.alt     = podcast.show;
        modalCover.onload  = () => modalCover.classList.add('loaded');
        modalCover.className = '';
        fetchBtn.classList.add('hidden');
        renderPodcastsSection();
      } else {
        fetchBtn.classList.add('hidden');
        const manualWrap  = document.getElementById('modal-manual-image');
        const manualInput = document.getElementById('manual-image-url');
        manualWrap.classList.remove('hidden');
        manualInput.focus();
        document.getElementById('manual-image-save').onclick = () => {
          const imgUrl = manualInput.value.trim();
          if (!imgUrl) return;
          podcast.coverUrl = imgUrl;
          updateUserItem(podcast.id, { coverUrl: imgUrl });
          coverWrap.classList.remove('modal-cover-wrap--hidden');
          coverWrap.style.aspectRatio = '1 / 1';
          modalCover.src = imgUrl;
          modalCover.alt = podcast.show;
          modalCover.onload = () => modalCover.classList.add('loaded');
          modalCover.className = '';
          manualWrap.classList.add('hidden');
          manualInput.value = '';
          renderPodcastsSection();
        };
      }
    };
  } else {
    fetchBtn.classList.add('hidden');
  }

  renderTakeaways(id);
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// ─────────────────────────────────────────
// LECTURES & ESSAYS RENDER
// ─────────────────────────────────────────

function isSubstack(url) {
  return url && url.includes('substack.com');
}

// Sources where the fetched image looks better kept in portrait (cropped to card shape)
function isPortraitPreferred(url) {
  return url && url.includes('newyorker.com');
}

function renderLecturesSection() {
  const el = document.getElementById('lectures-section');
  if (!lectures.length) {
    el.innerHTML = `<div class="empty-section"><strong>No lectures yet</strong>Add a lecture to the <code>lectures</code> array in app.js</div>`;
    return;
  }
  el.innerHTML = `
    <section class="genre-section">
      <h2 class="genre-title">
        <span class="genre-label">Lectures</span>
        <span class="genre-count">${lectures.length}</span>
      </h2>
      <div class="item-grid">
        ${lectures.map(renderLectureCard).join('')}
      </div>
      <div class="shelf-bar"></div>
    </section>
  `;
  el.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => openLectureModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLectureModal(parseInt(card.dataset.id));
    });
  });
}

function renderEssaysSection() {
  const el = document.getElementById('essays-section');
  if (!essays.length) {
    el.innerHTML = `<div class="empty-section"><strong>No essays yet</strong>Add an essay to the <code>essays</code> array in app.js</div>`;
    return;
  }
  el.innerHTML = `
    <section class="genre-section">
      <h2 class="genre-title">
        <span class="genre-label">Essays</span>
        <span class="genre-count">${essays.length}</span>
      </h2>
      <div class="item-grid">
        ${essays.map(renderEssayCard).join('')}
      </div>
      <div class="shelf-bar"></div>
    </section>
  `;
  el.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => openEssayModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openEssayModal(parseInt(card.dataset.id));
    });
  });
}

function renderLectureCard(lecture) {
  const hasNotes = lecture.notes && lecture.notes.trim().length > 0;
  const thumbHtml = lecture.youtubeId
    ? `<img class="cover-img loaded" src="https://img.youtube.com/vi/${lecture.youtubeId}/hqdefault.jpg" alt="${escHtml(lecture.title)}" loading="lazy">`
    : '';
  return `
    <article
      class="item-card lecture-card"
      data-id="${lecture.id}"
      role="button"
      tabindex="0"
      aria-label="${escHtml(lecture.title)} — ${escHtml(lecture.channel)}"
    >
      <div class="cover-wrap cover-wrap--video">
        <div class="cover-placeholder" aria-hidden="true">▶</div>
        ${thumbHtml}
        <div class="play-overlay" aria-hidden="true"></div>
        ${hasNotes ? `<div class="review-badge" title="Has notes">✍</div>` : ''}
      </div>
      <div class="card-info">
        <div class="card-meta">
          <span class="card-year">${lecture.yearWatched}</span>
        </div>
        <h3 class="card-title">${escHtml(lecture.title)}</h3>
        <p class="card-author">${escHtml(lecture.channel)}</p>
      </div>
    </article>
  `;
}

function renderEssayCard(essay) {
  const hasNotes = essay.notes && essay.notes.trim().length > 0;
  const substack = isSubstack(essay.url);
  const hasCover = !!essay.coverUrl;
  const forcePortrait = isPortraitPreferred(essay.url) ? 'data-force-portrait="1"' : '';
  return `
    <article
      class="item-card essay-card"
      data-id="${essay.id}"
      role="button"
      tabindex="0"
      aria-label="${escHtml(essay.title)} by ${escHtml(essay.author)}"
    >
      <div class="cover-wrap cover-wrap--essay" ${forcePortrait}>
        <div class="cover-placeholder cover-placeholder--essay" aria-hidden="true">
          <span class="essay-placeholder-pub">${escHtml(publicationLabel(essay.url || ''))}</span>
          <span class="essay-placeholder-divider"></span>
          <span class="essay-placeholder-mark">❝</span>
        </div>
        ${hasCover ? `<img class="cover-img" src="${escHtml(essay.coverUrl)}" alt="${escHtml(essay.title)}" loading="lazy" onload="onEssayCoverLoad(this)" onerror="this.style.display='none'">` : ''}
        ${substack ? `<div class="source-badge source-badge--substack" title="Substack">S</div>` : ''}
        ${hasNotes ? `<div class="review-badge" title="Has notes">✍</div>` : ''}
      </div>
      <div class="card-info">
        <div class="card-meta">
          <span class="card-year">${essay.yearRead}</span>
          ${essay.publishedYear ? `<span class="card-published">pub. ${essay.publishedYear}</span>` : ''}
        </div>
        <h3 class="card-title">${escHtml(essay.title)}</h3>
        <p class="card-author">${escHtml(essay.author)}</p>
      </div>
    </article>
  `;
}

function openLectureModal(id, fromWishlist = false) {
  const lecture = fromWishlist
    ? wishlist.find(w => w.type === 'lecture' && w.id === id)
    : lectures.find(l => l.id === id);
  if (!lecture) return;

  setModalActions(id, 'lecture', fromWishlist ? 'want' : 'library', lecture);

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--lecture';

  document.getElementById('modal-genre').textContent  = 'Lecture';
  document.getElementById('modal-title').textContent  = lecture.title;
  document.getElementById('modal-author').textContent = lecture.channel;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    lecture.yearWatched ? `Watched in ${lecture.yearWatched}` : 'Want to watch';

  renderModalNotes(id, lecture.notes || '');

  const linkEl = document.getElementById('modal-link');
  const linkUrl = lecture.youtubeId
    ? `https://www.youtube.com/watch?v=${lecture.youtubeId}`
    : (lecture.courseUrl || null);
  if (linkUrl) {
    linkEl.href = linkUrl;
    linkEl.textContent = lecture.youtubeId ? 'Watch on YouTube ↗' : 'View Course ↗';
    linkEl.classList.remove('hidden');
  } else {
    linkEl.classList.add('hidden');
  }

  const modalCover = document.getElementById('modal-cover');
  document.querySelector('.modal-cover-wrap').style.aspectRatio = '16 / 9';
  if (lecture.youtubeId) {
    modalCover.src = `https://img.youtube.com/vi/${lecture.youtubeId}/hqdefault.jpg`;
    modalCover.alt = lecture.title;
    modalCover.onload  = () => modalCover.classList.add('loaded');
    modalCover.className = '';
  } else {
    modalCover.src = '';
    modalCover.alt = '';
    modalCover.className = '';
  }

  renderTakeaways(id);
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function openEssayModal(id, fromWishlist = false) {
  const essay = fromWishlist
    ? wishlist.find(w => w.type === 'essay' && w.id === id)
    : essays.find(e => e.id === id);
  if (!essay) return;

  setModalActions(id, 'essay', fromWishlist ? 'want' : 'library', essay);

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--essay';

  const sourceLabel = isSubstack(essay.url) ? 'Substack Essay' : 'Essay';
  document.getElementById('modal-genre').textContent  = sourceLabel;
  document.getElementById('modal-title').textContent  = essay.title;
  document.getElementById('modal-author').textContent = essay.author;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    essay.yearRead ? `Read in ${essay.yearRead}` : 'Want to read';

  renderModalNotes(id, essay.notes || '');

  const linkEl = document.getElementById('modal-link');
  linkEl.href = essay.url;
  linkEl.textContent = 'Read Essay ↗';
  linkEl.classList.remove('hidden');

  // Cover image: show at 16:9 when available, otherwise hide the cover pane
  const modalCover = document.getElementById('modal-cover');
  const coverWrap  = document.querySelector('.modal-cover-wrap');
  if (essay.coverUrl) {
    coverWrap.classList.remove('modal-cover-wrap--hidden');
    coverWrap.style.aspectRatio = '16 / 9';
    modalCover.src     = essay.coverUrl;
    modalCover.alt     = essay.title;
    modalCover.onload  = () => modalCover.classList.add('loaded');
    modalCover.className = '';
  } else {
    coverWrap.classList.add('modal-cover-wrap--hidden');
    modalCover.src     = '';
    modalCover.alt     = '';
    modalCover.className = '';
    coverWrap.style.aspectRatio = '';
  }

  // Show "Fetch image" button when there's a URL but no cover yet
  const fetchBtn = document.getElementById('modal-fetch-image');
  if (essay.url && !essay.coverUrl) {
    fetchBtn.textContent = 'Fetch image ↓';
    fetchBtn.disabled    = false;
    fetchBtn.classList.remove('hidden');
    fetchBtn.onclick = async () => {
      fetchBtn.textContent = 'Fetching…';
      fetchBtn.disabled    = true;
      const meta = await fetchUrlMetadata(essay.url);
      if (meta.image) {
        essay.coverUrl = meta.image;
        updateUserItem(essay.id, { coverUrl: meta.image });
        coverWrap.classList.remove('modal-cover-wrap--hidden');
        coverWrap.style.aspectRatio = '16 / 9';
        modalCover.src     = meta.image;
        modalCover.alt     = essay.title;
        modalCover.onload  = () => modalCover.classList.add('loaded');
        modalCover.className = '';
        fetchBtn.classList.add('hidden');
        renderEssaysSection();
      } else {
        // No image found — show persistent manual URL panel
        fetchBtn.classList.add('hidden');
        const manualWrap = document.getElementById('modal-manual-image');
        const manualInput = document.getElementById('manual-image-url');
        manualWrap.classList.remove('hidden');
        manualInput.focus();
        document.getElementById('manual-image-save').onclick = () => {
          const imgUrl = manualInput.value.trim();
          if (!imgUrl) return;
          essay.coverUrl = imgUrl;
          updateUserItem(essay.id, { coverUrl: imgUrl });
          coverWrap.classList.remove('modal-cover-wrap--hidden');
          coverWrap.style.aspectRatio = '16 / 9';
          modalCover.src = imgUrl;
          modalCover.alt = essay.title;
          modalCover.onload = () => modalCover.classList.add('loaded');
          modalCover.className = '';
          manualWrap.classList.add('hidden');
          manualInput.value = '';
          renderEssaysSection();
        };
      }
    };
  } else {
    fetchBtn.classList.add('hidden');
  }

  renderTakeaways(id);
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
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
  const coverUrl = img.dataset.coverurl;

  if (coverUrl) {
    img.src = coverUrl;
    img.onload = () => img.classList.add('loaded');
    img.onerror = () => tryGoogleBooks(img);
    return;
  }

  // Fallback: Google Books API (for the one book without a coverUrl)
  tryGoogleBooks(img);
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
    }
  } catch {
    // keep placeholder
  }
}

// ─────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────

let currentModalItem = null; // { id, type, source: 'library'|'want', item }
let editingItemId    = null; // set when the add modal is being used to edit an existing item

function setModalActions(id, type, source, item) {
  currentModalItem = { id, type, source, item };
  const moveBtn = document.getElementById('modal-move-btn');
  const moveLabels = { book: 'Mark as Read →', podcast: 'Mark as Listened →', lecture: 'Mark as Watched →', essay: 'Mark as Read →' };
  moveBtn.textContent = moveLabels[type] || 'Move to Library →';
  moveBtn.classList.toggle('hidden', source !== 'want');

  const editBtn = document.getElementById('modal-edit-btn');
  if (item._dest !== undefined) {
    editBtn.classList.remove('hidden');
    editBtn.onclick = () => { closeModal(); openEditModal(item); };
  } else {
    editBtn.classList.add('hidden');
  }
}

function deleteCurrentItem() {
  if (!currentModalItem) return;
  const { id, type, source, item } = currentModalItem;
  if (!confirm('Remove this item from your library?')) return;

  if (item._dest !== undefined) {
    removeFromUserItems(id);  // user-added: remove from Firebase/localStorage
  } else {
    saveDeletedId(id);        // hardcoded: record as deleted so it stays hidden
  }

  const removeFrom = arr => { const i = arr.findIndex(x => x.id === id); if (i > -1) arr.splice(i, 1); };

  if (source === 'want') {
    removeFrom(wishlist);
    renderWantSection();
  } else {
    if (type === 'book')    { removeFrom(books);    renderCatalogue(); renderGenrePills(); renderYearOptions(); }
    if (type === 'lecture') { removeFrom(lectures); renderLecturesSection(); }
    if (type === 'podcast') { removeFrom(podcasts); renderPodcastsSection(); }
    if (type === 'essay')   { removeFrom(essays);   renderEssaysSection(); }
  }

  renderStats();
  renderHomeCards();
  closeModal();
  showToast('Removed');
}

function moveToLibrary() {
  if (!currentModalItem) return;
  const { id, type } = currentModalItem;
  const wItem = wishlist.find(w => w.id === id);
  if (!wItem) return;

  const year = new Date().getFullYear();
  // Build a library-ready item, preserving existing fields and filling defaults
  const newItem = {
    ...wItem,
    // Give hardcoded wishlist items a fresh timestamp ID so they don't clash
    id: wItem._dest !== undefined ? wItem.id : Date.now(),
    _dest: 'library',
    yearRead:     wItem.yearRead     || year,
    yearListened: wItem.yearListened || year,
    yearWatched:  wItem.yearWatched  || year,
    rating:       wItem.rating       || 3,
    genre:        wItem.genre        || 'Fiction',
    review:       wItem.review       || wItem.notes || '',
    show:         wItem.show         || wItem.author || '',
    channel:      wItem.channel      || wItem.author || '',
  };

  // Remove from wishlist storage
  if (wItem._dest !== undefined) removeFromUserItems(wItem.id);
  else saveDeletedId(wItem.id);

  // Save to library storage
  addUserItem(newItem);

  // Update live arrays
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) wishlist.splice(idx, 1);

  if (type === 'podcast') { podcasts.push(newItem); renderPodcastsSection(); }
  if (type === 'lecture') { lectures.push(newItem); renderLecturesSection(); }
  if (type === 'essay')   { essays.push(newItem);   renderEssaysSection(); }
  if (type === 'book')    { books.push(newItem);     renderCatalogue(); renderGenrePills(); renderYearOptions(); }

  renderWantSection();
  renderStats();
  renderHomeCards();
  closeModal();

  showView('library');
  const tabMap = { podcast: 'podcasts', lecture: 'lectures', essay: 'essays', book: 'books' };
  switchLibraryTab(tabMap[type] || 'essays');
  showToast('✓ Moved to Library');
}

function openModal(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  setModalActions(id, 'book', 'library', book);

  document.getElementById('modal-title').textContent  = book.title;
  document.getElementById('modal-author').textContent = book.author;
  document.getElementById('modal-genre').textContent  = book.genre;
  document.getElementById('modal-year').textContent   = `Read in ${book.yearRead}`;
  document.getElementById('modal-stars').innerHTML    = stars(book.rating, true);

  renderModalNotes(id, book.review || '');

  const modalCover = document.getElementById('modal-cover');
  modalCover.alt = book.title;
  modalCover.className = '';
  modalCover.dataset.isbn13   = book.isbn13   || '';
  modalCover.dataset.isbn     = book.isbn     || '';
  modalCover.dataset.title    = book.title;
  modalCover.dataset.author   = book.author;
  modalCover.dataset.coverurl = book.coverUrl || '';

  if (book.coverUrl) {
    modalCover.src = book.coverUrl;
    modalCover.onload  = () => modalCover.classList.add('loaded');
    modalCover.onerror = () => tryGoogleBooks(modalCover);
  } else {
    tryGoogleBooks(modalCover);
  }

  renderTakeaways(id);
  document.getElementById('modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.querySelector('.modal-content').className = 'modal-content';
  document.getElementById('modal-link').classList.add('hidden');
  document.getElementById('modal-fetch-image').classList.add('hidden');
  document.getElementById('modal-manual-image').classList.add('hidden');
  document.getElementById('manual-image-url').value = '';
  const coverWrap = document.querySelector('.modal-cover-wrap');
  coverWrap.style.aspectRatio = '';
  coverWrap.classList.remove('modal-cover-wrap--hidden');
  document.body.classList.remove('modal-open');
  currentModalItem = null;
}

function openEditModal(item) {
  editingItemId = item.id;
  openAddModal(item.type);

  // Pre-fill fields in the next frame (modal must be open first)
  requestAnimationFrame(() => {
    document.getElementById('add-dest').value   = item._dest || 'library';
    document.getElementById('add-title').value  = item.title || '';
    document.getElementById('add-author').value = item.author || item.show || item.channel || '';
    document.getElementById('add-notes').value  = item.notes || item.review || '';
    document.getElementById('add-year').value   = item.yearRead || item.yearListened || item.yearWatched || new Date().getFullYear();

    const url = item.url || item.episodeUrl || (item.youtubeId ? `https://youtube.com/watch?v=${item.youtubeId}` : (item.courseUrl || ''));
    document.getElementById('add-url').value = url;

    if (item.coverUrl) {
      document.getElementById('add-cover-url').value = item.coverUrl;
      showCoverPreview(item.coverUrl);
    }

    if (item.type === 'book') {
      document.getElementById('add-genre').value  = item.genre || 'Fiction';
      const n = item.rating || 3;
      document.getElementById('add-rating').value = n;
      document.getElementById('add-stars').querySelectorAll('[data-star]').forEach(b =>
        b.classList.toggle('active', parseInt(b.dataset.star) <= n)
      );
    }

    if (item.type === 'essay') {
      document.getElementById('add-published-year').value = item.publishedYear || '';
    }

    updateAddFormFields();
    document.getElementById('add-submit').textContent      = 'Save changes';
    document.getElementById('add-modal-title').textContent = 'Edit entry';
  });
}

function renderTakeaways(itemId) {
  const container = document.getElementById('modal-takeaways');
  // Backward compat: old data was stored as string[], now as plain string
  const raw  = takeawaysStore[itemId];
  const text = Array.isArray(raw) ? raw.join('\n') : (raw || '');
  const empty = !text.trim();

  container.innerHTML = `
    <div class="modal-section-header">
      <span class="modal-section-label">Key Takeaways</span>
      <button class="modal-inline-edit-btn" id="takeaways-edit-btn" title="Edit takeaways" aria-label="Edit takeaways">✎</button>
    </div>
    <div class="modal-section-body${empty ? ' no-content' : ''}">${empty ? 'No takeaways yet.' : escHtml(text)}</div>
  `;

  document.getElementById('takeaways-edit-btn').addEventListener('click', () => {
    const current = Array.isArray(takeawaysStore[itemId]) ? takeawaysStore[itemId].join('\n') : (takeawaysStore[itemId] || '');
    container.querySelector('.modal-section-body').outerHTML = `
      <textarea id="takeaways-textarea" class="modal-edit-textarea">${escHtml(current)}</textarea>
      <div class="modal-edit-actions">
        <button id="takeaways-save" class="modal-edit-save">Save</button>
        <button id="takeaways-cancel" class="modal-edit-cancel">Cancel</button>
      </div>
    `;
    const ta = document.getElementById('takeaways-textarea');
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    document.getElementById('takeaways-save').addEventListener('click', () => {
      const val = ta.value.trim();
      if (val) takeawaysStore[itemId] = val; else delete takeawaysStore[itemId];
      saveTakeaways();
      renderTakeaways(itemId);
    });
    document.getElementById('takeaways-cancel').addEventListener('click', () => renderTakeaways(itemId));
  });
}

function renderModalNotes(itemId, fallback) {
  const el      = document.getElementById('modal-review');
  // notesStore overrides item data; allows editing notes on hardcoded items too
  const stored  = notesStore[String(itemId)];
  const text    = stored !== undefined ? stored : (fallback || '');
  const empty   = !text.trim();

  el.className  = 'modal-review';
  el.innerHTML  = `
    <div class="modal-section-header">
      <span class="modal-section-label">Notes</span>
      <button class="modal-inline-edit-btn" id="notes-edit-btn" title="Edit notes" aria-label="Edit notes">✎</button>
    </div>
    <div class="modal-section-body${empty ? ' no-content' : ''}">${empty ? 'No notes written.' : escHtml(text)}</div>
  `;

  document.getElementById('notes-edit-btn').addEventListener('click', () => {
    const current = notesStore[String(itemId)] !== undefined ? notesStore[String(itemId)] : (fallback || '');
    el.querySelector('.modal-section-body').outerHTML = `
      <textarea id="notes-textarea" class="modal-edit-textarea">${escHtml(current)}</textarea>
      <div class="modal-edit-actions">
        <button id="notes-save" class="modal-edit-save">Save</button>
        <button id="notes-cancel" class="modal-edit-cancel">Cancel</button>
      </div>
    `;
    const ta = document.getElementById('notes-textarea');
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    document.getElementById('notes-save').addEventListener('click', () => {
      const val = ta.value.trim();
      notesStore[String(itemId)] = val;
      saveNotes();
      // For user-added items, also persist to the item itself
      if (currentModalItem?.item?._dest !== undefined) {
        const field = currentModalItem.type === 'book' ? 'review' : 'notes';
        updateUserItem(itemId, { [field]: val });
        const arr = { book: books, essay: essays, podcast: podcasts, lecture: lectures };
        const found = (arr[currentModalItem.type] || []).find(x => x.id === itemId);
        if (found) found[field] = val;
      }
      renderModalNotes(itemId, fallback);
    });
    document.getElementById('notes-cancel').addEventListener('click', () => renderModalNotes(itemId, fallback));
  });
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
  document.getElementById('genre-pills').addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.genre = pill.dataset.genre || null;
    applyFilters();
  });

  document.getElementById('filter-year').addEventListener('change', e => {
    state.year = e.target.value || null;
    applyFilters();
  });

  document.getElementById('filter-rating').addEventListener('change', e => {
    state.rating = e.target.value || null;
    applyFilters();
  });

  document.getElementById('filter-author').addEventListener('input', e => {
    state.author = e.target.value.trim();
    applyFilters();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    state = { genre: null, year: null, rating: null, author: '' };
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pill[data-genre=""]').classList.add('active');
    document.getElementById('filter-year').value   = '';
    document.getElementById('filter-rating').value = '';
    document.getElementById('filter-author').value = '';
    applyFilters();
  });

  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-delete-btn').addEventListener('click', deleteCurrentItem);
  document.getElementById('modal-move-btn').addEventListener('click', moveToLibrary);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('setup-modal').classList.contains('hidden')) closeSetupModal();
      else if (!document.getElementById('add-modal').classList.contains('hidden')) closeAddModal();
      else closeModal();
    }
  });

  // Library section tabs
  document.querySelector('#view-library .section-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.section-tab');
    if (!tab) return;
    switchLibraryTab(tab.dataset.section);
  });

  // Reading list section tabs
  document.getElementById('want-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.section-tab');
    if (!tab) return;
    switchWantTab(tab.dataset.wantSection);
  });

  // Home nav cards — clicking the card goes to the view; section buttons go straight to the tab
  document.getElementById('nav-library').addEventListener('click', e => {
    const sectionBtn = e.target.closest('.home-card-section-btn');
    if (sectionBtn) {
      e.stopPropagation();
      showView(sectionBtn.dataset.view);
      if (sectionBtn.dataset.tab) switchLibraryTab(sectionBtn.dataset.tab);
    } else {
      showView('library');
    }
  });
  document.getElementById('nav-want').addEventListener('click', e => {
    const sectionBtn = e.target.closest('.home-card-section-btn');
    if (sectionBtn) {
      e.stopPropagation();
      showView(sectionBtn.dataset.view);
      if (sectionBtn.dataset.tab) switchWantTab(sectionBtn.dataset.tab);
    } else {
      showView('want');
    }
  });
  // Keyboard support for card divs
  document.querySelectorAll('.home-card[role="button"]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Floating home button
  document.getElementById('home-back-btn').addEventListener('click', () => {
    document.getElementById('home-search').value = '';
    runHomeSearch('');
    showView('home');
  });

  // Home search
  document.getElementById('home-search').addEventListener('input', e => {
    runHomeSearch(e.target.value);
  });

  // Home search result clicks (delegated)
  document.getElementById('home-results').addEventListener('click', e => {
    const item = e.target.closest('.home-result-item');
    if (!item) return;
    handleSearchResultClick(item.dataset.type, item.dataset.section, parseInt(item.dataset.id));
  });
}

// ─────────────────────────────────────────
// LOCAL STORAGE + CLOUD SYNC — USER-ADDED ITEMS
// ─────────────────────────────────────────
//
// CROSS-DEVICE SYNC SETUP (optional, free):
//   1. Go to https://console.firebase.google.com → Create project → Build → Realtime Database
//   2. Create database (start in test mode for personal use)
//   3. Copy the database URL (e.g. https://my-app-default-rtdb.firebaseio.com)
//   4. Paste it below — items added on any device will now sync automatically.
//
const FIREBASE_DB_URL = 'https://library-cf4ea-default-rtdb.europe-west1.firebasedatabase.app';

const STORAGE_KEY   = 'library_user_items';
const TAKEAWAYS_KEY = 'library_takeaways';
let takeawaysStore  = {}; // { [itemId]: string[] }

async function loadTakeaways() {
  if (FIREBASE_DB_URL) {
    try {
      const res  = await fetch(`${FIREBASE_DB_URL}/library_takeaways.json`);
      const data = await res.json();
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        takeawaysStore = data;
        localStorage.setItem(TAKEAWAYS_KEY, JSON.stringify(data));
        return;
      }
    } catch {}
  }
  try { takeawaysStore = JSON.parse(localStorage.getItem(TAKEAWAYS_KEY) || '{}'); } catch {}
}

function saveTakeaways() {
  localStorage.setItem(TAKEAWAYS_KEY, JSON.stringify(takeawaysStore));
  if (FIREBASE_DB_URL) {
    fetch(`${FIREBASE_DB_URL}/library_takeaways.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(takeawaysStore),
    }).catch(() => {});
  }
}

// Notes override store — persists edited notes for any item (hardcoded or user-added)
const NOTES_KEY = 'library_notes';
let notesStore  = {}; // { [itemId]: string }

async function loadNotes() {
  if (FIREBASE_DB_URL) {
    try {
      const res  = await fetch(`${FIREBASE_DB_URL}/library_notes.json`);
      const data = await res.json();
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        notesStore = data;
        localStorage.setItem(NOTES_KEY, JSON.stringify(data));
        return;
      }
    } catch {}
  }
  try { notesStore = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); } catch {}
}

function saveNotes() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notesStore));
  if (FIREBASE_DB_URL) {
    fetch(`${FIREBASE_DB_URL}/library_notes.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notesStore),
    }).catch(() => {});
  }
}

async function loadUserItems() {
  if (FIREBASE_DB_URL) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/library_user_items.json`);
      const data = await res.json();
      if (Array.isArray(data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch { /* offline — fall through to localStorage */ }
  }
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveUserItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  if (FIREBASE_DB_URL) {
    fetch(`${FIREBASE_DB_URL}/library_user_items.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).catch(() => {}); // fire-and-forget; localStorage already saved
  }
}

async function mergeUserItems() {
  const saved = await loadUserItems();
  const libraryPodcasts = saved.filter(i => i._dest === 'library' && i.type === 'podcast');
  const libraryEssays   = saved.filter(i => i._dest === 'library' && i.type === 'essay');
  const wantItems       = saved.filter(i => i._dest === 'want');

  const libraryBooks    = saved.filter(i => i._dest === 'library' && i.type === 'book');
  const libraryLectures = saved.filter(i => i._dest === 'library' && i.type === 'lecture');

  libraryPodcasts.forEach(p => { if (!podcasts.find(x => x.id === p.id)) podcasts.push(p); });
  libraryEssays.forEach(e => { if (!essays.find(x => x.id === e.id)) essays.push(e); });
  libraryBooks.forEach(b => { if (!books.find(x => x.id === b.id)) books.push(b); });
  libraryLectures.forEach(l => { if (!lectures.find(x => x.id === l.id)) lectures.push(l); });
  wantItems.forEach(w => { if (!wishlist.find(x => x.id === w.id)) wishlist.push(w); });
}

function addUserItem(item) {
  // Read from localStorage directly for speed; saveUserItems syncs to Firebase
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  })();
  saved.push(item);
  saveUserItems(saved);
}

function removeFromUserItems(id) {
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  })();
  saveUserItems(saved.filter(i => i.id !== id));
}

function updateUserItem(id, updates) {
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  })();
  const idx = saved.findIndex(i => i.id === id);
  if (idx !== -1) {
    Object.assign(saved[idx], updates);
    saveUserItems(saved);
  }
}

// ─── Deleted IDs (for hiding hardcoded items) ───

const DELETED_KEY = 'library_deleted_ids';

function getDeletedIds() {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]'); } catch { return []; }
}

function saveDeletedId(id) {
  const ids = getDeletedIds();
  if (ids.includes(id)) return;
  ids.push(id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
  if (FIREBASE_DB_URL) {
    fetch(`${FIREBASE_DB_URL}/library_deleted_ids.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    }).catch(() => {});
  }
}

async function applyDeletedIds() {
  let deleted;
  if (FIREBASE_DB_URL) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/library_deleted_ids.json`);
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        localStorage.setItem(DELETED_KEY, JSON.stringify(data));
        deleted = new Set(data);
      }
    } catch {}
  }
  if (!deleted) deleted = new Set(getDeletedIds());
  if (!deleted.size) return;
  const f = arr => arr.filter(x => !deleted.has(x.id));
  books.splice(0,    books.length,    ...f(books));
  lectures.splice(0, lectures.length, ...f(lectures));
  podcasts.splice(0, podcasts.length, ...f(podcasts));
  essays.splice(0,   essays.length,   ...f(essays));
  wishlist.splice(0, wishlist.length, ...f(wishlist));
}

// ─────────────────────────────────────────
// ADD FORM
// ─────────────────────────────────────────

function publicationLabel(url) {
  const map = {
    'newyorker.com':        'The New Yorker',
    'newstatesman.com':     'New Statesman',
    'economist.com':        'The Economist',
    'nytimes.com':          'New York Times',
    'ft.com':               'Financial Times',
    'theguardian.com':      'The Guardian',
    'theatlantic.com':      'The Atlantic',
    'foreignaffairs.com':   'Foreign Affairs',
    'foreignpolicy.com':    'Foreign Policy',
    'spectator.co.uk':      'The Spectator',
    'prospectmagazine.co.uk': 'Prospect',
    'lrb.co.uk':            'London Review',
    'nybooks.com':          'NY Review of Books',
    'irishtimes.com':       'Irish Times',
    'unherd.com':           'UnHerd',
    'aeon.co':              'Aeon',
  };
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    for (const [domain, label] of Object.entries(map)) {
      if (host === domain || host.endsWith('.' + domain)) return label;
    }
    // Fallback: clean up the domain name
    return host.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  } catch {
    return '';
  }
}

function titleFromUrl(url) {
  try {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    // Walk backwards to find the most slug-like segment (long, not just a 4-digit year)
    const slug = [...parts].reverse().find(p => p.length > 5 && !/^\d{4}$/.test(p)) || parts.at(-1) || '';
    return decodeURIComponent(slug)
      .replace(/\.[a-z]{2,4}$/, '')   // strip .html etc
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  } catch {
    return '';
  }
}

function yearFromDateString(str) {
  if (!str) return '';
  const m = str.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : '';
}

async function fetchUrlMetadata(url) {
  // Try Microlink first — headless browser approach, handles paywalled/JS-rendered sites
  try {
    const r = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    if (r.ok) {
      const d = await r.json();
      if (d.status === 'success' && d.data) {
        const title         = d.data.title  || '';
        const image         = d.data.image?.url || '';
        const author        = d.data.author || '';
        const publishedYear = yearFromDateString(d.data.date || d.data.published_time || '');
        if (title || image) return { title, image, author, publishedYear };
      }
    }
  } catch {}

  // Fall back to CORS proxies — some sites (e.g. New Yorker) block one but not the other
  const fetchers = [
    async () => {
      const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      if (!r.ok) return null;
      const d = await r.json();
      return d.contents || null;
    },
    async () => {
      const r = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
      if (!r.ok) return null;
      return r.text();
    },
  ];

  for (const fetch_ of fetchers) {
    try {
      const contents = await fetch_();
      if (!contents) continue;

      const getMeta = (attr, val) => {
        const a = contents.match(new RegExp(`<meta[^>]+${attr}=["']${val}["'][^>]*content=["']([^"']+)["']`, 'i'));
        const b = contents.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*${attr}=["']${val}["']`, 'i'));
        return (a || b)?.[1]?.trim() || '';
      };

      const title  = getMeta('property', 'og:title') || getMeta('name', 'twitter:title') ||
                     contents.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() || '';
      const image  = getMeta('property', 'og:image') || getMeta('name', 'twitter:image');
      const author = getMeta('property', 'og:article:author') || getMeta('name', 'author');
      const publishedYear = yearFromDateString(
        getMeta('property', 'article:published_time') ||
        getMeta('property', 'og:article:published_time') ||
        getMeta('name', 'date') ||
        getMeta('itemprop', 'datePublished') || ''
      );

      if (title || image) return { title, image, author, publishedYear };
    } catch { /* try next proxy */ }
  }
  return {};
}

function extractYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m?.[1] || '';
}

function detectType(url) {
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'lecture';
  const podcastDomains = ['spotify.com', 'podcasts.apple.com', 'overcast.fm',
    'pocketcasts.com', 'anchor.fm', 'buzzsprout.com', 'simplecast.com',
    'podbean.com', 'soundcloud.com', 'acast.com', 'transistor.fm', 'podfollow.com'];
  if (podcastDomains.some(d => u.includes(d))) return 'podcast';
  return 'essay';
}

function showCoverPreview(imageUrl) {
  const preview = document.getElementById('add-cover-preview');
  const img     = document.getElementById('add-cover-img');
  if (imageUrl) {
    img.src = imageUrl;
    img.onload = () => preview.classList.remove('hidden');
    img.onerror = () => preview.classList.add('hidden');
  } else {
    preview.classList.add('hidden');
  }
}

function updateAddFormFields() {
  const type = document.getElementById('add-type').value;
  const labels = { essay: 'Author', podcast: 'Podcast / Show', book: 'Author', lecture: 'Channel / Organisation' };
  const placeholders = { essay: 'Author name…', podcast: 'Podcast name…', book: 'Author name…', lecture: 'Channel or institution…' };
  document.getElementById('add-author-label').textContent = labels[type] || 'Author';
  document.getElementById('add-author').placeholder = placeholders[type] || 'Author…';
  document.getElementById('add-book-fields').classList.toggle('hidden', type !== 'book');
  // Published year only relevant for essays
  document.getElementById('add-published-year-field').classList.toggle('hidden', type !== 'essay');
}

function openAddModal(defaultType) {
  const typeEl = document.getElementById('add-type');
  if (defaultType) typeEl.value = defaultType;
  updateAddFormFields();
  document.getElementById('add-modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  setTimeout(() => document.getElementById('add-url').focus(), 50);
}

function closeAddModal() {
  document.getElementById('add-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  ['add-url', 'add-title', 'add-author', 'add-notes', 'add-cover-url'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('add-year').value = new Date().getFullYear();
  document.getElementById('add-published-year').value = '';
  document.getElementById('add-cover-preview').classList.add('hidden');
  document.getElementById('add-rating').value = 3;
  document.getElementById('add-stars').querySelectorAll('[data-star]').forEach(b => b.classList.remove('active'));
  document.getElementById('add-type').value = 'essay';
  updateAddFormFields();
  // Reset edit mode
  editingItemId = null;
  document.getElementById('add-submit').textContent      = 'Save';
  document.getElementById('add-modal-title').textContent = 'Add to Library';
}

function handleAddSubmit() {
  const url      = document.getElementById('add-url').value.trim();
  const type     = document.getElementById('add-type').value;
  const dest          = document.getElementById('add-dest').value;
  const title         = document.getElementById('add-title').value.trim();
  const author        = document.getElementById('add-author').value.trim();
  const year          = parseInt(document.getElementById('add-year').value) || new Date().getFullYear();
  const notes         = document.getElementById('add-notes').value.trim();
  const coverUrl      = document.getElementById('add-cover-url').value.trim();
  const rating        = parseInt(document.getElementById('add-rating').value) || 3;
  const genre         = document.getElementById('add-genre').value || 'Fiction';
  const publishedYear = parseInt(document.getElementById('add-published-year').value) || '';

  if (!title) { document.getElementById('add-title').focus(); return; }

  // ── EDIT MODE ──────────────────────────────────────────────
  if (editingItemId !== null) {
    const id  = editingItemId;
    const all = [...books, ...essays, ...podcasts, ...lectures, ...wishlist];
    const existing = all.find(x => x.id === id);

    if (existing) {
      const oldType = existing.type;
      const d = existing._dest;

      let updates;
      if (type === 'podcast') {
        updates = { title, show: author, episodeUrl: url, coverUrl, yearListened: year, notes };
      } else if (type === 'book') {
        updates = { title, author, coverUrl, rating, genre, yearRead: year, review: notes };
      } else if (type === 'lecture') {
        const ytId = extractYouTubeId(url);
        updates = { title, channel: author, youtubeId: ytId || '', courseUrl: ytId ? '' : url, yearWatched: year, notes };
      } else {
        updates = { title, author, url, coverUrl, yearRead: year, publishedYear, notes };
      }
      Object.assign(existing, updates);
      existing.type = type; // ensure type field is updated

      // If the type changed, move the item from its old array to the new one
      if (oldType !== type) {
        const arrayFor = t => ({ book: books, essay: essays, podcast: podcasts, lecture: lectures, want: wishlist })[t]
          || (d === 'want' ? wishlist : null);
        const srcArray = d === 'want' ? wishlist : arrayFor(oldType);
        const dstArray = d === 'want' ? wishlist : arrayFor(type);
        if (srcArray && dstArray && srcArray !== dstArray) {
          const idx = srcArray.indexOf(existing);
          if (idx !== -1) srcArray.splice(idx, 1);
          dstArray.push(existing);
        }
      }

      updateUserItem(id, { ...updates, type });

      if (d === 'library') {
        // Re-render both old and new sections in case type changed
        const sectionsToRender = new Set([oldType, type]);
        if (sectionsToRender.has('podcast')) renderPodcastsSection();
        if (sectionsToRender.has('book'))    { renderCatalogue(); renderGenrePills(); renderYearOptions(); }
        if (sectionsToRender.has('lecture')) renderLecturesSection();
        if (sectionsToRender.has('essay'))   renderEssaysSection();
      } else {
        renderWantSection();
      }
      renderStats();
      renderHomeCards();
    }

    editingItemId = null;
    closeAddModal();
    return;
  }
  // ────────────────────────────────────────────────────────────

  const id = Date.now();
  let item;

  if (type === 'podcast') {
    item = { id, type: 'podcast', _dest: dest, title, show: author, episodeUrl: url, coverUrl, yearListened: year, notes };
  } else if (type === 'book') {
    item = { id, type: 'book', _dest: dest, title, author, isbn13: '', isbn: '', coverUrl, rating, genre, yearRead: year, review: notes };
  } else if (type === 'lecture') {
    const youtubeId = extractYouTubeId(url);
    item = { id, type: 'lecture', _dest: dest, title, channel: author, youtubeId: youtubeId || '', courseUrl: youtubeId ? '' : url, yearWatched: year, notes };
  } else {
    item = { id, type: 'essay', _dest: dest, title, author, url, coverUrl, yearRead: year, publishedYear, notes };
  }

  addUserItem(item);

  if (dest === 'library') {
    if (type === 'podcast') { podcasts.push(item); renderPodcastsSection(); }
    else if (type === 'book') { books.push(item); renderCatalogue(); renderGenrePills(); renderYearOptions(); }
    else if (type === 'lecture') { lectures.push(item); renderLecturesSection(); }
    else { essays.push(item); renderEssaysSection(); }
  } else {
    wishlist.push(item);
    renderWantSection();
  }

  renderStats();
  renderHomeCards();
  closeAddModal();

  if (dest === 'library') {
    showView('library');
    const tabMap = { podcast: 'podcasts', book: 'books', lecture: 'lectures', essay: 'essays' };
    switchLibraryTab(tabMap[type] || 'essays');
  } else {
    showView('want');
  }
}

function setupStarRating() {
  const starsEl = document.getElementById('add-stars');
  const ratingInput = document.getElementById('add-rating');

  starsEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-star]');
    if (!btn) return;
    const n = parseInt(btn.dataset.star);
    ratingInput.value = n;
    starsEl.querySelectorAll('[data-star]').forEach(b =>
      b.classList.toggle('active', parseInt(b.dataset.star) <= n)
    );
  });

  starsEl.addEventListener('mouseover', e => {
    const btn = e.target.closest('[data-star]');
    if (!btn) return;
    const n = parseInt(btn.dataset.star);
    starsEl.querySelectorAll('[data-star]').forEach(b =>
      b.classList.toggle('hover', parseInt(b.dataset.star) <= n)
    );
  });

  starsEl.addEventListener('mouseleave', () => {
    starsEl.querySelectorAll('[data-star]').forEach(b => b.classList.remove('hover'));
  });
}

// Called by essay card cover images on load.
// Marks landscape images so CSS can letterbox them with glass panes.
// Skips detection for portrait-preferred sources (e.g. New Yorker).
function onEssayCoverLoad(img) {
  img.classList.add('loaded');
  const wrap = img.closest('.cover-wrap');
  if (wrap && wrap.dataset.forcePortrait !== '1' && img.naturalWidth > img.naturalHeight) {
    wrap.classList.add('cover-wrap--landscape');
  }
}

function setHeroImage(img) {
  const url = `url('${CSS.escape(img)}')`;
  document.body.style.backgroundImage = url;
  document.getElementById('view-home').style.backgroundImage = url;
}

function setupHeroPicker() {
  const saved = localStorage.getItem('hero-img') || 'hero.jpg';
  setHeroImage(saved);

  document.querySelectorAll('.hero-thumb').forEach(btn => {
    if (btn.dataset.img === saved) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const img = btn.dataset.img;
      setHeroImage(img);
      localStorage.setItem('hero-img', img);
      // Sync active state across all pickers (home footer + header)
      document.querySelectorAll('.hero-thumb').forEach(b => {
        b.classList.toggle('active', b.dataset.img === img);
      });
    });
  });
}

function setupAddForm() {
  // Populate genre dropdown from GENRE_ORDER
  const genreSelect = document.getElementById('add-genre');
  GENRE_ORDER.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    genreSelect.appendChild(opt);
  });

  setupStarRating();

  document.getElementById('add-item-btn').addEventListener('click', () => openAddModal());
  document.getElementById('add-item-btn-want').addEventListener('click', () => {
    openAddModal();
    document.getElementById('add-dest').value = 'want';
  });

  document.getElementById('add-modal-close').addEventListener('click', closeAddModal);
  document.getElementById('add-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeAddModal();
  });

  let metaFetchTimer = null;
  document.getElementById('add-url').addEventListener('input', e => {
    const url = e.target.value.trim();
    const detected = detectType(url);
    document.getElementById('add-type').value = detected;
    updateAddFormFields();

    if (url.startsWith('http')) {
      clearTimeout(metaFetchTimer);
      metaFetchTimer = setTimeout(async () => {
        const meta = await fetchUrlMetadata(url);
        const titleEl  = document.getElementById('add-title');
        const authorEl = document.getElementById('add-author');
        if (!titleEl.value.trim())  titleEl.value  = meta.title || titleFromUrl(url);
        if (meta.author && !authorEl.value.trim()) authorEl.value = meta.author;
        if (meta.publishedYear && !document.getElementById('add-published-year').value)
          document.getElementById('add-published-year').value = meta.publishedYear;
        if (meta.image) {
          document.getElementById('add-cover-url').value = meta.image;
          showCoverPreview(meta.image);
        }
      }, 700);
    }
  });

  document.getElementById('add-type').addEventListener('change', updateAddFormFields);
  document.getElementById('add-cover-url').addEventListener('input', e => {
    showCoverPreview(e.target.value.trim());
  });
  document.getElementById('add-submit').addEventListener('click', handleAddSubmit);

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !document.getElementById('add-modal').classList.contains('hidden')) {
      if (document.activeElement.tagName !== 'TEXTAREA') handleAddSubmit();
    }
  });
}

// ─────────────────────────────────────────
// SHARE TARGET
// ─────────────────────────────────────────

function handleShareTarget() {
  const params = new URLSearchParams(window.location.search);
  const sharedUrl   = params.get('url') || (params.get('text') || '').match(/https?:\/\/\S+/)?.[0] || '';
  const sharedTitle = params.get('title') || '';

  if (!sharedUrl) return;

  // Remove params so a reload doesn't re-add
  window.history.replaceState({}, '', window.location.pathname);

  // Show the two-step share overlay so user picks dest then type
  const overlay  = document.getElementById('share-overlay');
  const urlLabel = document.getElementById('share-overlay-url');
  const step1    = document.getElementById('share-step-1');
  const step2    = document.getElementById('share-step-2');

  // Show the domain or title as a hint
  try {
    urlLabel.textContent = sharedTitle || new URL(sharedUrl).hostname.replace(/^www\./, '');
  } catch { urlLabel.textContent = sharedUrl.slice(0, 60); }

  step1.classList.remove('hidden');
  step2.classList.add('hidden');
  overlay.classList.remove('hidden');

  let chosenDest = null;

  // Step 1 — pick destination
  step1.querySelectorAll('.share-dest-btn').forEach(btn => {
    btn.onclick = () => {
      chosenDest = btn.dataset.dest;
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    };
  });

  // Step 2 — pick type, then open the add modal pre-filled
  step2.querySelectorAll('.share-type-btn').forEach(btn => {
    btn.onclick = () => {
      overlay.classList.add('hidden');

      const detected = btn.dataset.type || detectType(sharedUrl);
      openAddModal(detected);
      document.getElementById('add-dest').value = chosenDest;
      document.getElementById('add-url').value  = sharedUrl;
      updateAddFormFields();

      // Fetch metadata in the background
      fetchUrlMetadata(sharedUrl).then(meta => {
        const titleEl  = document.getElementById('add-title');
        const authorEl = document.getElementById('add-author');
        if (!titleEl.value.trim())  titleEl.value  = meta.title || sharedTitle || titleFromUrl(sharedUrl);
        if (!authorEl.value.trim() && meta.author) authorEl.value = meta.author;
        if (meta.publishedYear && !document.getElementById('add-published-year').value)
          document.getElementById('add-published-year').value = meta.publishedYear;
        if (meta.image) {
          document.getElementById('add-cover-url').value = meta.image;
          showCoverPreview(meta.image);
        }
      });

      if (sharedTitle) document.getElementById('add-title').value = sharedTitle;
    };
  });

  document.getElementById('share-overlay-cancel').onclick = () => {
    overlay.classList.add('hidden');
  };
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('share-toast--show'));
  setTimeout(() => {
    toast.classList.remove('share-toast--show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─────────────────────────────────────────
// QUICK-ADD SETUP MODAL (bookmarklet + PWA)
// ─────────────────────────────────────────

function setupQuickAddModal() {
  // Build bookmarklet href — two-step picker: dest then type
  const fb = FIREBASE_DB_URL;
  const code = `(function(){document.getElementById('__lib__')&&document.getElementById('__lib__').remove();var T=document.title;var U=location.href;var IMG='';var ytM=U.match(/[?&]v=([^&]+)/);if(ytM){IMG='https://img.youtube.com/vi/'+ytM[1]+'/maxresdefault.jpg';}else{var ogI=document.querySelector('meta[property="og:image"]');if(ogI)IMG=ogI.content;}var Y=new Date().getFullYear();var FB=${JSON.stringify(fb)};function save(type,dest,notesTxt){document.getElementById('__lib__').remove();var item={id:Date.now(),type:type,_dest:dest,title:T,author:'',url:U,coverUrl:IMG,yearRead:Y,yearListened:Y,yearWatched:Y,show:'',channel:'',notes:notesTxt||'',youtubeId:ytM?ytM[1]:''};fetch(FB+'/library_user_items.json').then(r=>r.json()).then(data=>{var items=Array.isArray(data)?data:[];items.push(item);return fetch(FB+'/library_user_items.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(items)});}).then(()=>{var d=document.createElement('div');d.style='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#2d6a4f;color:#fff;padding:10px 22px;border-radius:20px;font:700 14px system-ui;z-index:2147483647;box-shadow:0 4px 16px rgba(0,0,0,.25)';d.textContent='\u2713 Saved to library';document.documentElement.appendChild(d);setTimeout(()=>d.remove(),2400);}).catch(()=>alert('Could not save'));}var ov=document.createElement('div');ov.id='__lib__';ov.style='position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.42);display:flex;align-items:flex-start;justify-content:flex-end;padding:18px';var card=document.createElement('div');card.style='background:#1c1108;color:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,.5);padding:20px 22px;width:260px;font:14px/1.5 system-ui;position:relative';var ttl=document.createElement('div');ttl.style='font-weight:700;font-size:13px;color:#fff;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';ttl.textContent=T.length>50?T.slice(0,50)+'\u2026':T;var host=document.createElement('div');host.style='font-size:11px;color:rgba(255,255,255,.45);margin-bottom:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';try{host.textContent=new URL(U).hostname.replace(/^www\\./,'');}catch(e){host.textContent='';}var x=document.createElement('button');x.textContent='\u00d7';x.style='position:absolute;top:10px;right:14px;background:none;border:none;font-size:22px;line-height:1;cursor:pointer;color:rgba(255,255,255,.45)';x.onclick=function(){ov.remove();};card.appendChild(x);card.appendChild(ttl);card.appendChild(host);var s1=document.createElement('div');var lbl1=document.createElement('div');lbl1.style='font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:8px';lbl1.textContent='Add to';var destRow=document.createElement('div');destRow.style='display:grid;grid-template-columns:1fr 1fr;gap:8px';function destBtn(label,sub,dest){var b=document.createElement('button');b.style='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:10px 8px;color:#fff;cursor:pointer;text-align:left';var d1=document.createElement('div');d1.style='font:700 13px system-ui';d1.textContent=label;var d2=document.createElement('div');d2.style='font:11px system-ui;color:rgba(255,255,255,.45);margin-top:2px';d2.textContent=sub;b.appendChild(d1);b.appendChild(d2);b.onmouseover=function(){b.style.background='rgba(255,255,255,.15)';};b.onmouseout=function(){b.style.background='rgba(255,255,255,.08)';};b.onclick=function(){s1.style.display='none';s2.style.display='block';chosenDest=dest;};return b;}var chosenDest,chosenType;destRow.appendChild(destBtn('Library','Read it',\x27library\x27));destRow.appendChild(destBtn('Reading List','Want to read',\x27want\x27));s1.appendChild(lbl1);s1.appendChild(destRow);var s2=document.createElement('div');s2.style='display:none';var lbl2=document.createElement('div');lbl2.style='font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:8px';lbl2.textContent='What type?';var typeGrid=document.createElement('div');typeGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:8px';[['Book','book'],['Essay','essay'],['Podcast','podcast'],['Lecture','lecture']].forEach(function(t){var b=document.createElement('button');b.textContent=t[0];b.style='background:rgba(140,21,21,.6);border:1px solid rgba(200,60,60,.35);border-radius:8px;padding:9px;color:#fff;font:700 13px system-ui;cursor:pointer';b.onmouseover=function(){b.style.background='rgba(140,21,21,.9)';};b.onmouseout=function(){b.style.background='rgba(140,21,21,.6)';};b.onclick=function(){chosenType=t[1];s2.style.display='none';s3.style.display='block';setTimeout(function(){ntA.focus();},50);};typeGrid.appendChild(b);});s2.appendChild(lbl2);s2.appendChild(typeGrid);var s3=document.createElement('div');s3.style='display:none';var lbl3=document.createElement('div');lbl3.style='font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:8px';lbl3.textContent='Notes (optional)';var ntA=document.createElement('textarea');ntA.placeholder='Any thoughts\u2026';ntA.style='width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:8px 10px;color:#fff;font:13px/1.5 system-ui;resize:vertical;min-height:64px;box-sizing:border-box';var svRow=document.createElement('div');svRow.style='display:flex;justify-content:space-between;align-items:center;margin-top:10px';var skipBtn=document.createElement('button');skipBtn.textContent='Skip';skipBtn.style='background:none;border:none;color:rgba(255,255,255,.4);font:13px system-ui;cursor:pointer;padding:0';skipBtn.onclick=function(){save(chosenType,chosenDest,'');};var svBtn=document.createElement('button');svBtn.textContent='Save';svBtn.style='background:#2d6a4f;border:none;border-radius:8px;padding:8px 20px;color:#fff;font:700 13px system-ui;cursor:pointer';svBtn.onclick=function(){save(chosenType,chosenDest,ntA.value.trim());};svRow.appendChild(skipBtn);svRow.appendChild(svBtn);s3.appendChild(lbl3);s3.appendChild(ntA);s3.appendChild(svRow);card.appendChild(s1);card.appendChild(s2);card.appendChild(s3);ov.appendChild(card);document.documentElement.appendChild(ov);ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});})()`;
  document.getElementById('bookmarklet-link').href = 'javascript:' + code;

  const setupBtn = document.getElementById('setup-btn');
  if (setupBtn) {
    setupBtn.addEventListener('click', () => {
      document.getElementById('setup-modal').classList.remove('hidden');
      document.body.classList.add('modal-open');
    });
  }
  document.getElementById('setup-modal-close').addEventListener('click', closeSetupModal);
  document.getElementById('setup-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSetupModal();
  });
}

function setupHomeQuickAdd() {
  let chosenDest = null;

  const step1 = document.getElementById('qa-step-1');
  const step2 = document.getElementById('qa-step-2');

  step1.querySelectorAll('.qa-dest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      chosenDest = btn.dataset.dest;
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    });
  });

  step2.querySelectorAll('.qa-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset widget back to step 1
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      // Open the add modal with dest + type pre-selected
      openAddModal(btn.dataset.type);
      document.getElementById('add-dest').value = chosenDest;
      updateAddFormFields();
      chosenDest = null;
    });
  });

  step2.querySelector('.qa-cancel-btn').addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    chosenDest = null;
  });
}

function closeSetupModal() {
  document.getElementById('setup-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
  // When a new service worker takes over, reload so the update is applied automatically
  navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
}

async function initApp() {
  document.body.classList.add('on-home'); // start on home view
  await mergeUserItems();
  await applyDeletedIds();
  await loadTakeaways();
  await loadNotes();
  renderStats();
  renderHomeCards();
  renderGenrePills();
  renderYearOptions();
  renderCatalogue();
  renderLecturesSection();
  renderPodcastsSection();
  renderEssaysSection();
  renderWantSection();
  setupEventListeners();
  setupAddForm();
  setupQuickAddModal();
  setupHomeQuickAdd();
  setupHeroPicker();
  document.getElementById('add-year').value = new Date().getFullYear();
  handleShareTarget();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!isAuthenticated()) {
    showAuthWall(() => initApp());
    return;
  }
  initApp();
});
