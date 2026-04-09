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
  document.getElementById('header-stats').innerHTML = parts.join('');
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
  document.querySelectorAll('.section-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  const tab = document.querySelector(`.section-tab[data-section="${section}"]`);
  if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
  document.getElementById('catalogue').classList.toggle('hidden', section !== 'books');
  document.getElementById('book-filters').style.display = section === 'books' ? '' : 'none';
  document.getElementById('lectures-section').classList.toggle('hidden', section !== 'lectures');
  document.getElementById('podcasts-section').classList.toggle('hidden', section !== 'podcasts');
  document.getElementById('essays-section').classList.toggle('hidden', section !== 'essays');
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
  const el = document.getElementById('want-section');

  if (!wishlist.length) {
    el.innerHTML = `<div class="empty-section"><strong>Your reading list is empty</strong>Add items to the <code>wishlist</code> array in app.js</div>`;
    return;
  }

  const byType = [
    { label: 'Books',    items: wishlist.filter(w => w.type === 'book') },
    { label: 'Lectures', items: wishlist.filter(w => w.type === 'lecture') },
    { label: 'Podcasts', items: wishlist.filter(w => w.type === 'podcast') },
    { label: 'Essays',   items: wishlist.filter(w => w.type === 'essay') },
  ].filter(g => g.items.length > 0);

  el.innerHTML = byType.map(group => `
    <section class="want-type-section">
      <h2 class="genre-title">
        <span class="genre-label">${group.label}</span>
        <span class="genre-count">${group.items.length}</span>
      </h2>
      <div class="${group.label === 'Books' ? 'book-grid' : 'item-grid'}">
        ${group.items.map(item => renderWishCard(item)).join('')}
      </div>
      <div class="shelf-bar"></div>
    </section>
  `).join('');

  // Load covers for wishlist book cards
  el.querySelectorAll('.cover-img[data-coverurl]').forEach(img => loadCover(img));

  el.querySelectorAll('.item-card, .book-card').forEach(card => {
    card.addEventListener('click', () => openWishModal(card.dataset.type, parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openWishModal(card.dataset.type, parseInt(card.dataset.id));
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
          <div class="cover-placeholder cover-placeholder--podcast" aria-hidden="true">🎙</div>
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
    return `
      <article class="item-card essay-card" data-id="${item.id}" data-type="essay" role="button" tabindex="0"
        aria-label="${escHtml(item.title)} by ${escHtml(item.author || '')}">
        <div class="cover-wrap cover-wrap--essay">
          <div class="cover-placeholder cover-placeholder--essay" aria-hidden="true">❝</div>
          ${substack ? `<div class="source-badge source-badge--substack" title="Substack">S</div>` : ''}
          <div class="wish-badge" title="Want to read">🔖</div>
        </div>
        <div class="card-info">
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
        <div class="cover-placeholder cover-placeholder--podcast" aria-hidden="true">🎙</div>
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

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--podcast';

  document.getElementById('modal-genre').textContent  = 'Podcast';
  document.getElementById('modal-title').textContent  = podcast.title;
  document.getElementById('modal-author').textContent = podcast.show;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    podcast.yearListened ? `Listened in ${podcast.yearListened}` : 'Want to listen';

  const reviewEl = document.getElementById('modal-review');
  const notesText = podcast.notes?.trim();
  reviewEl.textContent = notesText || 'No notes written.';
  reviewEl.classList.toggle('no-review', !notesText);

  const linkEl = document.getElementById('modal-link');
  if (podcast.episodeUrl) {
    linkEl.href = podcast.episodeUrl;
    linkEl.textContent = 'Listen to Episode ↗';
    linkEl.classList.remove('hidden');
  } else {
    linkEl.classList.add('hidden');
  }

  const modalCover = document.getElementById('modal-cover');
  document.querySelector('.modal-cover-wrap').style.aspectRatio = '1 / 1';
  if (podcast.coverUrl) {
    modalCover.src = podcast.coverUrl;
    modalCover.alt = podcast.show;
    modalCover.onload  = () => modalCover.classList.add('loaded');
    modalCover.className = '';
  } else {
    modalCover.src = '';
    modalCover.alt = '';
    modalCover.className = '';
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// ─────────────────────────────────────────
// LECTURES & ESSAYS RENDER
// ─────────────────────────────────────────

function isSubstack(url) {
  return url && url.includes('substack.com');
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
  return `
    <article
      class="item-card essay-card"
      data-id="${essay.id}"
      role="button"
      tabindex="0"
      aria-label="${escHtml(essay.title)} by ${escHtml(essay.author)}"
    >
      <div class="cover-wrap cover-wrap--essay">
        <div class="cover-placeholder cover-placeholder--essay" aria-hidden="true">❝</div>
        ${substack ? `<div class="source-badge source-badge--substack" title="Substack">S</div>` : ''}
        ${hasNotes ? `<div class="review-badge" title="Has notes">✍</div>` : ''}
      </div>
      <div class="card-info">
        <div class="card-meta">
          <span class="card-year">${essay.yearRead}</span>
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

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--lecture';

  document.getElementById('modal-genre').textContent  = 'Lecture';
  document.getElementById('modal-title').textContent  = lecture.title;
  document.getElementById('modal-author').textContent = lecture.channel;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    lecture.yearWatched ? `Watched in ${lecture.yearWatched}` : 'Want to watch';

  const reviewEl = document.getElementById('modal-review');
  if (lecture.notes && lecture.notes.trim()) {
    reviewEl.textContent = lecture.notes;
    reviewEl.classList.remove('no-review');
  } else {
    reviewEl.textContent = 'No notes written.';
    reviewEl.classList.add('no-review');
  }

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

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function openEssayModal(id, fromWishlist = false) {
  const essay = fromWishlist
    ? wishlist.find(w => w.type === 'essay' && w.id === id)
    : essays.find(e => e.id === id);
  if (!essay) return;

  const modal = document.getElementById('modal');
  modal.querySelector('.modal-content').className = 'modal-content modal--essay';

  const sourceLabel = isSubstack(essay.url) ? 'Substack Essay' : 'Essay';
  document.getElementById('modal-genre').textContent  = sourceLabel;
  document.getElementById('modal-title').textContent  = essay.title;
  document.getElementById('modal-author').textContent = essay.author;
  document.getElementById('modal-stars').innerHTML    = '';
  document.getElementById('modal-year').textContent   =
    essay.yearRead ? `Read in ${essay.yearRead}` : 'Want to read';

  const reviewEl = document.getElementById('modal-review');
  if (essay.notes && essay.notes.trim()) {
    reviewEl.textContent = essay.notes;
    reviewEl.classList.remove('no-review');
  } else {
    reviewEl.textContent = 'No notes written.';
    reviewEl.classList.add('no-review');
  }

  const linkEl = document.getElementById('modal-link');
  linkEl.href = essay.url;
  linkEl.textContent = 'Read Essay ↗';
  linkEl.classList.remove('hidden');

  const modalCover = document.getElementById('modal-cover');
  modalCover.src = '';
  modalCover.alt = '';
  modalCover.className = '';
  document.querySelector('.modal-cover-wrap').style.aspectRatio = '';

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

  document.getElementById('modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.querySelector('.modal-content').className = 'modal-content';
  document.getElementById('modal-link').classList.add('hidden');
  document.querySelector('.modal-cover-wrap').style.aspectRatio = '';
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
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('setup-modal').classList.contains('hidden')) closeSetupModal();
      else if (!document.getElementById('add-modal').classList.contains('hidden')) closeAddModal();
      else closeModal();
    }
  });

  // Library section tabs
  document.querySelector('.section-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.section-tab');
    if (!tab) return;
    switchLibraryTab(tab.dataset.section);
  });

  // Home nav cards
  document.getElementById('nav-library').addEventListener('click', () => showView('library'));
  document.getElementById('nav-want').addEventListener('click', () => showView('want'));

  // Back buttons (delegated — works for both views)
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.target || 'home'));
  });

  // Header title → home
  document.getElementById('home-link').addEventListener('click', () => {
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

const STORAGE_KEY = 'library_user_items';

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

  libraryPodcasts.forEach(p => { if (!podcasts.find(x => x.id === p.id)) podcasts.push(p); });
  libraryEssays.forEach(e => { if (!essays.find(x => x.id === e.id)) essays.push(e); });
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

// ─────────────────────────────────────────
// ADD FORM
// ─────────────────────────────────────────

async function fetchPageTitle(url) {
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (!res.ok) return '';
    const data = await res.json();
    const match = data.contents?.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].replace(/\s+/g, ' ').trim() : '';
  } catch {
    return '';
  }
}

function detectType(url) {
  const u = url.toLowerCase();
  const podcastDomains = ['spotify.com', 'podcasts.apple.com', 'overcast.fm',
    'pocketcasts.com', 'anchor.fm', 'buzzsprout.com', 'simplecast.com',
    'podbean.com', 'soundcloud.com', 'acast.com', 'transistor.fm', 'podfollow.com'];
  if (podcastDomains.some(d => u.includes(d))) return 'podcast';
  return 'essay';
}

function openAddModal(defaultType) {
  const typeEl = document.getElementById('add-type');
  if (defaultType) typeEl.value = defaultType;
  updateAuthorLabel();
  document.getElementById('add-modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  setTimeout(() => document.getElementById('add-url').focus(), 50);
}

function closeAddModal() {
  document.getElementById('add-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Reset form
  ['add-url', 'add-title', 'add-author', 'add-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('add-year').value = new Date().getFullYear();
}

function updateAuthorLabel() {
  const type = document.getElementById('add-type').value;
  document.getElementById('add-author-label').textContent =
    type === 'podcast' ? 'Podcast / Show' : 'Author';
  document.getElementById('add-author').placeholder =
    type === 'podcast' ? 'Podcast name…' : 'Author name…';
}

function handleAddSubmit() {
  const url    = document.getElementById('add-url').value.trim();
  const type   = document.getElementById('add-type').value;
  const dest   = document.getElementById('add-dest').value;
  const title  = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim();
  const year   = parseInt(document.getElementById('add-year').value) || new Date().getFullYear();
  const notes  = document.getElementById('add-notes').value.trim();

  if (!title) {
    document.getElementById('add-title').focus();
    return;
  }

  // Generate a unique ID (timestamp-based, won't clash with hardcoded items)
  const id = Date.now();

  let item;
  if (type === 'podcast') {
    item = { id, type: 'podcast', _dest: dest, title, show: author, episodeUrl: url, coverUrl: '', yearListened: year, notes };
  } else {
    item = { id, type: 'essay', _dest: dest, title, author, url, yearRead: year, notes };
  }

  addUserItem(item);

  // Push into the live array and re-render
  if (dest === 'library') {
    if (type === 'podcast') { podcasts.push(item); renderPodcastsSection(); }
    else                    { essays.push(item);   renderEssaysSection(); }
  } else {
    wishlist.push(item);
    renderWantSection();
  }

  renderStats();
  renderHomeCards();
  closeAddModal();

  // Navigate to where the item was added
  if (dest === 'library') {
    showView('library');
    switchLibraryTab(type === 'podcast' ? 'podcasts' : 'essays');
  } else {
    showView('want');
  }
}

function setupAddForm() {
  document.getElementById('add-item-btn').addEventListener('click', () => openAddModal());
  document.getElementById('add-item-btn-want').addEventListener('click', () => {
    openAddModal();
    document.getElementById('add-dest').value = 'want';
  });

  document.getElementById('add-modal-close').addEventListener('click', closeAddModal);
  document.getElementById('add-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeAddModal();
  });

  let titleFetchTimer = null;
  document.getElementById('add-url').addEventListener('input', e => {
    const url = e.target.value.trim();
    const detected = detectType(url);
    document.getElementById('add-type').value = detected;
    updateAuthorLabel();

    // Auto-fetch page title for essays
    if (detected === 'essay' && url.startsWith('http')) {
      clearTimeout(titleFetchTimer);
      titleFetchTimer = setTimeout(async () => {
        const titleEl = document.getElementById('add-title');
        if (titleEl.value.trim()) return; // don't overwrite user input
        const fetched = await fetchPageTitle(url);
        if (fetched && !titleEl.value.trim()) titleEl.value = fetched;
      }, 700);
    }
  });

  document.getElementById('add-type').addEventListener('change', updateAuthorLabel);

  document.getElementById('add-submit').addEventListener('click', handleAddSubmit);

  // Also close on Escape (already handled globally but needs to target this modal too)
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !document.getElementById('add-modal').classList.contains('hidden')) {
      // Allow Enter in textarea, submit on Enter elsewhere
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

  const item = {
    id: Date.now(),
    type: 'essay',
    _dest: 'want',
    title: sharedTitle || sharedUrl,
    author: '',
    url: sharedUrl,
    yearRead: new Date().getFullYear(),
    notes: '',
  };

  addUserItem(item);
  wishlist.push(item);
  renderWantSection();
  renderStats();
  renderHomeCards();

  showToast(`✓ Added to reading list`);
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
  // Build bookmarklet href from the configured Firebase URL
  const fb = FIREBASE_DB_URL;
  const code = `(function(){var FB=${JSON.stringify(fb)};var item={id:Date.now(),type:'essay',_dest:'want',title:document.title,author:'',url:location.href,yearRead:new Date().getFullYear(),notes:''};fetch(FB+'/library_user_items.json').then(r=>r.json()).then(function(data){var items=Array.isArray(data)?data:[];items.push(item);return fetch(FB+'/library_user_items.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(items)});}).then(function(){var d=document.createElement('div');d.style='position:fixed;top:20px;right:20px;background:#2d6a4f;color:#fff;padding:12px 20px;border-radius:8px;font:14px/1.5 system-ui;z-index:2147483647;box-shadow:0 4px 12px rgba(0,0,0,.25)';d.textContent='\u2713 Added to reading list';document.body.appendChild(d);setTimeout(function(){d.remove();},2500);}).catch(function(){alert('Could not add to reading list');});})()`;
  document.getElementById('bookmarklet-link').href = 'javascript:' + code;

  document.getElementById('setup-btn').addEventListener('click', () => {
    document.getElementById('setup-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
  document.getElementById('setup-modal-close').addEventListener('click', closeSetupModal);
  document.getElementById('setup-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSetupModal();
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
}

document.addEventListener('DOMContentLoaded', async () => {
  await mergeUserItems();
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
  document.getElementById('add-year').value = new Date().getFullYear();
  handleShareTarget();
});
