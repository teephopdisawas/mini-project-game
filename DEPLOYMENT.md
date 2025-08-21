# Deployment Guide

This repository contains multiple applications that can be deployed to Vercel or Netlify:

## Applications

1. **web-version**: React + TypeScript + Vite application
2. **angular-version**: Angular application
3. **Valdaren**: Ren'Py game (not deployable to web platforms)

## Deployment Options

### Option 1: Deploy from Root Directory

#### Vercel
The root `vercel.json` is configured to deploy the React application by default.

```bash
# Deploy React version (default)
vercel --prod

# To deploy Angular version, use the separate config:
vercel --prod --local-config vercel-angular.json
```

#### Netlify
The root `netlify.toml` supports both applications through environment variables.

```bash
# Deploy React version (default)
netlify deploy --prod

# Deploy Angular version using context
netlify deploy --prod --context angular
```

### Option 2: Deploy Individual Applications

#### Deploy React App (web-version)
```bash
cd web-version

# For Vercel
vercel --prod

# For Netlify  
netlify deploy --prod
```

#### Deploy Angular App (angular-version)
```bash
cd angular-version

# For Vercel
vercel --prod

# For Netlify
netlify deploy --prod
```

## Configuration Files

### Root Level
- `vercel.json` - Vercel config for React app
- `vercel-angular.json` - Vercel config for Angular app
- `netlify.toml` - Netlify config supporting both apps

### Application Level
- `web-version/vercel.json` - Vercel config for React app
- `web-version/netlify.toml` - Netlify config for React app
- `angular-version/vercel.json` - Vercel config for Angular app
- `angular-version/netlify.toml` - Netlify config for Angular app

## Build Information

### React App (web-version)
- **Framework**: Vite + React + TypeScript
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18+ recommended

### Angular App (angular-version)
- **Framework**: Angular CLI
- **Build Command**: `npm run build`
- **Output Directory**: `dist/angular-version/browser/`
- **Node Version**: 18+ recommended

## Environment Variables

For Netlify deployments from root, you can set:
- No variables = React app (default)
- Set build context to `angular` for Angular app

## SPA Routing

Both applications are configured as Single Page Applications (SPAs) with proper fallback routing:
- All routes fallback to `/index.html`
- Client-side routing is handled by React Router / Angular Router

## Getting Started

1. Clone the repository
2. Choose your deployment method (root-level or individual app)
3. Connect to Vercel/Netlify
4. Deploy using the appropriate configuration

The applications are ready for production deployment with optimized builds and proper routing configuration.