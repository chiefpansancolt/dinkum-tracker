import { NPC } from "@/types/dinkum";

export const npcs: NPC[] = [
  {
    id: "fletch",
    name: "Fletch",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c4/NPC_Fletch.png",
    occupation:
      "Main quest giver\nProvider of Licences and Deeds\nBase Tent, Town Hall",
    requirements: {
      visit: "In a way, the Player is Fletch's requirement.",
      moveIn: "N/A",
    },
    foodPreferences: {
      likes: "Bush Lime",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
      dislikes: "Croco Meat\nAny type of Meat products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/3/35/Inv_Croco_Meat.png",
    },
  },
  {
    id: "john",
    name: "John",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/59/NPC_John.png",
    occupation: "General Store\nJohn's Goods",
    requirements: {
      visit: "John will be unlocked via the introductory quests.",
      moveIn: "Spend > 15,000 Dinks\nRelationship > 1/4 heart (25% of 1 heart)",
    },
    foodPreferences: {
      likes: "Cooked Croco Meat",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Cooked_Croco_Meat.png",
      dislikes: "Potato\nAny type of Animal and Fruit products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
    },
  },
  {
    id: "theodore",
    name: "Theodore",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/98/NPC_Theodore.png",
    occupation: "Museum Curator\nMuseum",
    requirements: {
      visit: "-",
      moveIn: "Just talk to him.",
    },
    foodPreferences: {
      likes: "Cooked Cactus Fig",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Cooked_Cactus_Fig.png",
      dislikes: "Cactus Figs",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Cactus_Figs.png",
    },
  },
  {
    id: "clover",
    name: "Clover",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4c/NPC_Clover.png",
    occupation: "Tailor\nThreadspace",
    requirements: {
      visit: "-",
      moveIn: "Spend > 10,000 Dinks (shop only)\nRelationship > 1 heart",
    },
    foodPreferences: {
      likes: "Apple",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
      dislikes: "Cooked Drumstick\nAny type of Animal and Vegetables products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/9/98/Inv_Cooked_Drumstick.png",
    },
  },
  {
    id: "franklyn",
    name: "Franklyn",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4b/NPC_Franklyn.png",
    occupation:
      "Inventor\nFranklyn's Lab\nWill buy Shiny Discs for 6 times the value",
    requirements: {
      visit: "-",
      moveIn:
        "Spend > 190,000 Dinks (sold Shiny Discs included)\nRelationship > 3/4 heart (75% of 1 heart)",
    },
    foodPreferences: {
      likes: "Cooked Giant Drumstick",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Cooked_Giant_Drumstick.png",
      dislikes: "Bush Lime\nAny type of Vegetable products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
    },
  },
  {
    id: "irwin",
    name: "Irwin",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/65/NPC_Irwin.png",
    occupation: "Animal Handler\nIrwin's Barn",
    requirements: {
      visit: "Handling Licence",
      moveIn: "Spend > 25,000 Dinks\nRelationship > 1/2 heart (50% of 1 heart)",
    },
    foodPreferences: {
      likes: "Bananas",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
      dislikes: "Cooked Croco Meat\nAny type of Animal and Meat products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Cooked_Croco_Meat.png",
    },
  },
  {
    id: "melvin",
    name: "Melvin",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/09/NPC_Melvin.png",
    occupation: "Furniture\nMelvin Furniture",
    requirements: {
      visit: "House",
      moveIn: "Spend > 800 Dinks (shop only)\nRelationship > 1 heart",
    },
    foodPreferences: {
      likes: "Cooked Meat",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
      dislikes: "Chicken Egg\nAny type of Animal products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Chicken_Egg.png",
    },
  },
  {
    id: "milburn",
    name: "Milburn",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/NPC_Milburn.png",
    occupation: "Banker\nBank",
    requirements: {
      visit: "Will never visit",
      moveIn: "Bank",
    },
    foodPreferences: {
      likes: "High Quality Cheese",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
      dislikes: "Cheese\nAny type of Fruits products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Cheese.png",
    },
  },
  {
    id: "rayne",
    name: "Rayne",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/NPC_Rayne.png",
    occupation: "Agriculturist (gardener and farmer)\nRayne's Greenhouse",
    requirements: {
      visit: "Farming Licence",
      moveIn: "Spend > 18,000 Dinks\nRelationship > 1/2 heart (50% of 1 heart)",
    },
    foodPreferences: {
      likes: "Corn",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Corn.png",
      dislikes: "Pumpkin\nAny type of Animal and Meat products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
    },
  },
  {
    id: "sally",
    name: "Sally",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/09/NPC_Sally.png",
    occupation: "Hairstylist\nSally's Salon",
    requirements: {
      visit: "5 permanent residents on the island",
      moveIn:
        "Spend > 10,000 Dinks (equalling two haircuts/colour)\nRelationship > 2 1/4 hearts",
    },
    foodPreferences: {
      likes: "Glowing Mushroom",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
      dislikes: "Cabbage\nAny type of Animal products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/7/77/Inv_Cabbage.png",
    },
  },
  {
    id: "sheila",
    name: "Sheila",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/46/NPC_Sheila.png",
    occupation:
      'Tuckshop owner\nTuckerbox\nWill buy the "food of the day" for 2.5 times the value',
    requirements: {
      visit: "5 permanent residents on the island",
      moveIn: "Spend > 0 Dinks\nRelationship > 1 1/4 hearts",
    },
    foodPreferences: {
      likes: "Prime Roast",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/7/75/Inv_Prime_Roast.png",
      dislikes: "Cooked Blob Fish",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Cooked_Blob_Fish.png",
    },
  },
  {
    id: "ted_selly",
    name: "Ted Selly",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f1/NPC_Ted_Selly.png",
    occupation:
      'Wandering Hunter\nAnywhere on the map\nCan make some pretty powerful stuff\nWill buy certain "meat" for 2 times the value',
    requirements: {
      visit: "Hunting Licence Level 2",
      moveIn: "Doesn't move in, he is a special visitor",
    },
    foodPreferences: {
      likes: "Cooked Drumstick",
      likesImg:
        "https://static.wikia.nocookie.net/dinkum/images/9/98/Inv_Cooked_Drumstick.png",
      dislikes: "Kale\nAny type of Animal, Fruit and Vegetable products.",
      dislikesImg:
        "https://static.wikia.nocookie.net/dinkum/images/a/a0/Inv_Kale.png",
    },
  },
  {
    id: "jimmy",
    name: "Jimmy",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/NPC_Jimmy.png",
    occupation:
      "Businessman\nJimmy's Boat\nWill buy stacks of 50+ for 1.5 times the value",
    requirements: {
      visit:
        "Must be raining in the morning.\nAt least 1,000,000 Dinks in your Bank account.",
      moveIn: "Doesn't move in, he is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
  {
    id: "nick",
    name: "Nick",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/NPC_Nick.png",
    occupation: "Being Jolly\nBeach",
    requirements: {
      visit:
        "Hangs out on the beach on sunny days during December.\nJohn must be moved in.",
      moveIn: "Doesn't move in, he is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
  {
    id: "julia",
    name: "Julia",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/NPC_Julia.png",
    occupation:
      "Bug enthusiast, Bug Catching Comp organiser\nVisitors Site\nWill buy bugs for 2.5 times the value",
    requirements: {
      visit: "On the 15th of Spring and Autumn.\nMuseum built.",
      moveIn: "Doesn't move in, she is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
  {
    id: "max",
    name: "Max",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/NPC_Max.png",
    occupation:
      "Fish enthusiast, Fish Catching Comp organiser\nVisitors Site\nWill buy fish for 2.5 times the value",
    requirements: {
      visit: "On the 22nd of Summer and Winter.\nMuseum built.",
      moveIn: "Doesn't move in, he is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
  {
    id: "nancy",
    name: "Nancy",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9f/NPC_Nancy.png",
    occupation: "Airport",
    requirements: {
      visit: "Sunday",
      moveIn: "Doesn't move in, she is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
  {
    id: "townco_agent",
    name: "TownCo. Agent",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f0/NPC_TownCo._Agent.png",
    occupation: "Wanderer\nCan craft some Go-Go Town items",
    requirements: {
      visit:
        "Last Monday of the month if John has his shop built.\nAfter 10am when there is no visitor at the Visitors Site",
      moveIn: "Doesn't move in, he is a special visitor",
    },
    foodPreferences: {
      likes: "None",
      likesImg: "",
      dislikes: "None",
      dislikesImg: "",
    },
  },
];

export const getNPCById = (id: string): NPC | undefined => {
  return npcs.find((npc) => npc.id === id);
};
