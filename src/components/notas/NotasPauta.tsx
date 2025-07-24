import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Eye,
  Mail,
  Calendar
} from 'lucide-react';
import { educandos, professores } from '@/data/mockData';
import { Educando } from '@/types';

export function NotasPauta() {
  const [educandoSelecionado, setEducandoSelecionado] = useState<Educando>(educandos[0]);
  const [trimestreSelecionado, setTrimestreSelecionado] = useState('1');

  const calcularMedia = (educando: Educando, disciplina?: string, trimestre?: number) => {
    let notasFiltradas = educando.notas;
    
    if (disciplina) {
      notasFiltradas = notasFiltradas.filter(n => n.disciplina === disciplina);
    }
    
    if (trimestre) {
      notasFiltradas = notasFiltradas.filter(n => n.trimestre === trimestre);
    }
    
    if (notasFiltradas.length === 0) return 0;
    
    const soma = notasFiltradas.reduce((acc, nota) => acc + nota.valor, 0);
    return Math.round((soma / notasFiltradas.length) * 10) / 10;
  };

  const getStatusNota = (media: number) => {
    if (media >= 14) return { status: 'Aprovado', color: 'default', icon: TrendingUp };
    if (media >= 10) return { status: 'Recuperação', color: 'secondary', icon: Minus };
    return { status: 'Reprovado', color: 'destructive', icon: TrendingDown };
  };

  const obterNotasPorDisciplina = (educando: Educando) => {
    const disciplinas = [...new Set(educando.notas.map(n => n.disciplina))];
    
    return disciplinas.map(disciplina => {
      const notasDisciplina = educando.notas.filter(n => n.disciplina === disciplina);
      const mediaGeral = calcularMedia(educando, disciplina);
      const mediaT1 = calcularMedia(educando, disciplina, 1);
      const mediaT2 = calcularMedia(educando, disciplina, 2);
      const mediaT3 = calcularMedia(educando, disciplina, 3);
      
      return {
        disciplina,
        notas: notasDisciplina,
        mediaGeral,
        mediaT1,
        mediaT2,
        mediaT3,
        professor: professores.find(p => p.disciplinas.includes(disciplina))
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <GraduationCap className="mr-3 h-8 w-8" />
            Notas & Pauta
          </h1>
          <p className="text-muted-foreground">Acompanhe o desempenho acadêmico dos seus educandos</p>
        </div>
        
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Boletim
        </Button>
      </div>

      {/* Seleção de Educando */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select value={educandoSelecionado.id} onValueChange={(value) => {
            const educando = educandos.find(e => e.id === value);
            if (educando) setEducandoSelecionado(educando);
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {educandos.map(educando => (
                <SelectItem key={educando.id} value={educando.id}>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={educando.avatar} alt={educando.nome} />
                      <AvatarFallback className="text-xs">
                        {educando.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{educando.nome} - {educando.turma}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Select value={trimestreSelecionado} onValueChange={setTrimestreSelecionado}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1º Trimestre</SelectItem>
              <SelectItem value="2">2º Trimestre</SelectItem>
              <SelectItem value="3">3º Trimestre</SelectItem>
              <SelectItem value="geral">Média Geral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pauta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pauta">Pauta Geral</TabsTrigger>
          <TabsTrigger value="disciplinas">Por Disciplina</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="pauta">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={educandoSelecionado.avatar} alt={educandoSelecionado.nome} />
                      <AvatarFallback>
                        {educandoSelecionado.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {educandoSelecionado.nome}
                  </CardTitle>
                  <CardDescription>
                    {educandoSelecionado.turma} - {educandoSelecionado.serie} • 
                    {trimestreSelecionado === 'geral' ? ' Média Geral' : ` ${trimestreSelecionado}º Trimestre`}
                  </CardDescription>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {trimestreSelecionado === 'geral' 
                      ? calcularMedia(educandoSelecionado)
                      : calcularMedia(educandoSelecionado, undefined, parseInt(trimestreSelecionado))
                    }
                  </div>
                  <p className="text-sm text-muted-foreground">Média Geral</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead className="text-center">1º Trim</TableHead>
                      <TableHead className="text-center">2º Trim</TableHead>
                      <TableHead className="text-center">3º Trim</TableHead>
                      <TableHead className="text-center">Média</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {obterNotasPorDisciplina(educandoSelecionado).map((disciplinaData) => {
                      const statusInfo = getStatusNota(disciplinaData.mediaGeral);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <TableRow key={disciplinaData.disciplina}>
                          <TableCell className="font-medium">
                            {disciplinaData.disciplina}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {disciplinaData.professor?.avatar && (
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={disciplinaData.professor.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {disciplinaData.professor.nome.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <span className="text-sm">
                                {disciplinaData.professor?.nome || 'N/A'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold">
                              {disciplinaData.mediaT1 || '-'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold">
                              {disciplinaData.mediaT2 || '-'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold">
                              {disciplinaData.mediaT3 || '-'}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-lg font-bold">
                              {disciplinaData.mediaGeral}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={statusInfo.color  as unknown} className="flex items-center w-fit mx-auto bg-green-500">
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {statusInfo.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center space-x-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disciplinas">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {obterNotasPorDisciplina(educandoSelecionado).map((disciplinaData) => {
              const statusInfo = getStatusNota(disciplinaData.mediaGeral);
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={disciplinaData.disciplina}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{disciplinaData.disciplina}</CardTitle>
                      <Badge variant={statusInfo.color as unknown} className="flex items-center">
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusInfo.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Professor: {disciplinaData.professor?.nome || 'N/A'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-3xl font-bold">{disciplinaData.mediaGeral}</div>
                        <p className="text-sm text-muted-foreground">Média Geral</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Avaliações Realizadas:</h4>
                        {disciplinaData.notas
                          .filter(nota => trimestreSelecionado === 'geral' || nota.trimestre === parseInt(trimestreSelecionado))
                          .map((nota) => (
                            <div key={nota.id} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <div className="font-medium capitalize">{nota.tipo}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(nota.data).toLocaleDateString('pt-BR')} • {nota.trimestre}º Trimestre
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold">{nota.valor}</div>
                                <div className="text-sm text-muted-foreground">/ 20</div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="mr-2 h-4 w-4" />
                          Contactar Prof.
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Histórico de Avaliações - {educandoSelecionado.nome}
              </CardTitle>
              <CardDescription>Todas as avaliações realizadas por trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {[1, 2, 3].map(trimestre => {
                    const notasTrimestre = educandoSelecionado.notas.filter(n => n.trimestre === trimestre);
                    
                    if (notasTrimestre.length === 0) return null;

                    return (
                      <div key={trimestre} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">{trimestre}º Trimestre</h3>
                        <div className="space-y-2">
                          {notasTrimestre.map((nota) => (
                            <div key={nota.id} className="flex items-center justify-between p-2 bg-muted rounded">
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="text-xs">
                                  {nota.disciplina}
                                </Badge>
                                <span className="text-sm capitalize">{nota.tipo}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(nota.data).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">{nota.valor}</span>
                                <span className="text-xs text-muted-foreground">/ 20</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Média do Trimestre:</span>
                            <span className="text-xl font-bold text-blue-600">
                              {calcularMedia(educandoSelecionado, undefined, trimestre)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}