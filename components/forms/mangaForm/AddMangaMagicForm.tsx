"use client";

import { AutoComplete } from "@/components/global/Autocomplete";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import MangaCardProvider from "@/components/pages/home/Manga/MangaCard.provider";
import { Button } from "@/components/ui/button";
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
import useFetch from "@/lib/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddMangaMagicForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState<SanityzedMangadexResponseItem[]>([]);
  const selectedItem: SanityzedMangadexResponseItem | undefined = items.find(
    (item) => item.mangadexId === selectedValue
  );
  const { setOpen } = useDialog();
  const router = useRouter();
  const { refetch } = useFetch();

  const handleClick = async () => {
    const selectedManga = {
      ...selectedItem,
      isSelfHosted: false,
      description: selectedItem?.description ?? "",
    };
    if (selectedManga) {
      const formdata = new FormData();

      Object.entries(selectedManga).forEach(([key, value]) => {
        const okValue = value?.toString();

        formdata.append(key, okValue);
      });
      const result = await refetch("/api/mangas", {
        method: "POST",
        body: formdata,
      }).then((fetchedState) => {
        try {
          if (fetchedState.data) {
            setOpen(false);
            router.refresh();
          }
          if (!fetchedState.isLoading && fetchedState.error) {
            console.error("Error adding manga:", fetchedState.error);
            toast.error("Error adding manga. Please try again.");
          } else if (fetchedState.isLoading) {
            toast.loading("Adding manga...");
          } else toast.success("Manga ajouté avec succès.");
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error adding manga. Please try again.");
        }
      });
    } else
      toast.error("Aucun manga n'est compté comme séléctionné.", {
        description:
          "Veuillez essayer de séléctionner un manga avant de continuer.",
      });
  };

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
          <section className="flex flex-col justify-center gap-4">
            <MangaCardProvider
              {...{
                ...selectedItem,
                isSelfHosted: false,
                description: selectedItem.description ?? "",
              }}
            ></MangaCardProvider>
            <ButtonAction action={handleClick}>Ajouter</ButtonAction>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default AddMangaMagicForm;
