const STORAGE_KEY = "atlas-academy-progress-v1";
const SETTINGS_KEY = "atlas-academy-settings-v1";
const THEME_KEY = "atlas-academy-theme-v1";
const SW_URL = "sw.js";

let swRegistration = null;
let waitingServiceWorker = null;

const STARTER_COUNTRIES = [
  {
    "id": "china",
    "iso2": "CN",
    "iso3": "CHN",
    "name": "China",
    "flag": "🇨🇳",
    "capital": "Beijing",
    "largest_city": "Shanghai",
    "population_millions": 1411.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/china.svg"
    },
    "region": "Asia",
    "aliases": [
      "People's Republic of China",
      "CN",
      "Zhōngguó",
      "Zhongguo",
      "Zhonghua",
      "中华人民共和国",
      "Zhōnghuá Rénmín Gònghéguó"
    ]
  },
  {
    "id": "india",
    "iso2": "IN",
    "iso3": "IND",
    "name": "India",
    "flag": "🇮🇳",
    "capital": "New Delhi",
    "largest_city": "Mumbai",
    "population_millions": 1352.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/india.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of India",
      "IN",
      "Bhārat",
      "Bharat Ganrajya",
      "இந்தியா"
    ]
  },
  {
    "id": "united_states",
    "iso2": "US",
    "iso3": "USA",
    "name": "United States",
    "flag": "🇺🇸",
    "capital": "Washington D.C.",
    "largest_city": "New York City",
    "population_millions": 327.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/united_states.svg"
    },
    "region": "North America",
    "aliases": [
      "United States of America",
      "US",
      "USA"
    ]
  },
  {
    "id": "indonesia",
    "iso2": "ID",
    "iso3": "IDN",
    "name": "Indonesia",
    "flag": "🇮🇩",
    "capital": "Jakarta",
    "largest_city": "Jakarta",
    "population_millions": 267.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/indonesia.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Indonesia",
      "ID",
      "Republik Indonesia"
    ]
  },
  {
    "id": "pakistan",
    "iso2": "PK",
    "iso3": "PAK",
    "name": "Pakistan",
    "flag": "🇵🇰",
    "capital": "Islamabad",
    "largest_city": "Karachi",
    "population_millions": 212.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/pakistan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Islamic Republic of Pakistan",
      "PK",
      "Pākistān",
      "Islāmī Jumhūriya'eh Pākistān"
    ]
  },
  {
    "id": "brazil",
    "iso2": "BR",
    "iso3": "BRA",
    "name": "Brazil",
    "flag": "🇧🇷",
    "capital": "Brasília",
    "largest_city": "Sao Paulo",
    "population_millions": 209.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/brazil.svg"
    },
    "region": "South America",
    "aliases": [
      "Federative Republic of Brazil",
      "BR",
      "Brasil",
      "República Federativa do Brasil"
    ]
  },
  {
    "id": "nigeria",
    "iso2": "NG",
    "iso3": "NGA",
    "name": "Nigeria",
    "flag": "🇳🇬",
    "capital": "Abuja",
    "largest_city": "Lagos",
    "population_millions": 195.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/nigeria.svg"
    },
    "region": "Africa",
    "aliases": [
      "Federal Republic of Nigeria",
      "NG",
      "Nijeriya",
      "Naíjíríà"
    ]
  },
  {
    "id": "bangladesh",
    "iso2": "BD",
    "iso3": "BGD",
    "name": "Bangladesh",
    "flag": "🇧🇩",
    "capital": "Dhaka",
    "largest_city": "Dhaka",
    "population_millions": 161.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bangladesh.svg"
    },
    "region": "Asia",
    "aliases": [
      "People's Republic of Bangladesh",
      "BD",
      "Gônôprôjatôntri Bangladesh"
    ]
  },
  {
    "id": "russia",
    "iso2": "RU",
    "iso3": "RUS",
    "name": "Russia",
    "flag": "🇷🇺",
    "capital": "Moscow",
    "largest_city": "Moscow",
    "population_millions": 144.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/russia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Russian Federation",
      "RU",
      "Российская Федерация"
    ]
  },
  {
    "id": "japan",
    "iso2": "JP",
    "iso3": "JPN",
    "name": "Japan",
    "flag": "🇯🇵",
    "capital": "Tokyo",
    "largest_city": "Tokyo",
    "population_millions": 126.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/japan.svg"
    },
    "region": "Asia",
    "aliases": [
      "JP",
      "Nippon",
      "Nihon"
    ]
  },
  {
    "id": "mexico",
    "iso2": "MX",
    "iso3": "MEX",
    "name": "Mexico",
    "flag": "🇲🇽",
    "capital": "Mexico City",
    "largest_city": "Mexico City",
    "population_millions": 126.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mexico.svg"
    },
    "region": "North America",
    "aliases": [
      "United Mexican States",
      "MX",
      "Mexicanos",
      "Estados Unidos Mexicanos"
    ]
  },
  {
    "id": "ethiopia",
    "iso2": "ET",
    "iso3": "ETH",
    "name": "Ethiopia",
    "flag": "🇪🇹",
    "capital": "Addis Ababa",
    "largest_city": "Addis Ababa",
    "population_millions": 109.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ethiopia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Federal Democratic Republic of Ethiopia",
      "ET",
      "ʾĪtyōṗṗyā",
      "የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ"
    ]
  },
  {
    "id": "philippines",
    "iso2": "PH",
    "iso3": "PHL",
    "name": "Philippines",
    "flag": "🇵🇭",
    "capital": "Manila",
    "largest_city": "Manila",
    "population_millions": 106.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/philippines.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of the Philippines",
      "PH",
      "Repúblika ng Pilipinas"
    ]
  },
  {
    "id": "egypt",
    "iso2": "EG",
    "iso3": "EGY",
    "name": "Egypt",
    "flag": "🇪🇬",
    "capital": "Cairo",
    "largest_city": "Cairo",
    "population_millions": 98.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/egypt.svg"
    },
    "region": "Africa",
    "aliases": [
      "Arab Republic of Egypt",
      "EG"
    ]
  },
  {
    "id": "vietnam",
    "iso2": "VN",
    "iso3": "VNM",
    "name": "Vietnam",
    "flag": "🇻🇳",
    "capital": "Hanoi",
    "largest_city": "Ho Chi Minh City",
    "population_millions": 95.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/vietnam.svg"
    },
    "region": "Asia",
    "aliases": [
      "Socialist Republic of Vietnam",
      "VN",
      "Cộng hòa Xã hội chủ nghĩa Việt Nam",
      "Viet Nam"
    ]
  },
  {
    "id": "dr_congo",
    "iso2": "CD",
    "iso3": "COD",
    "name": "DR Congo",
    "flag": "🇨🇩",
    "capital": "Kinshasa",
    "largest_city": "Kinshasa",
    "population_millions": 84.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/dr_congo.svg"
    },
    "region": "Africa",
    "aliases": [
      "Democratic Republic of the Congo",
      "CD",
      "Congo-Kinshasa",
      "Congo, the Democratic Republic of the",
      "Democratic Republic of Congo",
      "DRC"
    ]
  },
  {
    "id": "germany",
    "iso2": "DE",
    "iso3": "DEU",
    "name": "Germany",
    "flag": "🇩🇪",
    "capital": "Berlin",
    "largest_city": "Berlin",
    "population_millions": 82.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/germany.svg"
    },
    "region": "Europe",
    "aliases": [
      "Federal Republic of Germany",
      "DE",
      "Bundesrepublik Deutschland"
    ]
  },
  {
    "id": "turkiye",
    "iso2": "TR",
    "iso3": "TUR",
    "name": "Türkiye",
    "flag": "🇹🇷",
    "capital": "Ankara",
    "largest_city": "Istanbul",
    "population_millions": 82.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/turkiye.svg"
    },
    "region": "Asia",
    "aliases": [
      "Turkey",
      "Republic of Türkiye",
      "TR",
      "Turkiye",
      "Republic of Turkey",
      "Türkiye Cumhuriyeti"
    ]
  },
  {
    "id": "iran",
    "iso2": "IR",
    "iso3": "IRN",
    "name": "Iran",
    "flag": "🇮🇷",
    "capital": "Tehran",
    "largest_city": "Tehran",
    "population_millions": 81.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/iran.svg"
    },
    "region": "Asia",
    "aliases": [
      "Islamic Republic of Iran",
      "IR",
      "Iran, Islamic Republic of",
      "Jomhuri-ye Eslāmi-ye Irān"
    ]
  },
  {
    "id": "thailand",
    "iso2": "TH",
    "iso3": "THA",
    "name": "Thailand",
    "flag": "🇹🇭",
    "capital": "Bangkok",
    "largest_city": "Bangkok",
    "population_millions": 69.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/thailand.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kingdom of Thailand",
      "TH",
      "Prathet",
      "Thai",
      "ราชอาณาจักรไทย",
      "Ratcha Anachak Thai"
    ]
  },
  {
    "id": "france",
    "iso2": "FR",
    "iso3": "FRA",
    "name": "France",
    "flag": "🇫🇷",
    "capital": "Paris",
    "largest_city": "Paris",
    "population_millions": 67,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/france.svg"
    },
    "region": "Europe",
    "aliases": [
      "French Republic",
      "FR",
      "République française"
    ]
  },
  {
    "id": "united_kingdom",
    "iso2": "GB",
    "iso3": "GBR",
    "name": "United Kingdom",
    "flag": "🇬🇧",
    "capital": "London",
    "largest_city": "London",
    "population_millions": 66.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/united_kingdom.svg"
    },
    "region": "Europe",
    "aliases": [
      "United Kingdom of Great Britain and Northern Ireland",
      "GB",
      "UK",
      "Great Britain"
    ]
  },
  {
    "id": "italy",
    "iso2": "IT",
    "iso3": "ITA",
    "name": "Italy",
    "flag": "🇮🇹",
    "capital": "Rome",
    "largest_city": "Rome",
    "population_millions": 60.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/italy.svg"
    },
    "region": "Europe",
    "aliases": [
      "Italian Republic",
      "IT",
      "Repubblica italiana"
    ]
  },
  {
    "id": "south_africa",
    "iso2": "ZA",
    "iso3": "ZAF",
    "name": "South Africa",
    "flag": "🇿🇦",
    "capital": "Pretoria",
    "largest_city": "Johannesburg",
    "population_millions": 57.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/south_africa.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of South Africa",
      "ZA",
      "RSA",
      "Suid-Afrika"
    ]
  },
  {
    "id": "tanzania",
    "iso2": "TZ",
    "iso3": "TZA",
    "name": "Tanzania",
    "flag": "🇹🇿",
    "capital": "Dodoma",
    "largest_city": "Dar es Salaam",
    "population_millions": 56.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/tanzania.svg"
    },
    "region": "Africa",
    "aliases": [
      "United Republic of Tanzania",
      "TZ",
      "Tanzania, United Republic of",
      "Jamhuri ya Muungano wa Tanzania"
    ]
  },
  {
    "id": "myanmar",
    "iso2": "MM",
    "iso3": "MMR",
    "name": "Myanmar",
    "flag": "🇲🇲",
    "capital": "Naypyidaw",
    "largest_city": "Yangon",
    "population_millions": 53.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/myanmar.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of the Union of Myanmar",
      "MM",
      "Burma",
      "Pyidaunzu Thanmăda Myăma Nainngandaw"
    ]
  },
  {
    "id": "south_korea",
    "iso2": "KR",
    "iso3": "KOR",
    "name": "South Korea",
    "flag": "🇰🇷",
    "capital": "Seoul",
    "largest_city": "Seoul",
    "population_millions": 51.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/south_korea.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Korea",
      "KR",
      "Korea, Republic of",
      "남한",
      "남조선"
    ]
  },
  {
    "id": "kenya",
    "iso2": "KE",
    "iso3": "KEN",
    "name": "Kenya",
    "flag": "🇰🇪",
    "capital": "Nairobi",
    "largest_city": "Nairobi",
    "population_millions": 51.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/kenya.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Kenya",
      "KE",
      "Jamhuri ya Kenya"
    ]
  },
  {
    "id": "colombia",
    "iso2": "CO",
    "iso3": "COL",
    "name": "Colombia",
    "flag": "🇨🇴",
    "capital": "Bogotá",
    "largest_city": "Bogota",
    "population_millions": 49.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/colombia.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Colombia",
      "CO",
      "República de Colombia"
    ]
  },
  {
    "id": "spain",
    "iso2": "ES",
    "iso3": "ESP",
    "name": "Spain",
    "flag": "🇪🇸",
    "capital": "Madrid",
    "largest_city": "Madrid",
    "population_millions": 46.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/spain.svg"
    },
    "region": "Europe",
    "aliases": [
      "Kingdom of Spain",
      "ES",
      "Reino de España"
    ]
  },
  {
    "id": "ukraine",
    "iso2": "UA",
    "iso3": "UKR",
    "name": "Ukraine",
    "flag": "🇺🇦",
    "capital": "Kyiv",
    "largest_city": "Kyiv",
    "population_millions": 44.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ukraine.svg"
    },
    "region": "Europe",
    "aliases": [
      "UA",
      "Ukrayina"
    ]
  },
  {
    "id": "argentina",
    "iso2": "AR",
    "iso3": "ARG",
    "name": "Argentina",
    "flag": "🇦🇷",
    "capital": "Buenos Aires",
    "largest_city": "Buenos Aires",
    "population_millions": 44.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/argentina.svg"
    },
    "region": "South America",
    "aliases": [
      "Argentine Republic",
      "AR",
      "República Argentina"
    ]
  },
  {
    "id": "uganda",
    "iso2": "UG",
    "iso3": "UGA",
    "name": "Uganda",
    "flag": "🇺🇬",
    "capital": "Kampala",
    "largest_city": "Kampala",
    "population_millions": 42.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/uganda.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Uganda",
      "UG",
      "Jamhuri ya Uganda"
    ]
  },
  {
    "id": "algeria",
    "iso2": "DZ",
    "iso3": "DZA",
    "name": "Algeria",
    "flag": "🇩🇿",
    "capital": "Algiers",
    "largest_city": "Algiers",
    "population_millions": 42.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/algeria.svg"
    },
    "region": "Africa",
    "aliases": [
      "People's Democratic Republic of Algeria",
      "DZ",
      "Dzayer",
      "Algérie"
    ]
  },
  {
    "id": "sudan",
    "iso2": "SD",
    "iso3": "SDN",
    "name": "Sudan",
    "flag": "🇸🇩",
    "capital": "Khartoum",
    "largest_city": "Khartoum",
    "population_millions": 41.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/sudan.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of the Sudan",
      "SD",
      "Jumhūrīyat as-Sūdān"
    ]
  },
  {
    "id": "iraq",
    "iso2": "IQ",
    "iso3": "IRQ",
    "name": "Iraq",
    "flag": "🇮🇶",
    "capital": "Baghdad",
    "largest_city": "Baghdad",
    "population_millions": 38.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/iraq.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Iraq",
      "IQ",
      "Jumhūriyyat al-‘Irāq"
    ]
  },
  {
    "id": "poland",
    "iso2": "PL",
    "iso3": "POL",
    "name": "Poland",
    "flag": "🇵🇱",
    "capital": "Warsaw",
    "largest_city": "Warsaw",
    "population_millions": 38,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/poland.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Poland",
      "PL",
      "Rzeczpospolita Polska"
    ]
  },
  {
    "id": "afghanistan",
    "iso2": "AF",
    "iso3": "AFG",
    "name": "Afghanistan",
    "flag": "🇦🇫",
    "capital": "Kabul",
    "largest_city": "Kabul",
    "population_millions": 37.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/afghanistan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Islamic Republic of Afghanistan",
      "AF",
      "Afġānistān"
    ]
  },
  {
    "id": "canada",
    "iso2": "CA",
    "iso3": "CAN",
    "name": "Canada",
    "flag": "🇨🇦",
    "capital": "Ottawa",
    "largest_city": "Toronto",
    "population_millions": 37.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/canada.svg"
    },
    "region": "North America",
    "aliases": [
      "CA"
    ]
  },
  {
    "id": "morocco",
    "iso2": "MA",
    "iso3": "MAR",
    "name": "Morocco",
    "flag": "🇲🇦",
    "capital": "Rabat",
    "largest_city": "Casablanca",
    "population_millions": 36,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/morocco.svg"
    },
    "region": "Africa",
    "aliases": [
      "Kingdom of Morocco",
      "MA",
      "Al-Mamlakah al-Maġribiyah"
    ]
  },
  {
    "id": "saudi_arabia",
    "iso2": "SA",
    "iso3": "SAU",
    "name": "Saudi Arabia",
    "flag": "🇸🇦",
    "capital": "Riyadh",
    "largest_city": "Riyadh",
    "population_millions": 33.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/saudi_arabia.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kingdom of Saudi Arabia",
      "Saudi",
      "SA",
      "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah"
    ]
  },
  {
    "id": "uzbekistan",
    "iso2": "UZ",
    "iso3": "UZB",
    "name": "Uzbekistan",
    "flag": "🇺🇿",
    "capital": "Tashkent",
    "largest_city": "Tashkent",
    "population_millions": 33,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/uzbekistan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Uzbekistan",
      "UZ",
      "O‘zbekiston Respublikasi",
      "Ўзбекистон Республикаси"
    ]
  },
  {
    "id": "peru",
    "iso2": "PE",
    "iso3": "PER",
    "name": "Peru",
    "flag": "🇵🇪",
    "capital": "Lima",
    "largest_city": "Lima",
    "population_millions": 32,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/peru.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Peru",
      "PE",
      "República del Perú"
    ]
  },
  {
    "id": "malaysia",
    "iso2": "MY",
    "iso3": "MYS",
    "name": "Malaysia",
    "flag": "🇲🇾",
    "capital": "Kuala Lumpur",
    "largest_city": "Kuala Lumpur",
    "population_millions": 31.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/malaysia.svg"
    },
    "region": "Asia",
    "aliases": [
      "MY"
    ]
  },
  {
    "id": "angola",
    "iso2": "AO",
    "iso3": "AGO",
    "name": "Angola",
    "flag": "🇦🇴",
    "capital": "Luanda",
    "largest_city": "Luanda",
    "population_millions": 30.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/angola.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Angola",
      "AO",
      "República de Angola",
      "ʁɛpublika de an'ɡɔla"
    ]
  },
  {
    "id": "ghana",
    "iso2": "GH",
    "iso3": "GHA",
    "name": "Ghana",
    "flag": "🇬🇭",
    "capital": "Accra",
    "largest_city": "Accra",
    "population_millions": 29.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ghana.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Ghana",
      "GH"
    ]
  },
  {
    "id": "mozambique",
    "iso2": "MZ",
    "iso3": "MOZ",
    "name": "Mozambique",
    "flag": "🇲🇿",
    "capital": "Maputo",
    "largest_city": "Maputo",
    "population_millions": 29.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mozambique.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Mozambique",
      "MZ",
      "República de Moçambique"
    ]
  },
  {
    "id": "venezuela",
    "iso2": "VE",
    "iso3": "VEN",
    "name": "Venezuela",
    "flag": "🇻🇪",
    "capital": "Caracas",
    "largest_city": "Caracas",
    "population_millions": 28.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/venezuela.svg"
    },
    "region": "South America",
    "aliases": [
      "Bolivarian Republic of Venezuela",
      "VE",
      "Venezuela, Bolivarian Republic of",
      "República Bolivariana de Venezuela"
    ]
  },
  {
    "id": "yemen",
    "iso2": "YE",
    "iso3": "YEM",
    "name": "Yemen",
    "flag": "🇾🇪",
    "capital": "Sana'a",
    "largest_city": "Sana'a",
    "population_millions": 28.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/yemen.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Yemen",
      "YE",
      "Yemeni Republic",
      "al-Jumhūriyyah al-Yamaniyyah"
    ]
  },
  {
    "id": "nepal",
    "iso2": "NP",
    "iso3": "NPL",
    "name": "Nepal",
    "flag": "🇳🇵",
    "capital": "Kathmandu",
    "largest_city": "Kathmandu",
    "population_millions": 28.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/nepal.svg"
    },
    "region": "Asia",
    "aliases": [
      "Federal Democratic Republic of Nepal",
      "NP",
      "Loktāntrik Ganatantra Nepāl"
    ]
  },
  {
    "id": "madagascar",
    "iso2": "MG",
    "iso3": "MDG",
    "name": "Madagascar",
    "flag": "🇲🇬",
    "capital": "Antananarivo",
    "largest_city": "Antananarivo",
    "population_millions": 26.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/madagascar.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Madagascar",
      "MG",
      "Repoblikan'i Madagasikara",
      "République de Madagascar"
    ]
  },
  {
    "id": "north_korea",
    "iso2": "KP",
    "iso3": "PRK",
    "name": "North Korea",
    "flag": "🇰🇵",
    "capital": "Pyongyang",
    "largest_city": "Pyongyang",
    "population_millions": 25.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/north_korea.svg"
    },
    "region": "Asia",
    "aliases": [
      "Democratic People's Republic of Korea",
      "KP",
      "DPRK",
      "조선민주주의인민공화국",
      "Chosŏn Minjujuŭi Inmin Konghwaguk",
      "Korea, Democratic People's Republic of",
      "북한",
      "북조선"
    ]
  },
  {
    "id": "cameroon",
    "iso2": "CM",
    "iso3": "CMR",
    "name": "Cameroon",
    "flag": "🇨🇲",
    "capital": "Yaoundé",
    "largest_city": "Douala",
    "population_millions": 25.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/cameroon.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Cameroon",
      "CM",
      "République du Cameroun"
    ]
  },
  {
    "id": "ivory_coast",
    "iso2": "CI",
    "iso3": "CIV",
    "name": "Ivory Coast",
    "flag": "🇨🇮",
    "capital": "Yamoussoukro",
    "largest_city": "Abidjan",
    "population_millions": 25.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ivory_coast.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Côte d'Ivoire",
      "CI",
      "Côte d'Ivoire",
      "Cote d'Ivoire",
      "République de Côte d'Ivoire"
    ]
  },
  {
    "id": "australia",
    "iso2": "AU",
    "iso3": "AUS",
    "name": "Australia",
    "flag": "🇦🇺",
    "capital": "Canberra",
    "largest_city": "Sydney",
    "population_millions": 25,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/australia.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Commonwealth of Australia",
      "AU"
    ]
  },
  {
    "id": "taiwan",
    "iso2": "TW",
    "iso3": "TWN",
    "name": "Taiwan",
    "flag": "🇹🇼",
    "capital": "Taipei",
    "largest_city": "Taipei",
    "population_millions": 23.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/taiwan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of China (Taiwan)",
      "TW",
      "Táiwān",
      "Republic of China",
      "中華民國",
      "Zhōnghuá Mínguó",
      "Chinese Taipei"
    ]
  },
  {
    "id": "niger",
    "iso2": "NE",
    "iso3": "NER",
    "name": "Niger",
    "flag": "🇳🇪",
    "capital": "Niamey",
    "largest_city": "Niamey",
    "population_millions": 22.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/niger.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Niger",
      "NE",
      "Nijar"
    ]
  },
  {
    "id": "sri_lanka",
    "iso2": "LK",
    "iso3": "LKA",
    "name": "Sri Lanka",
    "flag": "🇱🇰",
    "capital": "Colombo",
    "largest_city": "Colombo",
    "population_millions": 21.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/sri_lanka.svg"
    },
    "region": "Asia",
    "aliases": [
      "Democratic Socialist Republic of Sri Lanka",
      "LK",
      "ilaṅkai"
    ]
  },
  {
    "id": "burkina_faso",
    "iso2": "BF",
    "iso3": "BFA",
    "name": "Burkina Faso",
    "flag": "🇧🇫",
    "capital": "Ouagadougou",
    "largest_city": "Ouagadougou",
    "population_millions": 19.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/burkina_faso.svg"
    },
    "region": "Africa",
    "aliases": [
      "BF"
    ]
  },
  {
    "id": "romania",
    "iso2": "RO",
    "iso3": "ROU",
    "name": "Romania",
    "flag": "🇷🇴",
    "capital": "Bucharest",
    "largest_city": "Bucharest",
    "population_millions": 19.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/romania.svg"
    },
    "region": "Europe",
    "aliases": [
      "RO",
      "Rumania",
      "Roumania",
      "România"
    ]
  },
  {
    "id": "mali",
    "iso2": "ML",
    "iso3": "MLI",
    "name": "Mali",
    "flag": "🇲🇱",
    "capital": "Bamako",
    "largest_city": "Bamako",
    "population_millions": 19.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mali.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Mali",
      "ML",
      "République du Mali"
    ]
  },
  {
    "id": "chile",
    "iso2": "CL",
    "iso3": "CHL",
    "name": "Chile",
    "flag": "🇨🇱",
    "capital": "Santiago",
    "largest_city": "Santiago",
    "population_millions": 18.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/chile.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Chile",
      "CL",
      "República de Chile"
    ]
  },
  {
    "id": "kazakhstan",
    "iso2": "KZ",
    "iso3": "KAZ",
    "name": "Kazakhstan",
    "flag": "🇰🇿",
    "capital": "Astana",
    "largest_city": "Almaty",
    "population_millions": 18.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/kazakhstan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Kazakhstan",
      "KZ",
      "Qazaqstan",
      "Казахстан",
      "Қазақстан Республикасы",
      "Qazaqstan Respublïkası",
      "Республика Казахстан",
      "Respublika Kazakhstan"
    ]
  },
  {
    "id": "malawi",
    "iso2": "MW",
    "iso3": "MWI",
    "name": "Malawi",
    "flag": "🇲🇼",
    "capital": "Lilongwe",
    "largest_city": "Lilongwe",
    "population_millions": 17.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/malawi.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Malawi",
      "MW"
    ]
  },
  {
    "id": "zambia",
    "iso2": "ZM",
    "iso3": "ZMB",
    "name": "Zambia",
    "flag": "🇿🇲",
    "capital": "Lusaka",
    "largest_city": "Lusaka",
    "population_millions": 17.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/zambia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Zambia",
      "ZM"
    ]
  },
  {
    "id": "guatemala",
    "iso2": "GT",
    "iso3": "GTM",
    "name": "Guatemala",
    "flag": "🇬🇹",
    "capital": "Guatemala City",
    "largest_city": "Guatemala City",
    "population_millions": 17.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/guatemala.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Guatemala",
      "GT"
    ]
  },
  {
    "id": "netherlands",
    "iso2": "NL",
    "iso3": "NLD",
    "name": "Netherlands",
    "flag": "🇳🇱",
    "capital": "Amsterdam",
    "largest_city": "Amsterdam",
    "population_millions": 17.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/netherlands.svg"
    },
    "region": "Europe",
    "aliases": [
      "The Netherlands",
      "Kingdom of the Netherlands",
      "NL",
      "Holland",
      "Nederland"
    ]
  },
  {
    "id": "ecuador",
    "iso2": "EC",
    "iso3": "ECU",
    "name": "Ecuador",
    "flag": "🇪🇨",
    "capital": "Quito",
    "largest_city": "Guayaquil",
    "population_millions": 17.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ecuador.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Ecuador",
      "EC",
      "República del Ecuador"
    ]
  },
  {
    "id": "syria",
    "iso2": "SY",
    "iso3": "SYR",
    "name": "Syria",
    "flag": "🇸🇾",
    "capital": "Damascus",
    "largest_city": "Aleppo",
    "population_millions": 16.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/syria.svg"
    },
    "region": "Asia",
    "aliases": [
      "Syrian Arab Republic",
      "SY",
      "Al-Jumhūrīyah Al-ʻArabīyah As-Sūrīyah"
    ]
  },
  {
    "id": "zimbabwe",
    "iso2": "ZW",
    "iso3": "ZWE",
    "name": "Zimbabwe",
    "flag": "🇿🇼",
    "capital": "Harare",
    "largest_city": "Harare",
    "population_millions": 16.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/zimbabwe.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Zimbabwe",
      "ZW"
    ]
  },
  {
    "id": "cambodia",
    "iso2": "KH",
    "iso3": "KHM",
    "name": "Cambodia",
    "flag": "🇰🇭",
    "capital": "Phnom Penh",
    "largest_city": "Phnom Penh",
    "population_millions": 16.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/cambodia.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kingdom of Cambodia",
      "KH"
    ]
  },
  {
    "id": "senegal",
    "iso2": "SN",
    "iso3": "SEN",
    "name": "Senegal",
    "flag": "🇸🇳",
    "capital": "Dakar",
    "largest_city": "Dakar",
    "population_millions": 15.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/senegal.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Senegal",
      "SN",
      "République du Sénégal"
    ]
  },
  {
    "id": "chad",
    "iso2": "TD",
    "iso3": "TCD",
    "name": "Chad",
    "flag": "🇹🇩",
    "capital": "N'Djamena",
    "largest_city": "N'Djamena",
    "population_millions": 15.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/chad.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Chad",
      "TD",
      "Tchad",
      "République du Tchad"
    ]
  },
  {
    "id": "somalia",
    "iso2": "SO",
    "iso3": "SOM",
    "name": "Somalia",
    "flag": "🇸🇴",
    "capital": "Mogadishu",
    "largest_city": "Mogadishu",
    "population_millions": 15,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/somalia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Federal Republic of Somalia",
      "SO",
      "aṣ-Ṣūmāl",
      "Jamhuuriyadda Federaalka Soomaaliya",
      "Jumhūriyyat aṣ-Ṣūmāl al-Fiderāliyya"
    ]
  },
  {
    "id": "guinea",
    "iso2": "GN",
    "iso3": "GIN",
    "name": "Guinea",
    "flag": "🇬🇳",
    "capital": "Conakry",
    "largest_city": "Conakry",
    "population_millions": 12.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/guinea.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Guinea",
      "GN",
      "République de Guinée"
    ]
  },
  {
    "id": "rwanda",
    "iso2": "RW",
    "iso3": "RWA",
    "name": "Rwanda",
    "flag": "🇷🇼",
    "capital": "Kigali",
    "largest_city": "Kigali",
    "population_millions": 12.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/rwanda.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Rwanda",
      "RW",
      "Repubulika y'u Rwanda",
      "République du Rwanda"
    ]
  },
  {
    "id": "tunisia",
    "iso2": "TN",
    "iso3": "TUN",
    "name": "Tunisia",
    "flag": "🇹🇳",
    "capital": "Tunis",
    "largest_city": "Tunis",
    "population_millions": 11.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/tunisia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Tunisian Republic",
      "TN",
      "Republic of Tunisia",
      "al-Jumhūriyyah at-Tūnisiyyah"
    ]
  },
  {
    "id": "benin",
    "iso2": "BJ",
    "iso3": "BEN",
    "name": "Benin",
    "flag": "🇧🇯",
    "capital": "Porto-Novo",
    "largest_city": "Cotonou",
    "population_millions": 11.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/benin.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Benin",
      "BJ",
      "République du Bénin"
    ]
  },
  {
    "id": "belgium",
    "iso2": "BE",
    "iso3": "BEL",
    "name": "Belgium",
    "flag": "🇧🇪",
    "capital": "Brussels",
    "largest_city": "Brussels",
    "population_millions": 11.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/belgium.svg"
    },
    "region": "Europe",
    "aliases": [
      "Kingdom of Belgium",
      "BE",
      "België",
      "Belgie",
      "Belgien",
      "Belgique",
      "Koninkrijk België",
      "Royaume de Belgique",
      "Königreich Belgien"
    ]
  },
  {
    "id": "bolivia",
    "iso2": "BO",
    "iso3": "BOL",
    "name": "Bolivia",
    "flag": "🇧🇴",
    "capital": "Sucre",
    "largest_city": "Santa Cruz de la Sierra",
    "population_millions": 11.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bolivia.svg"
    },
    "region": "South America",
    "aliases": [
      "Plurinational State of Bolivia",
      "BO",
      "Buliwya",
      "Wuliwya",
      "Bolivia, Plurinational State of",
      "Estado Plurinacional de Bolivia",
      "Buliwya Mamallaqta",
      "Wuliwya Suyu",
      "Tetã Volívia"
    ]
  },
  {
    "id": "cuba",
    "iso2": "CU",
    "iso3": "CUB",
    "name": "Cuba",
    "flag": "🇨🇺",
    "capital": "Havana",
    "largest_city": "Havana",
    "population_millions": 11.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/cuba.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Cuba",
      "CU",
      "República de Cuba"
    ]
  },
  {
    "id": "burundi",
    "iso2": "BI",
    "iso3": "BDI",
    "name": "Burundi",
    "flag": "🇧🇮",
    "capital": "Gitega",
    "largest_city": "Bujumbura",
    "population_millions": 11.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/burundi.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Burundi",
      "BI",
      "Republika y'Uburundi",
      "République du Burundi"
    ]
  },
  {
    "id": "haiti",
    "iso2": "HT",
    "iso3": "HTI",
    "name": "Haiti",
    "flag": "🇭🇹",
    "capital": "Port-au-Prince",
    "largest_city": "Port-au-Prince",
    "population_millions": 11.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/haiti.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Haiti",
      "HT",
      "République d'Haïti",
      "Repiblik Ayiti"
    ]
  },
  {
    "id": "greece",
    "iso2": "GR",
    "iso3": "GRC",
    "name": "Greece",
    "flag": "🇬🇷",
    "capital": "Athens",
    "largest_city": "Athens",
    "population_millions": 10.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/greece.svg"
    },
    "region": "Europe",
    "aliases": [
      "Hellenic Republic",
      "GR",
      "Elláda",
      "Ελληνική Δημοκρατία"
    ]
  },
  {
    "id": "czechia",
    "iso2": "CZ",
    "iso3": "CZE",
    "name": "Czechia",
    "flag": "🇨🇿",
    "capital": "Prague",
    "largest_city": "Prague",
    "population_millions": 10.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/czechia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Czech Republic",
      "CZ",
      "Česká republika",
      "Česko"
    ]
  },
  {
    "id": "dominican_republic",
    "iso2": "DO",
    "iso3": "DOM",
    "name": "Dominican Republic",
    "flag": "🇩🇴",
    "capital": "Santo Domingo",
    "largest_city": "Santo Domingo",
    "population_millions": 10.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/dominican_republic.svg"
    },
    "region": "North America",
    "aliases": [
      "DO"
    ]
  },
  {
    "id": "portugal",
    "iso2": "PT",
    "iso3": "PRT",
    "name": "Portugal",
    "flag": "🇵🇹",
    "capital": "Lisbon",
    "largest_city": "Lisbon",
    "population_millions": 10.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/portugal.svg"
    },
    "region": "Europe",
    "aliases": [
      "Portuguese Republic",
      "PT",
      "Portuguesa",
      "República Portuguesa"
    ]
  },
  {
    "id": "azerbaijan",
    "iso2": "AZ",
    "iso3": "AZE",
    "name": "Azerbaijan",
    "flag": "🇦🇿",
    "capital": "Baku",
    "largest_city": "Baku",
    "population_millions": 10.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/azerbaijan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Azerbaijan",
      "AZ",
      "Azərbaycan Respublikası"
    ]
  },
  {
    "id": "sweden",
    "iso2": "SE",
    "iso3": "SWE",
    "name": "Sweden",
    "flag": "🇸🇪",
    "capital": "Stockholm",
    "largest_city": "Stockholm",
    "population_millions": 10.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/sweden.svg"
    },
    "region": "Europe",
    "aliases": [
      "Kingdom of Sweden",
      "SE",
      "Konungariket Sverige"
    ]
  },
  {
    "id": "jordan",
    "iso2": "JO",
    "iso3": "JOR",
    "name": "Jordan",
    "flag": "🇯🇴",
    "capital": "Amman",
    "largest_city": "Amman",
    "population_millions": 10,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/jordan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Hashemite Kingdom of Jordan",
      "JO",
      "al-Mamlakah al-Urdunīyah al-Hāshimīyah"
    ]
  },
  {
    "id": "hungary",
    "iso2": "HU",
    "iso3": "HUN",
    "name": "Hungary",
    "flag": "🇭🇺",
    "capital": "Budapest",
    "largest_city": "Budapest",
    "population_millions": 9.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/hungary.svg"
    },
    "region": "Europe",
    "aliases": [
      "HU"
    ]
  },
  {
    "id": "united_arab_emirates",
    "iso2": "AE",
    "iso3": "ARE",
    "name": "United Arab Emirates",
    "flag": "🇦🇪",
    "capital": "Abu Dhabi",
    "largest_city": "Dubai",
    "population_millions": 9.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/united_arab_emirates.svg"
    },
    "region": "Asia",
    "aliases": [
      "AE",
      "UAE",
      "Emirates"
    ]
  },
  {
    "id": "honduras",
    "iso2": "HN",
    "iso3": "HND",
    "name": "Honduras",
    "flag": "🇭🇳",
    "capital": "Tegucigalpa",
    "largest_city": "Tegucigalpa",
    "population_millions": 9.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/honduras.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Honduras",
      "HN",
      "República de Honduras"
    ]
  },
  {
    "id": "belarus",
    "iso2": "BY",
    "iso3": "BLR",
    "name": "Belarus",
    "flag": "🇧🇾",
    "capital": "Minsk",
    "largest_city": "Minsk",
    "population_millions": 9.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/belarus.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Belarus",
      "BY",
      "Bielaruś",
      "Белоруссия",
      "Республика Белоруссия"
    ]
  },
  {
    "id": "tajikistan",
    "iso2": "TJ",
    "iso3": "TJK",
    "name": "Tajikistan",
    "flag": "🇹🇯",
    "capital": "Dushanbe",
    "largest_city": "Dushanbe",
    "population_millions": 9.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/tajikistan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Tajikistan",
      "TJ",
      "Toçikiston",
      "Ҷумҳурии Тоҷикистон",
      "Çumhuriyi Toçikiston"
    ]
  },
  {
    "id": "israel",
    "iso2": "IL",
    "iso3": "ISR",
    "name": "Israel",
    "flag": "🇮🇱",
    "capital": "Jerusalem",
    "largest_city": "Jerusalem",
    "population_millions": 8.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/israel.svg"
    },
    "region": "Asia",
    "aliases": [
      "State of Israel",
      "IL",
      "Medīnat Yisrā'el"
    ]
  },
  {
    "id": "austria",
    "iso2": "AT",
    "iso3": "AUT",
    "name": "Austria",
    "flag": "🇦🇹",
    "capital": "Vienna",
    "largest_city": "Vienna",
    "population_millions": 8.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/austria.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Austria",
      "AT",
      "Osterreich",
      "Oesterreich"
    ]
  },
  {
    "id": "papua_new_guinea",
    "iso2": "PG",
    "iso3": "PNG",
    "name": "Papua New Guinea",
    "flag": "🇵🇬",
    "capital": "Port Moresby",
    "largest_city": "Port Moresby",
    "population_millions": 8.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/papua_new_guinea.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Independent State of Papua New Guinea",
      "PG",
      "Independen Stet bilong Papua Niugini"
    ]
  },
  {
    "id": "switzerland",
    "iso2": "CH",
    "iso3": "CHE",
    "name": "Switzerland",
    "flag": "🇨🇭",
    "capital": "Bern",
    "largest_city": "Zurich",
    "population_millions": 8.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/switzerland.svg"
    },
    "region": "Europe",
    "aliases": [
      "Swiss Confederation",
      "CH",
      "Schweiz",
      "Suisse",
      "Svizzera",
      "Svizra"
    ]
  },
  {
    "id": "south_sudan",
    "iso2": "SS",
    "iso3": "SSD",
    "name": "South Sudan",
    "flag": "🇸🇸",
    "capital": "Juba",
    "largest_city": "Juba",
    "population_millions": 8.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/south_sudan.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of South Sudan",
      "SS"
    ]
  },
  {
    "id": "togo",
    "iso2": "TG",
    "iso3": "TGO",
    "name": "Togo",
    "flag": "🇹🇬",
    "capital": "Lomé",
    "largest_city": "Lome",
    "population_millions": 7.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/togo.svg"
    },
    "region": "Africa",
    "aliases": [
      "Togolese Republic",
      "TG",
      "Togolese",
      "République Togolaise"
    ]
  },
  {
    "id": "sierra_leone",
    "iso2": "SL",
    "iso3": "SLE",
    "name": "Sierra Leone",
    "flag": "🇸🇱",
    "capital": "Freetown",
    "largest_city": "Freetown",
    "population_millions": 7.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/sierra_leone.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Sierra Leone",
      "SL"
    ]
  },
  {
    "id": "laos",
    "iso2": "LA",
    "iso3": "LAO",
    "name": "Laos",
    "flag": "🇱🇦",
    "capital": "Vientiane",
    "largest_city": "Vientiane",
    "population_millions": 7.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/laos.svg"
    },
    "region": "Asia",
    "aliases": [
      "Lao People's Democratic Republic",
      "LA",
      "Lao",
      "Sathalanalat Paxathipatai Paxaxon Lao"
    ]
  },
  {
    "id": "bulgaria",
    "iso2": "BG",
    "iso3": "BGR",
    "name": "Bulgaria",
    "flag": "🇧🇬",
    "capital": "Sofia",
    "largest_city": "Sofia",
    "population_millions": 7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bulgaria.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Bulgaria",
      "BG",
      "Република България"
    ]
  },
  {
    "id": "paraguay",
    "iso2": "PY",
    "iso3": "PRY",
    "name": "Paraguay",
    "flag": "🇵🇾",
    "capital": "Asunción",
    "largest_city": "Asuncion",
    "population_millions": 7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/paraguay.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Paraguay",
      "PY",
      "República del Paraguay",
      "Tetã Paraguái"
    ]
  },
  {
    "id": "serbia",
    "iso2": "RS",
    "iso3": "SRB",
    "name": "Serbia",
    "flag": "🇷🇸",
    "capital": "Belgrade",
    "largest_city": "Belgrade",
    "population_millions": 7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/serbia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Serbia",
      "RS",
      "Srbija",
      "Republika Srbija",
      "Србија",
      "Република Србија"
    ]
  },
  {
    "id": "lebanon",
    "iso2": "LB",
    "iso3": "LBN",
    "name": "Lebanon",
    "flag": "🇱🇧",
    "capital": "Beirut",
    "largest_city": "Beirut",
    "population_millions": 6.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/lebanon.svg"
    },
    "region": "Asia",
    "aliases": [
      "Lebanese Republic",
      "LB",
      "Al-Jumhūrīyah Al-Libnānīyah"
    ]
  },
  {
    "id": "libya",
    "iso2": "LY",
    "iso3": "LBY",
    "name": "Libya",
    "flag": "🇱🇾",
    "capital": "Tripoli",
    "largest_city": "Tripoli",
    "population_millions": 6.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/libya.svg"
    },
    "region": "Africa",
    "aliases": [
      "State of Libya",
      "LY",
      "Dawlat Libya"
    ]
  },
  {
    "id": "nicaragua",
    "iso2": "NI",
    "iso3": "NIC",
    "name": "Nicaragua",
    "flag": "🇳🇮",
    "capital": "Managua",
    "largest_city": "Managua",
    "population_millions": 6.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/nicaragua.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Nicaragua",
      "NI",
      "República de Nicaragua"
    ]
  },
  {
    "id": "el_salvador",
    "iso2": "SV",
    "iso3": "SLV",
    "name": "El Salvador",
    "flag": "🇸🇻",
    "capital": "San Salvador",
    "largest_city": "San Salvador",
    "population_millions": 6.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/el_salvador.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of El Salvador",
      "SV",
      "República de El Salvador"
    ]
  },
  {
    "id": "kyrgyzstan",
    "iso2": "KG",
    "iso3": "KGZ",
    "name": "Kyrgyzstan",
    "flag": "🇰🇬",
    "capital": "Bishkek",
    "largest_city": "Bishkek",
    "population_millions": 6.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/kyrgyzstan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kyrgyz Republic",
      "KG",
      "Киргизия",
      "Кыргыз Республикасы",
      "Kyrgyz Respublikasy"
    ]
  },
  {
    "id": "eritrea",
    "iso2": "ER",
    "iso3": "ERI",
    "name": "Eritrea",
    "flag": "🇪🇷",
    "capital": "Asmara",
    "largest_city": "Asmara",
    "population_millions": 6.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/eritrea.svg"
    },
    "region": "Africa",
    "aliases": [
      "State of Eritrea",
      "ER",
      "ሃገረ ኤርትራ",
      "Dawlat Iritriyá",
      "ʾErtrā",
      "Iritriyā"
    ]
  },
  {
    "id": "turkmenistan",
    "iso2": "TM",
    "iso3": "TKM",
    "name": "Turkmenistan",
    "flag": "🇹🇲",
    "capital": "Ashgabat",
    "largest_city": "Ashgabat",
    "population_millions": 5.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/turkmenistan.svg"
    },
    "region": "Asia",
    "aliases": [
      "TM"
    ]
  },
  {
    "id": "denmark",
    "iso2": "DK",
    "iso3": "DNK",
    "name": "Denmark",
    "flag": "🇩🇰",
    "capital": "Copenhagen",
    "largest_city": "Copenhagen",
    "population_millions": 5.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/denmark.svg"
    },
    "region": "Europe",
    "aliases": [
      "Kingdom of Denmark",
      "DK",
      "Danmark",
      "Kongeriget Danmark"
    ]
  },
  {
    "id": "singapore",
    "iso2": "SG",
    "iso3": "SGP",
    "name": "Singapore",
    "flag": "🇸🇬",
    "capital": "Singapore",
    "largest_city": "Singapore",
    "population_millions": 5.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/singapore.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Singapore",
      "SG",
      "Singapura",
      "Republik Singapura",
      "新加坡共和国"
    ]
  },
  {
    "id": "finland",
    "iso2": "FI",
    "iso3": "FIN",
    "name": "Finland",
    "flag": "🇫🇮",
    "capital": "Helsinki",
    "largest_city": "Helsinki",
    "population_millions": 5.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/finland.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Finland",
      "FI",
      "Suomi",
      "Suomen tasavalta",
      "Republiken Finland"
    ]
  },
  {
    "id": "slovakia",
    "iso2": "SK",
    "iso3": "SVK",
    "name": "Slovakia",
    "flag": "🇸🇰",
    "capital": "Bratislava",
    "largest_city": "Bratislava",
    "population_millions": 5.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/slovakia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Slovak Republic",
      "SK",
      "Slovenská republika"
    ]
  },
  {
    "id": "norway",
    "iso2": "NO",
    "iso3": "NOR",
    "name": "Norway",
    "flag": "🇳🇴",
    "capital": "Oslo",
    "largest_city": "Oslo",
    "population_millions": 5.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/norway.svg"
    },
    "region": "Europe",
    "aliases": [
      "Kingdom of Norway",
      "NO",
      "Norge",
      "Noreg",
      "Kongeriket Norge",
      "Kongeriket Noreg"
    ]
  },
  {
    "id": "congo",
    "iso2": "CG",
    "iso3": "COG",
    "name": "Congo",
    "flag": "🇨🇬",
    "capital": "Brazzaville",
    "largest_city": "Brazzaville",
    "population_millions": 5.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/congo.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of the Congo",
      "CG",
      "Congo-Brazzaville"
    ]
  },
  {
    "id": "costa_rica",
    "iso2": "CR",
    "iso3": "CRI",
    "name": "Costa Rica",
    "flag": "🇨🇷",
    "capital": "San José",
    "largest_city": "San Jose",
    "population_millions": 5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/costa_rica.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Costa Rica",
      "CR",
      "República de Costa Rica"
    ]
  },
  {
    "id": "ireland",
    "iso2": "IE",
    "iso3": "IRL",
    "name": "Ireland",
    "flag": "🇮🇪",
    "capital": "Dublin",
    "largest_city": "Dublin",
    "population_millions": 4.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/ireland.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Ireland",
      "IE",
      "Éire",
      "Poblacht na hÉireann"
    ]
  },
  {
    "id": "new_zealand",
    "iso2": "NZ",
    "iso3": "NZL",
    "name": "New Zealand",
    "flag": "🇳🇿",
    "capital": "Wellington",
    "largest_city": "Auckland",
    "population_millions": 4.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/new_zealand.svg"
    },
    "region": "Oceania",
    "aliases": [
      "NZ",
      "Aotearoa"
    ]
  },
  {
    "id": "liberia",
    "iso2": "LR",
    "iso3": "LBR",
    "name": "Liberia",
    "flag": "🇱🇷",
    "capital": "Monrovia",
    "largest_city": "Monrovia",
    "population_millions": 4.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/liberia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Liberia",
      "LR"
    ]
  },
  {
    "id": "oman",
    "iso2": "OM",
    "iso3": "OMN",
    "name": "Oman",
    "flag": "🇴🇲",
    "capital": "Muscat",
    "largest_city": "Muscat",
    "population_millions": 4.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/oman.svg"
    },
    "region": "Asia",
    "aliases": [
      "Sultanate of Oman",
      "OM",
      "Salṭanat ʻUmān"
    ]
  },
  {
    "id": "central_african_republic",
    "iso2": "CF",
    "iso3": "CAF",
    "name": "Central African Republic",
    "flag": "🇨🇫",
    "capital": "Bangui",
    "largest_city": "Bangui",
    "population_millions": 4.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/central_african_republic.svg"
    },
    "region": "Africa",
    "aliases": [
      "CF",
      "République centrafricaine"
    ]
  },
  {
    "id": "palestine",
    "iso2": "PS",
    "iso3": "PSE",
    "name": "Palestine",
    "flag": "🇵🇸",
    "capital": "Ramallah",
    "largest_city": "Gaza",
    "population_millions": 4.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/palestine.svg"
    },
    "region": "Asia",
    "aliases": [
      "Palestinian Territory",
      "State of Palestine",
      "PS",
      "Palestine, State of",
      "Dawlat Filasṭin"
    ]
  },
  {
    "id": "mauritania",
    "iso2": "MR",
    "iso3": "MRT",
    "name": "Mauritania",
    "flag": "🇲🇷",
    "capital": "Nouakchott",
    "largest_city": "Nouakchott",
    "population_millions": 4.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mauritania.svg"
    },
    "region": "Africa",
    "aliases": [
      "Islamic Republic of Mauritania",
      "MR",
      "al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah"
    ]
  },
  {
    "id": "panama",
    "iso2": "PA",
    "iso3": "PAN",
    "name": "Panama",
    "flag": "🇵🇦",
    "capital": "Panama City",
    "largest_city": "Panama City",
    "population_millions": 4.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/panama.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Panama",
      "PA",
      "República de Panamá"
    ]
  },
  {
    "id": "kuwait",
    "iso2": "KW",
    "iso3": "KWT",
    "name": "Kuwait",
    "flag": "🇰🇼",
    "capital": "Kuwait City",
    "largest_city": "Kuwait City",
    "population_millions": 4.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/kuwait.svg"
    },
    "region": "Asia",
    "aliases": [
      "State of Kuwait",
      "KW",
      "Dawlat al-Kuwait"
    ]
  },
  {
    "id": "croatia",
    "iso2": "HR",
    "iso3": "HRV",
    "name": "Croatia",
    "flag": "🇭🇷",
    "capital": "Zagreb",
    "largest_city": "Zagreb",
    "population_millions": 3.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/croatia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Croatia",
      "HR",
      "Hrvatska",
      "Republika Hrvatska"
    ]
  },
  {
    "id": "georgia",
    "iso2": "GE",
    "iso3": "GEO",
    "name": "Georgia",
    "flag": "🇬🇪",
    "capital": "Tbilisi",
    "largest_city": "Tbilisi",
    "population_millions": 3.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/georgia.svg"
    },
    "region": "Asia",
    "aliases": [
      "GE",
      "Sakartvelo"
    ]
  },
  {
    "id": "moldova",
    "iso2": "MD",
    "iso3": "MDA",
    "name": "Moldova",
    "flag": "🇲🇩",
    "capital": "Chișinău",
    "largest_city": "Chisinau",
    "population_millions": 3.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/moldova.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Moldova",
      "MD",
      "Moldova, Republic of",
      "Republica Moldova"
    ]
  },
  {
    "id": "uruguay",
    "iso2": "UY",
    "iso3": "URY",
    "name": "Uruguay",
    "flag": "🇺🇾",
    "capital": "Montevideo",
    "largest_city": "Montevideo",
    "population_millions": 3.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/uruguay.svg"
    },
    "region": "South America",
    "aliases": [
      "Oriental Republic of Uruguay",
      "UY",
      "República Oriental del Uruguay"
    ]
  },
  {
    "id": "bosnia_and_herzegovina",
    "iso2": "BA",
    "iso3": "BIH",
    "name": "Bosnia and Herzegovina",
    "flag": "🇧🇦",
    "capital": "Sarajevo",
    "largest_city": "Sarajevo",
    "population_millions": 3.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bosnia_and_herzegovina.svg"
    },
    "region": "Europe",
    "aliases": [
      "BA",
      "Bosnia-Herzegovina",
      "Босна и Херцеговина"
    ]
  },
  {
    "id": "mongolia",
    "iso2": "MN",
    "iso3": "MNG",
    "name": "Mongolia",
    "flag": "🇲🇳",
    "capital": "Ulan Bator",
    "largest_city": "Ulaanbaatar",
    "population_millions": 3.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mongolia.svg"
    },
    "region": "Asia",
    "aliases": [
      "MN"
    ]
  },
  {
    "id": "armenia",
    "iso2": "AM",
    "iso3": "ARM",
    "name": "Armenia",
    "flag": "🇦🇲",
    "capital": "Yerevan",
    "largest_city": "Yerevan",
    "population_millions": 3.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/armenia.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of Armenia",
      "AM",
      "Hayastan",
      "Հայաստանի Հանրապետություն"
    ]
  },
  {
    "id": "albania",
    "iso2": "AL",
    "iso3": "ALB",
    "name": "Albania",
    "flag": "🇦🇱",
    "capital": "Tirana",
    "largest_city": "Tirana",
    "population_millions": 2.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/albania.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Albania",
      "AL",
      "Shqipëri",
      "Shqipëria",
      "Shqipnia"
    ]
  },
  {
    "id": "jamaica",
    "iso2": "JM",
    "iso3": "JAM",
    "name": "Jamaica",
    "flag": "🇯🇲",
    "capital": "Kingston",
    "largest_city": "Kingston",
    "population_millions": 2.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/jamaica.svg"
    },
    "region": "North America",
    "aliases": [
      "JM"
    ]
  },
  {
    "id": "lithuania",
    "iso2": "LT",
    "iso3": "LTU",
    "name": "Lithuania",
    "flag": "🇱🇹",
    "capital": "Vilnius",
    "largest_city": "Vilnius",
    "population_millions": 2.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/lithuania.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Lithuania",
      "LT",
      "Lietuvos Respublika"
    ]
  },
  {
    "id": "qatar",
    "iso2": "QA",
    "iso3": "QAT",
    "name": "Qatar",
    "flag": "🇶🇦",
    "capital": "Doha",
    "largest_city": "Doha",
    "population_millions": 2.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/qatar.svg"
    },
    "region": "Asia",
    "aliases": [
      "State of Qatar",
      "QA",
      "Dawlat Qaṭar"
    ]
  },
  {
    "id": "namibia",
    "iso2": "NA",
    "iso3": "NAM",
    "name": "Namibia",
    "flag": "🇳🇦",
    "capital": "Windhoek",
    "largest_city": "Windhoek",
    "population_millions": 2.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/namibia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Namibia",
      "NA",
      "Namibië"
    ]
  },
  {
    "id": "botswana",
    "iso2": "BW",
    "iso3": "BWA",
    "name": "Botswana",
    "flag": "🇧🇼",
    "capital": "Gaborone",
    "largest_city": "Gaborone",
    "population_millions": 2.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/botswana.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Botswana",
      "BW",
      "Lefatshe la Botswana"
    ]
  },
  {
    "id": "gambia",
    "iso2": "GM",
    "iso3": "GMB",
    "name": "Gambia",
    "flag": "🇬🇲",
    "capital": "Banjul",
    "largest_city": "Serekunda",
    "population_millions": 2.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/gambia.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of the Gambia",
      "GM"
    ]
  },
  {
    "id": "gabon",
    "iso2": "GA",
    "iso3": "GAB",
    "name": "Gabon",
    "flag": "🇬🇦",
    "capital": "Libreville",
    "largest_city": "Libreville",
    "population_millions": 2.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/gabon.svg"
    },
    "region": "Africa",
    "aliases": [
      "Gabonese Republic",
      "GA",
      "République Gabonaise"
    ]
  },
  {
    "id": "lesotho",
    "iso2": "LS",
    "iso3": "LSO",
    "name": "Lesotho",
    "flag": "🇱🇸",
    "capital": "Maseru",
    "largest_city": "Maseru",
    "population_millions": 2.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/lesotho.svg"
    },
    "region": "Africa",
    "aliases": [
      "Kingdom of Lesotho",
      "LS",
      "Muso oa Lesotho"
    ]
  },
  {
    "id": "north_macedonia",
    "iso2": "MK",
    "iso3": "MKD",
    "name": "North Macedonia",
    "flag": "🇲🇰",
    "capital": "Skopje",
    "largest_city": "Skopje",
    "population_millions": 2.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/north_macedonia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of North Macedonia",
      "MK",
      "The former Yugoslav Republic of Macedonia",
      "Macedonia, The Former Yugoslav Republic of",
      "Република Северна Македонија",
      "Macedonia"
    ]
  },
  {
    "id": "slovenia",
    "iso2": "SI",
    "iso3": "SVN",
    "name": "Slovenia",
    "flag": "🇸🇮",
    "capital": "Ljubljana",
    "largest_city": "Ljubljana",
    "population_millions": 2.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/slovenia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Slovenia",
      "SI",
      "Republika Slovenija"
    ]
  },
  {
    "id": "guinea_bissau",
    "iso2": "GW",
    "iso3": "GNB",
    "name": "Guinea-Bissau",
    "flag": "🇬🇼",
    "capital": "Bissau",
    "largest_city": "Bissau",
    "population_millions": 1.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/guinea_bissau.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Guinea-Bissau",
      "GW",
      "República da Guiné-Bissau"
    ]
  },
  {
    "id": "latvia",
    "iso2": "LV",
    "iso3": "LVA",
    "name": "Latvia",
    "flag": "🇱🇻",
    "capital": "Riga",
    "largest_city": "Riga",
    "population_millions": 1.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/latvia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Latvia",
      "LV",
      "Latvijas Republika"
    ]
  },
  {
    "id": "bahrain",
    "iso2": "BH",
    "iso3": "BHR",
    "name": "Bahrain",
    "flag": "🇧🇭",
    "capital": "Manama",
    "largest_city": "Manama",
    "population_millions": 1.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bahrain.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kingdom of Bahrain",
      "BH",
      "Mamlakat al-Baḥrayn"
    ]
  },
  {
    "id": "trinidad_and_tobago",
    "iso2": "TT",
    "iso3": "TTO",
    "name": "Trinidad and Tobago",
    "flag": "🇹🇹",
    "capital": "Port of Spain",
    "largest_city": "Chaguanas",
    "population_millions": 1.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/trinidad_and_tobago.svg"
    },
    "region": "North America",
    "aliases": [
      "Republic of Trinidad and Tobago",
      "TT"
    ]
  },
  {
    "id": "estonia",
    "iso2": "EE",
    "iso3": "EST",
    "name": "Estonia",
    "flag": "🇪🇪",
    "capital": "Tallinn",
    "largest_city": "Tallinn",
    "population_millions": 1.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/estonia.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Estonia",
      "EE",
      "Eesti",
      "Eesti Vabariik"
    ]
  },
  {
    "id": "equatorial_guinea",
    "iso2": "GQ",
    "iso3": "GNQ",
    "name": "Equatorial Guinea",
    "flag": "🇬🇶",
    "capital": "Malabo",
    "largest_city": "Bata",
    "population_millions": 1.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/equatorial_guinea.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Equatorial Guinea",
      "GQ",
      "República de Guinea Ecuatorial",
      "République de Guinée équatoriale",
      "República da Guiné Equatorial"
    ]
  },
  {
    "id": "mauritius",
    "iso2": "MU",
    "iso3": "MUS",
    "name": "Mauritius",
    "flag": "🇲🇺",
    "capital": "Port Louis",
    "largest_city": "Port Louis",
    "population_millions": 1.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/mauritius.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Mauritius",
      "MU",
      "République de Maurice"
    ]
  },
  {
    "id": "timor_leste",
    "iso2": "TL",
    "iso3": "TLS",
    "name": "Timor-Leste",
    "flag": "🇹🇱",
    "capital": "Dili",
    "largest_city": "Dili",
    "population_millions": 1.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/timor_leste.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Timor Leste",
      "Democratic Republic of Timor-Leste",
      "TL",
      "East Timor",
      "Timor",
      "República Democrática de Timor-Leste",
      "Repúblika Demokrátika Timór-Leste",
      "Timór Lorosa'e",
      "Timor Lorosae"
    ]
  },
  {
    "id": "cyprus",
    "iso2": "CY",
    "iso3": "CYP",
    "name": "Cyprus",
    "flag": "🇨🇾",
    "capital": "Nicosia",
    "largest_city": "Nicosia",
    "population_millions": 1.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/cyprus.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Cyprus",
      "CY",
      "Kýpros",
      "Kıbrıs",
      "Κυπριακή Δημοκρατία",
      "Kıbrıs Cumhuriyeti"
    ]
  },
  {
    "id": "eswatini",
    "iso2": "SZ",
    "iso3": "SWZ",
    "name": "Eswatini",
    "flag": "🇸🇿",
    "capital": "Lobamba",
    "largest_city": "Manzini",
    "population_millions": 1.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/eswatini.svg"
    },
    "region": "Africa",
    "aliases": [
      "Kingdom of Eswatini",
      "SZ",
      "Swaziland",
      "weSwatini",
      "Swatini",
      "Ngwane",
      "Umbuso weSwatini"
    ]
  },
  {
    "id": "djibouti",
    "iso2": "DJ",
    "iso3": "DJI",
    "name": "Djibouti",
    "flag": "🇩🇯",
    "capital": "Djibouti",
    "largest_city": "Djibouti",
    "population_millions": 1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/djibouti.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Djibouti",
      "DJ",
      "Jabuuti",
      "Gabuuti",
      "République de Djibouti",
      "Gabuutih Ummuuno",
      "Jamhuuriyadda Jabuuti"
    ]
  },
  {
    "id": "fiji",
    "iso2": "FJ",
    "iso3": "FJI",
    "name": "Fiji",
    "flag": "🇫🇯",
    "capital": "Suva",
    "largest_city": "Suva",
    "population_millions": 0.9,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/fiji.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Republic of Fiji",
      "FJ",
      "Viti",
      "Matanitu ko Viti",
      "Fijī Gaṇarājya"
    ]
  },
  {
    "id": "bhutan",
    "iso2": "BT",
    "iso3": "BTN",
    "name": "Bhutan",
    "flag": "🇧🇹",
    "capital": "Thimphu",
    "largest_city": "Thimphu",
    "population_millions": 0.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bhutan.svg"
    },
    "region": "Asia",
    "aliases": [
      "Kingdom of Bhutan",
      "BT"
    ]
  },
  {
    "id": "guyana",
    "iso2": "GY",
    "iso3": "GUY",
    "name": "Guyana",
    "flag": "🇬🇾",
    "capital": "Georgetown",
    "largest_city": "Georgetown",
    "population_millions": 0.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/guyana.svg"
    },
    "region": "South America",
    "aliases": [
      "Co-operative Republic of Guyana",
      "GY"
    ]
  },
  {
    "id": "comoros",
    "iso2": "KM",
    "iso3": "COM",
    "name": "Comoros",
    "flag": "🇰🇲",
    "capital": "Moroni",
    "largest_city": "Moroni",
    "population_millions": 0.8,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/comoros.svg"
    },
    "region": "Africa",
    "aliases": [
      "Union of the Comoros",
      "KM",
      "Union des Comores",
      "Udzima wa Komori",
      "al-Ittiḥād al-Qumurī"
    ]
  },
  {
    "id": "solomon_islands",
    "iso2": "SB",
    "iso3": "SLB",
    "name": "Solomon Islands",
    "flag": "🇸🇧",
    "capital": "Honiara",
    "largest_city": "Honiara",
    "population_millions": 0.7,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/solomon_islands.svg"
    },
    "region": "Oceania",
    "aliases": [
      "SB"
    ]
  },
  {
    "id": "luxembourg",
    "iso2": "LU",
    "iso3": "LUX",
    "name": "Luxembourg",
    "flag": "🇱🇺",
    "capital": "Luxembourg",
    "largest_city": "Luxembourg",
    "population_millions": 0.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/luxembourg.svg"
    },
    "region": "Europe",
    "aliases": [
      "Grand Duchy of Luxembourg",
      "LU",
      "Grand-Duché de Luxembourg",
      "Großherzogtum Luxemburg",
      "Groussherzogtum Lëtzebuerg"
    ]
  },
  {
    "id": "montenegro",
    "iso2": "ME",
    "iso3": "MNE",
    "name": "Montenegro",
    "flag": "🇲🇪",
    "capital": "Podgorica",
    "largest_city": "Podgorica",
    "population_millions": 0.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/montenegro.svg"
    },
    "region": "Europe",
    "aliases": [
      "ME",
      "Crna Gora"
    ]
  },
  {
    "id": "suriname",
    "iso2": "SR",
    "iso3": "SUR",
    "name": "Suriname",
    "flag": "🇸🇷",
    "capital": "Paramaribo",
    "largest_city": "Paramaribo",
    "population_millions": 0.6,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/suriname.svg"
    },
    "region": "South America",
    "aliases": [
      "Republic of Suriname",
      "SR",
      "Sarnam",
      "Sranangron",
      "Republiek Suriname"
    ]
  },
  {
    "id": "cape_verde",
    "iso2": "CV",
    "iso3": "CPV",
    "name": "Cape Verde",
    "flag": "🇨🇻",
    "capital": "Praia",
    "largest_city": "Praia",
    "population_millions": 0.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/cape_verde.svg"
    },
    "region": "Africa",
    "aliases": [
      "Cabo Verde",
      "Republic of Cabo Verde",
      "CV",
      "República de Cabo Verde"
    ]
  },
  {
    "id": "malta",
    "iso2": "MT",
    "iso3": "MLT",
    "name": "Malta",
    "flag": "🇲🇹",
    "capital": "Valletta",
    "largest_city": "Birkirkara",
    "population_millions": 0.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/malta.svg"
    },
    "region": "Europe",
    "aliases": [
      "Republic of Malta",
      "MT",
      "Repubblika ta' Malta"
    ]
  },
  {
    "id": "maldives",
    "iso2": "MV",
    "iso3": "MDV",
    "name": "Maldives",
    "flag": "🇲🇻",
    "capital": "Malé",
    "largest_city": "Male",
    "population_millions": 0.5,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/maldives.svg"
    },
    "region": "Asia",
    "aliases": [
      "Republic of the Maldives",
      "MV",
      "Maldive Islands",
      "Dhivehi Raajjeyge Jumhooriyya"
    ]
  },
  {
    "id": "brunei",
    "iso2": "BN",
    "iso3": "BRN",
    "name": "Brunei",
    "flag": "🇧🇳",
    "capital": "Bandar Seri Begawan",
    "largest_city": "Bandar Seri Begawan",
    "population_millions": 0.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/brunei.svg"
    },
    "region": "Asia",
    "aliases": [
      "Nation of Brunei, Abode of Peace",
      "BN",
      "Brunei Darussalam",
      "Nation of Brunei",
      "the Abode of Peace"
    ]
  },
  {
    "id": "bahamas",
    "iso2": "BS",
    "iso3": "BHS",
    "name": "Bahamas",
    "flag": "🇧🇸",
    "capital": "Nassau",
    "largest_city": "Nassau",
    "population_millions": 0.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/bahamas.svg"
    },
    "region": "North America",
    "aliases": [
      "Commonwealth of the Bahamas",
      "BS"
    ]
  },
  {
    "id": "belize",
    "iso2": "BZ",
    "iso3": "BLZ",
    "name": "Belize",
    "flag": "🇧🇿",
    "capital": "Belmopan",
    "largest_city": "Belize City",
    "population_millions": 0.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/belize.svg"
    },
    "region": "North America",
    "aliases": [
      "BZ"
    ]
  },
  {
    "id": "iceland",
    "iso2": "IS",
    "iso3": "ISL",
    "name": "Iceland",
    "flag": "🇮🇸",
    "capital": "Reykjavik",
    "largest_city": "Reykjavik",
    "population_millions": 0.4,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/iceland.svg"
    },
    "region": "Europe",
    "aliases": [
      "IS",
      "Island",
      "Republic of Iceland",
      "Lýðveldið Ísland"
    ]
  },
  {
    "id": "barbados",
    "iso2": "BB",
    "iso3": "BRB",
    "name": "Barbados",
    "flag": "🇧🇧",
    "capital": "Bridgetown",
    "largest_city": "Bridgetown",
    "population_millions": 0.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/barbados.svg"
    },
    "region": "North America",
    "aliases": [
      "BB"
    ]
  },
  {
    "id": "vanuatu",
    "iso2": "VU",
    "iso3": "VUT",
    "name": "Vanuatu",
    "flag": "🇻🇺",
    "capital": "Port Vila",
    "largest_city": "Port Vila",
    "population_millions": 0.3,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/vanuatu.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Republic of Vanuatu",
      "VU",
      "Ripablik blong Vanuatu",
      "République de Vanuatu"
    ]
  },
  {
    "id": "saint_lucia",
    "iso2": "LC",
    "iso3": "LCA",
    "name": "Saint Lucia",
    "flag": "🇱🇨",
    "capital": "Castries",
    "largest_city": "Castries",
    "population_millions": 0.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/saint_lucia.svg"
    },
    "region": "North America",
    "aliases": [
      "LC"
    ]
  },
  {
    "id": "sao_tome_and_principe",
    "iso2": "ST",
    "iso3": "STP",
    "name": "São Tomé and Príncipe",
    "flag": "🇸🇹",
    "capital": "São Tomé",
    "largest_city": "Sao Tome",
    "population_millions": 0.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/sao_tome_and_principe.svg"
    },
    "region": "Africa",
    "aliases": [
      "Sao Tome and Principe",
      "Democratic Republic of São Tomé and Príncipe",
      "ST",
      "República Democrática de São Tomé e Príncipe"
    ]
  },
  {
    "id": "samoa",
    "iso2": "WS",
    "iso3": "WSM",
    "name": "Samoa",
    "flag": "🇼🇸",
    "capital": "Apia",
    "largest_city": "Apia",
    "population_millions": 0.2,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/samoa.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Independent State of Samoa",
      "WS",
      "Malo Saʻoloto Tutoʻatasi o Sāmoa"
    ]
  },
  {
    "id": "andorra",
    "iso2": "AD",
    "iso3": "AND",
    "name": "Andorra",
    "flag": "🇦🇩",
    "capital": "Andorra la Vella",
    "largest_city": "Andorra la Vella",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/andorra.svg"
    },
    "region": "Europe",
    "aliases": [
      "Principality of Andorra",
      "AD",
      "Principat d'Andorra"
    ]
  },
  {
    "id": "antigua_and_barbuda",
    "iso2": "AG",
    "iso3": "ATG",
    "name": "Antigua and Barbuda",
    "flag": "🇦🇬",
    "capital": "Saint John's",
    "largest_city": "Saint John's",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/antigua_and_barbuda.svg"
    },
    "region": "North America",
    "aliases": [
      "AG"
    ]
  },
  {
    "id": "dominica",
    "iso2": "DM",
    "iso3": "DMA",
    "name": "Dominica",
    "flag": "🇩🇲",
    "capital": "Roseau",
    "largest_city": "Roseau",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/dominica.svg"
    },
    "region": "North America",
    "aliases": [
      "Commonwealth of Dominica",
      "DM",
      "Dominique",
      "Wai‘tu kubuli"
    ]
  },
  {
    "id": "micronesia",
    "iso2": "FM",
    "iso3": "FSM",
    "name": "Micronesia",
    "flag": "🇫🇲",
    "capital": "Palikir",
    "largest_city": "Weno",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/micronesia.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Federated States of Micronesia",
      "FM",
      "Micronesia, Federated States of"
    ]
  },
  {
    "id": "grenada",
    "iso2": "GD",
    "iso3": "GRD",
    "name": "Grenada",
    "flag": "🇬🇩",
    "capital": "St. George's",
    "largest_city": "St. George's",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/grenada.svg"
    },
    "region": "North America",
    "aliases": [
      "GD"
    ]
  },
  {
    "id": "kiribati",
    "iso2": "KI",
    "iso3": "KIR",
    "name": "Kiribati",
    "flag": "🇰🇮",
    "capital": "South Tarawa",
    "largest_city": "Tarawa",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/kiribati.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Independent and Sovereign Republic of Kiribati",
      "KI",
      "Republic of Kiribati",
      "Ribaberiki Kiribati"
    ]
  },
  {
    "id": "saint_kitts_and_nevis",
    "iso2": "KN",
    "iso3": "KNA",
    "name": "Saint Kitts and Nevis",
    "flag": "🇰🇳",
    "capital": "Basseterre",
    "largest_city": "Basseterre",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/saint_kitts_and_nevis.svg"
    },
    "region": "North America",
    "aliases": [
      "Federation of Saint Christopher and Nevis",
      "KN"
    ]
  },
  {
    "id": "marshall_islands",
    "iso2": "MH",
    "iso3": "MHL",
    "name": "Marshall Islands",
    "flag": "🇲🇭",
    "capital": "Majuro",
    "largest_city": "Majuro",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/marshall_islands.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Republic of the Marshall Islands",
      "MH",
      "Aolepān Aorōkin M̧ajeļ"
    ]
  },
  {
    "id": "seychelles",
    "iso2": "SC",
    "iso3": "SYC",
    "name": "Seychelles",
    "flag": "🇸🇨",
    "capital": "Victoria",
    "largest_city": "Victoria",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/seychelles.svg"
    },
    "region": "Africa",
    "aliases": [
      "Republic of Seychelles",
      "SC",
      "Repiblik Sesel",
      "République des Seychelles"
    ]
  },
  {
    "id": "tonga",
    "iso2": "TO",
    "iso3": "TON",
    "name": "Tonga",
    "flag": "🇹🇴",
    "capital": "Nuku'alofa",
    "largest_city": "Nuku'alofa",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/tonga.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Kingdom of Tonga",
      "TO"
    ]
  },
  {
    "id": "saint_vincent_and_the_grenadines",
    "iso2": "VC",
    "iso3": "VCT",
    "name": "Saint Vincent and the Grenadines",
    "flag": "🇻🇨",
    "capital": "Kingstown",
    "largest_city": "Kingstown",
    "population_millions": 0.1,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/saint_vincent_and_the_grenadines.svg"
    },
    "region": "North America",
    "aliases": [
      "VC"
    ]
  },
  {
    "id": "liechtenstein",
    "iso2": "LI",
    "iso3": "LIE",
    "name": "Liechtenstein",
    "flag": "🇱🇮",
    "capital": "Vaduz",
    "largest_city": "Schaan",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/liechtenstein.svg"
    },
    "region": "Europe",
    "aliases": [
      "Principality of Liechtenstein",
      "LI",
      "Fürstentum Liechtenstein"
    ]
  },
  {
    "id": "monaco",
    "iso2": "MC",
    "iso3": "MCO",
    "name": "Monaco",
    "flag": "🇲🇨",
    "capital": "Monaco",
    "largest_city": "Monte Carlo",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/monaco.svg"
    },
    "region": "Europe",
    "aliases": [
      "Principality of Monaco",
      "MC",
      "Principauté de Monaco"
    ]
  },
  {
    "id": "palau",
    "iso2": "PW",
    "iso3": "PLW",
    "name": "Palau",
    "flag": "🇵🇼",
    "capital": "Ngerulmud",
    "largest_city": "Koror",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/palau.svg"
    },
    "region": "Oceania",
    "aliases": [
      "Republic of Palau",
      "PW",
      "Beluu er a Belau"
    ]
  },
  {
    "id": "san_marino",
    "iso2": "SM",
    "iso3": "SMR",
    "name": "San Marino",
    "flag": "🇸🇲",
    "capital": "City of San Marino",
    "largest_city": "Serravalle",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/san_marino.svg"
    },
    "region": "Europe",
    "aliases": [
      "Most Serene Republic of San Marino",
      "SM",
      "Republic of San Marino",
      "Repubblica di San Marino"
    ]
  },
  {
    "id": "tuvalu",
    "iso2": "TV",
    "iso3": "TUV",
    "name": "Tuvalu",
    "flag": "🇹🇻",
    "capital": "Funafuti",
    "largest_city": "Funafuti",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/tuvalu.svg"
    },
    "region": "Oceania",
    "aliases": [
      "TV"
    ]
  },
  {
    "id": "vatican_city",
    "iso2": "VA",
    "iso3": "VAT",
    "name": "Vatican City",
    "flag": "🇻🇦",
    "capital": "Vatican City",
    "largest_city": "Vatican City",
    "population_millions": 0,
    "shape_data": {
      "type": "image",
      "src": "assets/shapes/vatican_city.svg"
    },
    "region": "Europe",
    "aliases": [
      "Vatican",
      "Vatican City State",
      "VA",
      "Holy See (Vatican City State)",
      "Stato della Città del Vaticano"
    ]
  }
];

const FACT_TYPES = {
  country_capital: {
    id: "country_capital",
    label: "Country → Capital",
    promptType: "country",
    answerKey: "capital",
    helper: "Pick the capital city.",
    displayAnswer: (country) => country.capital
  },
  country_flag: {
    id: "country_flag",
    label: "Country → Flag",
    promptType: "country",
    answerKey: "flag",
    helper: "Choose the correct flag.",
    displayAnswer: (country) => country.flag
  },
  flag_country: {
    id: "flag_country",
    label: "Flag → Country",
    promptType: "flag",
    answerKey: "name",
    helper: "Identify the country from its flag.",
    displayAnswer: (country) => country.name
  },
  country_largest_city: {
    id: "country_largest_city",
    label: "Country → Most Populous City",
    promptType: "country",
    answerKey: "largest_city",
    helper: "Pick the largest city by population.",
    displayAnswer: (country) => country.largest_city
  },
  country_population: {
    id: "country_population",
    label: "Country → Population",
    promptType: "country",
    answerKey: "population_millions",
    helper: "Estimate the population to the nearest 0.1 million.",
    displayAnswer: (country) => formatPopulationMillions(country.population_millions)
  },
  most_populous_country: {
    id: "most_populous_country",
    label: "Choose the Most Populous Country",
    promptType: "comparison",
    answerKey: "name",
    helper: "Choose the country with the highest population.",
    displayAnswer: (country) => country.name
  },
  shape_country: {
    id: "shape_country",
    label: "Shape → Country",
    promptType: "shape",
    answerKey: "name",
    helper: "Match the silhouette to the country.",
    displayAnswer: (country) => country.name
  },
  mixed: {
    id: "mixed",
    label: "Mixed Mode"
  }
};

const DEFAULT_SETTINGS = {
  enabledModes: [
    "country_capital",
    "country_flag",
    "flag_country",
    "country_largest_city",
    "country_population",
    "most_populous_country",
    "shape_country"
  ],
  answerMode: "multiple",
  sessionLength: 10,
  continentFilter: "All",
  focusWeakAreas: true,
  darkMode: false
};

const DEFAULT_FACT_PROGRESS = () => ({
  times_seen: 0,
  times_correct: 0,
  times_incorrect: 0,
  current_streak: 0,
  ease: 0.45,
  last_seen: null,
  next_due: 0,
  mastery: 0
});

const appState = {
  countries: [],
  countryMap: new Map(),
  view: "home",
  settings: { ...DEFAULT_SETTINGS },
  progress: {
    facts: {},
    sessions: [],
    dailyCounts: {},
    currentStreak: 0,
    bestStreak: 0,
    lastPracticeDate: null,
    achievements: []
  },
  quiz: {
    active: false,
    mode: "mixed",
    answered: 0,
    correct: 0,
    currentStreak: 0,
    bestStreak: 0,
    score: 0,
    queue: [],
    currentQuestion: null,
    sessionLength: 10,
    responses: []
  },
  study: {
    selectedCountryId: null,
    revealFacts: false
  }
};

const elements = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  bindGlobalEvents();
  loadSettings();
  loadTheme();
  loadProgress();
  try {
    await loadCountries();
  } catch (error) {
    console.warn("Country data load failed", error);
    appState.countries = STARTER_COUNTRIES;
    appState.countryMap = new Map(appState.countries.map((country) => [country.id, country]));
    ensureProgressShape();
    appState.study.selectedCountryId = appState.countries[0]?.id || null;
  }
  populateFilters();
  renderSettings();
  setActiveView("home");
  renderAll();
  await registerPWA();
}

function cacheElements() {
  const ids = [
    "update-banner",
    "update-copy",
    "update-button",
    "dismiss-update",
    "app",
    "home-mastery",
    "home-mastery-bar",
    "home-questions",
    "home-recommendation",
    "top-streak",
    "theme-toggle",
    "quiz-title",
    "quiz-progress-label",
    "quiz-score",
    "quiz-accuracy",
    "quiz-streak",
    "quiz-session-bar",
    "quiz-ring",
    "quiz-ring-label",
    "question-mode-badge",
    "question-region-badge",
    "prompt-visual",
    "question-prompt",
    "question-helper",
    "answer-choices",
    "feedback-card",
    "feedback-status",
    "feedback-copy",
    "answer-recap",
    "next-button",
    "skip-button",
    "typed-answer-form",
    "typed-answer-input",
    "study-search",
    "study-region-filter",
    "study-list",
    "study-detail",
    "stats-total-questions",
    "stats-overall-accuracy",
    "stats-current-streak",
    "stats-best-streak",
    "fact-accuracy-list",
    "mastery-distribution",
    "continent-mastery-list",
    "daily-practice-chart",
    "setting-answer-mode",
    "setting-session-length",
    "setting-continent-filter",
    "setting-focus-weak",
    "mode-checkboxes",
    "reset-progress",
    "export-progress",
    "import-progress",
    "import-file-input",
    "summary-score",
    "summary-accuracy",
    "summary-streak",
    "summary-answered",
    "summary-fact-accuracy",
    "summary-weakest-countries",
    "summary-weakest-facts",
    "summary-recommendation"
  ];

  ids.forEach((id) => {
    elements[id] = document.getElementById(id);
  });
}

function bindGlobalEvents() {
  document.body.addEventListener("click", handleClick);
  document.body.addEventListener("change", handleChange);
  elements["typed-answer-form"].addEventListener("submit", handleTypedSubmit);
  elements["study-search"].addEventListener("input", renderStudyList);
  elements["study-region-filter"].addEventListener("change", renderStudyList);
  elements["next-button"].addEventListener("click", goToNextQuestion);
  elements["skip-button"].addEventListener("click", () => handleAnswer(null, true));
  elements["theme-toggle"].addEventListener("click", toggleTheme);
  elements["update-button"].addEventListener("click", applyPendingUpdate);
  elements["dismiss-update"].addEventListener("click", dismissUpdateBanner);
  elements["reset-progress"].addEventListener("click", resetProgress);
  elements["export-progress"].addEventListener("click", exportProgress);
  elements["import-progress"].addEventListener("click", () => elements["import-file-input"].click());
  elements["import-file-input"].addEventListener("change", importProgress);
  document.addEventListener("keydown", handleKeydown);
}

async function loadCountries() {
  // TODO: Swap the starter JSON with a full global dataset. The rest of the app should not need code changes.
  // Browsers often block fetch() for local JSON on file://, so we fall back to the inline starter dataset.
  let countries = STARTER_COUNTRIES;
  if (window.location.protocol !== "file:") {
    const response = await fetch("countries.json");
    if (!response.ok) {
      throw new Error("Unable to load countries.json");
    }
    countries = await response.json();
  }
  appState.countries = countries;
  appState.countryMap = new Map(appState.countries.map((country) => [country.id, country]));
  ensureProgressShape();
  if (!appState.study.selectedCountryId && appState.countries.length) {
    appState.study.selectedCountryId = appState.countries[0].id;
  }
}

function populateFilters() {
  const regions = ["All", ...new Set(appState.countries.map((country) => country.region))];
  [elements["study-region-filter"], elements["setting-continent-filter"]].forEach((select) => {
    select.innerHTML = "";
    regions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region === "All" ? "All Continents" : region;
      select.appendChild(option);
    });
  });
}

function handleClick(event) {
  const actionTarget = event.target.closest("[data-action]");
  const choiceTarget = event.target.closest("[data-choice]");
  const studyTarget = event.target.closest("[data-country-id]");

  if (choiceTarget && appState.quiz.currentQuestion && !appState.quiz.currentQuestion.answered) {
    handleAnswer(choiceTarget.dataset.choice);
    return;
  }

  if (studyTarget && studyTarget.classList.contains("study-list-item")) {
    appState.study.selectedCountryId = studyTarget.dataset.countryId;
    renderStudyList();
    renderStudyDetail();
    return;
  }

  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;
  if (action === "start-quiz") {
    startQuiz("mixed");
  } else if (action === "open-study") {
    setActiveView("study");
  } else if (action === "open-stats") {
    setActiveView("stats");
  } else if (action === "open-settings") {
    setActiveView("settings");
  } else if (action === "open-home") {
    setActiveView("home");
  } else if (action === "end-session") {
    finishSession();
  } else if (action === "toggle-study-reveal") {
    appState.study.revealFacts = !appState.study.revealFacts;
    renderStudyDetail();
  }
}

function handleChange(event) {
  const target = event.target;

  if (target.matches("[data-mode-checkbox]")) {
    const { enabledModes } = appState.settings;
    if (target.checked) {
      if (!enabledModes.includes(target.value)) {
        enabledModes.push(target.value);
      }
    } else {
      appState.settings.enabledModes = enabledModes.filter((mode) => mode !== target.value);
      if (appState.settings.enabledModes.length === 0) {
        appState.settings.enabledModes = [target.value];
        target.checked = true;
      }
    }
    saveSettings();
    renderHome();
    return;
  }

  if (target.id === "setting-answer-mode") {
    appState.settings.answerMode = target.value;
  }
  if (target.id === "setting-session-length") {
    appState.settings.sessionLength = Number(target.value);
  }
  if (target.id === "setting-continent-filter") {
    appState.settings.continentFilter = target.value;
    renderStudyList();
  }
  if (target.id === "setting-focus-weak") {
    appState.settings.focusWeakAreas = target.checked;
  }
  saveSettings();
  renderHome();
}

function handleKeydown(event) {
  if (appState.view !== "quiz" || !appState.quiz.currentQuestion || appState.quiz.currentQuestion.answered) {
    return;
  }

  const number = Number(event.key);
  if (number >= 1 && number <= 4 && appState.settings.answerMode === "multiple") {
    const choice = appState.quiz.currentQuestion.choices[number - 1];
    if (choice) {
      handleAnswer(choice.value);
    }
  }
}

function handleTypedSubmit(event) {
  event.preventDefault();
  const value = elements["typed-answer-input"].value.trim();
  if (!value) {
    return;
  }
  handleAnswer(value);
}

function renderAll() {
  renderHome();
  renderStudyList();
  renderStudyDetail();
  renderStats();
  renderSettings();
}

function setActiveView(viewName) {
  appState.view = viewName;
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    const action = link.dataset.action;
    const matches =
      (viewName === "home" && action === "open-home") ||
      (viewName === "study" && action === "open-study") ||
      (viewName === "stats" && action === "open-stats") ||
      (viewName === "settings" && action === "open-settings") ||
      (viewName === "quiz" && action === "start-quiz");
    link.classList.toggle("active", matches);
  });
  if (viewName === "stats") {
    renderStats();
  }
  if (viewName === "home") {
    renderHome();
  }
}

function renderHome() {
  const analytics = computeAnalytics();
  elements["home-mastery"].textContent = formatPercent(analytics.averageMastery);
  elements["home-mastery-bar"].style.width = `${analytics.averageMastery * 100}%`;
  elements["home-questions"].textContent = analytics.totalQuestions;
  elements["home-recommendation"].textContent = analytics.recommendedModeLabel;
  elements["top-streak"].textContent = `Streak: ${appState.progress.currentStreak} day${appState.progress.currentStreak === 1 ? "" : "s"}`;
}

function renderStudyList() {
  const search = elements["study-search"].value.trim().toLowerCase();
  const region = elements["study-region-filter"].value || "All";
  const countries = getFilteredCountries().filter((country) => {
    const matchesRegion = region === "All" || country.region === region;
    const haystack = [country.name, country.capital, country.largest_city, ...(country.aliases || [])]
      .join(" ")
      .toLowerCase();
    return matchesRegion && (!search || haystack.includes(search));
  });

  if (!countries.some((country) => country.id === appState.study.selectedCountryId) && countries[0]) {
    appState.study.selectedCountryId = countries[0].id;
  }

  elements["study-list"].innerHTML = countries
    .map((country) => {
      const mastery = getCountryMastery(country.id);
      return `
        <button class="study-list-item ${country.id === appState.study.selectedCountryId ? "active" : ""}" data-country-id="${country.id}">
          <div class="metric-row-copy">
            <strong>${country.flag} ${country.name}</strong>
            <span>${country.region} · ${formatPercent(mastery)}</span>
          </div>
        </button>
      `;
    })
    .join("");

  renderStudyDetail();
}

function renderStudyDetail() {
  const country = appState.countryMap.get(appState.study.selectedCountryId);
  if (!country) {
    elements["study-detail"].innerHTML = `<p class="placeholder-copy">No countries match this filter yet.</p>`;
    return;
  }

  const reveal = appState.study.revealFacts;
  elements["study-detail"].innerHTML = `
    <div class="study-country-header">
      <div>
        <p class="eyebrow">${country.region}</p>
        <h3>${country.name}</h3>
        <p class="lede">Mastery ${formatPercent(getCountryMastery(country.id))}</p>
      </div>
      <div class="study-flag" aria-label="Flag of ${country.name}">${country.flag}</div>
    </div>
    <div class="prompt-visual shape-display">
      ${renderShapeMarkup(country)}
    </div>
    <button class="secondary-button flip-card-toggle" data-action="toggle-study-reveal" type="button">
      ${reveal ? "Hide facts" : "Reveal facts"}
    </button>
    <div class="study-facts">
      ${renderStudyFactCard("Capital", reveal ? country.capital : "Tap reveal")}
      ${renderStudyFactCard("Most populous city", reveal ? country.largest_city : "Tap reveal")}
      ${renderStudyFactCard("Population", reveal ? formatPopulationMillions(country.population_millions) : "Tap reveal")}
      ${renderStudyFactCard("Flag", reveal ? country.flag : "Tap reveal")}
      ${renderStudyFactCard("Aliases", reveal ? (country.aliases.join(", ") || "None") : "Tap reveal")}
      ${renderStudyFactCard("Shape asset", reveal ? `${country.shape_data.type} placeholder ready` : "Tap reveal")}
    </div>
  `;
}

function renderStudyFactCard(label, value) {
  return `
    <section class="fact-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </section>
  `;
}

function renderQuiz() {
  const question = appState.quiz.currentQuestion;
  if (!question) {
    return;
  }

  const answered = appState.quiz.answered;
  const total = appState.quiz.sessionLength;
  const accuracy = answered > 0 ? appState.quiz.correct / answered : 0;
  const progressRatio = answered / total;

  elements["quiz-title"].textContent = FACT_TYPES[question.mode]?.label || "Quiz";
  elements["quiz-progress-label"].textContent = `Question ${Math.min(answered + 1, total)} of ${total}`;
  elements["quiz-score"].textContent = appState.quiz.score;
  elements["quiz-accuracy"].textContent = formatPercent(accuracy);
  elements["quiz-streak"].textContent = appState.quiz.currentStreak;
  elements["quiz-session-bar"].style.width = `${progressRatio * 100}%`;
  setRingProgress(progressRatio);
  elements["question-mode-badge"].textContent = FACT_TYPES[question.mode].label;
  elements["question-region-badge"].textContent = question.regionLabel || question.country.region;
  elements["question-prompt"].textContent = question.prompt;
  elements["question-helper"].textContent = question.helper;
  elements["prompt-visual"].innerHTML = renderPromptVisual(question);

  const typedMode = appState.settings.answerMode === "typed" && question.mode !== "country_flag" && question.mode !== "most_populous_country";
  elements["typed-answer-form"].classList.toggle("hidden", !typedMode);
  elements["answer-choices"].classList.toggle("hidden", typedMode);
  elements["typed-answer-input"].value = "";
  if (typedMode) {
    elements["typed-answer-input"].focus({ preventScroll: true });
  }

  if (!typedMode) {
    elements["answer-choices"].innerHTML = question.choices
      .map(
        (choice, index) => `
          <button class="choice-button ${choice.className || ""}" type="button" data-choice="${escapeAttribute(choice.value)}">
            <strong>${index + 1}. ${choice.label}</strong>
          </button>
        `
      )
      .join("");
  } else {
    elements["answer-choices"].innerHTML = "";
  }

  elements["feedback-card"].className = "feedback-card hidden";
  elements["feedback-status"].textContent = "";
  elements["feedback-copy"].textContent = "";
  elements["answer-recap"].textContent = "";
  elements["next-button"].classList.add("hidden");
  elements["skip-button"].classList.remove("hidden");
}

function renderPromptVisual(question) {
  if (question.visual.type === "flag") {
    return `<div class="flag-display" aria-label="Flag prompt">${question.visual.value}</div>`;
  }
  if (question.visual.type === "shape") {
    return `<div class="shape-placeholder">${renderShapeMarkup(question.country)}</div>`;
  }
  return `<div class="fact-display">${question.visual.value}</div>`;
}

function renderShapeMarkup(country) {
  const shapeData = country.shape_data;
  if (!shapeData) {
    return `<div class="fact-display">◌</div>`;
  }
  if (shapeData.type === "image" && shapeData.src) {
    return `<img class="country-shape-image" src="${shapeData.src}" alt="Country shape silhouette for ${escapeHtml(country.name)}">`;
  }
  if (shapeData.type === "svg") {
    return `
      <svg viewBox="${shapeData.viewBox}" role="img" aria-label="Country shape placeholder for ${country.name}">
        <path d="${shapeData.path}" fill="currentColor" opacity="0.9"></path>
      </svg>
    `;
  }
  // TODO: Support external SVG/image silhouette assets for a full global dataset.
  return `<div class="fact-display">◌</div>`;
}

function startQuiz(mode = "mixed") {
  const eligibleCountries = getFilteredCountries();
  if (eligibleCountries.length < 4) {
    alert("At least 4 countries are needed for quiz mode with the current filters.");
    return;
  }

  appState.quiz = {
    active: true,
    mode,
    answered: 0,
    correct: 0,
    currentStreak: 0,
    bestStreak: 0,
    score: 0,
    queue: [],
    currentQuestion: null,
    sessionLength: appState.settings.sessionLength,
    responses: []
  };

  setActiveView("quiz");
  goToNextQuestion();
}

function goToNextQuestion() {
  if (appState.quiz.answered >= appState.quiz.sessionLength) {
    finishSession();
    return;
  }

  const question = generateQuestion();
  appState.quiz.currentQuestion = question;
  renderQuiz();
}

function generateQuestion() {
  const mode = pickFactMode();
  const factConfig = FACT_TYPES[mode];
  const questionSeed = buildQuestionSeed(mode);
  const prompt = buildPrompt(questionSeed.country, mode);
  const choices = buildChoices(questionSeed.country, questionSeed.distractors, mode);

  return {
    id: `${questionSeed.country.id}:${mode}:${Date.now()}`,
    mode,
    country: questionSeed.country,
    optionCountries: [questionSeed.country, ...questionSeed.distractors],
    regionLabel: buildRegionLabel(mode, questionSeed),
    prompt,
    helper: factConfig.helper,
    correctAnswer: factConfig.displayAnswer(questionSeed.country),
    choices,
    visual: buildVisual(questionSeed.country, mode),
    answered: false
  };
}

function buildRegionLabel(mode, questionSeed) {
  if (mode !== "most_populous_country") {
    return questionSeed.country.region;
  }

  const regions = [...new Set([questionSeed.country, ...questionSeed.distractors].map((country) => country.region))];
  return regions.length === 1 ? regions[0] : "Mixed continents";
}

function buildQuestionSeed(mode) {
  if (mode === "most_populous_country") {
    return buildMostPopulousCountryQuestion();
  }

  const country = scheduleNextCountry(mode);
  const distractors = pickDistractorCountries(country.id, mode, 3);
  return { country, distractors };
}

function buildMostPopulousCountryQuestion() {
  const countries = getFilteredCountries();
  const eligibleCorrect = countries.filter((country) => {
    const lowerPopulationCount = countries.filter((candidate) => candidate.population_millions < country.population_millions).length;
    return lowerPopulationCount >= 3;
  });

  if (eligibleCorrect.length) {
    const country = eligibleCorrect[Math.floor(Math.random() * eligibleCorrect.length)];
    const distractors = shuffle(countries.filter((candidate) => candidate.population_millions < country.population_millions)).slice(0, 3);
    return { country, distractors };
  }

  const sortedCountries = [...countries].sort((left, right) => right.population_millions - left.population_millions);
  return {
    country: sortedCountries[0],
    distractors: sortedCountries.slice(1, 4)
  };
}

function buildPrompt(country, mode) {
  switch (mode) {
    case "country_capital":
      return `What is the capital of ${country.name}?`;
    case "country_flag":
      return `Which flag belongs to ${country.name}?`;
    case "flag_country":
      return "Which country matches this flag?";
    case "country_largest_city":
      return `What is the most populous city in ${country.name}?`;
    case "country_population":
      return `What is the population of ${country.name}?`;
    case "most_populous_country":
      return "Which of these countries has the highest population?";
    case "shape_country":
      return "Which country matches this silhouette?";
    default:
      return "Choose the correct answer.";
  }
}

function buildVisual(country, mode) {
  if (mode === "flag_country") {
    return { type: "flag", value: country.flag };
  }
  if (mode === "shape_country") {
    return { type: "shape", value: country.shape_data };
  }
  if (mode === "most_populous_country") {
    return { type: "text", value: "Compare the countries below" };
  }
  if (mode === "country_population") {
    return { type: "text", value: country.name };
  }
  return { type: "text", value: country.name };
}

function buildChoices(country, distractorCountries, mode) {
  const allCountries = [country, ...distractorCountries];
  const uniqueChoices = allCountries.map((item) => ({
    value: String(factValueForMode(item, mode)),
    label: formatChoiceLabel(item, mode),
    className: mode === "country_flag" ? "flag-choice" : ""
  }));

  // TODO: Replace this simple duplicate cleanup with smarter distractor generation for large datasets.
  const deduped = [];
  const seen = new Set();
  uniqueChoices.forEach((choice) => {
    if (!seen.has(choice.value)) {
      seen.add(choice.value);
      deduped.push(choice);
    }
  });

  while (deduped.length < 4) {
    const fallback = appState.countries[Math.floor(Math.random() * appState.countries.length)];
    const value = String(factValueForMode(fallback, mode));
    if (!seen.has(value)) {
      seen.add(value);
      deduped.push({ value, label: formatChoiceLabel(fallback, mode), className: mode === "country_flag" ? "flag-choice" : "" });
    }
  }

  return shuffle(deduped).slice(0, 4);
}

function formatChoiceLabel(country, mode) {
  if (mode === "country_flag") {
    return country.flag;
  }
  if (mode === "country_population") {
    return formatPopulationMillions(country.population_millions);
  }
  return String(factValueForMode(country, mode));
}

function factValueForMode(country, mode) {
  switch (mode) {
    case "country_capital":
      return country.capital;
    case "country_flag":
      return country.flag;
    case "flag_country":
      return country.name;
    case "country_largest_city":
      return country.largest_city;
    case "country_population":
      return country.population_millions.toFixed(1);
    case "most_populous_country":
      return country.name;
    case "shape_country":
      return country.name;
    default:
      return country.name;
  }
}

function handleAnswer(inputValue, skipped = false) {
  const question = appState.quiz.currentQuestion;
  if (!question || question.answered) {
    return;
  }

  const isCorrect = !skipped && evaluateAnswer(question, inputValue);

  question.answered = true;
  appState.quiz.answered += 1;

  if (isCorrect) {
    appState.quiz.correct += 1;
    appState.quiz.currentStreak += 1;
    appState.quiz.bestStreak = Math.max(appState.quiz.bestStreak, appState.quiz.currentStreak);
    appState.quiz.score += question.mode === "shape_country" ? 140 : question.mode === "country_population" ? 130 : 120;
  } else {
    appState.quiz.currentStreak = 0;
    appState.quiz.score = Math.max(0, appState.quiz.score - (skipped ? 8 : 4));
  }

  const factId = factProgressId(question.country.id, question.mode);
  updateFactProgress(factId, isCorrect, skipped);
  trackPracticeDay();

  appState.quiz.responses.push({
    countryId: question.country.id,
    mode: question.mode,
    correct: isCorrect,
    skipped,
    timestamp: Date.now()
  });

  showFeedback(question, isCorrect, inputValue, skipped);
  saveProgress();
  renderHome();
  renderStats();
}

function showFeedback(question, isCorrect, inputValue, skipped) {
  const feedbackCard = elements["feedback-card"];
  feedbackCard.className = `feedback-card ${isCorrect ? "correct" : "incorrect"}`;
  elements["feedback-status"].textContent = isCorrect ? "Correct" : skipped ? "Skipped" : "Not quite";
  elements["feedback-copy"].textContent = isCorrect
    ? buildPositiveFeedback(question.mode)
    : `The correct answer was ${question.correctAnswer}.`;

  const country = question.country;
  if (question.mode === "most_populous_country") {
    const rankedCountries = [...(question.optionCountries || [country])].sort(
      (left, right) => right.population_millions - left.population_millions
    );
    elements["answer-recap"].innerHTML = `
      <strong>Population ranking</strong><br>
      ${rankedCountries
        .map(
          (optionCountry, index) =>
            `${index + 1}. ${optionCountry.flag} ${escapeHtml(optionCountry.name)}: ${formatPopulationMillions(optionCountry.population_millions)}`
        )
        .join("<br>")}
      ${inputValue && !isCorrect && !skipped ? `<br><br>Your answer: ${escapeHtml(String(inputValue))}` : ""}
    `;
  } else {
    elements["answer-recap"].innerHTML = `
      <strong>${country.flag} ${country.name}</strong><br>
      Capital: ${country.capital} · Largest city: ${country.largest_city} · Population: ${formatPopulationMillions(country.population_millions)}
      ${inputValue && !isCorrect && !skipped ? `<br>Your answer: ${escapeHtml(String(inputValue))}` : ""}
    `;
  }

  if (appState.settings.answerMode === "multiple") {
    [...elements["answer-choices"].querySelectorAll(".choice-button")].forEach((button) => {
      const value = button.dataset.choice;
      button.classList.add("disabled");
      if (isExactMatch(question.mode, value, question.correctAnswer)) {
        button.classList.add("correct");
      } else if (!isCorrect && isExactMatch(question.mode, value, String(inputValue))) {
        button.classList.add("incorrect");
      }
    });
  }

  elements["next-button"].classList.remove("hidden");
  elements["skip-button"].classList.add("hidden");
}

function buildPositiveFeedback(mode) {
  const messages = {
    country_capital: "Capital locked in.",
    country_flag: "Flag recognition upgraded.",
    flag_country: "Flag mastery rising.",
    country_largest_city: "City knowledge sharpened.",
    country_population: "Population estimate nailed.",
    most_populous_country: "Population ranking instincts sharpened.",
    shape_country: "Silhouette memory strengthened."
  };
  return messages[mode] || "Nice work.";
}

function finishSession() {
  if (!appState.quiz.active) {
    setActiveView("home");
    return;
  }

  const session = {
    id: `session-${Date.now()}`,
    timestamp: Date.now(),
    total: appState.quiz.answered,
    correct: appState.quiz.correct,
    score: appState.quiz.score,
    bestStreak: appState.quiz.bestStreak,
    responses: appState.quiz.responses
  };

  appState.progress.sessions.unshift(session);
  appState.progress.sessions = appState.progress.sessions.slice(0, 50);
  appState.quiz.active = false;
  saveProgress();
  renderSummary(session);
  setActiveView("summary");
}

function renderSummary(session) {
  const accuracy = session.total ? session.correct / session.total : 0;
  const factAccuracy = summarizeSessionFactAccuracy(session.responses);
  const analytics = computeAnalytics();

  elements["summary-score"].textContent = session.score;
  elements["summary-accuracy"].textContent = formatPercent(accuracy);
  elements["summary-streak"].textContent = session.bestStreak;
  elements["summary-answered"].textContent = session.total;
  fillMetricList(elements["summary-fact-accuracy"], factAccuracy);
  fillMetricList(elements["summary-weakest-countries"], analytics.weakestCountries);
  fillMetricList(elements["summary-weakest-facts"], analytics.weakestFactTypes);
  elements["summary-recommendation"].textContent = analytics.studyRecommendation;
}

function summarizeSessionFactAccuracy(responses) {
  const grouped = {};
  responses.forEach((response) => {
    grouped[response.mode] ||= { total: 0, correct: 0 };
    grouped[response.mode].total += 1;
    if (response.correct) {
      grouped[response.mode].correct += 1;
    }
  });
  return Object.entries(grouped).map(([mode, stats]) => ({
    title: FACT_TYPES[mode].label,
    subtitle: `${stats.correct}/${stats.total} correct`,
    value: formatPercent(stats.total ? stats.correct / stats.total : 0),
    progress: stats.total ? stats.correct / stats.total : 0
  }));
}

function renderStats() {
  const analytics = computeAnalytics();
  elements["stats-total-questions"].textContent = analytics.totalQuestions;
  elements["stats-overall-accuracy"].textContent = formatPercent(analytics.overallAccuracy);
  elements["stats-current-streak"].textContent = `${appState.progress.currentStreak} day${appState.progress.currentStreak === 1 ? "" : "s"}`;
  elements["stats-best-streak"].textContent = `${appState.progress.bestStreak} day${appState.progress.bestStreak === 1 ? "" : "s"}`;

  fillMetricList(elements["fact-accuracy-list"], analytics.factTypeAccuracy);
  fillMetricList(elements["mastery-distribution"], analytics.masteryDistribution);
  fillMetricList(elements["continent-mastery-list"], analytics.continentMastery);
  renderDailyChart(analytics.dailyPractice);
}

function renderSettings() {
  elements["setting-answer-mode"].value = appState.settings.answerMode;
  elements["setting-session-length"].value = String(appState.settings.sessionLength);
  elements["setting-continent-filter"].value = appState.settings.continentFilter;
  elements["setting-focus-weak"].checked = appState.settings.focusWeakAreas;

  elements["mode-checkboxes"].innerHTML = Object.values(FACT_TYPES)
    .filter((mode) => mode.id !== "mixed")
    .map(
      (mode) => `
        <label class="toggle">
          <input type="checkbox" data-mode-checkbox value="${mode.id}" ${appState.settings.enabledModes.includes(mode.id) ? "checked" : ""}>
          <span>${mode.label}</span>
        </label>
      `
    )
    .join("");
}

function fillMetricList(container, items) {
  if (!items.length) {
    container.innerHTML = `<p class="placeholder-copy">Not enough data yet. Play a short session to populate this panel.</p>`;
    return;
  }

  const template = document.getElementById("metric-row-template");
  container.innerHTML = "";

  items.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".metric-row-copy strong").textContent = item.title;
    node.querySelector(".metric-row-copy span").textContent = item.subtitle || "";
    node.querySelector(".metric-value").textContent = item.value;
    node.querySelector(".progress-fill").style.width = `${Math.max(0, Math.min(1, item.progress ?? 0)) * 100}%`;
    container.appendChild(node);
  });
}

function renderDailyChart(data) {
  const svg = elements["daily-practice-chart"];
  const width = 420;
  const height = 180;
  const max = Math.max(1, ...data.map((point) => point.count));
  const barWidth = Math.max(18, Math.floor((width - 40) / Math.max(1, data.length)) - 8);
  const startX = 22;

  svg.innerHTML = `
    <line x1="14" y1="150" x2="406" y2="150" stroke="currentColor" opacity="0.15"></line>
    ${data
      .map((point, index) => {
        const barHeight = (point.count / max) * 110;
        const x = startX + index * (barWidth + 8);
        const y = 150 - barHeight;
        return `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="8" fill="var(--accent)"></rect>
          <text x="${x + barWidth / 2}" y="168" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">${point.label}</text>
        `;
      })
      .join("")}
  `;
}

function computeAnalytics() {
  const factEntries = Object.entries(appState.progress.facts);
  const totalQuestions = factEntries.reduce((sum, [, stats]) => sum + stats.times_seen, 0);
  const totalCorrect = factEntries.reduce((sum, [, stats]) => sum + stats.times_correct, 0);
  const overallAccuracy = totalQuestions ? totalCorrect / totalQuestions : 0;
  const averageMastery =
    factEntries.length > 0 ? factEntries.reduce((sum, [, stats]) => sum + stats.mastery, 0) / factEntries.length : 0;

  const factTypeAccuracy = appState.settings.enabledModes.map((mode) => {
    const relevant = factEntries.filter(([id]) => id.endsWith(`:${mode}`));
    const seen = relevant.reduce((sum, [, stats]) => sum + stats.times_seen, 0);
    const correct = relevant.reduce((sum, [, stats]) => sum + stats.times_correct, 0);
    const accuracy = seen ? correct / seen : 0;
    return {
      title: FACT_TYPES[mode].label,
      subtitle: seen ? `${correct}/${seen} correct` : "No attempts yet",
      value: formatPercent(accuracy),
      progress: accuracy
    };
  });

  const continentMastery = [...new Set(appState.countries.map((country) => country.region))]
    .map((region) => {
      const countriesInRegion = appState.countries.filter((country) => country.region === region);
      const mastery =
        countriesInRegion.reduce((sum, country) => sum + getCountryMastery(country.id), 0) / Math.max(1, countriesInRegion.length);
      return {
        title: region,
        subtitle: `${countriesInRegion.length} countr${countriesInRegion.length === 1 ? "y" : "ies"}`,
        value: formatPercent(mastery),
        progress: mastery
      };
    })
    .sort((a, b) => b.progress - a.progress);

  const weakestCountries = appState.countries
    .map((country) => ({
      title: `${country.flag} ${country.name}`,
      subtitle: country.region,
      value: formatPercent(getCountryMastery(country.id)),
      progress: getCountryMastery(country.id)
    }))
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 10);

  const weakestFactTypes = [...factTypeAccuracy].sort((a, b) => a.progress - b.progress).slice(0, 6);

  const masteryBuckets = { beginner: 0, intermediate: 0, mastered: 0 };
  factEntries.forEach(([, stats]) => {
    if (stats.mastery >= 0.8) {
      masteryBuckets.mastered += 1;
    } else if (stats.mastery >= 0.45) {
      masteryBuckets.intermediate += 1;
    } else {
      masteryBuckets.beginner += 1;
    }
  });

  const masteryDistribution = [
    {
      title: "Beginner",
      subtitle: "Mastery below 45%",
      value: String(masteryBuckets.beginner),
      progress: factEntries.length ? masteryBuckets.beginner / factEntries.length : 0
    },
    {
      title: "Intermediate",
      subtitle: "Mastery 45% to 79%",
      value: String(masteryBuckets.intermediate),
      progress: factEntries.length ? masteryBuckets.intermediate / factEntries.length : 0
    },
    {
      title: "Mastered",
      subtitle: "Mastery 80%+",
      value: String(masteryBuckets.mastered),
      progress: factEntries.length ? masteryBuckets.mastered / factEntries.length : 0
    }
  ];

  const dailyPractice = buildDailyPracticeSeries();
  const recommendedMode = weakestFactTypes[0]?.title || FACT_TYPES.country_capital.label;
  const studyRecommendation = weakestCountries[0]
    ? `Spend a few minutes in Study Mode on ${weakestCountries[0].title}, then practice ${recommendedMode.toLowerCase()}.`
    : "Start with a mixed session to collect baseline data and unlock recommendations.";

  return {
    totalQuestions,
    overallAccuracy,
    averageMastery,
    factTypeAccuracy,
    continentMastery,
    weakestCountries,
    weakestFactTypes,
    masteryDistribution,
    dailyPractice,
    recommendedModeLabel: recommendedMode,
    studyRecommendation
  };
}

function formatFactMetric(id, stats) {
  const [countryId, mode] = id.split(":");
  const country = appState.countryMap.get(countryId);
  return {
    title: `${country?.flag || ""} ${country?.name || countryId} · ${FACT_TYPES[mode]?.label || mode}`,
    subtitle: `${stats.times_correct}/${stats.times_seen} correct · ease ${(stats.ease * 100).toFixed(0)}%`,
    value: formatPercent(stats.mastery),
    progress: stats.mastery
  };
}

function formatPopulationMillions(value) {
  if (value < 0.05) {
    return "<0.1M";
  }
  return `${value.toFixed(1)}M`;
}

function buildDailyPracticeSeries() {
  const points = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const key = date.toISOString().slice(0, 10);
    points.push({
      label: key.slice(5),
      count: appState.progress.dailyCounts[key] || 0
    });
  }
  return points;
}

function pickFactMode() {
  const enabled = appState.settings.enabledModes.length ? appState.settings.enabledModes : DEFAULT_SETTINGS.enabledModes;
  const weaknessWeight = appState.settings.focusWeakAreas ? 0.7 : 0.35;
  const scoredModes = enabled.map((mode) => {
    const relevant = Object.entries(appState.progress.facts).filter(([id]) => id.endsWith(`:${mode}`));
    const avgMastery =
      relevant.length > 0 ? relevant.reduce((sum, [, stats]) => sum + stats.mastery, 0) / relevant.length : 0;
    const weight = Math.max(0.15, 1 - avgMastery * weaknessWeight + Math.random() * 0.15);
    return { mode, weight };
  });
  return weightedRandom(scoredModes);
}

function scheduleNextCountry(mode) {
  const now = Date.now();
  const candidates = getFilteredCountries().map((country) => {
    const progress = getFactProgress(factProgressId(country.id, mode));
    const dueBoost = progress.next_due <= now ? 1 : Math.max(0.2, 1 - (progress.next_due - now) / (1000 * 60 * 60 * 24 * 7));
    const weakBoost = appState.settings.focusWeakAreas ? 1.3 - progress.mastery : 0.7;
    const recentPenalty = progress.last_seen ? Math.min(0.6, (now - progress.last_seen) / (1000 * 60 * 10)) : 0.9;
    const noise = 0.15 + Math.random() * 0.25;
    return {
      country,
      weight: Math.max(0.05, dueBoost + weakBoost + recentPenalty + noise)
    };
  });

  return weightedRandom(candidates);
}

function pickDistractorCountries(correctCountryId, mode, count) {
  const countries = getFilteredCountries().filter((country) => country.id !== correctCountryId);
  const shuffled = shuffle([...countries]);
  return shuffled.slice(0, count);
}

function updateFactProgress(factId, correct, skipped) {
  const progress = getFactProgress(factId);
  const now = Date.now();

  progress.times_seen += 1;
  progress.last_seen = now;

  if (correct) {
    progress.times_correct += 1;
    progress.current_streak += 1;
    progress.ease = clamp(progress.ease + 0.08, 0.2, 0.98);
  } else {
    progress.times_incorrect += 1;
    progress.current_streak = 0;
    progress.ease = clamp(progress.ease - (skipped ? 0.05 : 0.09), 0.15, 0.95);
  }

  const accuracy = progress.times_seen ? progress.times_correct / progress.times_seen : 0;
  const streakBonus = Math.min(0.2, progress.current_streak * 0.04);
  progress.mastery = clamp(accuracy * 0.65 + progress.ease * 0.25 + streakBonus, 0, 1);

  const delayHours = correct
    ? Math.max(6, Math.round(12 + progress.mastery * 96 + progress.current_streak * 8))
    : skipped
      ? 2
      : 1;
  progress.next_due = now + delayHours * 60 * 60 * 1000;
}

function getFactProgress(factId) {
  appState.progress.facts[factId] ||= DEFAULT_FACT_PROGRESS();
  return appState.progress.facts[factId];
}

function getCountryMastery(countryId) {
  const scores = appState.settings.enabledModes.map((mode) => getFactProgress(factProgressId(countryId, mode)).mastery);
  return scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
}

function ensureProgressShape() {
  appState.countries.forEach((country) => {
    Object.keys(FACT_TYPES)
      .filter((mode) => mode !== "mixed")
      .forEach((mode) => {
        getFactProgress(factProgressId(country.id, mode));
      });
  });
}

function trackPracticeDay() {
  const today = new Date().toISOString().slice(0, 10);
  appState.progress.dailyCounts[today] = (appState.progress.dailyCounts[today] || 0) + 1;

  if (appState.progress.lastPracticeDate === today) {
    return;
  }

  if (appState.progress.lastPracticeDate) {
    const previous = new Date(appState.progress.lastPracticeDate);
    const current = new Date(today);
    const diffDays = Math.round((current - previous) / (1000 * 60 * 60 * 24));
    appState.progress.currentStreak = diffDays === 1 ? appState.progress.currentStreak + 1 : 1;
  } else {
    appState.progress.currentStreak = 1;
  }

  appState.progress.bestStreak = Math.max(appState.progress.bestStreak, appState.progress.currentStreak);
  appState.progress.lastPracticeDate = today;
  unlockAchievements();
}

function unlockAchievements() {
  const analytics = computeAnalytics();
  const achievements = new Set(appState.progress.achievements || []);
  if (analytics.totalQuestions >= 25) {
    achievements.add("curious-cartographer");
  }
  if (analytics.averageMastery >= 0.65) {
    achievements.add("atlas-apprentice");
  }
  if (appState.progress.currentStreak >= 5) {
    achievements.add("streak-builder");
  }
  appState.progress.achievements = [...achievements];
}

function getFilteredCountries() {
  const region = appState.settings.continentFilter;
  if (!region || region === "All") {
    return appState.countries;
  }
  return appState.countries.filter((country) => country.region === region);
}

function resetProgress() {
  const confirmed = window.confirm("Reset all saved progress for Atlas Academy on this browser?");
  if (!confirmed) {
    return;
  }

  appState.progress = {
    facts: {},
    sessions: [],
    dailyCounts: {},
    currentStreak: 0,
    bestStreak: 0,
    lastPracticeDate: null,
    achievements: []
  };
  ensureProgressShape();
  saveProgress();
  renderAll();
  setActiveView("home");
}

function exportProgress() {
  const payload = {
    progress: appState.progress,
    settings: appState.settings,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "atlas-academy-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importProgress(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (data.progress && data.settings) {
        appState.progress = data.progress;
        appState.settings = { ...DEFAULT_SETTINGS, ...data.settings };
        ensureProgressShape();
        saveProgress();
        saveSettings();
        renderAll();
        setActiveView("home");
      } else {
        alert("That file does not look like an Atlas Academy export.");
      }
    } catch (error) {
      alert("Import failed. Please choose a valid JSON export.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    appState.progress = {
      ...appState.progress,
      ...parsed,
      facts: parsed.facts || {},
      sessions: parsed.sessions || [],
      dailyCounts: parsed.dailyCounts || {}
    };
  } catch (error) {
    console.warn("Progress load failed", error);
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.progress));
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return;
    }
    appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (error) {
    console.warn("Settings load failed", error);
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(appState.settings));
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const darkMode = saved ? saved === "dark" : appState.settings.darkMode;
  document.body.classList.toggle("dark", darkMode);
  elements["theme-toggle"].textContent = darkMode ? "Light Mode" : "Dark Mode";
}

function toggleTheme() {
  const darkMode = !document.body.classList.contains("dark");
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  elements["theme-toggle"].textContent = darkMode ? "Light Mode" : "Dark Mode";
}

async function registerPWA() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") {
    return;
  }

  try {
    swRegistration = await navigator.serviceWorker.register(SW_URL, { updateViaCache: "none" });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    if (swRegistration.waiting) {
      waitingServiceWorker = swRegistration.waiting;
      showUpdateBanner("A newer version of Atlas Academy is ready.");
    }

    swRegistration.addEventListener("updatefound", () => {
      const installing = swRegistration.installing;
      if (!installing) {
        return;
      }
      installing.addEventListener("statechange", () => {
        if (installing.state === "installed" && navigator.serviceWorker.controller) {
          waitingServiceWorker = swRegistration.waiting || installing;
          showUpdateBanner("Atlas Academy has fresh content available.");
        }
      });
    });

    await swRegistration.update();
  } catch (error) {
    console.warn("PWA registration failed", error);
  }
}

function showUpdateBanner(message) {
  elements["update-copy"].textContent = message;
  elements["update-banner"].classList.remove("hidden");
}

function dismissUpdateBanner() {
  elements["update-banner"].classList.add("hidden");
}

function applyPendingUpdate() {
  if (waitingServiceWorker) {
    waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    return;
  }
  window.location.reload();
}

function factProgressId(countryId, mode) {
  return `${countryId}:${mode}`;
}

function setRingProgress(ratio) {
  const circumference = 2 * Math.PI * 48;
  const offset = circumference * (1 - ratio);
  elements["quiz-ring"].style.strokeDashoffset = String(offset);
  elements["quiz-ring-label"].textContent = `${Math.round(ratio * 100)}%`;
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s.]/g, "")
    .replace(/\s+/g, " ");
}

function evaluateAnswer(question, inputValue) {
  if (question.mode === "country_population") {
    if (appState.settings.answerMode === "multiple") {
      return isExactMatch(question.mode, inputValue, question.country.population_millions.toFixed(1));
    }
    return isPopulationAnswerCorrect(inputValue, question.country.population_millions);
  }

  if (question.mode === "most_populous_country") {
    return isExactMatch(question.mode, inputValue, question.country.name);
  }

  if (isExactMatch(question.mode, inputValue, question.correctAnswer)) {
    return true;
  }

  return matchesCountryAlias(question, inputValue);
}

function isExactMatch(mode, left, right) {
  if (mode === "country_flag") {
    return String(left) === String(right);
  }
  return normalizeAnswer(left) === normalizeAnswer(right);
}

function matchesCountryAlias(question, inputValue) {
  if (!inputValue) {
    return false;
  }
  if (question.mode !== "flag_country" && question.mode !== "shape_country") {
    return false;
  }
  const aliases = question.country.aliases || [];
  const normalized = normalizeAnswer(inputValue);
  return aliases.some((alias) => normalizeAnswer(alias) === normalized);
}

function isPopulationAnswerCorrect(inputValue, actualPopulation) {
  const parsed = Number.parseFloat(String(inputValue).replace(/[^\d.]/g, ""));
  if (Number.isNaN(parsed)) {
    return false;
  }
  return Math.abs(parsed - actualPopulation) <= Math.max(3, actualPopulation * 0.03);
}

function weightedRandom(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let threshold = Math.random() * total;
  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) {
      return item.country || item.mode;
    }
  }
  const last = items[items.length - 1];
  return last.country || last.mode;
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeAttribute(value) {
  return String(value).replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
