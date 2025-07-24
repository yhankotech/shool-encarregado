import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bot,
  Send,
  BookOpen,
  Lightbulb,
  Users,
  Target,
  MessageCircle,
  Heart
} from 'lucide-react';

interface Conversa {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  hora: string;
}

const conversasExemplo: Conversa[] = [
  {
    id: '1',
    pergunta: 'Como posso ajudar meu filho a melhorar em matemática?',
    resposta: 'Aqui estão algumas estratégias eficazes para apoiar seu filho em matemática:\n\n1. **Prática regular**: Estabeleça um horário diário de estudo\n2. **Jogos educativos**: Use aplicativos e jogos que tornem a matemática divertida\n3. **Conexão com o cotidiano**: Mostre como a matemática está presente no dia a dia\n4. **Paciência e encorajamento**: Celebre pequenos progressos\n5. **Comunicação com o professor**: Mantenha contato regular para acompanhar o progresso\n\nLembre-se: cada criança tem seu próprio ritmo de aprendizagem!',
    categoria: 'apoio_academico',
    hora: '14:30'
  },
  {
    id: '2',
    pergunta: 'Meu filho está desmotivado com os estudos. O que fazer?',
    resposta: 'A desmotivação é comum e pode ser superada com as estratégias certas:\n\n• **Identifique a causa**: Converse para entender o que está acontecendo\n• **Estabeleça metas pequenas**: Objetivos alcançáveis geram confiança\n• **Crie um ambiente de estudo**: Espaço organizado e sem distrações\n• **Reconheça esforços**: Valorize o processo, não apenas os resultados\n• **Varie as atividades**: Alterne entre diferentes tipos de estudo\n• **Busque ajuda profissional**: Se necessário, considere apoio psicopedagógico',
    categoria: 'motivacao',
    hora: '13:15'
  }
];

const sugestoes = [
  { texto: 'Como criar uma rotina de estudos eficaz?', categoria: 'organizacao' },
  { texto: 'Meu filho tem dificuldades de concentração', categoria: 'concentracao' },
  { texto: 'Como lidar com ansiedade antes das provas?', categoria: 'emocional' },
  { texto: 'Estratégias para melhorar a leitura', categoria: 'leitura' }
];

const recursosIA = [
  {
    titulo: 'Plano de Estudos Personalizado',
    descricao: 'Crie rotinas de estudo adaptadas ao perfil do seu educando',
    icon: Target,
    categoria: 'planejamento'
  },
  {
    titulo: 'Atividades Educativas',
    descricao: 'Sugestões de jogos e exercícios para reforçar o aprendizado',
    icon: BookOpen,
    categoria: 'atividades'
  },
  {
    titulo: 'Apoio Emocional',
    descricao: 'Orientações para lidar com questões emocionais e motivacionais',
    icon: Heart,
    categoria: 'emocional'
  },
  {
    titulo: 'Comunicação Escola-Casa',
    descricao: 'Dicas para melhorar a parceria com professores e escola',
    icon: Users,
    categoria: 'comunicacao'
  }
];

export function IAAssistant() {
  const [conversas, setConversas] = useState<Conversa[]>(conversasExemplo);
  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    setLoading(true);
    
    // Simular resposta da IA
    setTimeout(() => {
      const novaConversa: Conversa = {
        id: Date.now().toString(),
        pergunta: pergunta,
        resposta: 'Esta é uma resposta simulada da IA especializada em educação familiar. Em um sistema real, aqui seria integrada uma API de IA que forneceria orientações personalizadas baseadas em pedagogia, psicologia educacional e melhores práticas para apoio familiar no processo de aprendizagem.',
        categoria: 'geral',
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversas([novaConversa, ...conversas]);
      setPergunta('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Bot className="mr-3 h-8 w-8 text-blue-600" />
            Assistente IA Familiar
          </h1>
          <p className="text-muted-foreground">Seu parceiro inteligente para apoiar o sucesso educacional dos seus filhos</p>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat IA</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área de Chat */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Conversar com a IA
                </CardTitle>
                <CardDescription>
                  Faça perguntas sobre educação, desenvolvimento infantil, estratégias de estudo e apoio familiar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Faça sua pergunta sobre como apoiar seu educando: dificuldades de aprendizagem, motivação, rotina de estudos, relacionamento com professores..."
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    className="flex-1 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={enviarPergunta} 
                  disabled={loading || !pergunta.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Bot className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Pergunta
                    </>
                  )}
                </Button>

                {conversas.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <Separator />
                    <h3 className="font-semibold">Conversas Recentes</h3>
                    <ScrollArea className="h-96">
                      <div className="space-y-4">
                        {conversas.slice(0, 3).map((conversa) => (
                          <div key={conversa.id} className="p-4 border rounded-lg space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{conversa.pergunta}</p>
                                <p className="text-xs text-muted-foreground">{conversa.hora}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-green-100 rounded-full">
                                <Bot className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-line">{conversa.resposta}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sugestões */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Sugestões
                </CardTitle>
                <CardDescription>Tópicos populares para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sugestoes.map((sugestao, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setPergunta(sugestao.texto)}
                    >
                      <div>
                        <p className="text-sm font-medium">{sugestao.texto}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {sugestao.categoria}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recursos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recursosIA.map((recurso, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <recurso.icon className="mr-2 h-5 w-5 text-blue-600" />
                    {recurso.titulo}
                  </CardTitle>
                  <CardDescription>{recurso.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{recurso.categoria}</Badge>
                    <Button size="sm">
                      Usar Recurso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Todas as suas interações com a IA familiar</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {conversas.map((conversa) => (
                    <div key={conversa.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{conversa.categoria}</Badge>
                        <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                      </div>
                      <p className="font-medium text-sm mb-2">{conversa.pergunta}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {conversa.resposta}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Ver Completo
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}