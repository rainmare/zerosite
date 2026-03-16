import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const readerEmail = process.env.READER_EMAIL!;

type BookingEmailData = {
  clientName: string;
  clientEmail: string;
  serviceTier: string;
  date: string;
  time: string;
  platform: string;
  notes?: string;
};

export async function sendBookingConfirmation(data: BookingEmailData) {
  const { clientName, clientEmail, serviceTier, date, time, platform, notes } =
    data;

  const clientEmailResult = await resend.emails.send({
    from: "Celestial Pathways <bookings@celestialpathways.com>",
    to: clientEmail,
    subject: "Your Reading is Booked! ✨",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #18181B; color: #ffffff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #F97316; margin-bottom: 8px;">Booking Confirmed</h1>
        <p style="color: #A1A1AA; margin-bottom: 32px;">Your cosmic journey awaits, ${clientName}.</p>
        
        <div style="background: #27272A; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #A1A1AA;">Service</td>
              <td style="padding: 8px 0; color: #ffffff; text-align: right;">${serviceTier}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A1A1AA;">Date</td>
              <td style="padding: 8px 0; color: #ffffff; text-align: right;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A1A1AA;">Time</td>
              <td style="padding: 8px 0; color: #ffffff; text-align: right;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A1A1AA;">Platform</td>
              <td style="padding: 8px 0; color: #ffffff; text-align: right;">${platform}</td>
            </tr>
          </table>
        </div>

        ${notes ? `<p style="color: #A1A1AA; font-style: italic;">"${notes}"</p>` : ""}
        
        <p style="color: #A1A1AA; font-size: 14px; margin-top: 32px;">
          You'll receive a meeting link before your session. If you need to reschedule, 
          please reply to this email.
        </p>
        
        <p style="color: #38BDF8; margin-top: 24px;">— Celestial Pathways</p>
      </div>
    `,
  });

  const readerEmailResult = await resend.emails.send({
    from: "Celestial Pathways <bookings@celestialpathways.com>",
    to: readerEmail,
    subject: `New Booking: ${serviceTier} — ${clientName}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>New Booking Received</h2>
        <ul>
          <li><strong>Client:</strong> ${clientName} (${clientEmail})</li>
          <li><strong>Service:</strong> ${serviceTier}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Platform:</strong> ${platform}</li>
          ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ""}
        </ul>
      </div>
    `,
  });

  return { clientEmailResult, readerEmailResult };
}
