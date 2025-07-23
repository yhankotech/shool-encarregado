import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  BookOpen,
  Calendar,
  Edit,
  Eye,
  Send,
  Search,
  Filter
} from 'lucide-react';
import { planosAula, turmas } from '@/data/mockData';
import { PlanoAula } from '@/types';

export function PlanosAula() {
  const [selectedPlano, setSelectedPlano] = useState<PlanoAula | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const filteredPlanos = planosAula.filter(plano => {
    const matchesSearch = plano.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plano.disciplina.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || plano.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'default';
      case 'pendente': return 'secondary';
      case 'rascunho': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Planos de Aula</h1>
          <p className="text-muted-foreground">Gerencie seus planos de aula por turma e disciplina</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Criar Novo Plano de Aula</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do seu plano de aula
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <NovoPlanoForm />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar planos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Planos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlanos.map((plano) => (
          <Card key={plano.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{plano.titulo}</CardTitle>
                  <CardDescription className="mt-1">
                    {plano.disciplina} • {turmas.find(t => t.id === plano.turmaId)?.nome}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(plano.status)}>
                  {plano.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(plano.data).toLocaleDateString('pt-BR')}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Objetivos:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {plano.objetivos.slice(0, 2).map((objetivo, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className="line-clamp-2">{objetivo}</span>
                      </li>
                    ))}
                    {plano.objetivos.length > 2 && (
                      <li className="text-xs">+{plano.objetivos.length - 2} mais...</li>
                    )}
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPlano(plano)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {selectedPlano && (
        <Dialog open={!!selectedPlano} onOpenChange={() => setSelectedPlano(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                {selectedPlano.titulo}
              </DialogTitle>
              <DialogDescription>
                {selectedPlano.disciplina} • {turmas.find(t => t.id === selectedPlano.turmaId)?.nome} • 
                {new Date(selectedPlano.data).toLocaleDateString('pt-BR')}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <DetalhesPlano plano={selectedPlano} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function NovoPlanoForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="titulo">Título da Aula</Label>
          <Input id="titulo" placeholder="Ex: Equações do 2º Grau" />
        </div>
        <div>
          <Label htmlFor="disciplina">Disciplina</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matematica">Matemática</SelectItem>
              <SelectItem value="fisica">Física</SelectItem>
              <SelectItem value="quimica">Química</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="turma">Turma</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a turma" />
            </SelectTrigger>
            <SelectContent>
              {turmas.map(turma => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome} - {turma.serie}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="data">Data da Aula</Label>
          <Input id="data" type="date" />
        </div>
      </div>

      <div>
        <Label htmlFor="objetivos">Objetivos da Aula</Label>
        <Textarea
          id="objetivos"
          placeholder="Liste os objetivos da aula, um por linha"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="conteudo">Conteúdo</Label>
        <Textarea
          id="conteudo"
          placeholder="Descreva o conteúdo que será abordado"
          className="min-h-[120px]"
        />
      </div>

      <div>
        <Label htmlFor="metodologia">Metodologia</Label>
        <Textarea
          id="metodologia"
          placeholder="Descreva a metodologia de ensino que será utilizada"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="recursos">Recursos Necessários</Label>
        <Input id="recursos" placeholder="Ex: Quadro, calculadora, fichas..." />
      </div>

      <div>
        <Label htmlFor="avaliacao">Forma de Avaliação</Label>
        <Textarea
          id="avaliacao"
          placeholder="Como os alunos serão avaliados nesta aula"
          className="min-h-[80px]"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Salvar como Rascunho</Button>
        <Button>Enviar para Aprovação</Button>
      </div>
    </div>
  );
}

function DetalhesPlano({ plano }: { plano: PlanoAula }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Disciplina</Label>
          <p className="text-sm text-muted-foreground">{plano.disciplina}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Turma</Label>
          <p className="text-sm text-muted-foreground">
            {turmas.find(t => t.id === plano.turmaId)?.nome}
          </p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Objetivos</Label>
        <ul className="mt-2 space-y-1">
          {plano.objetivos.map((objetivo, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="mr-2 text-blue-600">•</span>
              {objetivo}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Label className="text-sm font-medium">Conteúdo</Label>
        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {plano.conteudo}
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium">Metodologia</Label>
        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {plano.metodologia}
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium">Recursos Necessários</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {plano.recursos.map((recurso, index) => (
            <Badge key={index} variant="outline">{recurso}</Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Avaliação</Label>
        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {plano.avaliacao}
        </p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Enviar para Supervisor
        </Button>
      </div>
    </div>
  );
}