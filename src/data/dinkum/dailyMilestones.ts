import { DailyMilestone, DailyMilestones } from "@/types";

const dayOneMilestones: DailyMilestone[] = [
  { id: "day_one_1", name: "Harvest 3 Bush Lime", permitPoints: 30 },
  { id: "day_one_2", name: "Catch 2 Bugs", permitPoints: 50 },
  { id: "day_one_3", name: "Craft 1 Item", permitPoints: 25 },
];

const travelMilestones: DailyMilestone[] = [
  { id: "travel_1", name: "Travel 500 - 1,000m on foot", permitPoints: 50 },
  { id: "travel_2", name: "Travel 500 - 1,000m by vehicle", permitPoints: 50 },
];

const npcMilestones: DailyMilestone[] = [
  { id: "npc_1", name: "Chat with 1 Residents", permitPoints: 10 },
  { id: "npc_2", name: "Chat with 2 Residents", permitPoints: 20 },
  { id: "npc_3", name: "Chat with 3 Residents", permitPoints: 30 },
  { id: "npc_4", name: "Do a job for someone", permitPoints: 100 },
];

const fishingMilestones: DailyMilestone[] = [
  { id: "fishing_1", name: "Catch 3 fish", permitPoints: 105 },
  { id: "fishing_2", name: "Catch 4 fish", permitPoints: 140 },
  { id: "fishing_3", name: "Sell 3 fish", permitPoints: 105 },
  { id: "fishing_4", name: "Sell 4 fish", permitPoints: 140 },
];

const farmingMilestones: DailyMilestone[] = [
  { id: "farming_1", name: "Water 3 crops", permitPoints: 75 },
  { id: "farming_2", name: "Water 4 crops", permitPoints: 100 },
  { id: "farming_3", name: "Water 5 crops", permitPoints: 125 },
  { id: "farming_4", name: "Water 6 crops", permitPoints: 150 },
  { id: "farming_5", name: "Plant 3 crop seeds", permitPoints: 135 },
  { id: "farming_6", name: "Plant 4 crop seeds", permitPoints: 180 },
  { id: "farming_7", name: "Plant 5 crop seeds", permitPoints: 225 },
  { id: "farming_8", name: "Plant 6 crop seeds", permitPoints: 270 },
  { id: "farming_9", name: "Harvest 4 crops", permitPoints: 180 },
  { id: "farming_10", name: "Harvest 5 crops", permitPoints: 225 },
  { id: "farming_11", name: "Harvest 6 crops", permitPoints: 270 },
  { id: "farming_12", name: "Harvest 7 crops", permitPoints: 315 },
  { id: "farming_13", name: "Harvest 8 crops", permitPoints: 360 },
  { id: "farming_14", name: "Harvest 9 crops", permitPoints: 405 },
  { id: "farming_15", name: "Harvest 10 crops", permitPoints: 450 },
  { id: "farming_16", name: "Sell 4 crops", permitPoints: 100 },
  { id: "farming_17", name: "Sell 5 crops", permitPoints: 125 },
  { id: "farming_18", name: "Sell 6 crops", permitPoints: 150 },
  { id: "farming_19", name: "Sell 7 crops", permitPoints: 175 },
  { id: "farming_20", name: "Sell 8 crops", permitPoints: 200 },
  { id: "farming_21", name: "Sell 9 crops", permitPoints: 225 },
  { id: "farming_22", name: "Sell 10 crops", permitPoints: 250 },
  { id: "farming_23", name: "Compost something", permitPoints: 25 },
  { id: "farming_24", name: "Buy 3 seeds", permitPoints: 15 },
  { id: "farming_25", name: "Buy 4 seeds", permitPoints: 20 },
  { id: "farming_26", name: "Buy 5 seeds", permitPoints: 25 },
  { id: "farming_27", name: "Buy 6 seeds", permitPoints: 30 },
  { id: "farming_28", name: "Pet an animal", permitPoints: 10 },
];

const foragingMilestones: DailyMilestone[] = [
  { id: "foraging_1", name: "Cook 1 - 2 fruit", permitPoints: 20 },
  { id: "foraging_2", name: "Cook 1 - 2 meat", permitPoints: 20 },
  { id: "foraging_3", name: "Sell 3 Fruit", permitPoints: 30 },
  { id: "foraging_4", name: "Sell 4 Fruit", permitPoints: 40 },
  { id: "foraging_5", name: "Collect 5 Shells", permitPoints: 50 },
  { id: "foraging_6", name: "Collect 6 Shells", permitPoints: 60 },
  { id: "foraging_7", name: "Collect 7 Shells", permitPoints: 70 },
  { id: "foraging_8", name: "Collect 8 Shells", permitPoints: 80 },
  { id: "foraging_9", name: "Collect 9 Shells", permitPoints: 90 },
  { id: "foraging_10", name: "Sell 5 Shells", permitPoints: 50 },
  { id: "foraging_11", name: "Sell 6 Shells", permitPoints: 60 },
  { id: "foraging_12", name: "Sell 7 Shells", permitPoints: 70 },
  { id: "foraging_13", name: "Sell 8 Shells", permitPoints: 80 },
  { id: "foraging_14", name: "Sell 9 Shells", permitPoints: 90 },
  { id: "foraging_15", name: "Clear 8 - 14 grass", permitPoints: 25 },
  { id: "foraging_16", name: "Bury 3 Fruit", permitPoints: 30 },
  { id: "foraging_17", name: "Bury 4 Fruit", permitPoints: 40 },
  { id: "foraging_18", name: "Harvest 3 Items", permitPoints: 30 },
  { id: "foraging_19", name: "Harvest 4 Items", permitPoints: 40 },
  { id: "foraging_20", name: "Harvest 5 Items", permitPoints: 50 },
  { id: "foraging_21", name: "Plant 3 Wild Seeds", permitPoints: 40 },
  { id: "foraging_22", name: "Plant 4 Wild Seeds", permitPoints: 40 },
];

const loggingMilestones: DailyMilestone[] = [
  { id: "logging_1", name: "Cut down 2 trees", permitPoints: 30 },
  { id: "logging_2", name: "Cut down 3 trees", permitPoints: 45 },
  { id: "logging_3", name: "Cut down 4 trees", permitPoints: 60 },
  { id: "logging_4", name: "Clear 2 tree stumps", permitPoints: 20 },
  { id: "logging_5", name: "Clear 3 tree stumps", permitPoints: 30 },
  { id: "logging_6", name: "Clear 4 tree stumps", permitPoints: 40 },
  { id: "logging_7", name: "Saw 5 planks", permitPoints: 25 },
  { id: "logging_8", name: "Saw 6 planks", permitPoints: 30 },
  { id: "logging_9", name: "Saw 7 planks", permitPoints: 35 },
  { id: "logging_10", name: "Saw 8 planks", permitPoints: 40 },
  { id: "logging_11", name: "Plant 1 tree seeds", permitPoints: 25 },
  { id: "logging_12", name: "Plant 2 tree seeds", permitPoints: 50 },
  { id: "logging_13", name: "Plant 3 tree seeds", permitPoints: 75 },
];

const miningMilestones: DailyMilestone[] = [
  { id: "mining_1", name: "Smash 3 Rocks", permitPoints: 45 },
  { id: "mining_2", name: "Smash 4 Rocks", permitPoints: 60 },
  { id: "mining_3", name: "Smash 5 Rocks", permitPoints: 75 },
  { id: "mining_4", name: "Smash 6 Rocks", permitPoints: 90 },
  { id: "mining_5", name: "Smash 3 Ore Rocks", permitPoints: 75 },
  { id: "mining_6", name: "Smash 4 Ore Rocks", permitPoints: 100 },
  { id: "mining_7", name: "Smash 5 Ore Rocks", permitPoints: 125 },
  { id: "mining_8", name: "Smash 6 Ore Rocks", permitPoints: 150 },
  {
    id: "mining_9",
    name: "Smelt some ore into a bar (1 bar)",
    permitPoints: 50,
  },
  {
    id: "mining_10",
    name: "Smelt some ore into a bar (2 bars)",
    permitPoints: 100,
  },
  { id: "mining_11", name: "Grind 2 stones", permitPoints: 30 },
  { id: "mining_12", name: "Grind 3 stones", permitPoints: 45 },
];

const excavationMilestones: DailyMilestone[] = [
  { id: "excavation_1", name: "Dig up dirt 3 times", permitPoints: 30 },
  { id: "excavation_2", name: "Dig up dirt 4 times", permitPoints: 40 },
  {
    id: "excavation_3",
    name: "Find some burried treasure (1 treasure)",
    permitPoints: 30,
  },
  {
    id: "excavation_4",
    name: "Find some burried treasure (2 treasures)",
    permitPoints: 60,
  },
];

const bugCatchingMilestones: DailyMilestone[] = [
  { id: "bug_1", name: "Catch 3 Bugs", permitPoints: 60 },
  { id: "bug_2", name: "Catch 4 Bugs", permitPoints: 80 },
  { id: "bug_3", name: "Sell 3 Bugs", permitPoints: 60 },
  { id: "bug_4", name: "Sell 4 Bugs", permitPoints: 80 },
];

const craftingMilestones: DailyMilestone[] = [
  { id: "crafting_1", name: "Eat something", permitPoints: 10 },
  {
    id: "crafting_2",
    name: "Cook Something at the Cooking Table",
    permitPoints: 100,
  },
  { id: "crafting_3", name: "Craft a new tool", permitPoints: 100 },
  { id: "crafting_4", name: "Buy a new tool", permitPoints: 10 },
  { id: "crafting_5", name: "Break a tool", permitPoints: 25 },
  { id: "crafting_6", name: "Craft 2 items", permitPoints: 20 },
  { id: "crafting_7", name: "Craft 3 items", permitPoints: 30 },
];

const huntingMilestones: DailyMilestone[] = [
  { id: "hunting_1", name: "Hunt 2 animals", permitPoints: 50 },
  { id: "hunting_2", name: "Hunt 3 animals", permitPoints: 75 },
  { id: "hunting_3", name: "Hunt 4 animals", permitPoints: 100 },
  { id: "hunting_4", name: "Hunt 5 animals", permitPoints: 125 },
];

const trappingMilestones: DailyMilestone[] = [
  {
    id: "trapping_1",
    name: "Trap an animal and deliver it",
    permitPoints: 100,
  },
];

const dinksMilestones: DailyMilestone[] = [
  { id: "dinks_1", name: "Spend 1,000 Dink", permitPoints: 100 },
  { id: "dinks_2", name: "Spend 2,000 Dink", permitPoints: 200 },
  { id: "dinks_3", name: "Spend 3,000 Dink", permitPoints: 300 },
  { id: "dinks_4", name: "Spend 4,000 Dink", permitPoints: 400 },
  { id: "dinks_5", name: "Make 2,000 Dink", permitPoints: 200 },
  { id: "dinks_6", name: "Make 3,000 Dink", permitPoints: 300 },
  { id: "dinks_7", name: "Make 4,000 Dink", permitPoints: 400 },
  { id: "dinks_8", name: "Make 5,000 Dink", permitPoints: 500 },
  { id: "dinks_9", name: "Buy some new clothes", permitPoints: 25 },
  { id: "dinks_10", name: "Buy some new furniture", permitPoints: 25 },
  { id: "dinks_11", name: "Buy some new wallpaper", permitPoints: 25 },
  { id: "dinks_12", name: "Buy some new flooring", permitPoints: 25 },
];

export const dailyMilestones: DailyMilestones = {
  dayOneMilestones,
  travelMilestones,
  npcMilestones,
  fishingMilestones,
  farmingMilestones,
  foragingMilestones,
  loggingMilestones,
  miningMilestones,
  excavationMilestones,
  bugCatchingMilestones,
  craftingMilestones,
  huntingMilestones,
  trappingMilestones,
  dinksMilestones,
};
