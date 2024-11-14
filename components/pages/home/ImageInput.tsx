import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Control } from "react-hook-form";

interface ImageInputProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  control,
  name,
  defaultValue = "",
}) => {
  const [useUrl, setUseUrl] = useState(false);
  const [inputValue, setInputValue] = useState<File | string | null>(
    defaultValue
  );

  return (
    <>
      {/* Image Toggle */}
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            checked={!useUrl}
            onChange={() => setUseUrl(false)}
          />
          Upload File
        </label>
        <label>
          <input
            type="radio"
            checked={useUrl}
            onChange={() => setUseUrl(true)}
          />
          Use URL
        </label>
      </div>

      {useUrl ? (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={typeof inputValue === "string" ? inputValue : ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setInputValue(newValue);
                    field.onChange(newValue);
                  }}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormDescription>Enter the URL of the image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setInputValue(file);
                      field.onChange(file); // Pass single file instead of FileList
                    }
                  }}
                  value={inputValue instanceof File ? "" : undefined} // Ensure the input is controlled
                />
              </FormControl>
              <FormDescription>Upload an image file.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default ImageInput;
