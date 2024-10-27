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
}

const ImageInput: React.FC<ImageInputProps> = ({ control, name }) => {
  const [useUrl, setUseUrl] = useState(false);
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
                  {...field}
                  value={field.value}
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
                  onChange={(e) => field.onChange(e.target.files)}
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
