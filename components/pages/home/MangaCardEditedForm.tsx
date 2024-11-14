"use client";
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
import { mangaSchemaClientPartial } from "@/lib/schemas/mangas/mangaSchemaClient";
import { MangaSchemaClientPartial } from "@/lib/types/schemasTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "./ImageInput";

const MangaCardEditedForm = (editedManga: MangaSchemaClientPartial) => {
  const [useUrl, setUseUrl] = useState(false);

  const form = useForm({
    resolver: zodResolver(mangaSchemaClientPartial),
    defaultValues: editedManga,
  });

  const onSubmit = (data: MangaSchemaClientPartial) => {
    console.log("data:", data);
  };
  const friendlyNames: { [key in keyof MangaSchemaClientPartial]: string } = {
    title: "Titre",
    readerUrl: "URL",
    image: "Image",
    chapter: "Chapitre",
    description: "Description",
  };

  return (
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
                  className="bg-white/20 text-white placeholder:text-white/60"
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
                  className="bg-white/20 text-white placeholder:text-white/60"
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
                  className="bg-white/20 text-white placeholder:text-white/60"
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
      </form>
    </Form>
  );
};

export default MangaCardEditedForm;
