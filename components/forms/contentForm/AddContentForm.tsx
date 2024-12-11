"use client";

import { useDialog } from "@/components/global/DialogResponsive/DialogResponsive.context";
import ImageInput from "@/components/pages/home/Content/ImageInput";
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
import useFetch from "@/lib/hooks/useFetch";
import { contentSchemaClient } from "@/lib/schemas/contents/contentSchemaClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SelectType } from "./items/SelectType";

const AddContentForm = () => {
  const { refetch, isLoading } = useFetch();
  const router = useRouter();
  const { setOpen } = useDialog();

  const form = useForm<z.infer<typeof contentSchemaClient>>({
    resolver: zodResolver(contentSchemaClient),
    defaultValues: {
      title: "",
      readerUrl: "",
      description: "",
      chapter: 0,
    },
  });

  const onSubmit = (
    submissionData: z.infer<typeof contentSchemaClient>,
    e: FormEvent
  ) => {
    const { image: unknownImage, ...submissionDataProps } = submissionData;
    const image =
      unknownImage instanceof FileList ? unknownImage[0] : unknownImage;
    const submissionDataWithImage = { ...submissionDataProps, image };
    const formdata = new FormData();
    Object.entries(submissionDataWithImage).forEach(([key, value]) => {
      const okValue =
        typeof value === "number" ? value.toString() : value || "";
      formdata.append(key, okValue);
    });

    refetch("/api/contents", {
      method: "POST",
      body: formdata,
    }).then((fetchedState) => {
      try {
        if (fetchedState.data) {
          setOpen(false);
          router.refresh();
        }
        if (!fetchedState.isLoading && fetchedState.error) {
          console.error("Error adding content:", fetchedState.error);
          toast.error("Error adding content. Please try again.");
        } else if (fetchedState.isLoading) {
          toast.loading("Adding content...");
        } else toast.success("contenu ajouté avec succès.");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error adding content. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => form.handleSubmit((v) => onSubmit(v, e))(e)}
        className="space-y-8"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Titre..." {...field} />
              </FormControl>
              <FormDescription>
                Doit contenir au moins 3 lettres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description... (optionnel)"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reader URL */}
        <FormField
          control={form.control}
          name="readerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reader URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>Url du lecteur en ligne</FormDescription>
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

        {/* type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chapter</FormLabel>
              <FormControl>
                <SelectType field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "Ajouter contenu"}
        </Button>
      </form>
    </Form>
  );
};

export default AddContentForm;
