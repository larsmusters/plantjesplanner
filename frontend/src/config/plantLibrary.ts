import { Colours } from '@/types'
import type { Plant } from '@/types'

const LIBRARY_PLANT_BASE = {
  color: Colours.black,
  info: 'No information available',
  nameLatin: 'No scientific name available',
  location: { x: 0, y: 0 }
}

export const plantLibrary: Plant[] = [
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Default',
    iconId: ['bellis_perennis.png'],
    iconScale: [1],
    radius: [150],
    colour: [Colours.blue],
    height: [50]
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Korenbloem',
    nameLatin: 'Centaureau cyanus',
    iconId: ['centaurea_cyanus.png'],
    iconScale: [3],
    radius: [100],
    colour: [Colours.green],
    height: [20]
  }
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Groot kaasjeskruid',
  //   nameLatin: 'Malva sylvestris',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.violetFlower, spriteId: 'malva_sylvestris.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Hortensia',
  //   nameLatin: 'Hydrangea',
  //   info: 'Hortensia is een geslacht uit de hortensiafamilie. Het gaat vooral om groenblijvende en bladverliezende struiken en een enkele boom. Bij elkaar gaat het om bijna honderd soorten die groeien in Amerika en in China en Japan.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'hydrangea.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Kleine maagdenpalm',
  //   nameLatin: 'vinca minor',
  //   info: 'De kleine maagdenpalm is een van de twee maagdenpalmsoorten die in België en Nederland voorkomen. De soort komt van oorsprong uit het Middellandse Zeegebied. In de Nederlandse natuurgebieden is de plant vrij zeldzaam maar ontsnapt veel uit tuinen of verspreidt zich via tuinafval. Hij komt in België algemeen voor. ',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'vinca_minor.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Lampenpoetsersgras',
  //   nameLatin: 'Cenchrus',
  //   info: 'Lampenpoetsergras is een geslacht uit de grassenfamilie. De soorten komen voor in Azië, Afrika, Australië, Amerika en talrijke Oceanische eilanden.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'cenchrus.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Lavendel',
  //   nameLatin: 'Lavandula',
  //   info: 'Lavendel is een geslacht van dwergstruiken uit de lipbloemenfamilie. Lavendelsoorten worden aangeplant in tuinen omwille van de paarse kleur en de geur van de bloemen. De dwergstruiken worden niet hoger dan een meter en niet breder dan een halve meter.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'lavandula.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Buxus',
  //   nameLatin: 'Buxus',
  //   info: 'Buxus is een geslacht van planten uit de buxusfamilie. De planten kunnen makkelijk gesnoeid worden en of zeer laag gehouden worden, of juist hoog opgroeien en in een bijzondere vorm gesnoeid worden. Buxus staat ook bekend onder de namen "buksboom", "bosseboom" en "palmboompje". Soms wordt de naam "palm" gebruikt.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'buxus.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Portugese laurierskers',
  //   nameLatin: 'Prunus lusitanica',
  //   info: 'Prunus lusitanica, de Portugese laurierkers of Portugese laurier, is een soort van bloeiende plant in de rozenfamilie Rosaceae, inheems in het zuidwesten van Frankrijk, Spanje, Portugal, Marokko en Macaronesië. De splitsing tussen de twee ondersoorten is gedateerd rond het Plioceen.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'prunus_lusitanica.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Ijzerhard',
  //   nameLatin: 'Verbena officinalis',
  //   info: 'IJzerhard is een overblijvende of soms eenjarige plant uit de ijzerhardfamilie.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'verbena_officinalis.png', spriteScale: 4 },
  //   fruit: []
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Viooltjes',
  //   nameLatin: 'Viola',
  //   info: 'Viooltje is een geslacht uit de viooltjesfamilie. Het geslacht kent circa vierhonderd soorten die voorkomen in gematigde streken. De meeste soorten worden op vochtige en iets beschaduwde plaatsen aangetroffen.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'viola.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Geranium',
  //   nameLatin: 'Geranium',
  //   info: 'Ooievaarsbek is een geslacht van planten uit de ooievaarsbekfamilie. De naam is afgeleid van het Griekse géranos, wat kraanvogel betekent. De volksnaam is echter ooievaarsbek, wat tevens de vertaling is van Pelargonium.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'geranium.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Spaanse margriet',
  //   nameLatin: 'Dimorphotheca ecklonis',
  //   info: 'De Spaanse margriet is een uit Zuid-Afrika afkomstige plant, die in Nederland als eenjarige tuinplant wordt verkocht. Het geslacht Osteospermum omvat meer soorten en behoort tot de composietenfamilie. Op de Zuid-Afrikaanse Rode Lijst wordt de soort als Dimorphotheca ecklonis vermeld in de categorie minste zorg.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'dimorphotheca_ecklonis.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Vlinderstruik',
  //   nameLatin: 'Buddleja davidii',
  //   info: 'De vlinderstruik is een plant uit de helmkruidfamilie. In Europa is de soort vooral als tuinplant in gebruik, maar de plant komt ook verwilderd voor. De struik kan enige maar geen zeer strenge vorst verdragen, bij circa -15 °C kan de plant sterven. De plant wordt vlinderstruik genoemd omdat hij vlinders aantrekt.',

  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'buddleja_davidii.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Klimop',
  //   nameLatin: 'Hedera helix',
  //   info: 'Klimop, ook wel eiloof, veil of ifte genoemd, is een groenblijvende, houtige liaan uit de klimopfamilie. De plant groeit op vochtige, voedselrijke grond langs muren en ook schoorstenen, en tegen bomen waaraan de plant zich met korte hechtwortels vastklampt.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'hedera_helix.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Toscaanse jasmijn',
  //   nameLatin: 'Trachelospermum jasminoides',
  //   info: 'Toscaanse jasmijn is een soort bloeiende plant in de familie Apocynaceae, afkomstig uit Oost- en Zuidoost-Azië. Veel voorkomende namen zijn Confederate jasmine, star jasmine, Confederate jessamine en Chinese star jessamine.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'trachelospermum_jasminoides.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Hartlelie',
  //   nameLatin: 'Hosta',
  //   info: 'Hosta of hartlelie is een geslacht van vijfentwintig tot veertig soorten uit de aspergefamilie. Het geslacht is inheems in Noordoost-Azië. De botanische naam wordt ook in het Nederlands gebruikt. In oudere literatuur komt men wel de botanische naam Funkia tegen; deze naam wordt niet veel meer gebruikt.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'hosta.png', spriteScale: 4 }
  // },
  // {
  //   ...LIBRARY_PLANT_BASE,
  //   name: 'Kerstroos',
  //   nameLatin: 'Helleborus niger',
  //   info: 'De kerstroos behoort tot het geslacht nieskruid, waartoe ook de lenteroos en stinkend nieskruid behoren. De kerstroos staat bekend als heksenkruid.',
  //   leaf: { colour: Colours.green, spriteId: 'leaf.png', spriteScale: 3.5 },
  //   flower: { colour: Colours.blue, spriteId: 'helleborus_niger.png', spriteScale: 4 }
  // }
]
