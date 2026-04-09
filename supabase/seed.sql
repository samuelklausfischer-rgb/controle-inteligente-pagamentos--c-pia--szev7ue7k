-- Insert Users into auth.users and profiles
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'a1111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'samuelklausfischer@hotmail.com', crypt('senha123', gen_salt('bf')), now(), now(), now()),
('00000000-0000-0000-0000-000000000000', 'a2222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'financeiro@empresa.com', crypt('senha123', gen_salt('bf')), now(), now(), now()),
('00000000-0000-0000-0000-000000000000', 'a3333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'gestor@empresa.com', crypt('senha123', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, name, perfil, ativo) VALUES
('a1111111-1111-1111-1111-111111111111', 'samuelklausfischer@hotmail.com', 'Samuel Fischer', 'administrador', true),
('a2222222-2222-2222-2222-222222222222', 'financeiro@empresa.com', 'Analista Financeiro', 'financeiro', true),
('a3333333-3333-3333-3333-333333333333', 'gestor@empresa.com', 'Gestor de Contas', 'gestor', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Recebedores
INSERT INTO public.recebedores (id, nome_razao_social, tipo, cpf_cnpj, email, ativo) VALUES
('11111111-1111-1111-1111-111111111111', 'Dr. João Silva', 'medico', '111.222.333-44', 'joao@clinica.com', true),
('22222222-2222-2222-2222-222222222222', 'TechMed Equipamentos', 'fornecedor', '12.345.678/0001-90', 'vendas@techmed.com', true),
('33333333-3333-3333-3333-333333333333', 'Limpeza e Cia', 'empresa', '98.765.432/0001-10', 'contato@limpezacia.com', true),
('44444444-4444-4444-4444-444444444444', 'Dra. Maria Souza', 'medico', '555.666.777-88', 'maria@clinica.com', true),
('55555555-5555-5555-5555-555555555555', 'Consultoria Contábil', 'empresa', '11.222.333/0001-44', 'contato@contabil.com', false)
ON CONFLICT (id) DO NOTHING;

-- Insert Pagamentos
INSERT INTO public.pagamentos (id, recebedor_id, descricao, valor, data_vencimento, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Plantão Maio', 3500.00, CURRENT_DATE - INTERVAL '2 days', 'pago'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Manutenção Raio-X', 12500.00, CURRENT_DATE + INTERVAL '2 days', 'pendente'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Serviços de Limpeza', 4200.00, CURRENT_DATE + INTERVAL '5 days', 'em_conferencia'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Cirurgia Ortopédica', 8900.00, CURRENT_DATE + INTERVAL '1 day', 'com_alerta'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Peças de Reposição', 1500.00, CURRENT_DATE + INTERVAL '10 days', 'pendente'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'Plantão Junho', 3500.00, CURRENT_DATE + INTERVAL '15 days', 'pendente'),
('00000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Auditoria Anual', 6000.00, CURRENT_DATE - INTERVAL '10 days', 'pago'),
('00000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'Material de Limpeza', 850.00, CURRENT_DATE + INTERVAL '3 days', 'aprovado'),
('00000000-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', 'Consulta Especialista', 450.00, CURRENT_DATE - INTERVAL '1 day', 'cancelado'),
('00000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'Atualização de Software', 2100.00, CURRENT_DATE + INTERVAL '4 days', 'com_alerta')
ON CONFLICT (id) DO NOTHING;

-- Insert Alertas
INSERT INTO public.alertas (id, pagamento_id, tipo, descricao, revisado) VALUES
('10000000-0000-0000-0000-000000000000', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'valor_suspeito', 'Valor 30% acima da média para este recebedor', false),
('20000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000004', 'duplicidade', 'Possível pagamento em duplicidade com fatura #4521', false),
('30000000-0000-0000-0000-000000000000', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'vencimento_proximo', 'Vencimento em menos de 48h', true),
('40000000-0000-0000-0000-000000000000', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'campo_faltando', 'Nota fiscal não anexada', false),
('50000000-0000-0000-0000-000000000000', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'cadastro_incompleto', 'Dados bancários do recebedor desatualizados', false)
ON CONFLICT (id) DO NOTHING;
