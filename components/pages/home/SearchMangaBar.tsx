"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCustomSearchParams from "@/lib/hooks/useCustomSearchParams";

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
  const { pushQuery } = useCustomSearchParams();
  const handleSubmit = form.handleSubmit((data) => {
    pushQuery("search", data.search);
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
