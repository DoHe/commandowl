export default function postJSON(url, payload) {
  const opts = {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return fetch(url, opts).then(response => response.json());
}
