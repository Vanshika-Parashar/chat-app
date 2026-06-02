import { v2 as cloudinary } from "cloudinary";

// Prefer CLOUDINARY_URL from dashboard (Settings → API Keys → copy env variable)
if (process.env.CLOUDINARY_URL) {
    cloudinary.config();
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
        api_key: process.env.CLOUDINARY_API_KEY?.trim(),
        api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    });
}

export async function verifyCloudinaryConfig() {
    const { cloud_name, api_key, api_secret } = cloudinary.config();
    if (!cloud_name || !api_key || !api_secret) {
        console.warn(
            "Cloudinary: missing cloud_name, api_key, or api_secret in server/.env"
        );
        return false;
    }
    try {
        await cloudinary.api.ping();
        return true;
    } catch (error) {
        console.error(
            "Cloudinary credentials invalid:",
            error.message || error
        );
        console.error(
            "Fix: Cloudinary Console → Settings → API Keys → copy CLOUDINARY_URL or all three values into server/.env, then restart the server."
        );
        return false;
    }
}

export default cloudinary;