import React from 'react'
import SidebarComponent from '@/components/dashboard/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/header/navbar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <SidebarProvider>
                <SidebarComponent />
                <div className='w-full'>{
                    children}
                </div>
            </SidebarProvider>
        </div>
    );
}

