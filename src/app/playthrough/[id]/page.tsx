"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarCollapse,
  SidebarLogo,
} from "flowbite-react";
import {
  getPlaythroughById,
  Playthrough,
  savePlaythrough,
} from "@/lib/localStorage";
import CollectionsTab from "./CollectionsTab";
import MilestonesTab from "./MilestonesTab";
import NotFoundCard from "@/components/NotFoundCard";
import { errorToast, successToast } from "@/lib/notifications";
import { FaRegSave } from "react-icons/fa";
import {
  HiHome,
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
  FaFish,
  FaBug,
  FaCalendarDays,
  FaUsers,
  FaIdCard,
  FaBuildingColumns,
  FaBuilding,
  FaAward,
} from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { GoStarFill } from "react-icons/go";

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
      successToast({ message: "Playthrough Saved Successfully!" });
      setTimeout(() => {
        setIsSaving(false);
      }, 800);
    } catch (error) {
      errorToast({ message: JSON.stringify(error) });
      setIsSaving(false);
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
    <div className="relative pb-20">
      <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-700">
        <div className="px-4 py-2">
          <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="/" icon={HiHome}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/playthrough/list">
              Playthroughs
            </BreadcrumbItem>
            <BreadcrumbItem>{playthrough.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </nav>
      <div className="px-4 py-8">
        <div className="relative mx-auto flex w-full">
          <div>
            <Sidebar
              aria-label="Sidebar with logo branding example"
              applyTheme={{
                root: { base: "replace", inner: "replace" },
                collapse: {
                  button: "replace",
                  icon: { base: "replace", open: { on: "replace" } },
                },
                item: { base: "replace", icon: { base: "replace" } },
              }}
            >
              <SidebarLogo
                href="#"
                img="/dinkum_d_logo.png"
                imgAlt="Dinkum logo"
              >
                {playthrough.name}
              </SidebarLogo>
              <SidebarItems>
                <SidebarItemGroup>
                  <SidebarItem href="#" icon={MdDashboard}>
                    Overview
                  </SidebarItem>
                  <SidebarItem href="#" icon={FaUsers}>
                    NPCs
                  </SidebarItem>
                  <SidebarItem href="#" icon={FaCalendarDays}>
                    Calendar
                  </SidebarItem>
                </SidebarItemGroup>
                <SidebarItemGroup>
                  <SidebarCollapse
                    icon={FaBuildingColumns}
                    label="Pedia"
                    renderChevronIcon={(theme, open) => {
                      const IconComponent = open
                        ? HiOutlineMinusSm
                        : HiOutlinePlusSm;

                      return (
                        <IconComponent
                          aria-hidden
                          className={twMerge(
                            theme.label.icon.open[open ? "on" : "off"],
                          )}
                        />
                      );
                    }}
                  >
                    <SidebarItem href="#" icon={FaBug}>
                      Bugs
                    </SidebarItem>
                    <SidebarItem href="#" icon={GoStarFill}>
                      Critters
                    </SidebarItem>
                    <SidebarItem href="#" icon={FaFish}>
                      Fish
                    </SidebarItem>
                  </SidebarCollapse>
                  <SidebarItem href="#" icon={FaBuilding}>
                    Buildings & Deeds
                  </SidebarItem>
                  <SidebarItem href="#" icon={FaIdCard}>
                    Licenses
                  </SidebarItem>
                  <SidebarItem href="#" icon={FaAward}>
                    Milestones
                  </SidebarItem>
                  <SidebarItem href="#" icon={FaTools}>
                    Skills
                  </SidebarItem>
                </SidebarItemGroup>
              </SidebarItems>
            </Sidebar>
          </div>

          <section className="h-full flex-1 overflow-y-auto pb-4 lg:pl-4">
            <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
              <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"></div>
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 lg:h-96 dark:border-gray-600"></div>
              <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 lg:h-96 dark:border-gray-600"></div>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
              <div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 lg:h-96 dark:border-gray-600"></div>
              <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 lg:h-96 dark:border-gray-600"></div>
            </div>
          </section>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-accent hover:bg-accent/95 focus:ring-accent fixed right-6 bottom-6 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-0 text-white shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-90"
        aria-label="Save Progress"
      >
        {isSaving ? <Spinner size="lg" /> : <FaRegSave className="h-6 w-6" />}
      </button>
    </div>
  );
}
