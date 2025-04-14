"use client";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Badge,
  Card,
  Checkbox,
  Label,
} from "flowbite-react";
import { animals, fish, bugs, minerals } from "@/lib/gameData";

interface Collection {
  animals: string[];
  fish: string[];
  bugs: string[];
  minerals: string[];
  items: string[];
}

interface CollectionsTabProps {
  collections: Collection;
  onUpdate: (collectionType: keyof Collection, itemIds: string[]) => void;
}

export default function CollectionsTab({
  collections,
  onUpdate,
}: CollectionsTabProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Very Rare":
        return "purple";
      case "Rare":
        return "red";
      case "Uncommon":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleToggleItem = (
    collectionType: keyof typeof collections,
    itemId: string,
  ) => {
    const currentIds = collections[collectionType];

    if (currentIds.includes(itemId)) {
      onUpdate(
        collectionType,
        currentIds.filter((id) => id !== itemId),
      );
    } else {
      onUpdate(collectionType, [...currentIds, itemId]);
    }
  };

  const renderCollectionItems = (
    items: { id: string; name: string; rarity: string }[],
    collectionType: keyof typeof collections,
  ) => {
    const collectedIds = collections[collectionType];

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Checkbox
                  id={`${collectionType}-${item.id}`}
                  checked={collectedIds.includes(item.id)}
                  onChange={() => handleToggleItem(collectionType, item.id)}
                  className="mr-3"
                />
                <Label
                  htmlFor={`${collectionType}-${item.id}`}
                  className="cursor-pointer"
                >
                  {item.name}
                </Label>
              </div>
              <Badge color={getRarityColor(item.rarity)} className="ml-2">
                {item.rarity}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Accordion>
        <AccordionPanel>
          <AccordionTitle>
            Animals ({collections.animals.length}/{animals.length})
          </AccordionTitle>
          <AccordionContent>
            {renderCollectionItems(animals, "animals")}
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>
            Fish ({collections.fish.length}/{fish.length})
          </AccordionTitle>
          <AccordionContent>
            {renderCollectionItems(fish, "fish")}
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>
            Bugs ({collections.bugs.length}/{bugs.length})
          </AccordionTitle>
          <AccordionContent>
            {renderCollectionItems(bugs, "bugs")}
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>
            Minerals ({collections.minerals.length}/{minerals.length})
          </AccordionTitle>
          <AccordionContent>
            {renderCollectionItems(minerals, "minerals")}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}
