# 💀 Impostor

Jogo de grupo para jogar ao vivo — um jogador é sorteado como **impostor** e não sabe a palavra da rodada. Os demais sabem a mesma palavra. O objetivo é o impostor se disfarçar enquanto o grupo tenta descobrir quem ele é.

> SPA estática (HTML + CSS + JS puro) — funciona direto no browser, sem instalação.

🔗 **[Jogar agora](https://paulaolileal.github.io/impostor-game)**

---

## Como jogar

1. **Cadastre os jogadores** — mínimo de 3
2. **Passe o celular** para cada jogador em sequência
3. Cada um toca a tela para ver sua informação em privado:
   - Jogadores normais veem **a palavra + a categoria**
   - O impostor vê apenas **a categoria** — sem a palavra
4. Todos debatem, trocam dicas e tentam descobrir o impostor
5. O impostor tenta adivinhar a palavra antes de ser desmascarado
6. A tela de resultado mostra quem começa o debate e a ordem de participação

---

## Funcionalidades

- 🎲 Sorteio automático de impostor, palavra e categoria a cada rodada
- 🔒 Revelação individual — cada jogador vê só a sua informação
- 📋 **50 categorias** com ~600 palavras no total
- ⚡ **Jogar de Novo** — reinício rápido mantendo os mesmos jogadores
- 👥 **Gerenciar Jogadores** — edita a lista antes de uma nova partida
- 🌙 Tema claro/escuro automático (`prefers-color-scheme`)
- 📱 Layout responsivo para mobile e desktop
- 🚫 Funciona sem servidor — abre direto pelo `index.html`

---

## Categorias disponíveis

<details>
<summary>Ver todas as 50 categorias</summary>

| Categoria | Categoria |
|---|---|
| Filmes | Séries |
| Videogames | Músicas |
| Artistas e Bandas | Comidas |
| Bebidas | Esportes |
| Países | Cidades Brasileiras |
| Animais | Profissões |
| Heróis Marvel | Heróis DC |
| Vilões | Personagens de Anime |
| Marcas Famosas | Redes Sociais |
| Aplicativos | Carros |
| Celebridades Mundiais | Youtubers Brasileiros |
| Doces e Sobremesas | Frutas |
| Legumes e Verduras | Instrumentos Musicais |
| Tecnologia e Gadgets | Jogos de Tabuleiro |
| Filmes de Animação | Séries de Animação |
| Redes de Fast Food | Esportes Olímpicos |
| Personagens de Harry Potter | Personagens de Star Wars |
| Memes Famosos | Streamers Brasileiros |
| Superpoderes | Personagens Disney |
| Podcasts | Influencers Brasileiras/os |
| Consoles de Videogame | Personagens de Game of Thrones |
| Séries Brasileiras | Esportes Radicais |
| Culinária Mundial | Monumentos e Pontos Turísticos |
| Séries Netflix | Personagens de Videogames |
| Atletas Brasileiros | Anos 2000 (Nostalgia) |

</details>

---

## Tecnologias

- **HTML5 + CSS3 + JavaScript ES6+** — sem frameworks
- **Bootstrap 5** — layout responsivo
- **Font Awesome 6** — ícones
- Dados embutidos no JS para funcionar via `file://` sem CORS

---

## Estrutura do projeto

```
impostor-game/
├── index.html          # SPA com todas as telas
├── css/
│   └── style.css       # Tema claro/escuro, animações
├── js/
│   └── app.js          # Lógica do jogo e dados embutidos
└── data/
    ├── categories.json  # Lista das 50 categorias
    └── words/           # 50 arquivos JSON com as palavras
```

---

## Rodando localmente

Basta abrir o `index.html` no browser:

```bash
# Clone o repositório
git clone https://github.com/paulaolileal/impostor-game.git

# Abra no browser
open impostor-game/index.html
```

Ou use uma extensão de Live Server no VS Code.

---

## Publicando no GitHub Pages

1. Faça push para a branch `main`
2. Nas configurações do repositório, vá em **Settings → Pages**
3. Selecione a branch `main` e clique em **Save**
4. Acesse em `https://<seu-usuario>.github.io/impostor-game`

---

## Autora

Feito com 💀 por **Paula Leal**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-paulaolileal-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/paulaolileal/)
[![GitHub](https://img.shields.io/badge/GitHub-paulaolileal-181717?style=flat&logo=github)](https://github.com/paulaolileal/impostor-game)
