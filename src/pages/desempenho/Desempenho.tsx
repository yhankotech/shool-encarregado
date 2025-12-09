import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Calendar
} from 'lucide-react';
import { educandos, desempenho } from '@/data/mockData';
import { Educando } from '@/types';

export function Desempenho() {
  const [educandoSelecionado, setEducandoSelecionado] = useState<Educando>(educandos[0]);

  const calcularMediaPorTrimestre = (educando: Educando) => {
    const trimestres = [1, 2, 3];
    return trimestres.map(trimestre => {
      const notasTrimestre = educando.notas.filter(n => n.trimestre === trimestre);
      if (notasTrimestre.length === 0) return { trimestre: `${trimestre}º Trim`, media: 0 };
      
      const soma = notasTrimestre.reduce((acc, nota) => acc + nota.valor, 0);
      const media = Math.round((soma / notasTrimestre.length) * 10) / 10;
      
      return { trimestre: `${trimestre}º Trim`, media };
    });
  };

  const calcularMediaPorDisciplina = (educando: Educando) => {
    const disciplinas = [...new Set(educando.notas.map(n => n.disciplina))];
    
    return disciplinas.map(disciplina => {
      const notasDisciplina = educando.notas.filter(n => n.disciplina === disciplina);
      const soma = notasDisciplina.reduce((acc, nota) => acc + nota.valor, 0);
      const media = Math.round((soma / notasDisciplina.length) * 10) / 10;
      
      return { disciplina, media };
    });
  };

  const obterDesempenhoEducando = (educandoId: string) => {
    return desempenho.filter(d => d.educandoId === educandoId);
  };

  const calcularMediaGeral = (educando: Educando) => {
    if (educando.notas.length === 0) return 0;
    const soma = educando.notas.reduce((acc, nota) => acc + nota.valor, 0);
    return Math.round((soma / educando.notas.length) * 10) / 10;
  };

  const dadosRadar = calcularMediaPorDisciplina(educandoSelecionado).map(item => ({
    disciplina: item.disciplina.substring(0, 8),
    valor: item.media,
    maximo: 20
  }));

  const mediaGeral = calcularMediaGeral(educandoSelecionado);
  const desempenhoEducando = obterDesempenhoEducando(educandoSelecionado.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Target className="mr-3 h-8 w-8" />
            Análise de Desempenho
          </h1>
          <p className="text-muted-foreground">Acompanhe o progresso acadêmico detalhado dos seus educandos</p>
        </div>
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
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaGeral}</div>
            <p className="text-xs text-muted-foreground">
              {mediaGeral >= 14 ? 'Excelente desempenho' : mediaGeral >= 10 ? 'Bom desempenho' : 'Precisa melhorar'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educandoSelecionado.disciplinas.length}</div>
            <p className="text-xs text-muted-foreground">Disciplinas cursadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educandoSelecionado.notas.length}</div>
            <p className="text-xs text-muted-foreground">Realizadas este ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {desempenhoEducando.length > 0 
                ? Math.round(desempenhoEducando.reduce((acc, d) => acc + d.frequencia, 0) / desempenhoEducando.length)
                : 95
              }%
            </div>
            <p className="text-xs text-muted-foreground">Presença nas aulas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução por Trimestre */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Evolução por Trimestre
            </CardTitle>
            <CardDescription>Progresso acadêmico ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={calcularMediaPorTrimestre(educandoSelecionado)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trimestre" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="media" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Desempenho por Disciplina */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Disciplina</CardTitle>
            <CardDescription>Comparação entre disciplinas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calcularMediaPorDisciplina(educandoSelecionado)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="disciplina" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Bar dataKey="media" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar de Competências */}
        <Card>
          <CardHeader>
            <CardTitle>Radar de Competências</CardTitle>
            <CardDescription>Visão geral das habilidades por disciplina</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={dadosRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="disciplina" />
                <PolarRadiusAxis angle={90} domain={[0, 20]} />
                <Radar
                  name="Desempenho"
                  dataKey="valor"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Análise Detalhada */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Detalhada</CardTitle>
            <CardDescription>Pontos fortes e áreas de melhoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {desempenhoEducando.map((item) => (
                <div key={item.disciplina} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{item.disciplina}</h3>
                    <Badge variant={item.mediaGeral >= 14 ? 'default' : item.mediaGeral >= 10 ? 'secondary' : 'destructive'}>
                      {item.mediaGeral}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{item.mediaGeral}/20</span>
                    </div>
                    <Progress value={(item.mediaGeral / 20) * 100} className="h-2" />
                  </div>

                  {item.pontosFortes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Pontos Fortes
                      </h4>
                      <ul className="text-sm text-green-600 space-y-1">
                        {item.pontosFortes.map((ponto, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {ponto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.pontosFracos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        Áreas de Melhoria
                      </h4>
                      <ul className="text-sm text-red-600 space-y-1">
                        {item.pontosFracos.map((ponto, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {ponto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.observacoes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 mb-2">Observações do Professor</h4>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {item.observacoes.map((obs, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {obs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Recomendações para Melhoria
          </CardTitle>
          <CardDescription>Sugestões baseadas no desempenho atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-green-700">Continue Assim</h3>
              <div className="space-y-2">
                {calcularMediaPorDisciplina(educandoSelecionado)
                  .filter(d => d.media >= 14)
                  .map((disciplina, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">{disciplina.disciplina}</p>
                        <p className="text-sm text-green-600">Excelente desempenho - Média: {disciplina.media}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-red-700">Precisa de Atenção</h3>
              <div className="space-y-2">
                {calcularMediaPorDisciplina(educandoSelecionado)
                  .filter(d => d.media < 14)
                  .map((disciplina, index) => (
                    <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium text-red-800">{disciplina.disciplina}</p>
                        <p className="text-sm text-red-600">
                          {disciplina.media >= 10 ? 'Pode melhorar' : 'Requer atenção especial'} - Média: {disciplina.media}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}