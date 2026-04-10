import { Animal } from "@/types";

export const animals: Animal[] = [
  {
    id: "bin_chook",
    name: "Bin Chook",
    img: "/images/animals/Bin_Chook.png",
    temperament: "Passive",
    habitat: ["Bushlands", "Desert", "Plains"],
    health: 5,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
    ],
    researchReward: 8400,
    type: "Wild Animal",
  },
  {
    id: "cockatoo",
    name: "Cockatoo",
    img: "/images/animals/Cockatoo.png",
    temperament: "Passive",
    habitat: ["Bushlands", "Desert", "Plains"],
    health: 5,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
      {
        name: "Bottle Tree Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Bottle_Tree_Seed.png",
      },
    ],
    researchReward: 4000,
    type: "Wild Animal",
  },
  {
    id: "magpie",
    name: "Magpie",
    img: "/images/animals/Magpie.png",
    temperament: "Passive",
    habitat: ["Plains"],
    health: 5,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
      {
        name: "Maggie Egg",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Maggie_Egg.png",
      },
    ],
    researchReward: 4000,
    type: "Wild Animal",
  },
  {
    id: "mu",
    name: "Mu",
    img: "/images/animals/Mu.png",
    temperament: "Passive",
    habitat: ["Plains"],
    health: 28,
    drops: [
      {
        name: "Bone",
        count: 3,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 3,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
    ],
    researchReward: 4000,
    type: "Wild Animal",
  },
  {
    id: "oyster",
    name: "Oyster",
    img: "/images/animals/Oyster.png",
    temperament: "Passive",
    habitat: ["Ocean"],
    drops: [
      {
        name: "Pearl",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Pearl.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "scrub_turkey",
    name: "Scrub Turkey",
    img: "/images/animals/Scrub_Turkey.png",
    temperament: "Passive",
    habitat: ["Tropics"],
    health: 10,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 2,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 2,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
    ],
    researchReward: 4200,
    type: "Wild Animal",
  },
  {
    id: "toad",
    name: "Toad",
    img: "/images/animals/Toad.png",
    temperament: "Passive",
    habitat: ["Only When Raining"],
    health: 1,
    drops: [
      {
        name: "Toad Skin",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Toad_Skin.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "white_jackaroo",
    name: "White Jackaroo",
    img: "/images/animals/White_Jackaroo.png",
    temperament: "Passive",
    habitat: ["Bushlands", "Pine Forest", "Plains"],
    drops: [
      {
        name: "Cherry",
        count: 3,
        img: "/images/resources/foragables/Inv_Cherries.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "diggo",
    name: "Diggo",
    img: "/images/animals/Diggo_Brown.png",
    temperament: "Neutral",
    habitat: ["Bushlands", "Desert", "Plains"],
    health: 25,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 4400,
    type: "Wild Animal",
  },
  {
    id: "frilly",
    name: "Frilly",
    img: "/images/animals/Frilly.png",
    temperament: "Neutral",
    habitat: ["Desert"],
    health: 60,
    drops: [
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Thunder Sac",
        count: 2,
        img: "/images/resources/animalProducts/Inv_Thunder_Sac.png",
      },
    ],
    researchReward: 8720,
    type: "Wild Animal",
  },
  {
    id: "jackaroo",
    name: "Jackaroo",
    img: "/images/animals/Jackaroo.png",
    temperament: "Neutral",
    habitat: ["Bushlands", "Desert"],
    health: 15,
    drops: [
      {
        name: "Raw Meat",
        count: 3,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 3,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Jackaroo Hood",
        count: 1,
        img: "/images/clothing/Inv_Jackaroo_Hood.png",
      },
    ],
    researchReward: 6400,
    type: "Wild Animal",
  },
  {
    id: "kinda",
    name: "Kinda",
    img: "/images/animals/Kidna.png",
    temperament: "Neutral",
    habitat: ["Desert"],
    health: 35,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 8400,
    type: "Wild Animal",
  },
  {
    id: "penguin",
    name: "Penguin",
    img: "/images/animals/Penguin.png",
    temperament: "Neutral",
    habitat: ["The south west island, only in Winter"],
    health: 35,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 8000,
    type: "Wild Animal",
    domesticable: true,
  },
  {
    id: "alpha_bush_devil",
    name: "Alpha Bush Devil",
    img: "/images/animals/Alpha_Bush_Devil.png",
    temperament: "Aggressive",
    habitat: ["Pine Forest"],
    health: 350,
    drops: [
      {
        name: "Raw Meat",
        count: 3,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
      {
        name: "Alpha Eye",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Alpha_Eye.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "alpha_croco",
    name: "Alpha Croco",
    img: "/images/animals/Alpha_Croco.png",
    temperament: "Aggressive",
    habitat: ["Billabong", "Rivers"],
    health: 200,
    drops: [
      {
        name: "Raw Meat",
        count: 3,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
      {
        name: "Alpha Scale",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Alpha_Scale.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "alpha_jackaroo",
    name: "Alpha Jackaroo",
    img: "/images/animals/Alpha_Jackaroo.png",
    temperament: "Aggressive",
    habitat: ["Bushlands"],
    health: 200,
    drops: [
      {
        name: "Raw Meat",
        count: 3,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
      {
        name: "Alpha Antler",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Alpha_Antler.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "alpha_shark",
    name: "Alpha Shark",
    img: "/images/animals/Alpha_Shark.png",
    temperament: "Aggressive",
    habitat: ["Island Reef"],
    health: 600,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
      {
        name: "Alpha Shark Tooth",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Alpha_Shark_Tooth.png",
      },
      {
        name: "Shark Egg",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Shark_Egg.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "blooming_frilly",
    name: "Blooming Frilly",
    img: "/images/animals/Blooming_Frilly.png",
    temperament: "Aggressive",
    habitat: ["Undergrove"],
    health: 60,
    drops: [
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Thunder Sac",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Thunder_Sac.png",
      },
      {
        name: "Tongue",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Tongue.png",
      },
    ],
    researchReward: 26160,
    type: "Wild Animal",
  },
  {
    id: "bush_devil",
    name: "Bush Devil",
    img: "/images/animals/Bush_Devil.png",
    temperament: "Aggressive",
    habitat: ["Deep Mine", "Pine Forest"],
    health: 77,
    drops: [
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
      {
        name: "Flame Sac",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Flame_Sac.png",
      },
    ],
    researchReward: 12000,
    type: "Wild Animal",
  },
  {
    id: "cave_bat",
    name: "Cave Bat",
    img: "/images/animals/Cave_Bat.png",
    temperament: "Aggressive",
    habitat: ["Deep Mine"],
    health: 2,
    drops: [
      {
        name: "Bat Wing",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bat_Wing.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "croco",
    name: "Croco",
    img: "/images/animals/Croco.png",
    temperament: "Aggressive",
    habitat: ["Billabong", "Mangroves", "Rivers"],
    health: 65,
    drops: [
      {
        name: "Croco Meat",
        count: 1,
        img: "/images/animals/Inv_Croco_Meat.png",
      },
      {
        name: "Crocobile Tooth",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Crocodile_Tooth.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 9600,
    type: "Wild Animal",
  },
  {
    id: "flame_slime",
    name: "Flame Slime",
    img: "/images/animals/Flame_Slime.png",
    temperament: "Aggressive",
    habitat: ["Hot Hot Hot"],
    health: 12,
    drops: [
      {
        name: "Flame Jelly",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Flame_Jelly.png",
      },
      {
        name: "Flame Jelly Hood",
        count: 1,
        img: "/images/clothing/Inv_Flame_Jelly_Hood.png",
      },
    ],
    researchReward: 20000,
    type: "Wild Animal",
  },
  {
    id: "glowing_croco",
    name: "Glowing Croco",
    img: "/images/animals/Glowing_Croco.png",
    temperament: "Aggressive",
    habitat: ["Deep Mine"],
    health: 65,
    drops: [
      {
        name: "Croco Meat",
        count: 1,
        img: "/images/animals/Inv_Croco_Meat.png",
      },
      {
        name: "Crocobile Tooth",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Crocodile_Tooth.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 9600,
    type: "Wild Animal",
  },
  {
    id: "grub",
    name: "Grub",
    img: "/images/animals/Grub.png",
    temperament: "Aggressive",
    habitat: ["Undergrove"],
    health: 12,
    drops: [
      {
        name: "Raw Grub Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Grub_Meat.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "jelly_fish",
    name: "Jelly Fish",
    img: "/images/animals/Jelly_Fish.png",
    temperament: "Aggressive",
    habitat: ["Ocean"],
    health: 1,
    drops: [
      {
        name: "Jelly",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Jelly.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "pincher_plant",
    name: "Pincher Plant",
    img: "/images/animals/Pincher_Plant.png",
    temperament: "Aggressive",
    habitat: ["Undergrove"],
    health: 50,
    drops: [
      {
        name: "Plant Hammer",
        count: 1,
        img: "/images/gearAndEquipment/weapons/Inv_Plant_Hammer.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "shark",
    name: "Shark",
    img: "/images/animals/Shark.png",
    temperament: "Aggressive",
    habitat: ["Ocean"],
    health: 50,
    drops: [
      {
        name: "Flake",
        count: 3,
        img: "/images/animals/Inv_Flake.png",
      },
      {
        name: "Battle Fish",
        count: 1,
        img: "/images/gearAndEquipment/weapons/Inv_Battle_Fish.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "wary_wu",
    name: "Wary Wu",
    img: "/images/animals/Wary_Mu.png",
    temperament: "Aggressive",
    habitat: ["Tropics"],
    health: 45,
    drops: [
      {
        name: "Raw Giant Drumstick",
        count: 2,
        img: "/images/animals/Inv_Raw_Giant_Drumstick.png",
      },
      {
        name: "Bone",
        count: 2,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 8400,
    type: "Wild Animal",
  },
  {
    id: "yobbolin",
    name: "Yobbolin",
    img: "/images/animals/Yobbolin.png",
    temperament: "Aggressive",
    habitat: ["Hot Hot Hot"],
    health: 60,
    drops: [
      {
        name: "Berkonium Wand",
        count: 1,
        img: "/images/gearAndEquipment/weapons/Inv_Berkonium_Wand.png",
      },
      {
        name: "Bush Devil Hood",
        count: 1,
        img: "/images/clothing/Inv_Bush_Devil_Hood.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "yobbolin_healer",
    name: "Yobbolin Healer",
    img: "/images/animals/Yobbolin_Healer.png",
    temperament: "Aggressive",
    habitat: ["Hot Hot Hot"],
    health: 40,
    drops: [
      {
        name: "Magic Tome",
        count: 1,
        img: "/images/gearAndEquipment/books/Inv_Magic_Tome.png",
      },
      {
        name: "Pincher Hood",
        count: 1,
        img: "/images/clothing/Inv_Pincher_Hood.png",
      },
    ],
    type: "Wild Animal",
  },
  {
    id: "chook_baby",
    name: "Chook Baby",
    img: "/images/animals/Baby_Chook.png",
    temperament: "Passive",
    health: 55,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
    ],
    buyPrice: 5000,
    baseSellPrice: 2500,
    maxSellPrice: 2500,
    source: "Irwin's Barn",
    type: "Farm Animal",
  },
  {
    id: "chook",
    name: "Chook",
    img: "/images/animals/Chicken_White.png",
    temperament: "Passive",
    health: 55,
    drops: [
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
    ],
    produces: [
      {
        name: "Chicken Egg",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Chicken_Egg.png",
      },
      {
        name: "Big Chicken Egg",
        count: 1,
        img: "/images/animals/Inv_Big_Chicken_Egg.png",
      },
    ],
    baseSellPrice: 2500,
    maxSellPrice: 17500,
    source: "Chook Baby",
    type: "Farm Animal",
  },
  {
    id: "pleep_puggle",
    name: "Pleep Puggle",
    img: "/images/animals/Pleep_Puggle.png",
    temperament: "Passive",
    health: 60,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    buyPrice: 25000,
    baseSellPrice: 12500,
    source: "Irwin's Barn",
    type: "Farm Animal",
  },
  {
    id: "pleep",
    name: "Pleep",
    img: "/images/animals/Pleep.png",
    temperament: "Passive",
    health: 60,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    produces: [
      {
        name: "Wool",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Wool.png",
      },
    ],
    baseSellPrice: 12500,
    maxSellPrice: 87500,
    source: "Pleep Puggle",
    type: "Farm Animal",
  },
  {
    id: "vombat_joey",
    name: "Vombat Joey",
    img: "/images/animals/Vombat_Joey.png",
    temperament: "Passive",
    health: 60,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    buyPrice: 15000,
    baseSellPrice: 7500,
    source: "Irwin's Barn",
    type: "Farm Animal",
  },
  {
    id: "vombat",
    name: "Vombat",
    img: "/images/animals/Vombat.png",
    temperament: "Passive",
    health: 150,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    produces: [
      {
        name: "Vombat Poo",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Vombat_Poo.png",
      },
      {
        name: "Milk",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Milk.png",
      },
      {
        name: "High Quality Milk",
        count: 1,
        img: "/images/resources/animalProducts/Inv_High_Quality_Milk.png",
      },
    ],
    baseSellPrice: 7500,
    maxSellPrice: 52500,
    source: "Vombat Joey",
    type: "Farm Animal",
  },
  {
    id: "doggo",
    name: "Doggo",
    img: "/images/animals/Pet_Doggo.png",
    temperament: "Neutral",
    health: 200,
    drops: [
      {
        name: "Doggo Collar",
        count: 1,
        img: "/images/gearAndEquipment/equipment/Inv_Doggo_Collar.png",
      },
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    source: "A Diggo tamed with a Doggo Collar",
    type: "Tammed Animal",
  },
  {
    id: "pet_mu",
    name: "Pet Mu",
    img: "/images/animals/Saddled_Mu.png",
    temperament: "Passive",
    health: 250,
    drops: [
      {
        name: "Mu Saddle",
        count: 1,
        img: "/images/gearAndEquipment/equipment/Inv_Mu_Saddle.png",
      },
      {
        name: "Raw Giant Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Giant_Drumstick.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    source: "A Mu tamed with a Mu Saddle",
    type: "Tammed Animal",
  },
  {
    id: "pet_wary_mu",
    name: "Pet Wary Mu",
    img: "/images/animals/Saddled_Wary_Mu.png",
    temperament: "Passive",
    health: 250,
    drops: [
      {
        name: "Mu Saddle",
        count: 1,
        img: "/images/gearAndEquipment/equipment/Inv_Mu_Saddle.png",
      },
      {
        name: "Raw Giant Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Giant_Drumstick.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    source: "A Wary Mu tamed with a Mu Saddle",
    type: "Tammed Animal",
  },
  {
    id: "wild_boaricoot",
    name: "Wild Boaricoot",
    img: "/images/animals/Boaricoot_Grey.png",
    temperament: "Neutral",
    habitat: ["Desert"],
    health: 0,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 24000,
    type: "Wild Animal",
    domesticable: true,
  },
  {
    id: "wild_plunk",
    name: "Wild Plunk",
    img: "/images/animals/Plunk.png",
    temperament: "Neutral",
    habitat: ["Southern Rivers"],
    health: 0,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 31200,
    type: "Wild Animal",
    domesticable: true,
  },
  {
    id: "wild_vombull",
    name: "Wild Vombull",
    img: "/images/animals/Vombull_Black_White.png",
    temperament: "Neutral",
    habitat: ["Plains"],
    health: 0,
    drops: [
      {
        name: "Raw Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Meat.png",
      },
      {
        name: "Raw Prime Meat",
        count: 1,
        img: "/images/animals/Inv_Raw_Prime_Meat.png",
      },
    ],
    type: "Wild Animal",
    domesticable: true,
  },
  {
    id: "wild_rooster",
    name: "Wild Rooster",
    img: "/images/animals/Rooster.png",
    temperament: "Passive",
    habitat: ["Tropics"],
    health: 0,
    drops: [
      {
        name: "Raw Drumstick",
        count: 1,
        img: "/images/animals/Inv_Raw_Drumstick.png",
      },
      {
        name: "Feather",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Feather.png",
      },
      {
        name: "Bone",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Bone.png",
      },
    ],
    researchReward: 22400,
    type: "Wild Animal",
    domesticable: true,
  },
  {
    id: "buttowcoot",
    name: "Buttowcoot",
    img: "/images/animals/Burrowcoot_White.png",
    temperament: "Passive",
    health: 0,
    drops: [],
    produces: [
      {
        name: "Worms",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Worms.png",
      },
      {
        name: "Native Bread",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Native_Bread.png",
      },
    ],
    buyPrice: 35000,
    type: "Farm Animal",
  },
  {
    id: "buttowcoot_joey",
    name: "Buttowcoot Joey",
    img: "/images/animals/Burrowcoot_Joey.png",
    temperament: "Passive",
    health: 0,
    drops: [],
    produces: [
      {
        name: "Worms",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Worms.png",
      },
      {
        name: "Native Bread",
        count: 1,
        img: "/images/resources/animalProducts/Inv_Native_Bread.png",
      },
    ],
    buyPrice: 35000,
    type: "Farm Animal",
  },
];

export const getAnimalByTemperament = (
  data: Animal[],
  value: string,
): Animal[] => {
  return data.filter((item) => item.temperament === value);
};

export const getAnimalByType = (data: Animal[], value: string): Animal[] => {
  return data.filter((item) => item.type === value);
};

export const getAnimalByHabitat = (data: Animal[], value: string): Animal[] => {
  return data.filter((item) => item.source?.includes(value));
};

export const getAnimalBySearchValue = (
  data: Animal[],
  searchValue: string,
): Animal[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueAnimalHabitat = () => {
  const habitats = new Set<string>();

  animals.forEach((animal) => {
    if (animal.habitat) {
      animal.habitat.forEach((habitat) => {
        habitats.add(habitat);
      });
    }
  });

  return ["All", ...Array.from(habitats).sort()];
};
