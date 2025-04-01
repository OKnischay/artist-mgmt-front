export type Album = {
  album_name: string;
  total_tracks: string;
  artist: {
    stage_name: string;
  };
  release_date: Date;
}