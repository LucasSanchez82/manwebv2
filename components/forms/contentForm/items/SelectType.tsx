'use client'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { contentSchemaClient } from '@/lib/schemas/contents/contentSchemaClient'
import { contentTypes, contentTypesKeys } from '@/prisma/constant'
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { z } from 'zod'
export const SelectType = ({
  field,
}: {
  field: ControllerRenderProps<z.infer<typeof contentSchemaClient>, 'type'>
}) => (
  <FormItem>
    <FormLabel>Type</FormLabel>
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
)
