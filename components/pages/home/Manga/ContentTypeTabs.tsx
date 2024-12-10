"use client";
import { Tabs } from "@/components/ui/tabs";
import {
  ContentTypeKey,
  contentTypes,
  contentTypesKeys,
  contentTypesValues,
} from "@/prisma/constant";
import { PropsWithChildren, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isInArray } from "@/lib/utils";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import useCustomSearchParams from "@/lib/hooks/useCustomSearchParams";
export function ContentTypestabs({
  children,
  currentTab,
}: PropsWithChildren<{
  currentTab: ContentTypeKey;
}>) {
  const [selectedValues, setSelectedValues] = useState<ContentTypeKey[]>([]);
  const { pushQuery, removeQuery, getQuery } = useCustomSearchParams();
  const types = getQuery("types")?.split(",");
  const handleValueChange = (values: ContentTypeKey[]) => {
    const okValues = values.filter((value) => contentTypesKeys.includes(value));
    if (okValues) {
      // si certains elements au moins sont bons
      pushQuery("types", okValues.join(","));
    } else {
      toast.error(
        "Les valeurs ne correspondent pas avec celles prevues, si cela se reproduit veuillez contacter le support"
      );
    }
  };

  return (
    <Tabs defaultValue={currentTab} className="m-auto w-fit">
      <ToggleGroup
        type="multiple"
        defaultValue={types}
        onValueChange={handleValueChange}
      >
        {contentTypesKeys.map((key) => (
          <ToggleGroupItem
            value={key}
            aria-label={`Toggle ${contentTypes[key].name}`}
            key={key}
          >
            {contentTypes[key].name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {children}
    </Tabs>
  );
}
