"use client";

import { UpdateUserLesson } from "@/lib/api/userapi/updatelesson";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

const PrivacyEditPage = ({ lesson }) => {
    const [loading, setLoading] = useState(false);
    console.log(lesson);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const PrivacyData = Object.fromEntries(formData.entries());
        const data = { productId: lesson._id, privacy: PrivacyData.privacy };
          

        console.log(data, 'Lesson is' );

        try {
            setLoading(true);
            const res = await UpdateUserLesson(data);
            console.log("Deleted:", res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            window.location.reload()
        }
        //         {
        //     "_id": "6a36b4a938ef2e9c44fdf7ab",
        //     "title": "manik",
        //     "description": "adsf",
        //     "category": "mindset",
        //     "emotionalTone": "sad",
        //     "accessLevel": "free",
        //     "privacy": "privet",
        //     "lessonPhoto": "https://i.ibb.co/CprgLrRP/484188634-637309962241012-7771909959169094360-n.jpg",
        //     "status": "pending",
        //     "userName": "manik mia",
        //     "userEmail": "mahgsgjsxx@gmail.com",
        //     "userImage": "https://lh3.googleusercontent.com/a/ACg8ocITtKsfzuWCSmwyeHFxrCgjg19N9QxyjHFyOi-23MjxzFpIz9g=s96-c",
        //     "userId": "6a33bf0e88a3e921c081babe",
        //     "createdTime": "2026-06-20T15:41:29.385Z",
        //     "productID": "6a36b4a938ef2e9c44fdf7ab"
        // }
    };

    return (
        <AlertDialog>
            {/* ✅ Trigger MUST NOT be inside another button */}
            <AlertDialog.Trigger>
                <span className="inline-flex items-center justify-center cursor-pointer text-black hover:text-red-700">
                    <RiGitRepositoryPrivateFill className="size-5 mt-1" />
                </span>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[420px]">

                        <AlertDialog.CloseTrigger />

                        {/* HEADER */}
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="success">
                                <RiGitRepositoryPrivateFill className="size-5" />
                            </AlertDialog.Icon>

                            <AlertDialog.Heading>
                                Delete this lesson?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <form onSubmit={handelSubmit}>
                            {/* BODY */}
                            <AlertDialog.Body>
                                <p className="text-sm text-gray-600">
                                    This action cannot be undone. The lesson will be permanently deleted.
                                    <span className="text-red-600 font-medium">
                                        {" "}Are you sure?
                                    </span>
                                </p>

                                {/* Visibility or Privacy */}
                                <div className="p-4 rounded-2xl border bg-indigo-50 dark:bg-slate-800">
                                    <p className="text-sm font-semibold mb-2">Privacy</p>
                                    <select
                                        name="privacy"
                                        defaultValue={`${lesson?.privacy || ''}`}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border"
                                    >
                                        <option value="public">Public</option>
                                        <option value="privet">Privet</option>
                                    </select>
                                </div>
                            </AlertDialog.Body>

                            {/* FOOTER */}
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>


                                <Button
                                    slot="close"
                                    type="submit"
                                    status="success"
                                    isLoading={loading}
                                >
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </form>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default PrivacyEditPage;