import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell, User, LogOut, Settings, CreditCard } from 'lucide-react';
import { encarregado, pagamentos } from '@/data/mockData';

export function Header() {
  const pagamentosAtrasados = pagamentos.filter(p => p.status === 'atrasado').length;
  const pagamentosPendentes = pagamentos.filter(p => p.status === 'pendente').length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Bem-vindo, {encarregado.nome}!
          </h2>
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Alerta de Pagamentos */}
          {(pagamentosAtrasados > 0 || pagamentosPendentes > 0) && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <CreditCard className="h-4 w-4 text-red-600" />
              <div className="text-xs">
                <p className="font-medium text-red-800">
                  {pagamentosAtrasados > 0 && `${pagamentosAtrasados} em atraso`}
                  {pagamentosAtrasados > 0 && pagamentosPendentes > 0 && ', '}
                  {pagamentosPendentes > 0 && `${pagamentosPendentes} pendente${pagamentosPendentes > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          )}

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={encarregado.avatar} alt={encarregado.nome} />
                  <AvatarFallback>
                    {encarregado.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{encarregado.nome}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {encarregado.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {encarregado.relacao}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}