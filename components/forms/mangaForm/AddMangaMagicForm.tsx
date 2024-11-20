"use client";

import { AutoComplete } from "@/components/global/Autocomplete";
import MangaCardProvider from "@/components/pages/home/Manga/MangaCard.provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMangasFromMangadexAction } from "@/lib/actions/external/mangadex.action";
import {
  SanityzedMangadexResponseItem,
  sanityzeMangadexResponse,
} from "@/lib/actions/external/mangadex.sanityze";
import { set } from "date-fns";
import React, { useState } from "react";

const AddMangaMagicForm = () => {
  const [searchValue, setsearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState<SanityzedMangadexResponseItem[]>([]);
  const selectedItem: SanityzedMangadexResponseItem | undefined = items.find(
    (item) => item.mangadexId === selectedValue
  );
  const handleSearchValueChange = async (value: string) => {
    const manga = await getMangasFromMangadexAction(value);
    const sanityzedManga = sanityzeMangadexResponse(manga);
    setItems(sanityzedManga);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un manga</CardTitle>
        <CardDescription>
          Ajouter un manga à votre liste de lecture
        </CardDescription>
        <AutoComplete
          emptyMessage="Aucun manga trouvé"
          onSearchValueChange={handleSearchValueChange}
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
          items={items.map((item) => ({
            value: item.mangadexId,
            label: item.title,
          }))}
        />
      </CardHeader>
      <CardContent>
        {selectedItem && (
          <MangaCardProvider
            {...{
              ...selectedItem,
              isSelfHosted: false,
              description: selectedItem.description ?? "",
            }}
          ></MangaCardProvider>
        )}
      </CardContent>
    </Card>
  );
};

export default AddMangaMagicForm;
