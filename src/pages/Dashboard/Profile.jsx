import { useContext, useState } from "react";
import { AuthContext } from "../../contex/AuthContext";
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        bio: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update Firebase profile
            await updateProfile(user, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });

            toast.success("Profile updated successfully!");
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
            bio: ""
        });
        setEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Helmet><title>Profile • Import Export Hub</title></Helmet>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Profile</h1>
                {!editing && (
                    <button onClick={() => setEditing(true)} className="btn btn-primary">
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {formData.photoURL ? (
                                    <img src={formData.photoURL} alt="Profile" />
                                ) : (
                                    <div className="bg-primary text-primary-content grid place-items-center h-full">
                                        <span className="text-5xl">{formData.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold">{user?.displayName || "User"}</h2>
                            <p className="text-base-content/70">{user?.email}</p>
                            <div className="badge badge-primary mt-2">Active Member</div>
                        </div>
                    </div>

                    {editing ? (
                        /* Edit Form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Display Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    className="input input-bordered w-full"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    className="input input-bordered w-full"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    value={user?.email}
                                    disabled
                                />
                                <label className="label">
                                    <span className="label-text-alt">Email cannot be changed</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Bio</span>
                                </label>
                                <textarea
                                    name="bio"
                                    className="textarea textarea-bordered h-24"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-ghost"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* View Mode */
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-sm opacity-70">Display Name</h3>
                                    <p className="text-lg">{user?.displayName || "Not set"}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm opacity-70">Email</h3>
                                    <p className="text-lg">{user?.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm opacity-70">Account Created</h3>
                                    <p className="text-lg">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm opacity-70">Last Sign In</h3>
                                    <p className="text-lg">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "Unknown"}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm opacity-70">Bio</h3>
                                <p className="text-lg">{formData.bio || "No bio added yet."}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Account Information */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                    <h2 className="card-title">Account Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                            <div>
                                <h3 className="font-semibold">Email Verification</h3>
                                <p className="text-sm opacity-70">{user?.emailVerified ? "Verified" : "Not verified"}</p>
                            </div>
                            {user?.emailVerified ? (
                                <div className="badge badge-success">Verified</div>
                            ) : (
                                <button className="btn btn-sm btn-outline">Verify Email</button>
                            )}
                        </div>

                        <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                            <div>
                                <h3 className="font-semibold">Two-Factor Authentication</h3>
                                <p className="text-sm opacity-70">Add an extra layer of security</p>
                            </div>
                            <button className="btn btn-sm btn-outline">Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
