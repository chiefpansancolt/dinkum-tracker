"use client";

import { Card, Checkbox, Label } from "flowbite-react";
import { milestones, licenseTypes } from "@/lib/gameData";

interface MilestonesTabProps {
  milestones: {
    [key: string]: boolean;
  };
  onUpdate: (milestoneId: string, completed: boolean) => void;
}

export default function MilestonesTab({
  milestones: milestonesState,
  onUpdate,
}: MilestonesTabProps) {
  const handleToggleMilestone = (milestoneId: string) => {
    const currentValue = milestonesState[milestoneId] || false;
    onUpdate(milestoneId, !currentValue);
  };

  const getCompletedCount = (items: { id: string; name: string }[]) => {
    return items.filter((item) => milestonesState[item.id]).length;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-primary mb-4 text-xl font-bold">
          Town Milestones ({getCompletedCount(milestones)}/{milestones.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <div className="flex items-center">
                <Checkbox
                  id={`milestone-${milestone.id}`}
                  checked={milestonesState[milestone.id] || false}
                  onChange={() => handleToggleMilestone(milestone.id)}
                  className="mr-3"
                />
                <Label
                  htmlFor={`milestone-${milestone.id}`}
                  className="cursor-pointer"
                >
                  {milestone.name}
                </Label>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-primary mb-4 text-xl font-bold">
          Licenses ({getCompletedCount(licenseTypes)}/{licenseTypes.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {licenseTypes.map((license) => (
            <Card key={license.id}>
              <div className="flex items-center">
                <Checkbox
                  id={`license-${license.id}`}
                  checked={milestonesState[license.id] || false}
                  onChange={() => handleToggleMilestone(license.id)}
                  className="mr-3"
                />
                <Label
                  htmlFor={`license-${license.id}`}
                  className="cursor-pointer"
                >
                  {license.name}
                </Label>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
