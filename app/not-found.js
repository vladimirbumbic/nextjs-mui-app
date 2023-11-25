import Link from 'next/link';

const NotFound = () => {
  return (
    <main style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h2 style={{ marginBottom: '20px' }}>There was a problem</h2>

      <div>
        <p>We could not find the page you were looking for.</p>
        <p>
          Go back to the <Link href='/'>Homepage</Link>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
