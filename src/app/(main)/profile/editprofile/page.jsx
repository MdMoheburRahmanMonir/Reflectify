"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileEditPage() {
    const [image, setImage] = useState(''); 

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image Size Should be less then 5 MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json(); 
            setImage(`${data?.data?.url}`);
        } catch (err) {
            toast.error('Image upload fail');
        }
    };


    const router = useRouter()

    const { data: session } = authClient.useSession(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Value = new FormData(e.currentTarget)
        const data = Object.fromEntries(Value.entries())
        const { name } = data;
        await authClient.updateUser({
            name,
            image,
        },
            {
                onRequest: (ctx) => {
                    toast.info('Your Data Updating')
                    //show loading
                },
                onSuccess: (ctx) => {
                    toast.success('Hay Your Data Updated Success')
                    router.push('/')
                },
                onError: (ctx) => {
                    // display the error message 
                    toast.error(ctx.error.message)
                },
            },
        )


    };

    return (
        <div className=" w-full  flex items-center justify-center p-5">
            <div className="w-full max-w-md  shadow-lg dark:shadow-white/20 shadow-black/20 rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Edit Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Image URL */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Change Image URL
                        </label>

                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Change Name
                        </label>

                        <input
                            type="text"
                            defaultValue={session?.user?.name}
                            name="name"
                            placeholder="Enter your name"
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Your Email Address? To change email Contact Admin!
                        </label>

                        <input
                            type="text"
                            defaultValue={session?.user?.email}
                            disabled
                            name="email"
                            placeholder="Your Email address"
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-blue-600 to-purple-600 hover:scale-105 text-white py-2 rounded-lg transition"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}