import { 
  Encarregado, 
  Educando, 
  Pagamento, 
  Professor, 
  Notificacao, 
  AtividadeEscolar,
  DesempenhoEducando 
} from '@/types';

export const encarregado: Encarregado = {
  id: '1',
  nome: 'Ana Cristina Santos',
  telefone: '+244 923 456 789',
  email: 'ana.santos@email.com',
  relacao: 'Mãe',
  avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  educandos: ['1', '2']
};

export const educandos: Educando[] = [
  {
    id: '1',
    nome: 'João António Santos',
    turma: '10A',
    serie: '10ª Classe',
    ano: 2024,
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    disciplinas: ['Matemática', 'Física', 'Química', 'Português', 'História'],
    encarregadoId: '1',
    notas: [
      {
        id: '1',
        educandoId: '1',
        disciplina: 'Matemática',
        valor: 16,
        trimestre: 1,
        tipo: 'avaliacao',
        data: '2024-03-15',
        professorId: '1',
        professorNome: 'Prof. Maria Silva'
      },
      {
        id: '2',
        educandoId: '1',
        disciplina: 'Matemática',
        valor: 14,
        trimestre: 1,
        tipo: 'teste',
        data: '2024-03-20',
        professorId: '1',
        professorNome: 'Prof. Maria Silva'
      },
      {
        id: '3',
        educandoId: '1',
        disciplina: 'Física',
        valor: 15,
        trimestre: 1,
        tipo: 'avaliacao',
        data: '2024-03-18',
        professorId: '2',
        professorNome: 'Prof. Carlos Mendes'
      },
      {
        id: '4',
        educandoId: '1',
        disciplina: 'Português',
        valor: 17,
        trimestre: 1,
        tipo: 'trabalho',
        data: '2024-03-22',
        professorId: '3',
        professorNome: 'Prof. Isabel Costa'
      }
    ]
  },
  {
    id: '2',
    nome: 'Maria Fernanda Santos',
    turma: '8B',
    serie: '8ª Classe',
    ano: 2024,
    disciplinas: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
    encarregadoId: '1',
    notas: [
      {
        id: '5',
        educandoId: '2',
        disciplina: 'Matemática',
        valor: 18,
        trimestre: 1,
        tipo: 'avaliacao',
        data: '2024-03-16',
        professorId: '4',
        professorNome: 'Prof. Pedro Alves'
      },
      {
        id: '6',
        educandoId: '2',
        disciplina: 'Português',
        valor: 16,
        trimestre: 1,
        tipo: 'teste',
        data: '2024-03-19',
        professorId: '5',
        professorNome: 'Prof. Luisa Fernandes'
      }
    ]
  }
];

export const pagamentos: Pagamento[] = [
  {
    id: '1',
    tipo: 'propina',
    valor: 25000,
    mes: 'Janeiro',
    ano: 2024,
    dataVencimento: '2024-01-10',
    dataPagamento: '2024-01-08',
    status: 'pago',
    educandoId: '1',
    recibo: 'REC-2024-001',
    metodoPagamento: 'Transferência Bancária'
  },
  {
    id: '2',
    tipo: 'propina',
    valor: 25000,
    mes: 'Fevereiro',
    ano: 2024,
    dataVencimento: '2024-02-10',
    dataPagamento: '2024-02-09',
    status: 'pago',
    educandoId: '1',
    recibo: 'REC-2024-002',
    metodoPagamento: 'Multicaixa'
  },
  {
    id: '3',
    tipo: 'propina',
    valor: 25000,
    mes: 'Março',
    ano: 2024,
    dataVencimento: '2024-03-10',
    status: 'pendente',
    educandoId: '1'
  },
  {
    id: '4',
    tipo: 'propina',
    valor: 20000,
    mes: 'Janeiro',
    ano: 2024,
    dataVencimento: '2024-01-10',
    dataPagamento: '2024-01-15',
    status: 'pago',
    educandoId: '2',
    recibo: 'REC-2024-003',
    metodoPagamento: 'Dinheiro'
  },
  {
    id: '5',
    tipo: 'matricula',
    valor: 15000,
    ano: 2024,
    dataVencimento: '2024-01-05',
    dataPagamento: '2024-01-03',
    status: 'pago',
    educandoId: '2',
    recibo: 'REC-2024-004',
    metodoPagamento: 'Transferência Bancária'
  },
  {
    id: '6',
    tipo: 'propina',
    valor: 20000,
    mes: 'Fevereiro',
    ano: 2024,
    dataVencimento: '2024-02-10',
    status: 'atrasado',
    educandoId: '2'
  }
];

export const professores: Professor[] = [
  {
    id: '1',
    nome: 'Prof. Maria Silva',
    email: 'maria.silva@escola.ao',
    disciplinas: ['Matemática'],
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    nome: 'Prof. Carlos Mendes',
    email: 'carlos.mendes@escola.ao',
    disciplinas: ['Física'],
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    nome: 'Prof. Isabel Costa',
    email: 'isabel.costa@escola.ao',
    disciplinas: ['Português']
  }
];

export const notificacoes: Notificacao[] = [
  {
    id: '1',
    titulo: 'Propina de Março Pendente',
    conteudo: 'A propina do mês de Março do educando João António Santos está pendente. Vencimento: 10/03/2024.',
    tipo: 'pagamento',
    data: '2024-03-11T09:00:00Z',
    lida: false,
    importante: true,
    educandoId: '1'
  },
  {
    id: '2',
    titulo: 'Novas Notas Disponíveis',
    conteudo: 'Foram lançadas novas notas para João António Santos na disciplina de Matemática.',
    tipo: 'nota',
    data: '2024-03-15T14:30:00Z',
    lida: false,
    importante: false,
    educandoId: '1'
  },
  {
    id: '3',
    titulo: 'Feira de Ciências 2024',
    conteudo: 'Sua filha Maria Fernanda Santos participará da Feira de Ciências no dia 15 de Março.',
    tipo: 'atividade',
    data: '2024-03-10T08:00:00Z',
    lida: true,
    importante: false,
    educandoId: '2'
  },
  {
    id: '4',
    titulo: 'Reunião de Pais e Encarregados',
    conteudo: 'Reunião marcada para o dia 20 de Março às 15h para discussão do desempenho escolar.',
    tipo: 'reuniao',
    data: '2024-03-12T10:00:00Z',
    lida: false,
    importante: true
  }
];

export const atividades: AtividadeEscolar[] = [
  {
    id: '1',
    titulo: 'Feira de Ciências 2024',
    descricao: 'Exposição de projetos científicos dos alunos de todas as turmas.',
    data: '2024-03-15',
    tipo: 'escolar',
    turmasParticipantes: ['10A', '8B', '9A'],
    local: 'Auditório Principal',
    horario: '14:00 - 17:00'
  },
  {
    id: '2',
    titulo: 'Torneio de Futebol Inter-turmas',
    descricao: 'Competição desportiva entre as turmas da escola.',
    data: '2024-03-20',
    tipo: 'extraescolar',
    turmasParticipantes: ['10A', '10B', '9A', '9B'],
    local: 'Campo de Futebol',
    horario: '15:00 - 18:00'
  },
  {
    id: '3',
    titulo: 'Palestra sobre Orientação Vocacional',
    descricao: 'Orientação para alunos do ensino médio sobre escolhas universitárias.',
    data: '2024-03-25',
    tipo: 'escolar',
    turmasParticipantes: ['10A', '11A', '12A'],
    local: 'Sala de Conferências',
    horario: '09:00 - 11:00'
  }
];

export const desempenho: DesempenhoEducando[] = [
  {
    educandoId: '1',
    disciplina: 'Matemática',
    mediaGeral: 15.0,
    mediaT1: 15.0,
    mediaT2: 0,
    mediaT3: 0,
    frequencia: 95,
    observacoes: ['Bom desempenho em álgebra', 'Precisa melhorar em geometria'],
    pontosFracos: ['Resolução de problemas complexos', 'Interpretação de gráficos'],
    pontosFortes: ['Cálculos básicos', 'Equações lineares']
  },
  {
    educandoId: '1',
    disciplina: 'Física',
    mediaGeral: 15.0,
    mediaT1: 15.0,
    mediaT2: 0,
    mediaT3: 0,
    frequencia: 92,
    observacoes: ['Demonstra interesse pela disciplina', 'Participa ativamente das aulas'],
    pontosFracos: ['Fórmulas de cinemática'],
    pontosFortes: ['Conceitos teóricos', 'Experimentos práticos']
  },
  {
    educandoId: '2',
    disciplina: 'Matemática',
    mediaGeral: 18.0,
    mediaT1: 18.0,
    mediaT2: 0,
    mediaT3: 0,
    frequencia: 98,
    observacoes: ['Excelente aluna', 'Sempre pontual e organizada'],
    pontosFracos: [],
    pontosFortes: ['Raciocínio lógico', 'Resolução de problemas', 'Ajuda os colegas']
  }
];