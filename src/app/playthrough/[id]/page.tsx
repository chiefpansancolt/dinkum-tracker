"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabItem, Button, Spinner, Badge } from "flowbite-react";
import {
  getPlaythroughById,
  Playthrough,
  savePlaythrough,
} from "@/lib/localStorage";
import CollectionsTab from "./CollectionsTab";
import MilestonesTab from "./MilestonesTab";
import NotFoundCard from "@/components/NotFoundCard";
import BackButton from "@/components/BackButton";
import { errorToast, successToast } from "@/lib/notifications";

export default function PlaythroughPage() {
  const params = useParams();
  const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof params.id !== "string") {
      setIsLoading(false);
      return;
    }

    const data = getPlaythroughById(params.id);
    setPlaythrough(data);
    setIsLoading(false);
  }, [params.id]);

  const handleSave = () => {
    if (!playthrough) return;

    setIsSaving(true);
    try {
      savePlaythrough(playthrough);
      successToast({ message: "House Updated Successfully!" });
      setIsSaving(false);
    } catch (error) {
      errorToast({ message: JSON.stringify(error) });
    }
  };

  const handleCollectionUpdate = (
    collectionType: keyof Playthrough["collections"],
    itemIds: string[],
  ) => {
    if (!playthrough) return;

    setPlaythrough({
      ...playthrough,
      collections: {
        ...playthrough.collections,
        [collectionType]: itemIds,
      },
    });
  };

  const handleMilestoneUpdate = (milestoneId: string, completed: boolean) => {
    if (!playthrough) return;

    setPlaythrough({
      ...playthrough,
      milestones: {
        ...playthrough.milestones,
        [milestoneId]: completed,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="xl" />
        <p className="mt-4">Loading playthrough...</p>
      </div>
    );
  }

  if (!playthrough) {
    return <NotFoundCard message="Playthrough not found" />;
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <BackButton href="/playthrough/list" />
          <h1 className="text-primary text-3xl font-bold">
            {playthrough.name}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button color="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Progress"}
          </Button>
        </div>
      </div>

      <Tabs>
        <TabItem active title="Collections">
          <CollectionsTab
            collections={playthrough.collections}
            onUpdate={handleCollectionUpdate}
          />
        </TabItem>
        <TabItem title="Milestones">
          <MilestonesTab
            milestones={playthrough.milestones}
            onUpdate={handleMilestoneUpdate}
          />
        </TabItem>
      </Tabs>
    </div>
  );
}
