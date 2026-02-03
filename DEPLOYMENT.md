# LuckyQuiz - Deployment Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit: LuckyQuiz application"
   \`\`\`

2. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it "quizmaster" or "kuis"
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**
   \`\`\`bash
   git remote add origin https://github.com/YOUR_USERNAME/quizmaster.git
   git branch -M main
   git push -u origin main
   \`\`\`

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository (quizmaster)
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: \`npm run build\` (auto-filled)
   - **Output Directory**: \`.next\` (auto-filled)
   - **Install Command**: \`npm install\` (auto-filled)

4. **Environment Variables** (Optional)
   - Click "Environment Variables"
   - Add if needed:
     - \`NEXT_PUBLIC_OPENTDB_API\` = \`https://opentdb.com/api.php\`
   - Note: This is optional as the app uses this URL by default

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: \`https://your-project-name.vercel.app\`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **quizmaster**
   - In which directory is your code located? **./**
   - Want to override settings? **N**

4. **Deploy to Production**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Step 3: Post-Deployment

1. **Test Your Deployment**
   - Visit your Vercel URL
   - Login with: **admin / admin**
   - Test quiz functionality
   - Verify timer works correctly
   - Test resume quiz feature (close browser, reopen)
   - Check history and leaderboard

2. **Custom Domain** (Optional)
   - Go to Vercel dashboard
   - Select your project
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Automatic Deployments**
   - Every push to \`main\` branch = automatic deployment
   - Pull requests = preview deployments
   - Easy rollback to previous versions

## 🔧 Alternative Deployment Options

### Deploy to Netlify

1. **Build the Project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Install Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

3. **Deploy**
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

**Build Settings:**
- Build command: \`npm run build\`
- Publish directory: \`.next\`
- Framework: Next.js

### Deploy to Your Own Server

1. **Build the Application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start Production Server**
   \`\`\`bash
   npm start
   \`\`\`

3. **Use PM2 for Process Management** (Recommended)
   \`\`\`bash
   npm install -g pm2
   pm2 start npm --name "quizmaster" -- start
   pm2 save
   pm2 startup
   \`\`\`

4. **Nginx Reverse Proxy** (Optional)
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## 🐳 Docker Deployment

1. **Create Dockerfile**
   \`\`\`dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   \`\`\`

2. **Build Docker Image**
   \`\`\`bash
   docker build -t quizmaster .
   \`\`\`

3. **Run Container**
   \`\`\`bash
   docker run -p 3000:3000 quizmaster
   \`\`\`

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Application builds successfully (\`npm run build\`)
- [ ] Development server runs without errors (\`npm run dev\`)
- [ ] Login functionality works (admin/admin)
- [ ] Quiz can be started and completed
- [ ] Timer counts down correctly
- [ ] Resume quiz modal appears after refresh
- [ ] Results page displays correctly
- [ ] History tracking works
- [ ] Leaderboard calculates rankings
- [ ] Responsive design tested on mobile
- [ ] No console errors in browser
- [ ] All environment variables configured (if needed)

## 🔍 Troubleshooting

### Build Fails on Vercel

**Error**: "Module not found" or TypeScript errors
- Check all imports use correct paths
- Verify all files are committed to Git
- Check \`tsconfig.json\` is correct

**Error**: "Command failed"
- Check \`package.json\` scripts are correct
- Verify dependencies are in \`dependencies\` not \`devDependencies\`

### Application Doesn't Load

- Check browser console for errors
- Verify API routes are working
- Check environment variables are set correctly
- Test locally first with \`npm run build && npm start\`

### Timer Doesn't Work

- Verify JavaScript is enabled
- Check browser console for errors
- Ensure localStorage is not blocked

### Questions Don't Load

- Check OpenTDB API is accessible
- Verify network tab in DevTools
- Check for CORS issues

## 📊 Monitoring & Analytics

### Add Vercel Analytics

1. Go to Vercel dashboard
2. Select your project
3. Go to "Analytics" tab
4. Enable Vercel Analytics
5. View real-time performance metrics

### Add Google Analytics (Optional)

1. Create GA4 property
2. Add tracking code to \`app/layout.tsx\`:
   \`\`\`tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
   \`\`\`

## 🎉 Success!

Your LuckyQuiz application is now live! Share the URL with friends and start testing your trivia knowledge.

**Default URL**: \`https://your-project-name.vercel.app\`
**Login**: admin / admin

## 📞 Support

If you encounter issues during deployment:
1. Check Vercel deployment logs
2. Review build output for errors
3. Test locally first
4. Verify all files are committed to Git

---

**Happy Quizzing! 🎯**
