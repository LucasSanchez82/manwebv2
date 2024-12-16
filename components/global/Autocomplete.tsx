import { cn } from '@/lib/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { Check } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'

type Props<T extends string> = {
  selectedValue: T
  onSelectedValueChange: (value: T) => void
  onSearchValueChange: (value: string, signal: AbortSignal) => Promise<void>
  items: { value: T; label: string }[]
  isLoading?: boolean
  emptyMessage?: string
  placeholder?: string
  debounceTime?: number
}

export function AutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'No items.',
  placeholder = 'Search...',
  debounceTime = 300,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const lastSearchTermRef = useRef('')
  const controllerRef = useRef<AbortController | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cancel any ongoing search when component unmounts or search changes
  const cancelOngoingSearch = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort()
      controllerRef.current = null
    }
  }, [])

  // Debounced search effect
  useEffect(() => {
    // Cancel any ongoing search
    cancelOngoingSearch()

    // Create a new AbortController for this search
    const controller = new AbortController()
    controllerRef.current = controller

    // Perform the search
    const performSearch = async () => {
      try {
        // Only search if the term is different from the last searched term
        if (searchInput !== lastSearchTermRef.current) {
          await onSearchValueChange(searchInput, controller.signal)

          // Update the last searched term only after successful search
          lastSearchTermRef.current = searchInput
        }
      } catch (error) {
        // Check if the error is an abort error
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Search was cancelled')
        } else {
          console.error('Search error:', error)
        }
      }
    }

    // Create a debounce timeout
    const timeoutId = setTimeout(performSearch, debounceTime)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      cancelOngoingSearch()
    }
  }, [searchInput, debounceTime, onSearchValueChange, cancelOngoingSearch])

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label
          return acc
        },
        {} as Record<string, string>
      ),
    [items]
  )

  const reset = useCallback(() => {
    onSelectedValueChange('' as T)
    setSearchInput('')
    lastSearchTermRef.current = ''
  }, [onSelectedValueChange])

  const onSelectItem = useCallback(
    (inputValue: string) => {
      if (inputValue === selectedValue) {
        reset()
      } else {
        onSelectedValueChange(inputValue as T)
        setSearchInput(labels[inputValue] ?? '')
        lastSearchTermRef.current = labels[inputValue] ?? ''
      }
      setOpen(false)
      // Focus the input after selection
      setTimeout(() => inputRef.current?.focus(), 0)
    },
    [selectedValue, labels, onSelectedValueChange, reset]
  )

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              ref={inputRef}
              asChild
              value={searchInput}
              onValueChange={(value) => {
                setSearchInput(value)
                // Focus the input after value change
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
              onKeyDownCapture={(e) => setOpen(e.key !== 'Escape')}
              onMouseDown={() => setOpen((open) => !open)}
              onFocus={() => setOpen(true)}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute('cmdk-input')
              ) {
                e.preventDefault()
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading && (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedValue === option.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {!isLoading && (
                <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
              )}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
