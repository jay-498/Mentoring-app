import React, { Component } from "react";
import Select from "react-select";

let apples = [
  "Adams Pearmain",
  "Admiral",
  "Aia Ilu",
  "Airlie Red Flesh (Newell-Kimzey red flesh, Aerlie's Red Flesh)",
  "Akane",
  "Åkerö",
  "Alkmene agm",
  "Allington Pippin",
  "Ambrosia",
  "Anna",
  "Annurca",
  "Antonovka",
  "Apollo",
  "Ariane",
  "Arkansas Black",
  "Arthur Turner agm",
  "Ashmead's Kernel agm",
  "Aurora Golden Gala",
  "Autumn Glory",
  "Bailey",
  "Baldwin",
  "Ballyfatten",
  "Bardsey Island Apple",
  "Beacon",
  "Beauty of Bath",
  "Belle de Boskoop agm",
  "Ben Davis",
  "Beverly Hills",
  "Birgit Bonnier",
  "Bismarck",
  "Blenheim Orange agm",
  "Bloody Ploughman",
  "Bottle Greening",
  "Braeburn",
  "Bramley (Bramley's Seedling) agm",
  "Bravo de Esmolfe",
  "Breedon Pippin",
  "Brina",
  "Byfleet Seedling",
  "Calville Blanc d'hiver",
  "Cameo",
  "Campanino",
  "Carolina Red June",
  "Carroll",
  "Carter's Blue",
  "Champion, Shampion or Sampion",
  "Catshead",
  "Charles Ross",
  "Chelmsford Wonder",
  "Chiver's Delight",
  "Claygate Pearmain agm",
  "Clivia",
  "Cornish Gilliflower",
  "Cortland",
  "Cosmic Crisp",
  "Court Pendu Plat",
  "Cox's Orange Pippin",
  "Cripps Pink ('Pink Lady')",
  "Crispin",
  "Crimson Delight",
  "Crimson Gold",
  "Criterion",
  "D'Arcy Spice",
  "Delblush",
  "Delcorf agm",
  "Delfloga",
  "Delflopion",
  "Delrouval",
  "Deltana",
  "Devonshire Quarreden",
  "Discovery agm",
  "Dorsett Golden",
  "Dougherty/Red Dougherty",
  "Duchess of Oldenburg",
  "Dudley Winter",
  "Dummellor's Seedling agm also known as Dumelow's Seedling",
  "Egle",
  "Early Victoria",
  "Edward VII agm",
  "Egremont Russet agm",
  "Ein Shemer",
  "Ellison's Orange agm",
  "Elstar agm",
  "Emneth Early agm",
  "Empire",
  "Enterprise",
  "Envy",
  "Epicure",
  "Esopus Spitzenburg",
  "Flamenco",
  "Falstaff agm",
  "Fiesta agm",
  "Fireside",
  "Florina",
  "Flower of Kent",
  "Fortune agm (Laxton's Fortune)",
  "Fuji",
  "Gala, Royal Gala agm",
  "Garden Royal",
  "Gascoyne's Scarlet",
];

let cheeses = [
  "Wagasi",
  "Areesh",
  "Baramily",
  "Domiati",
  "Halumi",
  "Istanboly",
  "Mish",
  "Rumi",
  "Ayibe",
  "Caravane cheese",
  "Chhana",
  "Chura kampo",
  "Chura loenpa",
  "Nguri",
  "Rubing",
  "Rushan",
  "Bandel",
  "Paneer",
  "Chhana",
  "Dahi Chhana",
  "Kalari",
  "Kalimpong cheese",
  "Dangke",
  "Sakura cheese",
  "Imsil",
  "Byaslag",
  "Flower of Rajya",
  "Chhurpi",
  "Kesong puti",
  "Paneer",
  "Djathë i bardhë",
  "Kaçkavall",
  "Djathë pice",
  "Gjizë",
  "Chechil",
  "Bachensteiner",
  "Bergkäse",
  "Brimsen",
  "Gelundener Käse",
  "Lüneberg cheese",
  "Montafoner Sauerkäse",
  "Mondseer",
  "Staazer",
  "Steirerkäse",
  "Tyrolean grey (Tiroler Graukäse)",
  "Brussels cheese",
  "Chimay cheeses",
  "Herve cheese",
  "Le Wavreumont",
  "Limburger cheese",
  "Maredsous cheese",
  "Passendale cheese",
  "Remoudou",
  "Rodoric",
  "Livno cheese",
  "Travnički (Vlašić) cheese",
  "Cherni Vit",
  "Kashkaval",
  "Sirene",
  "Paški sir",
  "Škripavac",
  "Tounjski",
  "Prgica",
  "Dimsi",
  "Akkawi",
  "Anari cheese",
  "Halloumi",
  "Kefalotyri",
  "Abertam cheese",
  "Olomoucké syrečky",
  "Danbo",
  "Danish Blue",
  "Esrom",
  "Fynbo",
  "Havarti",
  "Maribo",
  "Molbo",
  "Saga",
  "Samsø cheese",
  "Vesterhavsost",
  "Tybo",
  "Atleet",
  "Eesti Juust",
  "Kadaka juust",
  "Aura",
  "Lappi",
  "Leipäjuusto",
  "Oltermanni",
  "Raejuusto",
  "Sulguni",
  "Anthotyros",
  "Chloro",
  "Feta",
  "Graviera",
  "Kasseri",
  "Kefalograviera",
  "Kefalotyri",
  "Kopanisti",
  "Malaka",
  "Manouri",
];

let options = [
  {
    value: "62b80160bfb6bd8e5de8c7c5",
    label: "Guesstimates",
  },
  {
    value: "62b80172bfb6bd8e5de8c7c7",
    label: "Consulting Mock Interview",
  },
  {
    value: "62b8018cbfb6bd8e5de8c7c9",
    label: "Resume Building",
  },
  {
    value: "62b801b4bfb6bd8e5de8c7cb",
    label: "Interview Preparation",
  },
  {
    value: "62b801d7bfb6bd8e5de8c7cd",
    label: "Mentorship Session",
  },
  {
    value: "62b801e7bfb6bd8e5de8c7cf",
    label: "Case Prep",
  },
];

options = options.concat(apples.map((x) => "Apple - " + x));
options = options.concat(cheeses.map((x) => "Cheese - " + x));

function MakeOption(x) {
  return { value: x, label: x };
}

class Selectsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  handleInputChange = (value, e) => {
    if (e.action === "input-change") {
      this.setState({ value });
      console.log("value", value);
    }
  };
  render() {
    return (
      <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        onInputChange={this.handleInputChange}
        inputValue={this.state.value}
      />
    );
  }
}
export default Selectsearch;
