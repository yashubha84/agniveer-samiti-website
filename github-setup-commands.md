# GitHub Repository Setup Commands

After installing Git, run these commands in your project directory:

## 1. Initialize Git Repository
```bash
git init
```

## 2. Configure Git (replace with your details)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 3. Add all files to staging
```bash
git add .
```

## 4. Create initial commit
```bash
git commit -m "Initial commit: Akhil Gujarat Agniveer Samiti website with dynamic leadership system"
```

## 5. Create GitHub Repository
1. Go to https://github.com
2. Click "New repository" (green button)
3. Repository name: `agniveer-samiti-website` (or your preferred name)
4. Description: "Full-stack website for Akhil Gujarat Agniveer Samiti with member management, events, and reports"
5. Choose Public or Private
6. DO NOT initialize with README, .gitignore, or license (since you already have files)
7. Click "Create repository"

## 6. Connect to GitHub Repository
Replace `YOUR_USERNAME` and `REPOSITORY_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

## Example (replace with your details):
```bash
git remote add origin https://github.com/yourusername/agniveer-samiti-website.git
git branch -M main
git push -u origin main
```

## 7. Future Updates
After making changes, use these commands to update GitHub:
```bash
git add .
git commit -m "Description of your changes"
git push
```

## Important Notes:
- Make sure to create a `.env` file with your environment variables on the server
- The `.env` file should NOT be pushed to GitHub (it's in .gitignore)
- Update the MongoDB connection string in production
- Consider using environment variables for sensitive data