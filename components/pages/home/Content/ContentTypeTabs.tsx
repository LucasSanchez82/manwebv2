"use client";
import { Tabs } from "@/components/ui/tabs";
import {
  ContentTypeKey,
  contentTypes,
  contentTypesKeys,
} from "@/prisma/constant";
import { PropsWithChildren } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import useCustomSearchParams from "@/lib/hooks/useCustomSearchParams";
import { getManyKeysFromStr } from "@/lib/contentTypes.utils";
export function ContentTypesToggleGroups({
  children,
  currentTab,
}: PropsWithChildren<{
  currentTab: ContentTypeKey;
}>) {
  const { pushQuery, removeQuery, getQuery } = useCustomSearchParams();
  const types = getManyKeysFromStr(getQuery("types") || "");
  const handleValueChange = (values: ContentTypeKey[]) => {
    const okContentTypesKeys = values.filter((key) =>
      contentTypesKeys.includes(key)
    );
    const okContentTypesKeysIds = okContentTypesKeys.map(
      (value) => contentTypes[value].id
    );

    // si certains elements au moins sont bons
    if (okContentTypesKeys) {
      pushQuery("types", okContentTypesKeysIds.join(","));
    } else {
      toast.error(
        "Les valeurs ne correspondent pas avec celles prevues, si cela se reproduit veuillez contacter le support"
      );
    }
  };

  return (
    <section defaultValue={currentTab} className="m-auto my-4 w-fit">
      <ToggleGroup
        type="multiple"
        defaultValue={types}
        onValueChange={handleValueChange}
        className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
      >
        {contentTypesKeys.map((key) => (
          <ToggleGroupItem
            value={key}
            aria-label={`Toggle ${contentTypes[key].name}`}
            key={key}
            className="focus:not:hover:bg-none"
          >
            {contentTypes[key].name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {children}
    </section>
  );
}
