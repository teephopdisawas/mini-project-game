#!/bin/bash

# AppWrite Sites Setup Script
# This script helps configure AppWrite Sites deployment for the mini-project-game

echo "🚀 AppWrite Sites Configuration Helper"
echo "======================================"

# Check if appwrite CLI is installed
if ! command -v appwrite &> /dev/null; then
    echo "⚠️  AppWrite CLI is not installed. Please install it first:"
    echo "   npm install -g appwrite-cli"
    exit 1
fi

# Ask for project ID
read -p "📝 Enter your AppWrite Project ID: " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Project ID cannot be empty"
    exit 1
fi

echo "🔧 Updating configuration files..."

# Update all AppWrite configuration files
for config_file in appwrite.json appwrite-angular.json web-version/appwrite.json angular-version/appwrite.json; do
    if [ -f "$config_file" ]; then
        # Use sed to replace [PROJECT_ID] with actual project ID
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/\[PROJECT_ID\]/$PROJECT_ID/g" "$config_file"
        else
            # Linux
            sed -i "s/\[PROJECT_ID\]/$PROJECT_ID/g" "$config_file"
        fi
        echo "✅ Updated $config_file"
    else
        echo "⚠️  $config_file not found"
    fi
done

echo ""
echo "🎉 Configuration complete!"
echo ""
echo "Next steps:"
echo "1. Login to AppWrite: appwrite login"
echo "2. Deploy React app: appwrite deploy"
echo "3. Deploy Angular app: appwrite deploy --config appwrite-angular.json"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"