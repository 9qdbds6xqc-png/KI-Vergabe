# Chat Form Setup Guide

This guide explains how to set up the OpenAI-powered chat interface for the Trafosanf website.

## Prerequisites

1. OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. PDF documents to use as knowledge base

## Setup Steps

### 1. OpenAI API Key Configuration

Create a `.env` file in the root of your project (if it doesn't exist) and add:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** 
- Never commit the `.env` file to version control
- Add `.env` to your `.gitignore` file (already configured)
- For GitHub Pages deployment, you'll need to set this as an environment variable in your CI/CD or use GitHub Secrets

### 2. Testing Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:8080/questions`

3. Test the chat interface:
   - Upload a PDF document
   - Type a question based on the PDF content
   - Verify OpenAI API calls are working

### 3. Deployment to GitHub Pages

Since GitHub Pages doesn't support environment variables directly:

1. **Option A: Use GitHub Actions Secrets**
   - Go to your repository Settings → Secrets and variables → Actions
   - Add `VITE_OPENAI_API_KEY` as a repository secret
   - Update your GitHub Actions workflow to inject it during build

2. **Option B: Use a Serverless Function**
   - Deploy a serverless function (Vercel, Netlify, etc.) to handle OpenAI calls
   - Update `src/lib/openai.ts` to call your serverless function instead
   - Keep API key on the server side

## Features

- **PDF Upload**: Drag & drop or click to upload PDF documents (max 10MB)
- **Strict PDF-based Answers**: Only answers questions from uploaded PDF content
- **Pricing Requests**: Automatically detects pricing questions and opens contact form
- **Rate Limiting**: Built-in protection against API rate limits
- **Error Handling**: Comprehensive error messages for better UX

## Usage

1. Navigate to `/questions` page
2. Upload a PDF document
3. Ask questions based on the PDF content
4. Get AI-generated answers
5. For pricing questions, fill out the contact form

## Troubleshooting

### "OpenAI API key not found" Error
- Check that `VITE_OPENAI_API_KEY` is set in your `.env` file
- Ensure the `.env` file is in the project root
- Restart your development server after adding the key

### Rate Limit Errors
- You've exceeded OpenAI's rate limits
- Wait a few minutes and try again
- The system includes automatic retry logic

### PDF Content Not Loading
- Ensure PDF files are not password-protected
- Check that PDF files are valid and not corrupted
- Maximum file size is 10MB

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Key Exposure**: The current implementation exposes the OpenAI API key in the client-side code. For production:
   - Use serverless functions to keep the key server-side
   - Implement rate limiting
   - Set up API key restrictions in OpenAI dashboard

2. **Cost Management**: 
   - Monitor your OpenAI usage in the OpenAI dashboard
   - Consider implementing usage limits
   - Use GPT-3.5-turbo instead of GPT-4 for lower costs

3. **Data Privacy**:
   - Be aware that questions are sent to OpenAI
   - Consider adding a privacy notice
   - Don't send sensitive information through the chat

## Support

For issues or questions:
- Check the browser console for error messages
- Review OpenAI API documentation: https://platform.openai.com/docs

