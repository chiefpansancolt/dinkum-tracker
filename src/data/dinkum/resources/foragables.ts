import { Foragable } from "@/types";

export const foragables: Foragable[] = [
  {
    id: "apple",
    name: "Apple",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
    source: ["Apple Tree"],
    locations: ["Pine Forests"],
    baseSellPrice: 107,
    buffs: {
      length: 1,
      healthRegenRate: 1,
    },
  },
  {
    id: "banana",
    name: "Banana",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
    source: ["Banana Tree"],
    locations: ["Tropics"],
    buyPrice: 496,
    baseSellPrice: 248,
    buffs: {
      length: 1,
      staminaRegenRate: 1,
    },
  },
  {
    id: "bee_hive",
    name: "Bee Hive",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Bee_Hive.png",
    source: ["Gum Trees", "Blackwood Trees", "Coral Acacia Trees"],
    baseSellPrice: 8000,
  },
  {
    id: "bottle_brush",
    name: "Bottle Brush",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e3/Inv_Bottle_Brush_Flower.png",
    source: ["Bottle Brush Bush"],
    locations: ["Pine Forests"],
    baseSellPrice: 245,
  },
  {
    id: "bottle_of_clouds",
    name: "Bottle of Clouds",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Bottle_of_Clouds.png",
    locations: ["Undergrove"],
    baseSellPrice: 30250,
  },
  {
    id: "bottle_tree_wood",
    name: "Bottle Tree Wood",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Inv_Bottle_Tree_Wood.png",
    source: ["Bottle Tree"],
    locations: ["Plains"],
    baseSellPrice: 280,
  },
  {
    id: "buccinidae_shell",
    name: "Buccinidae Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Buccinidae_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 10,
  },
  {
    id: "bush_lime",
    name: "Bush Lime",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
    source: ["Bush Lime Tree"],
    locations: ["Bushlands", "Billabongs"],
    buyPrice: 180,
    baseSellPrice: 90,
    buffs: {
      length: 1,
      healthRegenRate: 1,
      staminaRegenRate: 0.6,
    },
  },
  {
    id: "cactus_fig",
    name: "Cactus Fig",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Cactus_Figs.png",
    source: ["Pickly Pears"],
    locations: ["Desert"],
    baseSellPrice: 100,
    buffs: {
      length: 0.5,
      staminaRegenRate: 0.2,
    },
  },
  {
    id: "cassidae_shell",
    name: "Cassidae Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Cassidae_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 7,
  },
  {
    id: "cherry",
    name: "Cherry",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Cherries.png",
    source: ["Cherry Tree"],
    baseSellPrice: 117,
    buffs: {
      length: 1,
      healthRegenRate: 1,
    },
  },
  {
    id: "coconut",
    name: "Coconut",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
    source: ["Coconut Trees"],
    locations: ["Tropics"],
    baseSellPrice: 261,
  },
  {
    id: "field_mushroom",
    name: "Field Mushroom",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Field_Mushroom.png",
    source: ["Grows under Trees"],
    baseSellPrice: 250,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: 3,
    },
  },
  {
    id: "fish_roe",
    name: "Fish Roe",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Fish_Roe.png",
    source: ["Fish Pond"],
    baseSellPrice: 0,
  },
  {
    id: "glowing_mushroom",
    name: "Glowing Mushroom",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
    source: ["Deep Mines"],
    baseSellPrice: 35,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: -1,
    },
  },
  {
    id: "gum_log",
    name: "Gum Log",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
    source: ["Gum Trees"],
    locations: ["Bushlands", "Plains"],
    baseSellPrice: 100,
  },
  {
    id: "hard_wood_log",
    name: "Hard Wood Log",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
    source: ["Blackwood Trees", "Pine Trees"],
    locations: ["Bushlands", "Pine Forests"],
    baseSellPrice: 175,
  },
  {
    id: "honey",
    name: "Honey",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Honey.png",
    source: ["Bee Hive", "Bee House"],
    baseSellPrice: 3100,
    buffs: {
      length: 8,
      staminaRegenRate: 5,
      staminaMax: 15,
    },
  },
  {
    id: "mangrove_stick",
    name: "Mangrove Stick",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
    source: ["Mangrove Trees"],
    locations: ["Mangroves"],
    baseSellPrice: 90,
  },
  {
    id: "milk_cap",
    name: "Milk Cap",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Milk_Cap.png",
    source: ["Grows under Trees"],
    baseSellPrice: 250,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: 3,
    },
  },
  {
    id: "nautilus_shell",
    name: "Nautilus Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d8/Inv_Nautilus_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 20,
  },
  {
    id: "old_sign",
    name: "Old Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/28/Inv_Old_Sign.png",
    locations: ["Bushlands"],
    baseSellPrice: 10480,
  },
  {
    id: "palm_wood",
    name: "Palm Wood",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
    source: ["Palm Trees"],
    locations: ["Bushlands", "Plains"],
    baseSellPrice: 150,
  },
  {
    id: "quandong",
    name: "Quandong",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Quandong.png",
    source: ["Quandong Tree"],
    baseSellPrice: 110,
    buffs: {
      length: 1,
      healthRegenRate: 1,
      staminaRegenRate: 0.2,
    },
  },
  {
    id: "red_roundhead",
    name: "Red Roundhead",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d1/Inv_Red_Roundhead.png",
    source: ["Grows under Trees"],
    baseSellPrice: 250,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: 3,
    },
  },
  {
    id: "red_seaweed",
    name: "Red Seaweed",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Red_Seaweed.png",
    locations: ["Island Reef"],
    baseSellPrice: 10,
  },
  {
    id: "sand_dollar",
    name: "Sand Dollar",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Sand_Dollar.png",
    locations: ["Beach"],
    baseSellPrice: 10,
  },
  {
    id: "scallop_shell",
    name: "Scallop Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Scallop_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 5,
  },
  {
    id: "seaweed",
    name: "Seaweed",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
    locations: ["Ocean"],
    baseSellPrice: 10,
  },
  {
    id: "slippery_jack",
    name: "Slippery Jack",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Slippery_Jack.png",
    source: ["Grows under Trees"],
    baseSellPrice: 250,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: 3,
    },
  },
  {
    id: "snag",
    name: "Snag",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Snag.png",
    source: ["Island Day", "Band Stand"],
    baseSellPrice: 1612,
    buffs: {
      length: 60,
      healthRegenRate: 5,
      healthMax: 50,
      staminaRegenRate: 10,
      staminaMax: 50,
      experienceLevel: 3,
    },
  },
  {
    id: "spinifex_tuft",
    name: "Spinifex Tuft",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
    locations: ["Tropics", "Desert"],
    baseSellPrice: 10,
  },
  {
    id: "syrinx_shell",
    name: "Syrinx Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Syrinx_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 80,
  },
  {
    id: "tonnidae_shell",
    name: "Tonnidae Shell",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6e/Inv_Tonnidae_Shell.png",
    locations: ["Beach"],
    baseSellPrice: 6,
  },
  {
    id: "vine",
    name: "Vine",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
    source: ["Undergrove"],
    baseSellPrice: 25,
  },
  {
    id: "yellow_morel",
    name: "Yellow Morel",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Yellow_Morel.png",
    source: ["Grows under Trees"],
    baseSellPrice: 250,
    buffs: {
      length: 0.5,
      healthRegenRate: 2,
      staminaRegenRate: 3,
    },
  },
  {
    id: "yellow_wattle_flower",
    name: "Yellow Wattle Flower",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Yellow_Wattle_Flower.png",
    source: ["Yellow Wattle Bush"],
    locations: ["Bushlands"],
    baseSellPrice: 145,
  },
];

export const getForagableById = (id: string): Foragable | undefined => {
  return foragables.find((item) => item.id === id);
};
