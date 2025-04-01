import { ColumnDef } from "@tanstack/react-table";
import { Album } from "./types/albums";


export const columns: ColumnDef<Album>[] = [
  { accessorKey: "album_name", header: "Title" },
  { accessorKey: "total_tracks", header: "Total Tracks" },
  { accessorKey: "artist.stage_name", header: "Artist" },
  { accessorKey: "release_date", header: "Release Date" },
];
