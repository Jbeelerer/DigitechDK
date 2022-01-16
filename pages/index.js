import Head from 'next/head';
import { useCallback, useState } from 'react';

export default function Home() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const [{ value: name }, { value: age }, { value: mail }, { value: tel }] =
      e.target;

    const formData = { name, age, mail, tel };
    try {
      //await fetch('/api/mail', {
        await fetch('/mail', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }, []);

  return (
    <div className="container mt-5">
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        />
      </Head>
      Freundesbuch:
      {success ? (
        <>
          <div
            id="success_message"
            className="alert alert-success"
            role="alert"
          >
            Schau dir deine E-mails an! (ggfs. im Spamordner)
          </div>
          <br />
          <img src="/animation.gif" alt="success" width="50%" height="*" />
        </>
      ) : (
        <form
          role="form"
          method="post"
          id="reused_form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              required
              id="name"
              name="name"
              placeholder="Name*"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="alter"
              id="alter"
              placeholder="alter"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="telefonnummer"
              id="telefonnummer"
              placeholder="telefonnummer"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-formular">
            Senden
          </button>
        </form>
      )}
    </div>
  );
}
