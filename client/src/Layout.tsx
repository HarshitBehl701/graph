import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/my-components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
          <div className="main md:w-[80vw] w-[95vw] h-screen">
            <div className="children shrink-0 p-10">
              {children}
            </div>
          </div>
      </main>
    </SidebarProvider>
  );
}
