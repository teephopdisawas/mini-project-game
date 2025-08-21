#!/bin/bash

# Deployment Configuration Validator
# This script validates all deployment configurations for the mini-project-game

echo "🔍 Validating Deployment Configurations"
echo "======================================"

EXIT_CODE=0

# Function to validate JSON file
validate_json() {
    local file="$1"
    local service="$2"
    
    if [ -f "$file" ]; then
        if cat "$file" | python3 -m json.tool > /dev/null 2>&1; then
            echo "✅ $service config: $file"
        else
            echo "❌ $service config: $file (Invalid JSON)"
            EXIT_CODE=1
        fi
    else
        echo "⚠️  $service config: $file (Not found)"
    fi
}

# Function to validate TOML file (basic check)
validate_toml() {
    local file="$1"
    local service="$2"
    
    if [ -f "$file" ]; then
        echo "✅ $service config: $file"
    else
        echo "⚠️  $service config: $file (Not found)"
    fi
}

echo "📋 Root Level Configurations:"
validate_json "vercel.json" "Vercel (React)"
validate_json "vercel-angular.json" "Vercel (Angular)"
validate_toml "netlify.toml" "Netlify"
validate_json "appwrite.json" "AppWrite Sites (React)"
validate_json "appwrite-angular.json" "AppWrite Sites (Angular)"

echo ""
echo "📂 React App Configurations (web-version/):"
validate_json "web-version/vercel.json" "Vercel"
validate_toml "web-version/netlify.toml" "Netlify"
validate_json "web-version/appwrite.json" "AppWrite Sites"

echo ""
echo "📂 Angular App Configurations (angular-version/):"
validate_json "angular-version/vercel.json" "Vercel"
validate_toml "angular-version/netlify.toml" "Netlify"
validate_json "angular-version/appwrite.json" "AppWrite Sites"

echo ""
echo "🏗️ Build Output Directories:"

# Check React build output
if [ -d "web-version/dist" ]; then
    echo "✅ React build output: web-version/dist/"
else
    echo "⚠️  React build output: web-version/dist/ (Run 'npm run build' in web-version/)"
fi

# Check Angular build output
if [ -d "angular-version/dist/angular-version/browser" ]; then
    echo "✅ Angular build output: angular-version/dist/angular-version/browser/"
else
    echo "⚠️  Angular build output: angular-version/dist/angular-version/browser/ (Run 'npm run build' in angular-version/)"
fi

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "🎉 All configurations are valid!"
    echo ""
    echo "Ready to deploy to:"
    echo "- Vercel: vercel --prod"
    echo "- Netlify: netlify deploy --prod" 
    echo "- AppWrite Sites: appwrite deploy"
else
    echo "❌ Some configurations have issues. Please fix them before deploying."
fi

exit $EXIT_CODE