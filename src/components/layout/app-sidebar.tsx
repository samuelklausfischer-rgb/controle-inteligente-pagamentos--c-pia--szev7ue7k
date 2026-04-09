import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, FileText, Settings } from 'lucide-react'
import logoUrl from '@/assets/f206e7ab-cff2-40e2-84e4-8cfaa32ecd1f-2869e.png'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Recebedores',
    url: '/recebedores',
    icon: Users,
  },
  {
    title: 'Pagamentos',
    url: '/pagamentos',
    icon: CreditCard,
  },
  {
    title: 'Relatórios',
    url: '/relatorios',
    icon: FileText,
  },
  {
    title: 'Configurações',
    url: '/configuracoes',
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.15)] text-white shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300"
    >
      <SidebarHeader className="h-16 flex flex-row items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-3 font-semibold text-white overflow-hidden">
          <img
            src={logoUrl}
            alt="PRN Financeiro Logo"
            className="h-8 w-8 shrink-0 object-contain drop-shadow-md"
          />
          {state === 'expanded' && (
            <span className="truncate text-white text-lg tracking-tight">PRN Financeiro</span>
          )}
        </div>
        <SidebarTrigger className="shrink-0 text-white/70 hover:text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
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
    </Sidebar>
  )
}
