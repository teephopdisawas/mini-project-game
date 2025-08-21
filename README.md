# Mini Project Game

This repository contains multiple implementations of a game project:

## 🚀 Applications

### Web Applications (Deployable)
- **[web-version](./web-version/)** - React + TypeScript + Vite implementation
- **[angular-version](./angular-version/)** - Angular implementation

### Desktop Game
- **[Valdaren](./Valdaren/)** - Ren'Py visual novel game
- **[about](./about/)** - Game documentation and assets

## 🌐 Deployment

Both web applications are **ready for deployment** on Vercel and Netlify with optimized configurations.

### Quick Deploy

**Deploy React App:**
```bash
cd web-version
vercel --prod  # or netlify deploy --prod
```

**Deploy Angular App:**
```bash
cd angular-version  
vercel --prod  # or netlify deploy --prod
```

**Deploy from Root (React by default):**
```bash
vercel --prod  # or netlify deploy --prod
```

### Comprehensive Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Multi-app deployment strategies
- Environment configurations
- Platform-specific settings
- Build optimization details

## 🛠️ Development

Each application has its own development environment:

### React App
```bash
cd web-version
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linting
```

### Angular App  
```bash
cd angular-version
npm install
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## 📋 Requirements

- **Node.js**: 18+ (specified in `.nvmrc`)
- **npm**: Latest version recommended

## 🏗️ Build Status

Both applications build successfully and include:
- ✅ Production-optimized bundles
- ✅ SPA routing configuration
- ✅ Security headers
- ✅ SEO-friendly setup
- ✅ Performance optimizations

## 📁 Project Structure

```
mini-project-game/
├── web-version/          # React + Vite app
├── angular-version/      # Angular app  
├── Valdaren/            # Ren'Py game
├── about/               # Documentation
├── vercel.json          # Vercel config (React)
├── vercel-angular.json  # Vercel config (Angular)  
├── netlify.toml         # Netlify config (both apps)
└── DEPLOYMENT.md        # Deployment guide
```

## 🚢 Ready for Production

All deployment configurations are tested and production-ready with:
- Proper fallback routing for SPAs
- Optimized caching strategies  
- Security headers configured
- Search engine optimization
- Performance monitoring setup