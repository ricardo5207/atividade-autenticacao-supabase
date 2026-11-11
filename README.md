# Atividade Prática — Autenticação com React Router e Supabase

Aplicação React (Vite) com Supabase Auth, Context API e rotas protegidas com React Router.

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha com os dados do seu projeto Supabase
   (Project Settings → API):
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
   Use apenas a chave **anon** (pública). Nunca versione o `.env` nem a chave `service_role`.
3. No Supabase, ative **Authentication → Providers → Email**.
   Se a confirmação de e-mail estiver ativa, confirme o e-mail antes de fazer login.
4. Se a tabela de registros da atividade anterior tiver outro nome, altere `TABELA_REGISTROS`
   em `src/services/supabaseClient.js`.
5. Rode:
   ```bash
   npm run dev
   ```

## RLS (exemplo)

```sql
alter table registros enable row level security;

create policy "Leitura somente para autenticados"
  on registros for select
  to authenticated
  using (true);
```

## Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Página inicial | Público |
| `/login` | Login | Público |
| `/registro` | Cadastro | Público |
| `/dashboard` | Dashboard | Autenticado |
| `/registros` | Listagem | Autenticado |
| `/registros/:id` | Detalhes | Autenticado |
| `/perfil` | Perfil | Autenticado |
| `*` | 404 | Público |

## Respostas às perguntas

1. **Responsabilidade do Supabase Auth:** cadastrar usuários, validar credenciais, emitir e renovar
   tokens de sessão (JWT) e encerrar sessões. É ele quem realmente autentica.
2. **Por que Context API:** para compartilhar `user`, `loading` e `signOut` com qualquer componente
   sem repetir a lógica de sessão nem passar props por vários níveis.
3. **`useState` em cada componente vs. contexto global:** com `useState` local cada componente teria
   uma cópia própria e possivelmente dessincronizada do estado de autenticação. O contexto global
   mantém uma única fonte de verdade, atualizada em um só lugar.
4. **Rota protegida sem autenticação:** o `ProtectedRoute` redireciona o usuário para `/login`
   usando `<Navigate>`.
5. **`onAuthStateChange()`:** registra um listener que dispara quando a sessão muda (login, logout,
   renovação de token), permitindo atualizar o contexto automaticamente. Deve ser cancelado
   (`unsubscribe`) ao desmontar o componente.
6. **Proteção de rotas não basta para segurança dos dados:** ela só controla o que a interface
   mostra, e o código do front-end pode ser contornado. A segurança real está no banco, com
   políticas RLS que impedem o acesso indevido aos dados mesmo por chamadas diretas à API.
7. **Autenticação vs. autorização:** autenticação confirma *quem* é o usuário (login). Autorização
   define *o que* ele pode acessar ou fazer (ex.: políticas RLS por usuário ou papel).
