import { useContext, useState } from "react";
import { AuthContext } from "../../contex/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const isValidPassword = (pwd) => {
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const longEnough = pwd.length >= 6;
  return { ok: hasUpper && hasLower && longEnough, hasUpper, hasLower, longEnough };
};

export default function Register() {
  const { register, loginWithGoogle } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { ok, hasUpper, hasLower, longEnough } = isValidPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ok) {
      toast.error("Please fix password requirements");
      return;
    }
    setLoading(true);
    try {
      await register({ name, photoURL, email, password });
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e?.message || "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <Helmet><title>Register • Import Export Hub</title></Helmet>
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-base-content/70">Sign up to get started with Import Export Hub</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  className="input input-bordered w-full focus:input-primary"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo URL </span>
                </label>
                <input
                  className="input input-bordered w-full focus:input-primary"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  className="input input-bordered w-full focus:input-primary"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    className="input input-bordered w-full focus:input-primary pr-12"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center gap-2 text-sm ${hasUpper ? "text-success" : "text-error"}`}>
                    {hasUpper ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>Must have an Uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${hasLower ? "text-success" : "text-error"}`}>
                    {hasLower ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>Must have a Lowercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${longEnough ? "text-success" : "text-error"}`}>
                    {longEnough ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>Length must be at least 6 characters</span>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary w-full mt-6"
                disabled={!ok || loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="divider my-6">OR</div>

            <button
              onClick={handleGoogle}
              className="btn btn-outline w-full flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.2 35 24 35c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.2 3.1 29.3 1 24 1 11.8 1 2 10.8 2 23s9.8 22 22 22 22-9.8 22-22c0-1.5-.2-3-.4-4.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 18.9 13 24 13c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.2 3.1 29.3 1 24 1 16 1 9.1 5.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.5-5.3l-6.2-5.1C29.2 35 24 35 24 35c-5.2 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.1 40.6 16 45 24 45z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.9-5.8 7-11.3 7 0 0 0 0 0 0 5.2 0 10-2 13.5-5.3l-6.2-5.1C29.2 35 24 35 24 35c5.2 0 9.7-3.1 11.3-7.5.4-1.1.7-2.3.7-3.5 0-1.3-.2-2.5-.4-3.5z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
