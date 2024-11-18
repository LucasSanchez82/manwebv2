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
        search: z.string().nonempty(),
      })
    ),
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });
  return;
  <Form {...form}>
    <FormItem className="w-full bg-red-400">
      <FormLabel htmlFor="search">Rechercher un manga</FormLabel>
      <FormField
        name="search"
        render={({ field }) => (
          <FormItem>
            <FormLabel />
            <FormControl>
              <Input {...field} type="search" className="bg-white/20" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormMessage />
    </FormItem>
    <FormItem>
      <Button type="submit">Rechercher</Button>
    </FormItem>
  </Form>;
};

export default SearchMangaBar;
