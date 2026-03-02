export function buildConfirmationEmail(data: {
  fullName: string;
  confirmationCode: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Verdana, Geneva, sans-serif;
      line-height: 1.6;
      color: #fffafa;
      background-color: #020000;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0a0a0a;
    }
    .header {
      background-color: #020000;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 1px solid #141414;
    }
    .header h1 {
      margin: 0;
      color: #fffafa;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: -1px;
    }
    .header span {
      color: #f61813;
    }
    .header p {
      color: #fffafa;
      opacity: 0.5;
      margin: 0 0 10px 0;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
    }
    .success-badge {
      background-color: #22c55e;
      color: #fffafa;
      padding: 15px 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .code-box {
      background-color: #141414;
      border: 2px solid #f61813;
      padding: 25px 20px;
      text-align: center;
      margin: 25px 0;
    }
    .code-box p.label {
      margin: 0 0 8px 0;
      color: #fffafa;
      opacity: 0.6;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .code-box p.code {
      margin: 0;
      color: #f61813;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 4px;
      font-family: 'Courier New', Courier, monospace;
    }
    .code-box p.instruction {
      margin: 12px 0 0 0;
      color: #fffafa;
      opacity: 0.7;
      font-size: 12px;
    }
    .info-section {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #f61813;
    }
    .info-section h3 {
      margin-top: 0;
      color: #fffafa;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-section p {
      margin: 8px 0;
      color: #fffafa;
      opacity: 0.8;
      font-size: 14px;
    }
    .warning-section {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #eab308;
    }
    .warning-section h3 {
      margin-top: 0;
      color: #eab308;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .warning-section p {
      margin: 8px 0;
      color: #fffafa;
      opacity: 0.8;
      font-size: 14px;
    }
    .footer {
      background-color: #020000;
      padding: 30px;
      text-align: center;
      color: #fffafa;
      font-size: 11px;
      opacity: 0.4;
      border-top: 1px solid #141414;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>6CUPS PRESENTS</p>
      <h1>THE FALL <span>CLASSIC</span></h1>
    </div>

    <div class="content">
      <div class="success-badge">
        Waiver Signed — You're Registered
      </div>

      <p style="color: #fffafa; font-size: 18px; font-weight: bold; margin-bottom: 5px;">
        You're registered. See you March 22nd.
      </p>
      <p style="color: #fffafa; opacity: 0.7; font-size: 14px; margin-top: 0;">
        Hey ${data.fullName.split(' ')[0]} — your waiver has been signed and confirmed.
      </p>

      <div class="code-box">
        <p class="label">Your Confirmation Code</p>
        <p class="code">${data.confirmationCode}</p>
        <p class="instruction">Show this email at the front door for entry.</p>
      </div>

      <div class="info-section">
        <h3>Event Details</h3>
        <p><strong>Event:</strong> 6CUPS Beer Pong Tournament — The Fall Classic</p>
        <p><strong>Date:</strong> Sunday, March 22, 2026</p>
        <p><strong>Location:</strong> 90 Cawthra Avenue, Toronto, Ontario — Nickel 9 Distillery</p>
        <p style="margin-top: 12px;">
          <a href="https://maps.google.com/?q=90+Cawthra+Ave+Toronto+ON" style="color: #f61813; text-decoration: none; font-weight: 600;">Open in Google Maps &rarr;</a>
        </p>
      </div>

      <div class="info-section">
        <h3>At The Door</h3>
        <p>Staff will check your name against our signed waiver list and verify your <strong>government-issued photo ID</strong>.</p>
        <p>Valid 19+ government-issued photo ID is <strong>required</strong> for entry — no exceptions.</p>
        <p style="font-size: 12px; opacity: 0.6; margin-top: 12px;">Acceptable ID: Ontario Driver's Licence, Canadian Passport, NEXUS card, or Provincial Photo ID.</p>
      </div>

      <div class="info-section">
        <h3>Your Waiver</h3>
        <p>Your signed waiver PDF has been saved on file. You do not need to sign anything at the door.</p>
      </div>

      <div class="warning-section">
        <h3>Don't Drink &amp; Drive</h3>
        <p>Please arrange safe transportation home <strong>before</strong> you arrive. Use a rideshare app, designate a driver, or take the TTC. Don't risk it.</p>
      </div>

      <p style="color: #fffafa; opacity: 0.5; margin-top: 30px; font-size: 12px;">
        Questions? Reach us at <a href="mailto:info@tocuppongchampions.ca" style="color: #f61813;">info@tocuppongchampions.ca</a>
      </p>
    </div>

    <div class="footer">
      <img src="https://tocuppongchampions.ca/horizontal_colour.svg" alt="6CUPS" width="120" style="margin-bottom: 15px; display: inline-block;" />
      <p>6CUPS &bull; The Fall Classic &bull; March 22, 2026 &bull; Toronto</p>
    </div>
  </div>
</body>
</html>`;
}

export function buildAdminNotificationEmail(data: {
  fullName: string;
  email: string;
  confirmationCode: string;
  submittedAt: string;
  photoOptOut: boolean;
}): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Verdana, Geneva, sans-serif;
      line-height: 1.6;
      color: #fffafa;
      background-color: #020000;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0a0a0a;
    }
    .header {
      background-color: #3b82f6;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #fffafa;
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
    }
    .info-block {
      background-color: #141414;
      padding: 20px;
      margin: 20px 0;
      border-left: 2px solid #3b82f6;
    }
    .info-row {
      margin: 10px 0;
      color: #fffafa;
    }
    .info-label {
      font-weight: 600;
      color: #fffafa;
      opacity: 0.6;
    }
    .info-value {
      color: #fffafa;
    }
    .footer {
      background-color: #020000;
      padding: 20px;
      text-align: center;
      color: #fffafa;
      font-size: 11px;
      opacity: 0.4;
      border-top: 1px solid #141414;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Waiver Signed</h1>
    </div>

    <div class="content">
      <p style="color: #fffafa; font-size: 14px; margin-bottom: 20px; opacity: 0.8;">
        A new participant has signed the event waiver.
      </p>

      <div class="info-block">
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.fullName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${data.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Code:</span>
          <span class="info-value" style="font-family: monospace; font-size: 16px; font-weight: bold; color: #f61813;">${data.confirmationCode}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Signed:</span>
          <span class="info-value">${data.submittedAt}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Photo Opt-Out:</span>
          <span class="info-value">${data.photoOptOut ? 'YES' : 'No'}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>6CUPS Admin</p>
    </div>
  </div>
</body>
</html>`;
}
