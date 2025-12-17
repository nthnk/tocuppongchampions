# Resend OTP Email Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Once logged in, go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it something like "Cup Pong OTP"
4. Select permissions: **Full Access** (or at minimum: Emails - Send)
5. Click "Create"
6. **Copy the API key** (it starts with `re_`)
   - ⚠️ Save it now - you won't be able to see it again!

### Step 3: Add API Key to Your Project

1. Open `/pong-landing/.env.local`
2. Replace `your_resend_api_key_here` with your actual API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

3. Save the file

### Step 4: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart it:
cd pong-landing
npm run dev
```

### Step 5: Test the OTP Flow

1. Go to http://localhost:3002
2. Scroll to "Join the Waitlist"
3. Fill out the form with your real email
4. Click "Continue"
5. Check your email for the verification code
6. Enter the 6-digit code
7. Click "Verify & Join Waitlist"
8. Check your Google Sheet - you should see the entry!

---

## Resend Free Tier Limits

✅ **3,000 emails per month**
✅ **100 emails per day**
✅ **No credit card required**

This is more than enough for your waitlist!

---

## Customizing the OTP Email

### Using a Custom Domain (Optional)

By default, emails come from `onboarding@resend.dev`. To use your own domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `torontocuppong.com`)
4. Add the DNS records Resend provides
5. Wait for verification (usually 5-10 minutes)
6. Update the "from" field in `/app/api/send-otp/route.ts`:

```typescript
from: 'Toronto Cup Pong <noreply@torontocuppong.com>',
```

### Editing the Email Template

The email template is in: `/app/api/send-otp/route.ts`

Look for the `html:` section. You can customize:
- Colors and styling
- Logo (add an image URL)
- Footer text
- Layout

---

## OTP Security Features

✅ **10-minute expiration** - Codes expire after 10 minutes
✅ **Rate limiting** - Max 3 OTP requests per email per hour
✅ **Max 5 attempts** - Code deleted after 5 failed verification attempts
✅ **Numeric only** - 6-digit codes, digits only
✅ **In-memory storage** - OTPs cleared on server restart

---

## Troubleshooting

### "Failed to send verification email"

1. Check that your `RESEND_API_KEY` is set correctly in `.env.local`
2. Make sure you restarted the dev server after adding the API key
3. Verify your Resend account is active
4. Check the browser console (F12) for detailed errors

### Email not arriving

1. Check your spam/junk folder
2. Make sure the email address is valid
3. Check Resend dashboard for delivery status: [resend.com/emails](https://resend.com/emails)
4. Verify you haven't hit the daily limit (100 emails/day)

### "Too many OTP requests"

Rate limiting is working! Wait 1 hour or use a different email address for testing.

### OTP code doesn't work

1. Make sure you're entering the most recent code
2. Check that the code hasn't expired (10 minutes)
3. Code is case-insensitive but must be 6 digits
4. After 5 failed attempts, you'll need to request a new code

---

## Production Deployment

When deploying to Vercel/Netlify:

### Vercel
```bash
vercel env add RESEND_API_KEY
# Paste your API key when prompted
# Choose: Production, Preview, Development
```

### Netlify
1. Go to your site's dashboard
2. Site settings → Environment variables
3. Add `RESEND_API_KEY` with your API key value

---

## Alternative: Using a Different Email Provider

If you prefer not to use Resend, you can swap it out for:

- **SendGrid**: 100 emails/day free
- **Mailgun**: 5,000 emails/month free for 3 months
- **Amazon SES**: Very cheap per email

Just update the `/app/api/send-otp/route.ts` file with the new provider's SDK.

---

## Support

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Resend Discord**: [Community Support](https://resend.com/discord)

**Your OTP system is now ready! 🎉**
