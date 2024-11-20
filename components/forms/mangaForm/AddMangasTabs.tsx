import React from "react";
import AddMangaForm from "./AddMangaForm";
import AddMangaMagicForm from "./AddMangaMagicForm";
import { TabsProvider } from "@/components/global/TabsProvider";

const AddMangasTabs = () => {
  const tabs = [
    {
      value: "Magic",
      node: <AddMangaMagicForm />,
    },
    {
      value: "Manual",
      node: <AddMangaForm />,
    },
  ];
  return <TabsProvider tabs={tabs} />;
};

export default AddMangasTabs;
