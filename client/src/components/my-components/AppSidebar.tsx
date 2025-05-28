import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { getDataTables } from "@/api/api_functions";
import {toast,ToastContainer} from "react-toastify";

export function AppSidebar() {
  const [dataTables, setDataTables] = useState<{id:number;is_active:string;name:string}[] | null>(null);

  useEffect(() => {
    if(dataTables === null)
    {
       (async () => {
      try {
        const response = await getDataTables();
        setDataTables(response.data)
      } catch (error) {
        toast.error("Failed to create data table");
      }
    })();
    }
  }, [dataTables]);

  return (
    <>
    
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataTables && dataTables.length > 0 &&  dataTables.map((table) => (
                <SidebarMenuItem key={table.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/table_form?id=${table.id}&name=${table.name}`}>
                      <span>{table.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <ToastContainer />
    </>
  )
}
