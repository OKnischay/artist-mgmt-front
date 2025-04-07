import { ColumnDef } from "@tanstack/react-table";
import { Music2, Edit2, Trash2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Artist } from "./types/artist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtist } from "@/api/artist-api";
import { DeleteAlert } from "@/components/common/delete-alert";

export const columns: ColumnDef<Artist>[] = [
    {
        accessorKey: "stage_name",
        header: "Artist",
        cell: ({ row }) => {
            const { stage_name, first_name, last_name } = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Music2 className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="font-medium">{stage_name}</div>
                        <div className="text-xs text-muted-foreground">
                            {first_name} {last_name}
                        </div>
                    </div>
                </div>
            );
        },
    },
    { accessorKey: "gender", header: "Gender" },
    {
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: ({ row }) => format(new Date(row.original.date_of_birth), "MMM d, yyyy"),
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div className="flex items-center">
                <MapPin className="mr-2 h-3 w-3 text-muted-foreground" />
                {row.original.address}
            </div>
        ),
    },
    { accessorKey: "first_release_year", header: "Debut Year" },
    {
        accessorKey: "no_of_albums_released",
        header: "Albums",
        cell: ({ row }) => (
            <Badge variant="outline" className="h-5 px-1.5">
                {row.original.no_of_albums_released}
            </Badge>
        ),
    },
    { accessorKey: "user.email", header: "Account" },
    {
        id: "actions",
        cell: ({ row }) => {
            const queryClient = useQueryClient();
            const { mutate, isPending: isDeleting } = useMutation({
                mutationFn: deleteArtist,
                onSuccess: () => {
                    queryClient.invalidateQueries(
                        { queryKey: ["artists"] }
                    );
                    console.log("Artist deleted successfully");
                },
                onError: (error) => {
                    console.error("Error deleting artist:", error);
                }

            })
            return <div className="flex justify-end gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log("Edit:", row.original)}
                    className="h-8 w-8"
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
                {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => mutate(row.original.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    disabled={isDeleting}
                    >
                    <Trash2 className="h-4 w-4" />
                </Button> */}
                <div>
                    <DeleteAlert
                        onConfirm={() => mutate(row.original.id)}
                        isDeleting={isDeleting}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            disabled={isDeleting}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </DeleteAlert>
                </div>
            </div>
        },
    },
];