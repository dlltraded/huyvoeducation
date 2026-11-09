// House style for phone numbers: always shown as (+84)907828939.
const digits = (raw: string) => (raw || '').replace(/\D/g, '');
const national = (raw: string) => {
  const d = digits(raw);
  if (d.startsWith('84')) return d.slice(2);
  if (d.startsWith('0')) return d.slice(1);
  return d;
};

/** Display form, e.g. "(+84)907828939". */
export const formatPhone = (raw: string) => (raw ? `(+84)${national(raw)}` : '');

/** Value for tel: links, e.g. "+84907828939". */
export const telHref = (raw: string) => `tel:+84${national(raw)}`;
