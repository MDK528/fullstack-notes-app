import { Archive, Calendar, ChevronUp, Home, icons, Inbox, LogOut, Search, Settings, User2 } from "lucide-react"
import
  {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
  } from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import ThemeBtn from "./ThemeBtn"
import authService from "@/services/auth.service"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export function AppSidebar() {

  const items = [
    {
      title: "Home",
      url: "/notes",
      icon: Home,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Archive",
      url: "#",
      icon: Archive
    }
  ]
  const navigate = useNavigate()
  const logout = async (e)=> {
    await authService.logout()
    navigate('/')
  }
  const [hide, setHide] = useState(true)
  const handleHide = (e) =>{
    e.preventDefault()
    setHide(prev=>!prev)
  }

  const [user, setUser] = useState(null)
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData.data)
      } catch (error) {
        console.log("Something went wrong while fetching user: ", error)
      }
    }

    fetchUser()
  },[])
  return (

    <Sidebar collapsible="icon">
      <div className="flex justify-between mx-2 my-2">
          { hide ?  <h1 className="text-xl ml-2">AI Note</h1> : ''}
          <SidebarTrigger className={'cursor-pointer ml-0.5'} onClick={handleHide}/>
      </div>
      <SidebarContent >
        <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu> 
        </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
           <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton>
                  <User2 /> {user ? user.fullName : 'Name'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
                <DropdownMenuContent
                side="bottom"
                className="border bg-card border-neutral-300 dark:border-neutral-700  rounded-md mx-2 min-w-60 "
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <button className="cursor-pointer py-2 px-2 flex items-center gap-4 w-full"><User2 height={16} width={16}/><span>Account</span></button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ThemeBtn className="cursor-pointer py-2 px-2 flex items-center gap-4 w-full"><span>Theme</span></ThemeBtn>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={logout} className="cursor-pointer py-2 px-2 flex items-center gap-4 w-full"><LogOut height={16} width={16}/><span>Sign out</span></button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>

            </DropdownMenu>


          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  )
}