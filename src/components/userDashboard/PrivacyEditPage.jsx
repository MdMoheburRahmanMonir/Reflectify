"use client";

import { UpdateUserLesson } from "@/lib/api/userapi/updatelesson";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

const PrivacyEditPage = ({ lesson, session, token }) => {
    const [loading, setLoading] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const PrivacyData = Object.fromEntries(formData.entries());
        const data = { productId: lesson._id, privacy: PrivacyData.privacy };


        try {
            setLoading(true);
            const res = await UpdateUserLesson(data, token);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            window.location.reload()
        }
    };

    return (
        <AlertDialog>
            {/* ✅ Trigger MUST NOT be inside another button */}
            <AlertDialog.Trigger>
                <span className="inline-flex items-center justify-center cursor-pointer  hover:text-red-700">
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