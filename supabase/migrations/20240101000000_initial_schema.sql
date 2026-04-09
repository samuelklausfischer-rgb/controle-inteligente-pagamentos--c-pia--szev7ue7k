-- Create custom types
CREATE TYPE perfil_type AS ENUM ('financeiro', 'gestor', 'administrador');
CREATE TYPE recebedor_type AS ENUM ('medico', 'empresa', 'fornecedor');
CREATE TYPE pagamento_status AS ENUM ('pendente', 'em_conferencia', 'aprovado', 'pago', 'cancelado', 'com_alerta');
CREATE TYPE alerta_type AS ENUM ('duplicidade', 'valor_suspeito', 'campo_faltando', 'vencimento_proximo', 'cadastro_incompleto');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    perfil perfil_type DEFAULT 'financeiro',
    ativo BOOLEAN DEFAULT true,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create recebedores table
CREATE TABLE public.recebedores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_razao_social TEXT NOT NULL,
    tipo recebedor_type NOT NULL,
    cpf_cnpj TEXT,
    agencia TEXT,
    conta TEXT,
    tipo_conta TEXT,
    chave_pix TEXT,
    email TEXT,
    telefone TEXT,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pagamentos table
CREATE TABLE public.pagamentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recebedor_id UUID REFERENCES public.recebedores(id) ON DELETE RESTRICT,
    descricao TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_prevista_pagamento DATE,
    competencia_referencia TEXT,
    categoria TEXT,
    observacoes TEXT,
    status pagamento_status DEFAULT 'pendente',
    criado_por UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create alertas table
CREATE TABLE public.alertas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pagamento_id UUID REFERENCES public.pagamentos(id) ON DELETE CASCADE,
    tipo alerta_type NOT NULL,
    descricao TEXT,
    revisado BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create historico_acoes table
CREATE TABLE public.historico_acoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pagamento_id UUID REFERENCES public.pagamentos(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    acao TEXT NOT NULL,
    valor_anterior TEXT,
    valor_novo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recebedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_acoes ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow all for authenticated users" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON public.recebedores FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON public.pagamentos FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON public.alertas FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON public.historico_acoes FOR ALL TO authenticated USING (true);
