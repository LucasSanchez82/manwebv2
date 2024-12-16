'use client'
import ButtonAction from '@/components/global/Button.action'
import { useDialog } from '@/components/global/DialogResponsive/DialogResponsive.context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { deleteContentAction } from '@/lib/actions/contents.actions'
import convertBigIntToNumber from '@/lib/helpers/convertBigIntToNumber'
import useFetch from '@/lib/hooks/useFetch'
import { contentSchemaClientPartial } from '@/lib/schemas/contents/contentSchemaClient'
import { ContentSchemaClientPartial } from '@/lib/types/schemasTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ImageInput from '../../pages/home/Content/ImageInput'
import { PersonnalContent } from '@/lib/cachedRequests/content/getPersonnalContents'

const ContentCardEditedForm = (
  editedContent: ContentSchemaClientPartial &
    Pick<PersonnalContent, 'id'> & { imageUrl: string }
) => {
  const { refetch, isLoading } = useFetch()
  const router = useRouter()
  const { setOpen } = useDialog()

  const form = useForm({
    resolver: zodResolver(contentSchemaClientPartial.partial()),
    defaultValues: { ...editedContent, image: undefined },
  })

  const handleDeleteContent = async () => {
    const res = await deleteContentAction(editedContent.id)
    router.refresh()
    setOpen(false)
    return res
  }

  const onSubmit = (submissionData: ContentSchemaClientPartial) => {
    const { image: unknownImage, ...submissionDataProps } = submissionData
    const image =
      unknownImage instanceof FileList ? unknownImage[0] : unknownImage
    const submissionDataWithImageAndId = {
      ...submissionDataProps,
      image,
      id: convertBigIntToNumber(editedContent.id),
    }
    const formdata = new FormData()
    Object.entries(submissionDataWithImageAndId).forEach(([key, value]) => {
      const okValue = typeof value === 'number' ? value.toString() : value || ''
      if (value) formdata.append(key, okValue)
    })

    refetch('/api/contents', {
      method: 'PUT',
      body: formdata,
    }).then((fetchedState) => {
      try {
        if (!fetchedState.isLoading && fetchedState.error) {
          toast.error("Erreur lors de l'ajout de ce contenu")
        } else {
          toast.success('Contenu modifié avec succès')
          form.reset()
          router.refresh()
          setOpen(false)
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur inconnue (error n'est pas une instance de Error)"
        )
      }
    })
  }
  const friendlyNames: { [key in keyof ContentSchemaClientPartial]: string } = {
    title: 'Titre',
    readerUrl: 'URL',
    image: 'Image',
    chapter: 'Chapitre',
    description: 'Description',
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      friendlyNames[
                        field.name as keyof ContentSchemaClientPartial
                      ] + '...'
                    }
                    className="bg-white/20"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'description'}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ''}
                    placeholder={
                      friendlyNames[
                        field.name as keyof ContentSchemaClientPartial
                      ] + '...'
                    }
                    className="bg-white/20"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'readerUrl'}
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ''}
                    placeholder={
                      friendlyNames[
                        field.name as keyof ContentSchemaClientPartial
                      ] + '...'
                    }
                    className="bg-white/20"
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
          <section className="flex w-full justify-around">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'En cours...' : 'Modifier'}
            </Button>

            <ButtonAction
              variant="destructive"
              action={handleDeleteContent}
              pendingText="Suppression en cours..."
            >
              Supprimer
            </ButtonAction>
          </section>
        </form>
      </Form>
      {/* <form action={dele}></form> */}
    </>
  )
}

export default ContentCardEditedForm
