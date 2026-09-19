<p align="center">
  <img src="https://raw.githubusercontent.com/madhanmaaz/herzha-theme/master/assets/banner.webp" width="100%" alt="Herzha Theme Banner" />
</p>

<p align="center">
  <a href="https://github.com/madhanmaaz/herzha-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" /></a>
  <a href="https://github.com/madhanmaaz/herzha-theme/issues"><img src="https://img.shields.io/github/issues/madhanmaaz/herzha-theme" alt="Open Issues" /></a>
  <a href="https://github.com/madhanmaaz/herzha-theme/stargazers"><img src="https://img.shields.io/github/stars/madhanmaaz/herzha-theme" alt="Stars" /></a>
</p>

<p align="center">
    Herzha Themes — generates ready-to-install theme files for your favorite apps from a set of handcrafted source palettes. One palette, many apps, no manual porting.
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/madhanmaaz/herzha-theme/master/assets/screenshots/vscode.png" alt="Herzha Theme preview in VS Code" width="100%" />
</p>

---

## ✨ Features

* 🎨 15+ handcrafted color palettes, from muted and moody to neon and high-contrast
* 🖥️ One palette, many editors — themes are generated per adapter, not hand-maintained per app
* 🧩 A palette → resolver → adapter pipeline, so color logic, derived values, and per-app output are each their own concern
* ⚡ A dev workflow that watches your files and rebuilds only what changed
* 📦 One command builds every palette for every adapter

---

## 🚀 Getting Started

### Requirements

* Node.js 18 or later
* npm (or your package manager of choice)

### 1. Clone the repository

```bash
git clone https://github.com/madhanmaaz/herzha-theme.git
cd herzha-theme
```

### 2. Install dependencies

```bash
npm install
```

### 3. Choose your workflow

#### 👀 Preview palettes

List every palette's name and a ColorKit preview link, without building anything:

```bash
npm run view
```

#### 🛠️ Development mode

Builds once, then watches `src/palettes/`, `src/resolvers/`, and `src/adapters/` and rebuilds automatically on change:

```bash
npm run dev
```

#### 📦 Build themes

Generate the final theme files for every palette × adapter combination:

```bash
npm run build
```

Skip each adapter's dev-only `plugin()` step (no live-write into an editor's local config folder) with:

```bash
npm run build -- --no-plugin
```

#### 🧹 Clean generated themes

Remove everything previously generated under `packages/*/themes`:

```bash
npm run cleanup
```

---

## 🎨 Palettes

Herzha currently includes the following palettes:

| Palette             | Preview                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Herzha Arcade**   | [ColorKit](https://colorkit.co/palette/06050d-030208-00f0ff-5cfaff-ff2daa-ff6dc5-a8ff00-ccff5c-181525-29233e-f5f4ff-aaa7c5-00c8ff-5cdfff-00ff85-5cffa8-ffd000-ffe866-ff245f-ff6688/) |
| **Herzha Azure**    | [ColorKit](https://colorkit.co/palette/0b111b-050a14-4a90ff-7ab4ff-357abd-5c9aed-5486ff-73a6ff-2e3642-4a5361-e0f0ff-b7d9ff-5da6ff-85c1ff-5ed1a1-7ee6ba-f5bc49-facc70-f54966-fa7087/) |
| **Herzha Dark**     | [ColorKit](https://colorkit.co/palette/141418-0d0d0d-a779f3-bb9af7-6a85e4-87a1ff-03bde5-2ccaf0-384059-4c536f-a9b1d6-787c99-7dcfff-8bd5ff-85d0b7-95dfc6-f2c98b-f5d08a-fb899e-ff9fb1/) |
| **Herzha Ember**    | [ColorKit](https://colorkit.co/palette/0e0b0a-0b0807-ff8f6b-ffa88a-e66a4e-f0856c-f2b705-ffd166-403633-5a4a45-e6dcd8-b8afaa-d9a066-e8bb8c-a3c15a-bfda84-f4c430-ffd75e-ff6b6b-ff8f8f/) |
| **Herzha Flux**     | [ColorKit](https://colorkit.co/palette/0b0d14-090b11-8f7cff-a59bff-5c7cfa-7b96ff-2ec4e6-4fd2ee-3a405a-51587a-b0b8e6-8890c9-82cfff-97daff-6ed1a7-86dfc0-f3c677-f6d38f-ff7a9a-ff96b0/) |
| **Herzha Iron**     | [ColorKit](https://colorkit.co/palette/0b0c0e-090a0c-8a8fff-a3a7ff-6f7aa6-8894c2-5fb3c9-7ec8da-2e323a-434854-d0d4dd-9aa0ae-7aa2c7-92b7d9-7fbfa0-98d4b6-c9b26d-d8c481-c77a7a-d99696/) |
| **Herzha Lush**     | [ColorKit](https://colorkit.co/palette/070d0a-040806-74ffb0-97ffc4-66e9a4-85f3b8-38ffd3-74ffe2-505c56-5d6c64-cdeedb-9fc6b0-8fffcf-a8ffdd-80ffa4-9fffbb-baff8b-cfffa8-5ddba4-7ee9ba/) |
| **Herzha Moss**     | [ColorKit](https://colorkit.co/palette/0b0f0e-080c0b-7fd4a4-9be3bb-5fb3a2-7cc9ba-a7e36d-beee8d-2f3b38-44524f-cfe8df-93b8ac-6bbceb-86ccf2-6adfa0-87edb6-ebcb8b-f2d9a2-e57373-f28b8b/) |
| **Herzha Neon**     | [ColorKit](https://colorkit.co/palette/05070d-02040a-00f5ff-5cfaff-7c3cff-a06cff-00ff9c-5cffbd-16202b-243545-e4ffff-8fb8c2-00bfff-5cdaff-00ff85-5cffa9-ffd600-ffe866-ff2868-ff5c8a/) |
| **Herzha Punk**     | [ColorKit](https://colorkit.co/palette/07050d-030208-00f0ff-5cfaff-ff2da6-ff68c2-d7ff00-e8ff5c-171525-292440-e8f9ff-a4b6c5-00c8ff-5ce0ff-00f5a0-5cffc0-ffd000-ffe866-ff315f-ff6688/) |
| **Herzha Sakura**   | [ColorKit](https://colorkit.co/palette/0d0a10-0a0810-ff79c6-ff9ad8-bd93f9-d2b2ff-ffb86c-ffd19a-3a2f3f-534058-f4e9f8-bfa9cc-8be9fd-a4f0ff-7af1c0-96ffd4-f1c27d-ffd59a-ff5555-ff7777/) |
| **Herzha Static**   | [ColorKit](https://colorkit.co/palette/070c10-05090c-5eebff-85f2ff-608bf0-7da2fa-00ffd1-3cffe0-2a3a44-3f515d-c7f4ff-89bfd0-72d8ff-8ee2ff-6dedb7-88f5cb-ffd166-ffe08a-ff5c7c-ff8098/) |
| **Herzha Toxic**    | [ColorKit](https://colorkit.co/palette/050900-030600-a8ff00-ccff5c-54ff00-7dff5c-00ff9d-5cffbd-17210d-2a3918-f0ffd9-a7c38a-00e5ff-5cefff-5cff00-9aff66-efff00-f6ff66-ff315b-ff6684/) |
| **Herzha Twilight** | [ColorKit](https://colorkit.co/palette/120f18-0b0910-b59dff-cbb8ff-9e8bd6-b1a0e3-a88ef0-bea9ff-2e2a3d-433f59-e0d9f5-b7afd1-b3a5e6-c6b9f0-6fa89a-8fc2b4-d4a06a-e3bd8f-c25c82-d883a0/) |
| **Herzha Ultra**    | [ColorKit](https://colorkit.co/palette/08030f-050208-9d4dff-be85ff-ff3cac-ff70c5-dfff00-eaff66-1b1228-302047-f5e9ff-b9a1cc-a970ff-c49aff-00f5a0-5cffc0-ffd600-ffe866-ff3b6b-ff7195/) |
| **Herzha Vanta**    | [ColorKit](https://colorkit.co/palette/0a0a0d-08080b-a779f3-bb9af7-6a85e4-87a1ff-03bde5-2ccaf0-384059-4c536f-a9b1d6-787c99-7dcfff-8bd5ff-85d0b7-95dfc6-f2c98b-f5d08a-fb899e-ff9fb1/) |
| **Herzha Void**     | [ColorKit](https://colorkit.co/palette/090a0f-07080c-9d7dff-b69bff-6b82d9-879cff-55d0e0-75ddeb-383c55-50556f-bbc3f0-8a91c4-7acbff-8fd7ff-73d3ae-8ae1c3-f1c37d-f6d196-fb7f9c-ff9bb2/) |

New palettes get their preview link the same way — run `npm run view` and it's printed for you.

---

## 🧩 Theme System

Herzha turns a small palette into a full theme through three stages, each its own file, each its own concern:

```text
Palette (raw colors, metadata)
    ⬇
Resolver (fills in derived fields: foregrounds, borders, shadows...)
    ⬇
Adapter (renders to one editor/tool's file format)
    ⬇
Generated Theme
```

A palette can also patch the pipeline at two extra points — once after the resolver runs (`themeOverrides` / `themeOverridesForApp`), and once after an adapter renders its output (`adapterOutputOverrides`) — without needing a new resolver or adapter just for a one-off tweak.

**[Read the full guide → `docs/creating-a-theme.md`](https://github.com/madhanmaaz/herzha-theme/blob/main/docs/creating-a-theme.md)**

---

## 🤝 Contributing

Want to add a new Herzha palette, or support for another editor?

1. Fork the repository.
2. Follow **[`docs/creating-a-theme.md`](https://github.com/madhanmaaz/herzha-theme/blob/main/docs/creating-a-theme.md)** to add your palette, resolver, or adapter.
3. Run `npm run dev` and confirm it builds and looks right.
4. Run `npm run build` for a final, non-watch build.
5. Open a pull request — a short note on what the palette/adapter is for helps review.

New palette ideas, and adapters for editors Herzha doesn't support yet, are both very welcome.

---

## 📄 License

This project is licensed under the **MIT License** — **© Madhanmaaz**

[View the full license](https://github.com/madhanmaaz/herzha-theme/blob/main/LICENSE)
