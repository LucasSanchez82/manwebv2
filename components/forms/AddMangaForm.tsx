"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "sonner";
import useFetch from "@/lib/hooks/useFetch";
import { mangaSchemaClient } from "@/lib/schemas/mangas/mangaSchemaClient";
import { useRouter } from "next/navigation";
import ImageInput from "../pages/home/ImageInput";

type ReturnOfUseFetch = ReturnType<typeof useFetch>;

export default function AddMangaForm() {
  const { refetch, isLoading } = useFetch();
  const router = useRouter();

  const form = useForm<z.infer<typeof mangaSchemaClient>>({
    resolver: zodResolver(mangaSchemaClient),
    defaultValues: {
      title: "Test datas",
      readerUrl: "https://exemple.org/",
      description: "",
      chapter: 0,
    },
  });

  const onSubmit = (submissionData: z.infer<typeof mangaSchemaClient>) => {
    refetch("/api/mangas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    }).then((fetchedState) => {
      
      console.log("'onSubmit' data:", submissionData);
      try {
        if(fetchedState.data) router.refresh();
        toast.success("Manga added successfully!", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(fetchedState.data, null, 2)}
              </code>
            </pre>
          ),
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error adding manga. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter manga title" {...field} />
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
                  placeholder="Description of the manga (optional)"
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "Add Manga"}
        </Button>
        <Button type="button" onClick={router.refresh}>
          {" "}
          refresh
        </Button>
      </form>
    </Form>
  );
}
