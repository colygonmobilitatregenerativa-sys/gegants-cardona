# Web Oficial dels Gegants de Cardona

Aplicació web moderna desenvolupada amb **React**, **Vite** i **Tailwind CSS** per a la difusió i posada en valor del patrimoni cultural i festiu dels **Gegants de Cardona** (Bages, Catalunya).

---

## 🏰 Continguts i Seccions de la Web

- **Capçalera & Hero Section**: Imatge d'impacte, lema històric de la vila comtal i estadístiques clau (origen 1834, centenaris, etc.).
- **Catàleg Interactiu de Figures**: Fitxes tècniques completes amb fotografies oficials, mides, història, vestimenta i balls propis de:
  - *Borrell II i Letgarda* (Barri Major, centenaris des de 1834).
  - *El Batallador i l'Esperança* (Barri de Sant Miquel, 1957).
  - *El Gegant Romeu* (Barri de la Fira, centenari de 1908).
  - *Abdal·là i Adalés* (Barri Nou, príncep sarraí i Minyona de Cardona).
  - *Nans del Mercat: Minga i Agneta* (Barri del Mercat, bicentenaris del segle XVIII).
  - *Gegants de la Coromina* (tradició salinera).
- **Història i Llegenda**: Cronologia des de la Carta de Poblament del 986 fins avui, juntament amb la llegenda de la Torre de la Minyona del Castell de Cardona.
- **Calendari d'Actuacions**: Agenda de sortides, trobades i la gran Festa Major de Cardona (setembre).
- **Galeria Multimèdia**: Imatges amb visualitzador en pantalla completa (lightbox).
- **Uneix-te a la Colla & Contacte**: Formulari interactiu per a nous portadors, músics (gralles/timbals) o sol·licituds per a trobades.

---

## 🚀 Com executar el projecte localment

Per obrir i treballar a la web al teu ordinador:

1. **Instal·lar dependències** (ja instal·lades):
   ```powershell
   npm.cmd install
   ```

2. **Iniciar el servidor de desenvolupament**:
   ```powershell
   npm.cmd run dev
   ```
   Obre al navegador la URL que indiqui la terminal (normalment `http://localhost:5173`).

3. **Compilar per a producció**:
   ```powershell
   npm.cmd run build
   ```
   Els fitxers llestos per publicar es generen a la carpeta `dist/`.

4. **Previsualitzar la versió de producció**:
   ```powershell
   npm.cmd run preview
   ```

---

## 📂 Estructura del Projecte

```
gegantscardona/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegació fixa i menú mòbil
│   │   ├── Hero.jsx            # Portada principal amb accions ràpides
│   │   ├── FiguresCatalog.jsx  # Catàleg amb filtres i targetes
│   │   ├── FigureModal.jsx     # Finestra emergent amb fitxa tècnica completa
│   │   ├── HistoryTimeline.jsx # Cronologia històrica i llegenda del castell
│   │   ├── EventsCalendar.jsx  # Agenda de cercaviles i Festa Major
│   │   ├── Gallery.jsx         # Galeria fotogràfica amb visor
│   │   ├── JoinUsForm.jsx      # Formulari per sumar-se a la colla
│   │   └── Footer.jsx          # Peu de pàgina, crèdits i enllaços de Cardona
│   ├── data/
│   │   ├── figures.js          # Dades i fitxes tècniques dels gegants
│   │   ├── events.js           # Calendari de festes i sortides
│   │   └── history.js          # Fites històriques i text de la llegenda
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```
