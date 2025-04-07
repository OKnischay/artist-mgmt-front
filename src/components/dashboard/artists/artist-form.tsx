"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";

import { createArtist } from "@/api/artist-api";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import CustomDatePicker from "@/components/common/date-picker";
import { ArtistSchema } from "./schema/artist.schema";



const ArtistForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ArtistSchema>>({
    resolver: zodResolver(ArtistSchema),
    defaultValues: {
      email: "",
      password: "",
      stage_name: "",
      first_name: "",
      last_name: "",
      first_release_year: 2000,
      no_of_albums_released: 1,
      address: "",
    },
  });

  const { mutate, isPending } = useMutation<any, Error, FormData>({
    mutationFn: createArtist,
    onSuccess: () => {
      toast.success("Artist created successfully");
      form.reset();
      router.replace("/artists");
    },
    onError: (error) => toast.error(error.message || 'Failed to create artist'),
  });
  
  const onSubmit = (data: z.infer<typeof ArtistSchema>) => {
    const formData = new FormData();
  
    formData.append("stage_name", data.stage_name);
    formData.append("address", data.address || "");
    formData.append("gender", data.gender);
    
    if (data.date_of_birth) {
      formData.append("date_of_birth", data.date_of_birth.toISOString().split('T')[0]);
    }
    
    formData.append("first_name", data.first_name || "");
    formData.append("last_name", data.last_name || "");
    formData.append("first_release_year", String(data.first_release_year));
    formData.append("no_of_albums_released", String(data.no_of_albums_released));
  
    formData.append("users[email]", data.email);
    formData.append("users[password]", data.password);
    formData.append("role", "Artist");
    formData.append("is_active", "true");
    mutate(formData);
  };

  const textFields = [
    { name: "email", label: "Email*", type: "email", placeholder: "artist@gmail.com" },
    { name: "password", label: "Password*", type: "password", placeholder: "••••••••" },
    { name: "stage_name", label: "Stage Name*", type: "text", placeholder: "Enter stage name" },
    { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
    { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
    { name: "address", label: "Address", type: "text", placeholder: "Enter address" },
  ];

  const numberFields = [
    { name: "first_release_year", label: "First Release Year*", min: 1950, placeholder: "2000", defaultValue: 2000 },
    { name: "no_of_albums_released", label: "Albums Released*", min: 1, placeholder: "1", defaultValue: 1 },
  ];

  const renderTextField = (field:any) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              {...formField}
              type={field.type}
              placeholder={field.placeholder}
              value={formField.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderNumberField = (field:any) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              {...formField}
              type="number"
              min={field.min}
              placeholder={field.placeholder}
              value={formField.value || field.defaultValue}
              onChange={(e) => formField.onChange(e.target.value ? Number(e.target.value) : field.defaultValue)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="bg-zinc-800 p-4 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">New Artist Registration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-1">Required Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {textFields.slice(0, 2).map(renderTextField)}
                </div>
                
                {renderTextField(textFields[2])}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {numberFields.map(renderNumberField)}
                </div>
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender*</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-1">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {textFields.slice(3, 5).map(renderTextField)}
                </div>
                
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <CustomDatePicker 
                          value={field.value || null} 
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {renderTextField(textFields[5])}
              </div>

              <CardFooter className="px-0 pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-zinc-800 text-white"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Artist"
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

export default ArtistForm;