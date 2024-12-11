"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { contentTypes, contentTypesKeys } from "@/prisma/constant";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

export const SelectType = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      title: string;
      image: string | FileList;
      type: string;
      readerUrl: string;
      chapter: number;
      description?: string | null | undefined;
    },
    "type"
  >;
}) => (
  <FormItem>
    <FormLabel>Email</FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisis ton contenu" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {contentTypesKeys.map((key) => (
            <SelectItem value={key} key={key}>
              {contentTypes[key].name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <FormMessage />
  </FormItem>
);
