import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
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
  Settings,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard, badge: 2 },
  { id: 'notas', label: 'Notas & Pauta', icon: GraduationCap },
  { id: 'desempenho', label: 'Desempenho', icon: BarChart3 },
  { id: 'chat', label: 'Mensagens', icon: MessageCircle, badge: 1 },
  { id: 'notificacoes', label: 'Notificações', icon: Bell, badge: 3 },
  { id: 'atividades', label: 'Atividades', icon: Calendar },
  { id: 'ia-assistant', label: 'Assistente IA', icon: Bot },
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
              <h1 className="text-lg font-bold text-gray-900">EduFamily</h1>
              <p className="text-xs text-gray-500">Portal do Encarregado</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Alerta de Pagamentos em Atraso */}
      {!collapsed && (
        <div className="p-3 m-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <div>
              <p className="text-xs font-medium text-red-800">Atenção!</p>
              <p className="text-xs text-red-600">2 pagamentos em atraso</p>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <nav className={cn("p-2", collapsed && "px-1")}>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start mb-1 h-10",
                collapsed && "px-2",
                activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">
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