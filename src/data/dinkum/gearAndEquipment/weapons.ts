import { FilterArray, Weapon } from "@/types";

export const weapons: Weapon[] = [
  {
    id: "advanced_sling_shot",
    name: "Advanced Sling Shot",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Advanced_Sling_Shot.png",
    damage: 12,
    licenceLevel: null,
    source: ["Undergrove", "Island Reef"],
    baseSellPrice: 52500,
  },
  {
    id: "alpha_bat",
    name: "Alpha Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5f/Inv_Alpha_Bat.png",
    damage: 12,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Flaming Bat",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Flaming_Bat.png",
      },
      {
        count: 2,
        name: "Alpha Eye",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/4c/Inv_Alpha_Eye.png",
      },
      {
        count: 10,
        name: "Copper Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
      },
      {
        count: 10,
        name: "Iron Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
      },
      {
        count: 5,
        name: "Opal",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
      },
    ],
    buyPrice: 400000,
    baseSellPrice: 200000,
  },
  {
    id: "alpha_hammer",
    name: "Alpha Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Alpha_Hammer.png",
    damage: 22,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Iron Hammer",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Iron_Hammer.png",
      },
      {
        count: 2,
        name: "Alpha Antler",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Inv_Alpha_Antler.png",
      },
      {
        count: 10,
        name: "Copper Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
      },
      {
        count: 10,
        name: "Iron Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
      },
      {
        count: 5,
        name: "Opal",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
      },
    ],
    buyPrice: 400000,
    baseSellPrice: 200000,
  },
  {
    id: "alpha_spear",
    name: "Alpha Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8c/Inv_Alpha_Spear.png",
    damage: 14,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Iron Spear",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Iron_Spear.png",
      },
      {
        count: 2,
        name: "Alpha Scale",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/31/Inv_Alpha_Scale.png",
      },
      {
        count: 10,
        name: "Copper Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
      },
      {
        count: 10,
        name: "Iron Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
      },
      {
        count: 5,
        name: "Opal",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
      },
    ],
    buyPrice: 400000,
    baseSellPrice: 200000,
  },
  {
    id: "alpha_trident",
    name: "Alpha Trident",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Alpha_Trident.png",
    damage: 14,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Iron Spear",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Iron_Spear.png",
      },
      {
        count: 3,
        name: "Alpha Shark Tooth",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Alpha_Shark_Tooth.png",
      },
      {
        count: 10,
        name: "Copper Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
      },
      {
        count: 10,
        name: "Iron Ore",
        img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
      },
      {
        count: 5,
        name: "Opal",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
      },
    ],
    buyPrice: 400000,
    baseSellPrice: 200000,
  },
  {
    id: "balloon_sword",
    name: "Balloon Sword",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Balloon_Sword.png",
    damage: 15,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 3,
        name: "Tongue",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Tongue.png",
      },
      {
        count: 8,
        name: "Ruby Shard",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
      },
      {
        count: 4,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
    ],
    buyPrice: 200000,
    baseSellPrice: 100000,
  },
  {
    id: "basic_hammer",
    name: "Basic Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Basic_Hammer.png",
    damage: 8,
    licenceLevel: 1,
    source: ["Crafting Table"],
    baseSellPrice: 2062,
  },
  {
    id: "basic_spear",
    name: "Basic Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6e/Inv_Basic_Spear.png",
    damage: 4,
    licenceLevel: 1,
    source: ["Crafting Table"],
    baseSellPrice: 812,
  },
  {
    id: "bat_zapper",
    name: "Bat Zapper",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0f/Inv_Bat_Zapper.png",
    damage: null,
    licenceLevel: null,
    source: ["Ted Selly", "Recycling Bin"],
    inputs: [
      {
        count: 1,
        name: "Tongue",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/0d/Inv_Torch.png",
      },
      {
        count: 3,
        name: "Thunder Sac",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Thunder_Sac.png",
      },
      {
        count: 2,
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
      },
      {
        count: 4,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 10,
        name: "Glowing Mushroom",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
    ],
    buyPrice: 100000,
    baseSellPrice: 50000,
  },
  {
    id: "battle_broom",
    name: "Battle Broom",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Battle_Broom.png",
    damage: 14,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Spinifex Tuft",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
      },
      {
        count: 2,
        name: "Spinifex Resin",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
      },
      {
        count: 8,
        name: "Bottle Tree Wood",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Inv_Bottle_Tree_Wood.png",
      },
      {
        count: 5,
        name: "Mangrove Stick",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
    ],
    buyPrice: 250000,
    baseSellPrice: 125000,
  },
  {
    id: "battle_fish",
    name: "Battle Fish",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Battle_Fish.png",
    damage: 14,
    licenceLevel: null,
    source: ["Hunting Sharks"],
    baseSellPrice: 125000,
  },
  {
    id: "battle_shovel",
    name: "Battle Shovel",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/56/Inv_Battle_Shovel.png",
    damage: 14,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Shovel",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Shovel.png",
      },
      {
        count: 2,
        name: "Spinifex Resin",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
      },
      {
        count: 8,
        name: "Crocodile Tooth",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/0b/Inv_Crocodile_Tooth.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
    ],
    buyPrice: 150000,
    baseSellPrice: 75000,
  },
  {
    id: "berkonium_wand",
    name: "Berkonium Wand",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8a/Inv_Berkonium_Wand.png",
    damage: 11,
    licenceLevel: null,
    source: ["Hot Hot Hot"],
    baseSellPrice: 10000,
  },
  {
    id: "big_fan_hand",
    name: "Big Fan Hand",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_Big_Fan_Hand.png",
    damage: 13,
    licenceLevel: null,
    source: ["Island Reef"],
    baseSellPrice: 75000,
  },
  {
    id: "blastoad",
    name: "Blastoad",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fb/Inv_Blastoad.png",
    damage: 5,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 4,
        name: "Toad Skin",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/24/Inv_Toad_Skin.png",
      },
      {
        count: 4,
        name: "Jelly",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a5/Inv_Jelly.png",
      },
      {
        count: 1,
        name: "Flame Sac",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Inv_Flame_Sac.png",
      },
      {
        count: 1,
        name: "Thunder Sac",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Thunder_Sac.png",
      },
      {
        count: 1,
        name: "Wooden Torch",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
      },
    ],
    buyPrice: 10000,
    baseSellPrice: 5000,
  },
  {
    id: "bone_bow",
    name: "Bone Bow",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/55/Inv_Bone_Bow.png",
    damage: 15,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 1,
        name: "Slingshot",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1c/Inv_Slingshot.png",
      },
      {
        count: 20,
        name: "Bone",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Bone.png",
      },
      {
        count: 2,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 2,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
    ],
    buyPrice: 240000,
    baseSellPrice: 120000,
  },
  {
    id: "candy_cane",
    name: "Candy Cane",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0f/Inv_Candy_Cane.png",
    damage: 7,
    licenceLevel: null,
    source: ["Jolly Sack", "Real life December"],
    baseSellPrice: 11025,
  },
  {
    id: "copper_hammer",
    name: "Copper Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Copper_Hammer.png",
    damage: 13,
    licenceLevel: 2,
    source: ["Crafting Table"],
    baseSellPrice: 3938,
  },
  {
    id: "copper_spear",
    name: "Copper Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Copper_Spear.png",
    damage: 7,
    licenceLevel: 2,
    source: ["Crafting Table"],
    baseSellPrice: 2781,
  },
  {
    id: "croc_teeth_bat",
    name: "Croc Teeth Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Croc_Teeth_Bat.png",
    damage: 6,
    licenceLevel: 2,
    source: ["Crafting Table"],
    baseSellPrice: 11025,
  },
  {
    id: "flame_spear",
    name: "Flame Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/df/Inv_Flame_Spear.png",
    damage: 14,
    licenceLevel: null,
    source: ["Hot Hot Hot"],
    baseSellPrice: 200000,
  },
  {
    id: "flaming_bat",
    name: "Flaming Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Flaming_Bat.png",
    damage: 8,
    licenceLevel: 3,
    source: ["Crafting Table"],
    baseSellPrice: 16275,
  },
  {
    id: "frying_pan",
    name: "Frying Pan",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/88/Inv_Frying_Pan.png",
    damage: 12,
    licenceLevel: null,
    source: ["Prize Box"],
    baseSellPrice: 12500,
  },
  {
    id: "ice_hammer",
    name: "Ice Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Ice_Hammer.png",
    damage: 20,
    licenceLevel: null,
    source: ["Ted Selly"],
    baseSellPrice: 200000,
  },
  {
    id: "iron_hammer",
    name: "Iron Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Iron_Hammer.png",
    damage: 18,
    licenceLevel: 3,
    source: ["Crafting Table"],
    baseSellPrice: 8125,
  },
  {
    id: "iron_spear",
    name: "Iron Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Iron_Spear.png",
    damage: 10,
    licenceLevel: 3,
    source: ["Crafting Table"],
    baseSellPrice: 5281,
  },
  {
    id: "plant_hammer",
    name: "Plant Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Plant_Hammer.png",
    damage: 20,
    licenceLevel: null,
    source: ["Undergrove"],
    baseSellPrice: 8125,
  },
  {
    id: "slingshot",
    name: "Slingshot",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1c/Inv_Slingshot.png",
    damage: 4,
    licenceLevel: null,
    source: ["Deep Mine", "Island Reef"],
    baseSellPrice: 3500,
  },
  {
    id: "star_sabre",
    name: "Star Sabre",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ac/Inv_Star_Sabre.png",
    damage: 20,
    licenceLevel: null,
    source: ["Ted Selly"],
    inputs: [
      {
        count: 3,
        name: "Meteorite Chunk",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Meteorite_Chunk.png",
      },
      {
        count: 1,
        name: "Perfect Ruby",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Perfect_Ruby.png",
      },
      {
        count: 1,
        name: "Perfect Emerald",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8b/Inv_Perfect_Emerald.png",
      },
      {
        count: 1,
        name: "Perfect Aquamarine",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Perfect_Aquamarine.png",
      },
      {
        count: 8,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 8,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 5,
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
      },
    ],
    buyPrice: 2000000,
    baseSellPrice: 1000000,
  },
  {
    id: "wooden_bat",
    name: "Wooden Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Wooden_Bat.png",
    damage: 3,
    licenceLevel: 1,
    source: ["Crafting Table"],
    baseSellPrice: 212,
  },
];

export const getWeaponBySource = (data: Weapon[], value: string): Weapon[] => {
  return data.filter((item) => item.source.includes(value));
};

export const getWeaponBySearchValue = (
  data: Weapon[],
  searchValue: string,
): Weapon[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueWeaponSources = (): FilterArray => {
  const sources = new Set<string>();

  weapons.forEach((item) => {
    if (item.source && item.source.length > 0) {
      item.source.forEach((src) => {
        sources.add(src);
      });
    }
  });

  return ["All", ...Array.from(sources).sort()];
};
