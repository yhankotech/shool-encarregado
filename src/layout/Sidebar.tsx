import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from "react-router-dom";

import {
  Home,
  CreditCard,
  GraduationCap,
  MessageCircle,
  Bell,
  Calendar,
  BarChart3,
  Bot,
  User,
  ChevronLeft,
  ChevronRight,
} from '../lib/icons';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard, badge: 2 },
  { id: 'notasepauta', label: 'Notas & Pauta', icon: GraduationCap },
  { id: 'desempenho', label: 'Desempenho', icon: BarChart3 },
  { id: 'chat', label: 'Mensagens', icon: MessageCircle, badge: 1 },
  { id: 'notificacoes', label: 'Notificações', icon: Bell, badge: 3 },
  { id: 'atividades', label: 'Atividades', icon: Calendar },
  { id: 'assistente', label: 'Assistente IA', icon: Bot },
  { id: 'perfil', label: 'Perfil', icon: User }
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Portal do Encarregado</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className={cn("p-2", collapsed && "px-1")}>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full mb-1 h-10 bg-white text-black border border-blue-600 flex justify-center",
                collapsed && "px-2",
                activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700 flex justify-center"
              )}
              onClick={
                () => {
                  onTabChange(item.id);
                  navigate("/" + item.id)
                }
              }
            >
              <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}