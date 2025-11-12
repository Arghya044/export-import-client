import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center text-center px-4">
      <div className="max-w-md w-full">
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

