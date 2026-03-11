#!/bin/bash

echo "🚀 Deploying Akhil Gujarat Agniveer Samiti Website to Vercel..."

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "Please login to Vercel..."
vercel login

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "Your website should be live at the URL shown above."
echo ""
echo "🔧 Don't forget to:"
echo "1. Add environment variables in Vercel dashboard"
echo "2. Set up MongoDB Atlas database"
echo "3. Run database seeding scripts"
echo ""
echo "📖 See DEPLOYMENT_GUIDE_LIVE.md for detailed instructions"