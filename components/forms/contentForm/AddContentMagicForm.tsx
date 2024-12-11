"use client";

import { AutoComplete } from "@/components/global/Autocomplete";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import ContentCardProvider from "@/components/pages/home/Content/ContentCard.provider";
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

const AddContentMagicForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState<SanityzedMangadexResponseItem[]>([]);
  const selectedItem: SanityzedMangadexResponseItem | undefined = items.find(
    (item) => item.mangadexId === selectedValue
  );
  const { setOpen } = useDialog();
  const router = useRouter();
  const { refetch } = useFetch();

  const handleClick = async () => {
    const selectedContent = {
      ...selectedItem,
      isSelfHosted: false,
      description: selectedItem?.description ?? "",
    };
    if (selectedContent) {
      const formdata = new FormData();

      Object.entries(selectedContent).forEach(([key, value]) => {
        const okValue = value?.toString();

        if (okValue) formdata.append(key, okValue);
      });
      const result = await refetch("/api/contents", {
        method: "POST",
        body: formdata,
      }).then((fetchedState) => {
        try {
          if (fetchedState.data) {
            setOpen(false);
            router.refresh();
          }
          if (!fetchedState.isLoading && fetchedState.error) {
            console.error("Error adding Content:", fetchedState.error);
            toast.error("Error adding manga. Please try again.");
          } else if (fetchedState.isLoading) {
            toast.loading("Adding content...");
          } else toast.success("contenu ajouté avec succès.");
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error adding content. Please try again.");
        }
      });
    } else
      toast.error("Aucun contenu n'est compté comme séléctionné.", {
        description:
          "Veuillez essayer de séléctionner un contenu avant de continuer.",
      });
  };

  const handleSearchValueChange = async (value: string) => {
    const content = await getMangasFromMangadexAction(value);
    const sanityzedMangas = sanityzeMangadexResponse(content);
    setItems(sanityzedMangas);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un contenu</CardTitle>
        <CardDescription>
          Ajouter un contenu à votre liste de lecture
        </CardDescription>
        <AutoComplete
          emptyMessage="Aucun contenu trouvé"
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
            <ContentCardProvider
              {...{
                ...selectedItem,
                isSelfHosted: false,
                description: selectedItem.description,
                readerUrl: selectedItem.readerUrl,
              }}
            ></ContentCardProvider>
            <ButtonAction action={handleClick}>Ajouter</ButtonAction>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default AddContentMagicForm;
