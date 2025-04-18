import { Building } from "@/types/dinkum";

export const buildings: Building[] = [
  {
    id: "base_tent",
    buildingName: "Base Tent",
    deedName: "Base Tent Roll",
    size: "4x4",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/94/Inv_Base_Tent_Roll.png",
    npc: "Fletch",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/c/c4/NPC_Fletch.png",
    description:
      "Starter building. Obtain from Fletch after landing on the Island. Fletch appears at the Base Tent after it is placed/built.",
    buildTime: "Instant",
    deedPrice: 0,
    resources: [],
  },
  {
    id: "move_base_tent",
    buildingName: "Base Tent (Move)",
    deedName: "Base Tent Deed",
    size: "4x4",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Move_Base_Tent.png",
    npc: "Fletch",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/c/c4/NPC_Fletch.png",
    description:
      "This is used to move the Base Tent. This deed becomes available after the player has received the nails and crate recipes from Fletch.",
    buildTime: "Overnight",
    deedPrice: 25000,
    resources: [],
  },
  {
    id: "player_tent",
    buildingName: "Tent",
    deedName: "Tent Roll",
    size: "4x4",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Player_Tent.png",
    npc: "Player",
    npcImg: "https://static.wikia.nocookie.net/dinkum/images/0/0c/Player.png",
    description:
      "Starter building. Obtain from Fletch after the placing the Base Tent. It cannot be moved until it has been upgraded into a House.",
    buildTime: "Instant",
    deedPrice: 0,
    resources: [],
  },
  {
    id: "visitors_site",
    buildingName: "Visitors Site",
    deedName: "Visiting Site Deed",
    size: "6x6",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Visiting_Site_Deed.png",
    npc: "Various",
    npcImg: "",
    description: "Fletch's first quest. Temporary residents rotate here.",
    buildTime: "Instant",
    deedPrice: 0,
    resources: [],
  },
  {
    id: "town_hall",
    buildingName: "Town Hall",
    deedName: "Town Hall Upgrade",
    size: "6x6",
    img: "",
    npc: "Fletch",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/c/c4/NPC_Fletch.png",
    description:
      "Upgrading the Base Tent to the Town Hall requires 5 permanent residents. Talk to Fletch.",
    buildTime: "Overnight",
    deedPrice: 0,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 4,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 4,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 32,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "move_town_hall",
    buildingName: "Town Hall (Move)",
    deedName: "Town Hall Deed",
    size: "6x6",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a6/Inv_Move_Town_Hall.png",
    npc: "Fletch",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/c/c4/NPC_Fletch.png",
    description:
      "This is used to move the Town Hall. This deed becomes available after the player has already upgraded the Base Tent to the Town Hall.",
    buildTime: "Overnight",
    deedPrice: 25000,
    resources: [],
  },
  {
    id: "bulletin_board",
    buildingName: "Bulletin Board",
    deedName: "Bulletin Board Deed",
    size: "1x1",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Bulletin_Board_Deed.png",
    npc: "",
    npcImg: "",
    description:
      "The deed is available from Fletch after completing a few starting quests. The player will also receive the recipe to make more Bulletin Boards.",
    buildTime: "Instant",
    deedPrice: 10000,
    resources: [
      {
        count: 2,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 1,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "johns_goods",
    buildingName: "John's Goods",
    deedName: "Shop Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Shop_Deed.png",
    npc: "John",
    npcImg: "https://static.wikia.nocookie.net/dinkum/images/5/59/NPC_John.png",
    description: "General Store. Relationship > 1/4 heart with John.",
    buildTime: "2 nights",
    deedPrice: 75000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 2,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "museum",
    buildingName: "Museum",
    deedName: "Museum Deed",
    size: "10x10",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Inv_Museum_Deed.png",
    npc: "Theodore",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/9/98/NPC_Theodore.png",
    description:
      "Unlocked after John has moved in and the player talks to Theodore for the first time. Display Bugs, Critters, and Fish.",
    buildTime: "2 nights",
    deedPrice: 125000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 5,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "band_stand",
    buildingName: "Band Stand",
    deedName: "Band Stand Deed",
    size: "6x6",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/61/Inv_Band_Stand_Deed.png",
    npc: "All permanent residents",
    npcImg: "",
    description:
      "Outdoor Community Centre. Unlocks after 3 permanent residents move onto the island.",
    buildTime: "2 nights",
    deedPrice: 25000,
    resources: [
      {
        count: 10,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 5,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 5,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 2,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 5,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "franklyns_lab",
    buildingName: "Franklyn's Lab",
    deedName: "Crafting Lab Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Crafting_Lab_Deed.png",
    npc: "Franklyn",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/4/4b/NPC_Franklyn.png",
    description:
      "Research Center. Spend > 190,000 Dinks (sold Shiny Discs included). Relationship > 3/4 heart with Franklyn.",
    buildTime: "2 nights",
    deedPrice: 250000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 2,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 5,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 24,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "irwins_barn",
    buildingName: "Irwin's Barn",
    deedName: "Animal Shop Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Inv_Animal_Shop_Deed.png",
    npc: "Irwin",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/6/65/NPC_Irwin.png",
    description:
      "Animal Store. Spend > 25,000 Dinks with Irwin. Relationship > 1/2 heart.",
    buildTime: "2 nights",
    deedPrice: 150000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 4,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 5,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "melvin_furniture",
    buildingName: "Melvin Furniture",
    deedName: "Furniture Shop Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/32/Inv_Furniture_Shop_Deed.png",
    npc: "Melvin",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/0/09/NPC_Melvin.png",
    description:
      "Furniture Store. Spend > 800 Dinks with Melvin. Relationship > 1 heart.",
    buildTime: "2 nights",
    deedPrice: 145000,
    resources: [
      {
        count: 18,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 18,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 3,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
    ],
  },
  {
    id: "rayne_greenhouse",
    buildingName: "Rayne's Greenhouse",
    deedName: "Plant Shop Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/88/Inv_Plant_Shop_Deed.png",
    npc: "Rayne",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/b/b7/NPC_Rayne.png",
    description:
      "Seeds and Gardening Tools. Spend > 18,000 Dinks with Rayne. Relationship > 1/2 heart.",
    buildTime: "2 nights",
    deedPrice: 200000,
    resources: [
      {
        count: 10,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 10,
        name: "Quartz Crystal",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
      },
      {
        count: 5,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 4,
        name: "Tin Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
      },
      {
        count: 10,
        name: "Stone",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
      },
    ],
  },
  {
    id: "threadspace",
    buildingName: "Threadspace",
    deedName: "Clothing Shop Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/84/Inv_Clothing_Shop_Deed.png",
    npc: "Clover",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/4/4c/NPC_Clover.png",
    description:
      "Clothes. Spend > 10,000 Dinks with Clover. Relationship > 1 heart.",
    buildTime: "2 nights",
    deedPrice: 180000,
    resources: [
      {
        count: 20,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 25,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 6,
        name: "Quartz Crystal",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
      },
      {
        count: 8,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 18,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "bank",
    buildingName: "Bank",
    deedName: "Bank Deed",
    size: "8x8",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bf/Inv_Bank_Deed.png",
    npc: "Milburn",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/0/03/NPC_Milburn.png",
    description: "Store Dinks for interest. Economy > 35%.",
    buildTime: "2 nights",
    deedPrice: 100000,
    resources: [
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 10,
        name: "Stone",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
      },
      {
        count: 4,
        name: "Quartz Crystal",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
      },
      {
        count: 4,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 24,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "sallys_salon",
    buildingName: "Sally's Salon",
    deedName: "Salon Deed",
    size: "6x6",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Inv_Salon_Deed.png",
    npc: "Sally",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/0/09/NPC_Sally.png",
    description:
      "Hairstyles and facial changes. Spend > 10,000 Dinks with Sally. Relationship > 2 1/4 hearts.",
    buildTime: "Overnight",
    deedPrice: 320000,
    resources: [
      {
        count: 20,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 20,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 10,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 8,
        name: "Quartz Crystal",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
      },
    ],
  },
  {
    id: "mine",
    buildingName: "Mine",
    deedName: "Mine Deed",
    size: "6x6",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ae/Inv_Mine_Deed.png",
    npc: "",
    npcImg: "",
    description:
      "Elevator to access mines containing ore and treasure. Unlocked after purchasing the Deep Mining Licence from Fletch.",
    buildTime: "2 nights",
    deedPrice: 250000,
    resources: [
      {
        count: 10,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 2,
        name: "Old Key",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Old_Key.png",
      },
      {
        count: 5,
        name: "Tin Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
      },
      {
        count: 5,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
    ],
  },
  {
    id: "tele_tower",
    buildingName: "Tele Tower",
    deedName: "",
    size: "2x2",
    img: "",
    npc: "",
    npcImg: "",
    description: "One near the coast of each cardinal direction on the Island.",
    buildTime: "",
    deedPrice: 0,
    resources: [
      {
        count: 3,
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
      },
      {
        count: 2,
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
      },
      {
        count: 1,
        name: "Shiny Disc",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png",
      },
      {
        count: 8,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 1,
        name: "Smooth Slate",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Smooth_Slate.png",
      },
    ],
  },
  {
    id: "tele_pad",
    buildingName: "Tele Pad",
    deedName: "Tele Pad Deed",
    size: "2x2",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/db/Inv_Tele_Pad_Deed.png",
    npc: "",
    npcImg: "",
    description:
      "It's like a Tele Tower you can place where you want. After Franklyn has moved onto the Island and at least 2 Tele Towers have been repaired. Talk to Franklyn then talk to Fletch.",
    buildTime: "Overnight",
    deedPrice: 75000,
    resources: [
      {
        count: 8,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 4,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 2,
        name: "Shiny Disc",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png",
      },
      {
        count: 2,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 4,
        name: "Smooth Slate",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Smooth_Slate.png",
      },
      {
        count: 4,
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
      },
    ],
  },
  {
    id: "jimmys_boat",
    buildingName: "Jimmy's Boat",
    deedName: "",
    size: "",
    img: "",
    npc: "Jimmy",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/4/4e/NPC_Jimmy.png",
    description:
      "Must be raining in the morning. At least 1,000,000 in your Bank account. Will buy stacks of 50+ for 1.5 times the value.",
    buildTime: "",
    deedPrice: 1000000,
    resources: [],
  },
  {
    id: "tuckerbox",
    buildingName: "Tuckerbox",
    deedName: "Tuckshop Deed",
    size: "",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2c/Inv_Tuckshop_Deed.png",
    npc: "Sheila",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/4/46/NPC_Sheila.png",
    description:
      "A place to get tucker and yarns. Relationship > 1 1/4 hearts  with Sheila.",
    buildTime: "2 nights",
    deedPrice: 750000,
    resources: [
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 5,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 3,
        name: "Keg",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Keg.png",
      },
      {
        count: 3,
        name: "Bottle Brush Brew",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/0a/Inv_Bottle_Brush_Brew.png",
      },
      {
        count: 3,
        name: "Wattle Brew",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5b/Inv_Wattle_Brew.png",
      },
      {
        count: 3,
        name: "Jelly Brew",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Jelly_Brew.png",
      },
      {
        count: 32,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
    ],
  },
  {
    id: "airport",
    buildingName: "Airport",
    deedName: "Airport Deed",
    size: "",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Airport_Deed.png",
    npc: "Nancy",
    npcImg:
      "https://static.wikia.nocookie.net/dinkum/images/9/9f/NPC_Nancy.png",
    description: "From Year 2 after all NPCs have moved in",
    buildTime: "2 nights",
    deedPrice: 2500000,
    resources: [
      {
        count: 25,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 25,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 10,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 10,
        name: "Quartz Crystal",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
      },
      {
        count: 5,
        name: "Cloth",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
      },
    ],
  },
  {
    id: "wish_fountain",
    buildingName: "Wish Fountain",
    deedName: "Wish Fountain Deed",
    size: "",
    img: "",
    npc: "",
    npcImg: "",
    description: "",
    buildTime: "Overnight",
    deedPrice: 50000,
    resources: [
      {
        count: 5,
        name: "Pearl",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
      },
      {
        count: 10,
        name: "Stone",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
      },
      {
        count: 10,
        name: "Bag of Cement",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
      },
    ],
  },
  {
    id: "house_move",
    buildingName: "House (Move)",
    deedName: "House Move Deed",
    size: "",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Inv_House_Move_Deed.png",
    npc: "",
    npcImg: "",
    description:
      "Talk to Fletch about moving a house. This is only available after the player has upgraded their Tent to a House.",
    buildTime: "Overnight",
    deedPrice: 25000,
    resources: [],
  },
  {
    id: "house_upgrade_1",
    buildingName: "House Upgrade 1",
    deedName: "",
    size: "6x6",
    img: "",
    npc: "",
    npcImg: "",
    description:
      "Upgrade from Tent to House. Construction materials box appears at house. Upfront fee",
    buildTime: "Overnight",
    deedPrice: 95000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 3,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
    ],
  },
  {
    id: "house_upgrade_2",
    buildingName: "House Upgrade 2",
    deedName: "",
    size: "8x8",
    img: "",
    npc: "",
    npcImg: "",
    description: "Construction materials box appears at house. Upfront fee",
    buildTime: "Overnight",
    deedPrice: 220000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 16,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 3,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
      {
        count: 5,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
    ],
  },
  {
    id: "house_upgrade_3",
    buildingName: "House Upgrade 3",
    deedName: "",
    size: "10x10",
    img: "",
    npc: "",
    npcImg: "",
    description: "Construction materials box appears at house. Upfront fee",
    buildTime: "Overnight",
    deedPrice: 440000,
    resources: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 3,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
    ],
  },
  {
    id: "guest_house",
    buildingName: "Guest House",
    deedName: "",
    size: "",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Guest_House_Deed_1.png",
    npc: "",
    npcImg: "",
    description:
      "Three Guest House deeds become available after the player has upgraded their Tent to a House. For friends.",
    buildTime: "Overnight",
    deedPrice: 95000,
    resources: [
      {
        count: 20,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 20,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 19,
        name: "Nails",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
      },
      {
        count: 4,
        name: "Tin Sheets",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
    ],
  },
  {
    id: "guest_house_move",
    buildingName: "Guest House (Move)",
    deedName: "Guest House Move Deeds",
    size: "",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Guest_House_Deed_1.png",
    npc: "",
    npcImg: "",
    description:
      "Talk to Fletch about moving a guest house. Each guest house has its own colour identifying it on the map.",
    buildTime: "Overnight",
    deedPrice: 25000,
    resources: [],
  },
];
