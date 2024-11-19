"use client";
import ButtonAction from "@/components/global/Button.action";
import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteMangaAction } from "@/lib/actions/mangas.actions";
import convertBigIntToNumber from "@/lib/helpers/convertBigIntToNumber";
import useFetch from "@/lib/hooks/useFetch";
import { mangaSchemaClientPartial } from "@/lib/schemas/mangas/mangaSchemaClient";
import { MangaSchemaClientPartial } from "@/lib/types/schemasTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageInput from "../../pages/home/Manga/ImageInput";
import { PersonnalManga } from "@/lib/cachedRequests/manga/getPersonnalMangas";

const MangaCardEditedForm = (
  editedManga: MangaSchemaClientPartial &
    Pick<PersonnalManga, "id"> & { imageUrl: string }
) => {
  const { refetch, isLoading } = useFetch();
  const router = useRouter();
  const { setOpen } = useDialog();

  const form = useForm({
    resolver: zodResolver(mangaSchemaClientPartial.partial()),
    defaultValues: { ...editedManga, image: undefined },
  });

  const handleDeleteManga = async (id: bigint | number) => {
    const res = await deleteMangaAction(id);
    if ("error" in res) {
      toast.error("Erreur lors de la suppression du manga", {
        description: res.error,
      });
    } else {
      toast.success("Manga supprimé avec succès");
      router.refresh();
      setOpen(false);
    }
  };

  const onSubmit = (submissionData: MangaSchemaClientPartial) => {
    const { image: unknownImage, ...submissionDataProps } = submissionData;
    const image =
      unknownImage instanceof FileList ? unknownImage[0] : unknownImage;
    const submissionDataWithImageAndId = {
      ...submissionDataProps,
      image,
      id: convertBigIntToNumber(editedManga.id),
    };
    const formdata = new FormData();
    Object.entries(submissionDataWithImageAndId).forEach(([key, value]) => {
      const okValue =
        typeof value === "number" ? value.toString() : value || "";
      if (value) formdata.append(key, okValue);
    });

    refetch("/api/mangas", {
      method: "PUT",
      body: formdata,
    }).then((fetchedState) => {
      try {
        if (!fetchedState.isLoading && fetchedState.error) {
          toast.error("Erreur lors de l'ajout du manga");
        } else {
          toast.success("Manga modifié avec succès");
          form.reset();
          router.refresh();
          setOpen(false);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur inconnue (error n'est pas une instance de Error)"
        );
      }
    });
  };
  const friendlyNames: { [key in keyof MangaSchemaClientPartial]: string } = {
    title: "Titre",
    readerUrl: "URL",
    image: "Image",
    chapter: "Chapitre",
    description: "Description",
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      friendlyNames[
                        field.name as keyof MangaSchemaClientPartial
                      ] + "..."
                    }
                    className="bg-white/20"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder={
                      friendlyNames[
                        field.name as keyof MangaSchemaClientPartial
                      ] + "..."
                    }
                    className="bg-white/20"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"readerUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      friendlyNames[
                        field.name as keyof MangaSchemaClientPartial
                      ] + "..."
                    }
                    className="bg-white/20"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageInput control={form.control} name="image" />

          {/* Chapter */}
          <FormField
            control={form.control}
            name="chapter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last chapter read"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="w-full flex justify-around">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "En cours..." : "Modifier manga"}
            </Button>

            <ButtonAction
              variant="destructive"
              action={handleDeleteManga}
              actionProps={[editedManga.id]}
              pendingText="Suppression en cours..."
            >
              Supprimer manga
            </ButtonAction>
          </section>
        </form>
      </Form>
      {/* <form action={dele}></form> */}
    </>
  );
};

export default MangaCardEditedForm;
