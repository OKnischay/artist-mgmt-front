"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { columns } from "./artist-table-fields"
import Loading from "@/components/common/loading";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Artist } from "./types/artist";
import { getCookie } from "cookies-next";

const ArtistTable = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const token = getCookie("                                                                                                                                                                                                                                                                                                                                                 ");
      console.log("Token:",token);
      const { data } = await axios.get<Artist[]>("http://localhost:8000/api/apps/artists/",
        {
          headers: {
            Authorization: `Bearer ${token || "INVALID_TOKEN_TEST"}`, 
          },
        }
      );
      console.log("Response data:", data);
      setArtists(data);
    } catch (err) {
      console.error("Error fetching artists:", err);
      // toast.error("Failed to load artists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchArtists(); }, []);

  return (
    <div className="w-full space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Artists</h1>
          <p className="text-muted-foreground">Manage artist profiles and details</p>
        </div>
        <Link href="artists/add">
          <Button onClick={() => console.log("Add new artist")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Artist
          </Button>
        </Link>
      </header>

      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="bg-muted/50 px-6 py-4">
          <CardTitle className="text-lg font-semibold">Artists Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <Loading />
            </div>
          ) : (
            <DataTable columns={columns} data={artists} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistTable;