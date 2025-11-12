import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <Helmet><title>404 - Page Not Found • Import Export Hub</title></Helmet>
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
          <p className="text-base-content/70">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

