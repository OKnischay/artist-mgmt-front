"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query"; 
import { toast } from "react-toastify";
import { z } from "zod";

import { createAlbum} from "@/api/album-api"; 
import { getArtists } from "@/api/artist-api";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import CustomDatePicker from "@/components/date-picker";
import { AlbumSchema } from "./schema/album.schema";
import Loading from "@/components/common/loading";

interface Artist {
  id: string;
  stage_name: string;
}

const AlbumForm = () => {
  const router = useRouter();

  const { data: artists, isLoading: isArtistsLoading, error } = useQuery<Artist[], Error>({
    queryKey: ['artists'],
    queryFn: getArtists,
  });

  if (error) {
    toast.error("Failed to load artists");
  }

  const form = useForm<z.infer<typeof AlbumSchema>>({
    resolver: zodResolver(AlbumSchema),
    defaultValues: {
      album_name: "",
      release_date: new Date(),
      artist: "",
    },
  });

  const { mutate, isPending } = useMutation<any, Error, FormData>({
    mutationFn: createAlbum,
    onSuccess: () => {
      toast.success("Album created successfully");
      form.reset();
      router.replace("/albums");
    },
    onError: (error) => toast.error(error.message || 'Failed to create album'),
  });
  
  const onSubmit = (data: z.infer<typeof AlbumSchema>) => {
    const formData = new FormData();
    formData.append("album_name", data.album_name);
   
    if (data.release_date && data.release_date instanceof Date) {
        formData.append("release_date", data.release_date.toISOString().split('T')[0]);
      } else 
      {
        formData.append("release_date", new Date().toISOString().split('T')[0]);
      }
    
    formData.append("artist", data.artist);
    console.log(formData)
    mutate(formData);

  };

  const textFields = [
    { name: "album_name", label: "Album*", type: "text", placeholder: "Enter album name" },
  ];


  const renderTextField = (field: any) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name as keyof z.infer<typeof AlbumSchema>}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              {...formField}
              type={field.type}
              placeholder={field.placeholder}
              value={formField.value instanceof Date ? formField.value.toISOString() : formField.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );


  return (
    <div className="flex items-center justify-center h-screen p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="bg-zinc-800 p-4 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">New Album</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {textFields.map(renderTextField)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <FormField
                    control={form.control}
                    name="release_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Date*</FormLabel>
                        <FormControl>
                          <CustomDatePicker 
                            value={field.value} 
                            onChange={(date) => field.onChange(date)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value || ""}
                        disabled={isArtistsLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {isArtistsLoading ? (
                              <span>Loading artists...</span>
                            ) : (
                              <SelectValue placeholder="Select artist" />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {artists?.map((artists:any) => (
                            <SelectItem key={artists.id} value={artists.id}>
                              {artists.stage_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CardFooter className="px-0 pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-zinc-800 text-white hover:bg-zinc-700"
                  disabled={isPending || isArtistsLoading}
                >
                  {isPending ? (
                    <>
                      <Loading/>
                    </>
                  ) : (
                    "Create Album"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbumForm;