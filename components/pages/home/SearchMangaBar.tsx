"use client";
import ButtonAction from "@/components/global/Button.action";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchMangaBar = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        search: z.string({ message: "Veuillez entrer un nom de manga" }),
      })
    ),
    defaultValues: {
      search: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-3/4 m-auto">
        <FormItem className="">
          <FormLabel htmlFor="search">Rechercher un manga</FormLabel>
          <FormField
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} type="search" className="bg-white/20" />
                  </FormControl>
                  <Button type="submit">🔍</Button>
                </div>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormMessage />
        </FormItem>
      </form>
    </Form>
  );
};

export default SearchMangaBar;
