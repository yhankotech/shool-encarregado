import { Dashboard } from '@/pages/dashboard/Dashboard';
import { Pagamentos } from '@/pages/pagamentos/Pagamentos';
import { NotasPauta } from '@/pages/notas/NotasPauta';
import { Desempenho } from '@/pages/desempenho/Desempenho';
import { Chat } from '@/pages/chat/Chat';
import { IAAssistant } from '@/pages/ia/IAAssistant';
import { Notificacoes } from '@/pages/notificacoes/Notificacoes';
import { Atividades } from '@/pages/atividades/Atividades';
import { ProfileView } from "@/pages/profile/ProfileView";

export const privateRoutes = [
    { path: "dashboard", element: (
        <Dashboard />
    ) },
    
    { path: "perfil", element: (
        <ProfileView />
    ) },
    { path: "atividades", element: (
        <Atividades />
    ) },

    { path: "notificacoes", element: (
        <Notificacoes />
    ) },

    { path: "assistente", element: (
        <IAAssistant />
    ) },

    { path: "chat", element: (
        <Chat />
    ) },

    { path: "desempenho", element: (
        <Desempenho />
    ) },

    { path: "notasepauta", element: (
        <NotasPauta />
    ) },

    { path: "pagamentos", element: (
        <Pagamentos />
    ) },
];