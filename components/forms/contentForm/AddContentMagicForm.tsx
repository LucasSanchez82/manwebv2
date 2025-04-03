'use client'

import { AutoComplete } from '@/components/global/Autocomplete'
import ButtonAction from '@/components/global/Button.action'
import { useDialog } from '@/components/global/DialogResponsive/DialogResponsive.context'
import ContentCardProvider from '@/components/pages/home/Content/ContentCard.provider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { getContentsFromMangadexAction } from '@/lib/actions/external/mangadex/mangadex.action'
import useFetch from '@/lib/hooks/useFetch'
import { ContentSchemaFromProvider } from '@/lib/schemas/contents/contentSchema'
import { ContentTypeKey, getContentTypeKeyByName } from '@/prisma/constant'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type AllowedProvider = {
  type: ContentTypeKey
  provider: string
  label: string
  fn: (value: string) => Promise<ContentSchemaFromProvider[]>
  placeholder: string
}

const AddContentMagicForm = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedProviderLabel, setSelectedProviderLabel] = useState<
    string | null
  >(null)
  const [items, setItems] = useState<ContentSchemaFromProvider[]>([])
  const selectedItem: ContentSchemaFromProvider | undefined = items.find(
    (item) => item.uniqueIdentifier === selectedValue
  )
  const { setOpen } = useDialog()
  const router = useRouter()
  const { refetch } = useFetch()

  const allowedProviders: AllowedProvider[] = [
    {
      provider: 'mangadex',
      fn: getContentsFromMangadexAction,
      type: 'manga',
      label: 'Manga (Mangadex)',
      placeholder: 'ex: one piece...',
    },
    // {
    //   provider: 'phenixscan',
    //   fn: getContentsFromPhenixScanAction,
    //   type: 'manga',
    //   label: 'Manga (phenixscan)',
    //   placeholder: 'ex: one piece...',
    // },
  ]

  const handleClick = async () => {
    const selectedContent = {
      ...selectedItem,
      type: getContentTypeKeyByName(selectedItem?.type ?? 'other') ?? 'other',
      isSelfHosted: false,
      description: selectedItem?.description ?? '',
    }
    console.log(selectedContent)
    if (selectedContent) {
      const formdata = new FormData()

      Object.entries(selectedContent).forEach(([key, value]) => {
        const okValue = value?.toString()

        if (okValue) formdata.append(key, okValue)
      })
      await refetch('/api/contents', {
        method: 'POST',
        body: formdata,
      }).then((fetchedState) => {
        try {
          if (fetchedState.data) {
            setOpen(false)
            router.refresh()
          }
          if (!fetchedState.isLoading && fetchedState.error) {
            console.error('Error adding Content:', fetchedState.error)
            toast.error('Error adding manga. Please try again.')
          } else if (fetchedState.isLoading) {
            toast.loading('Adding content...')
          } else toast.success('contenu ajouté avec succès.')
        } catch (error) {
          console.error('Error submitting form:', error)
          toast.error('Error adding content. Please try again.')
        }
      })
    } else
      toast.error("Aucun contenu n'est compté comme séléctionné.", {
        description:
          'Veuillez essayer de séléctionner un contenu avant de continuer.',
      })
  }

  const handleSearchValueChange = async (
    value: string,
    _: AbortSignal,
    searchIsDebouncing: Dispatch<SetStateAction<boolean>>
  ) => {
    const usedProvider: (typeof allowedProviders)[number] | undefined =
      allowedProviders.find(
        (provider) => provider.label === selectedProviderLabel
      )
    if (usedProvider) {
      searchIsDebouncing(true)
      usedProvider.fn(value).then((content) => {
        setItems(content)
        searchIsDebouncing(false)
      })
    } else {
      toast.error('Fournisseur de contenu non trouvé.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un contenu</CardTitle>
        <CardDescription>
          Ajouter un contenu à votre liste de lecture
        </CardDescription>
        <div className="flex flex-col gap-2">
          <Select onValueChange={setSelectedProviderLabel}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Quel type de contenu ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allowedProviders.map((content) => (
                  <SelectItem value={content.label} key={content.provider}>
                    {content.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedProviderLabel &&
            allowedProviders.find(
              (provider) => provider.label === selectedProviderLabel
            ) && (
              <AutoComplete
                emptyMessage="Aucun contenu trouvé"
                onSearchValueChange={handleSearchValueChange}
                selectedValue={selectedValue}
                onSelectedValueChange={setSelectedValue}
                placeholder={
                  allowedProviders.find(
                    (provider) => provider.type === selectedProviderLabel
                  )?.placeholder
                }
                items={items.map((item) => ({
                  value: item.uniqueIdentifier,
                  label: item.title,
                }))}
              />
            )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedItem && (
          <section className="flex flex-col justify-center gap-4">
            <ContentCardProvider
              {...{
                ...selectedItem,
                isSelfHosted: false,
                description: selectedItem.description,
                readerUrl: selectedItem.readerUrl,
              }}
            ></ContentCardProvider>
            <ButtonAction action={handleClick}>Ajouter</ButtonAction>
          </section>
        )}
      </CardContent>
    </Card>
  )
}

export default AddContentMagicForm
