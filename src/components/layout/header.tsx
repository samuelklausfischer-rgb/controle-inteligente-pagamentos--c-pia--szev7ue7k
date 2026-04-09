import { LogOut, User } from 'react-router-dom'
import { Bell, Search, Menu, LogOut as LogOutIcon } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import logoUrl from '@/assets/f206e7ab-cff2-40e2-84e4-8cfaa32ecd1f-2869e.png'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.02)] px-4 backdrop-blur-xl sm:px-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-300">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:text-white/80" />
        <div className="hidden md:flex items-center gap-3">
          <img
            src={logoUrl}
            alt="PRN Financeiro Logo"
            className="h-6 w-6 object-contain drop-shadow-sm"
          />
          <h1 className="text-lg font-semibold text-white tracking-tight">PRN Financeiro</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hidden sm:flex"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
