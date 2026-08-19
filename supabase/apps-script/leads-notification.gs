/**
 * Google Apps Script, bound to the private "Leads" Google Sheet.
 *
 * Receives a Supabase Database Webhook (INSERT on public.leads), appends a
 * row to the "Leads" tab, and emails a notification via MailApp (the sheet
 * owner's own Gmail — no third-party email service needed).
 *
 * Setup:
 *   1. Open the target Google Sheet -> Extensions -> Apps Script.
 *   2. Paste this file's contents in as Code.gs (replace the default content).
 *   3. Update SECRET below to the value Kenny/Claude generated (shared with
 *      the Supabase webhook URL's `secret` query param — keeps this endpoint
 *      from being usable by anyone who finds the URL).
 *   4. Deploy -> New deployment -> type "Web app" -> Execute as "Me" ->
 *      Who has access "Anyone" -> Deploy. Copy the resulting /exec URL.
 *   5. In Supabase: Database -> Webhooks -> create a webhook on `leads`
 *      INSERT, HTTP POST to `<Web App URL>?secret=<SECRET>`.
 *   6. Make sure the spreadsheet has a tab literally named "Leads" with a
 *      header row (created_at, parent_name, phone, child_name, child_age,
 *      programs, referral_code, status).
 *
 * The Web App URL being "Anyone can access" only means Google won't demand
 * a login to POST to it — the SECRET check below still rejects any request
 * that doesn't know the secret, so the sheet stays effectively private.
 *
 * NOTE: the real SECRET value used in production is intentionally NOT
 * committed here — it only lives in the deployed Apps Script project and in
 * the `notify_new_lead()` Postgres trigger (see
 * supabase/migrations/20260819c_leads_webhook_trigger.sql, also redacted).
 * This file is kept for reference/reinstallation, not as the live source.
 */

const SHEET_NAME = 'Leads';
const SECRET = 'REPLACE_WITH_GENERATED_SECRET'; // not the real value — see note below
const NOTIFY_EMAIL = 'huyvoeducation@gmail.com';

function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.secret !== SECRET) {
      return ContentService.createTextOutput('Unauthorized').setMimeType(ContentService.MimeType.TEXT);
    }

    const body = JSON.parse(e.postData.contents);
    const record = body.record || {};

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const programs = Array.isArray(record.programs) ? record.programs.join(', ') : '';

    sheet.appendRow([
      record.created_at || new Date().toISOString(),
      record.parent_name || '',
      record.phone || '',
      record.child_name || '',
      record.child_age || '',
      programs,
      record.referral_code || '',
      record.status || '',
    ]);

    const subject = 'Lead mới: ' + (record.parent_name || 'Không rõ tên') + ' (' + (record.phone || '') + ')';
    const bodyText =
      'Có lead đăng ký mới trên huyvoeducation.com\n\n' +
      'Phụ huynh: ' + (record.parent_name || '') + '\n' +
      'SĐT: ' + (record.phone || '') + '\n' +
      'Tên bé: ' + (record.child_name || '') + '\n' +
      'Tuổi bé: ' + (record.child_age || '') + '\n' +
      'Chương trình quan tâm: ' + (programs || '—') + '\n' +
      'Mã giới thiệu: ' + (record.referral_code || '—') + '\n' +
      'Thời gian: ' + (record.created_at || new Date().toISOString());

    MailApp.sendEmail(NOTIFY_EMAIL, subject, bodyText);

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('Error: ' + err).setMimeType(ContentService.MimeType.TEXT);
  }
}
