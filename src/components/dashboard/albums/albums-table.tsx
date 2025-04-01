"use client";
import Loading from "@/components/common/loading";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Album } from "./types/albums";
import { columns } from "./albums-table-fields";
import { useEffect, useState } from "react";

const AlbumsTable = () => {
  const [data, setData] = useState<Album[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/apps/albums/");
        setData(response.data); 
      } catch (err) {
        setError("Failed to fetch albums.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full space-y-6 p-6">
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Albums</h1>
        <p className="text-muted-foreground">Manage albums profiles and details</p>
      </div>
      <Link href = "albums/add">
      <Button onClick={() => console.log("Add new album")}>
        <Plus className="mr-2 h-4 w-4" />
        Add Album
      </Button>
      </Link>
    </header>

    <Card className=" w-full overflow-hidden border shadow-sm">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <CardTitle className="text-lg font-semibold">Albums Directory</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <DataTable columns={columns} data={data ?? []}  />
        )}
      </CardContent>
    </Card>
  </div>
  );
};

export default AlbumsTable;
