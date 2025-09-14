# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **External Services Setup**: Configure the following services

## Required Environment Variables

You need to set these environment variables in your Vercel dashboard:

### Database

```
DATABASE_URL=postgresql://username:password@host:port/database
```

### Clerk Authentication

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### OpenAI

```
OPENAI_API_KEY=sk-...
```

### Google Gemini

```
GEMINI_API_KEY=...
```

### Stripe

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### UploadThing

```
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your_app_id
```

### Next.js

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
```

## Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Connect GitHub Repository**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:

   - In your project settings, go to "Environment Variables"
   - Add all the variables listed above
   - Make sure to set them for "Production", "Preview", and "Development"

3. **Deploy**:
   - Vercel will automatically build and deploy your project
   - The deployment will be available at `https://your-project.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

4. **Set Environment Variables**:

   ```bash
   vercel env add DATABASE_URL
   vercel env add CLERK_SECRET_KEY
   # ... add all other variables
   ```

5. **Redeploy with Environment Variables**:
   ```bash
   vercel --prod
   ```

## Service Setup Requirements

### 1. Database (Neon)

- Sign up at [neon.tech](https://neon.tech)
- Create a new database
- Copy the connection string to `DATABASE_URL`

### 2. Clerk Authentication

- Sign up at [clerk.com](https://clerk.com)
- Create a new application
- Copy the publishable key and secret key

### 3. OpenAI

- Get API key from [platform.openai.com](https://platform.openai.com)

### 4. Google Gemini

- Get API key from [makersuite.google.com](https://makersuite.google.com)

### 5. Stripe

- Create account at [stripe.com](https://stripe.com)
- Get API keys from dashboard
- Set up webhook endpoint: `https://your-domain.vercel.app/api/payment`

### 6. UploadThing

- Sign up at [uploadthing.com](https://uploadthing.com)
- Create new app and get credentials

## Post-Deployment

1. **Update Clerk Domains**: Add your Vercel domain to Clerk's allowed origins
2. **Update Stripe Webhooks**: Update webhook URL to your Vercel domain
3. **Test All Features**: Ensure file upload, authentication, and payments work
4. **Set Up Custom Domain** (Optional): Add your custom domain in Vercel settings

## Troubleshooting

- **Build Errors**: Check that all dependencies are in `package.json`
- **Runtime Errors**: Verify all environment variables are set correctly
- **Database Connection**: Ensure `DATABASE_URL` is correctly formatted
- **File Upload Issues**: Verify UploadThing configuration
- **Authentication Issues**: Check Clerk domain configuration

## Performance Optimizations

The project is already optimized for Vercel with:

- ✅ `vercel.json` configuration
- ✅ Next.js build optimizations
- ✅ Static generation where possible
- ✅ Image optimization enabled
- ✅ Serverless functions configured

Your project should deploy successfully with minimal changes!
