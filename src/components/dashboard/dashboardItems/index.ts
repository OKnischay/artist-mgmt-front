import { getUser } from "@/lib/get-user";
import { House, Users, Music,Disc } from "lucide-react"


export const userSidebarItems = () => {
    const user = getUser();

    const sidebarItems = [
    { 
        title: "Home",
        url: "/",
        icon: House
    },
    // { 
    //     title: "Artists", 
    //     url: "/artists",
    //     icon: Users
    // },
    { 
        title: "Songs",
        url: "/songs",
        icon: Music 
    },
    { 
        title: "Albums",
        url: "/albums",
        icon: Disc 
    },

  ];

  if (user?.role === "Artist Manager") {
    sidebarItems.splice(1, 0, { 
        title: "Artists", 
        url: "/artists",
        icon: Users
    });
    }
    return sidebarItems;
 
}