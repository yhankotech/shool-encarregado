import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Pagamentos } from '@/components/pagamentos/Pagamentos';
import { NotasPauta } from '@/components/notas/NotasPauta';
import { Desempenho } from '@/components/desempenho/Desempenho';
import { Chat } from '@/components/chat/Chat';
import { IAAssistant } from '@/components/ia/IAAssistant';
import { Notificacoes } from '@/components/notificacoes/Notificacoes';
import { Atividades } from '@/components/atividades/Atividades';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'pagamentos':
        return <Pagamentos />;
      case 'notas':
        return <NotasPauta />;
      case 'desempenho':
        return <Desempenho />;
      case 'chat':
        return <Chat />;
      case 'ia-assistant':
        return <IAAssistant />;
      case 'notificacoes':
        return <Notificacoes />;
      case 'atividades':
        return <Atividades />;
      case 'perfil':
        return (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Perfil do Encarregado</h1>
            <p className="text-muted-foreground">Módulo em desenvolvimento...</p>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Configurações</h1>
            <p className="text-muted-foreground">Módulo em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default App;