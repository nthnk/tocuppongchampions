# Toronto Cup Pong Championship - Setup Guide

## 🚀 Quick Start

Your landing page is ready! Follow these steps to complete the setup.

## Running Locally

The dev server is already running at: **http://localhost:3002**

To start it manually in the future:

```bash
cd pong-landing
npm run dev
```

## 📊 Google Sheets Integration Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Toronto Cup Pong Waitlist" (or any name you prefer)
4. Set up the following column headers in row 1:
   - Column A: `Timestamp`
   - Column B: `Team Name`
   - Column C: `Player 1 First Name`
   - Column D: `Player 1 Last Name`
   - Column E: `Player 2 First Name`
   - Column F: `Player 2 Last Name`
   - Column G: `Email`

### Step 2: Create a Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Append a new row with the data
    sheet.appendRow([
      data.timestamp,
      data.teamName,
      data.player1FirstName,
      data.player1LastName,
      data.player2FirstName,
      data.player2LastName,
      data.email
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Name your project (e.g., "Waitlist Form Handler")

### Step 3: Deploy the Apps Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description**: "Waitlist form handler"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize access**: You'll need to authorize the script
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXX.../exec
   ```

### Step 4: Configure Your Environment Variables

1. In your project folder (`pong-landing`), open `.env.local`
2. Replace `your_google_apps_script_web_app_url_here` with the URL you copied:

```env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec
```

3. Save the file
4. Restart your development server:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

### Step 5: Test the Form

1. Go to http://localhost:3002
2. Scroll to the "Join the Waitlist" section
3. Fill out and submit the form
4. Check your Google Sheet - the data should appear in a new row!

## 🌐 Deploying to Production

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from the project directory**:
   ```bash
   cd pong-landing
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: pong-landing (or your choice)
   - Directory: `./` (just press Enter)
   - Override settings: No

4. **Add environment variable to Vercel**:
   ```bash
   vercel env add GOOGLE_SHEETS_URL
   ```
   - Choose: Production
   - Paste your Google Apps Script URL
   - Repeat for Preview and Development if needed

5. **Redeploy to apply environment variables**:
   ```bash
   vercel --prod
   ```

Your site will be live at: `https://your-project-name.vercel.app`

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   cd pong-landing
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Add environment variable**:
   - Go to your site in Netlify dashboard
   - Site settings → Environment variables
   - Add `GOOGLE_SHEETS_URL` with your Google Apps Script URL

## 🎨 Customization

### Update Event Details

Edit the following files to customize your event:

- **Hero section**: `components/Hero.tsx`
  - Change dates, location, stats

- **About section**: `components/About.tsx`
  - Modify event description

- **FAQ**: `components/FAQ.tsx`
  - Update questions and answers

- **Colors**: Update the gradient colors in any component file

### Add Your Social Media Links

Edit `components/Footer.tsx` and replace placeholder URLs:
- Instagram: Line 35
- Twitter/X: Line 47
- TikTok: Line 59

### Custom Domain

#### For Vercel:
```bash
vercel domains add yourdomain.com
```

#### For Netlify:
Dashboard → Domain settings → Add custom domain

## 🔒 Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your Google Apps Script URL private
- For production, consider adding rate limiting to prevent spam

## 📱 Testing on Mobile

1. Find your local IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

2. On your phone (connected to same WiFi), visit:
   ```
   http://YOUR_LOCAL_IP:3002
   ```

## 🐛 Troubleshooting

### Form submissions not appearing in Google Sheets

1. Check that `GOOGLE_SHEETS_URL` is set correctly in `.env.local`
2. Verify the Apps Script is deployed as "Anyone" can access
3. Check browser console for errors (F12 → Console tab)
4. Test the Apps Script URL directly with a tool like Postman

### Styles not loading

1. Clear browser cache
2. Restart the dev server
3. Check that Tailwind CSS is properly configured

### Port already in use

If port 3002 is taken, Next.js will automatically use the next available port. Check the terminal output for the correct port.

## 📞 Support

For issues with:
- **Next.js**: https://nextjs.org/docs
- **Vercel deployment**: https://vercel.com/docs
- **Netlify deployment**: https://docs.netlify.com
- **Google Apps Script**: https://developers.google.com/apps-script

## 🎯 Next Steps

1. ✅ Set up Google Sheets integration
2. ✅ Test the form locally
3. ✅ Customize content and branding
4. ✅ Add your social media links
5. ✅ Deploy to Vercel or Netlify
6. 🔄 Share the link and collect waitlist signups!

---

Built with Next.js, TypeScript, and Tailwind CSS
