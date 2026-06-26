'use client'

import { SessionClient } from "@/lib/actions/sessionClient";
import { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { FaRegFlag, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { PostAReport } from "@/lib/api/PostAReport";

export function ReportButton({ lesson }) {
    const session = SessionClient();
    const [image, setImage] = useState("");

    const handleFile = async (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formCollection = Object.fromEntries(formData.entries());

        const data = {
            reporterId: session?.user?.id,
            reporterName: session?.user?.name,
            reporterEmail: session?.user?.email,
            lessonId: lesson._id,
            lessonTitle: lesson.title,
            reportTitle: formCollection.reason,
            reportDescription: formCollection.details,
            reportImage: image || 'N/A',
        };
        // console.log(data);

        try {
            const reportRes = await PostAReport(data)
            console.log(reportRes);

        } catch (error) {
            toast.error("Something wont wrong!")
        } finally {
            toast.success("Successfully Submitted Report!")
        }
    }

    return (
        <Modal>
            <Button variant="secondary" className={`inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70`} >
                <FaRegFlag className=" " />
                Report
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-md">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>
                                Report Content
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">

                            <Surface>
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* Reason */}
                                    <div>
                                        <label className="text-sm font-medium">
                                            Reason
                                        </label>

                                        <select
                                            name="reason"
                                            className="px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-black border w-full"
                                            required
                                        >
                                            <option value="">Select Rreason</option>
                                            <option value="spam">Spam</option>
                                            <option value="harassment">Harassment</option>
                                            <option value="inappropriate">Inappropriate content</option>
                                            <option value="fake">Fake information</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {/* Details */}
                                    <div>
                                        <label className="text-sm font-medium">
                                            Details
                                        </label>

                                        <textarea
                                            name="details"
                                            rows={4}
                                            placeholder="Describe the issue..."
                                            className="w-full mt-1 p-3 rounded-xl border"
                                        />
                                    </div>

                                    {/* Evidence Upload */}
                                    <div className="flex items-center justify-between border p-3 rounded-xl">
                                        <label htmlFor="reportImage" className="flex items-center gap-2 text-sm cursor-pointer">
                                            Upload Evidence
                                            <FaCloudUploadAlt />
                                        </label>

                                        {image ? (
                                            <div
                                                className="h-16 w-16 rounded-lg bg-cover"
                                                style={{ backgroundImage: `url(${image})` }}
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-500">
                                                Optional
                                            </span>
                                        )}

                                        <input
                                            type="file"
                                            id="reportImage"
                                            className="hidden"
                                            onChange={handleFile}
                                        />
                                    </div>

                                    {/* Footer */}
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>

                                        <Button type="submit" slot="close" >
                                            Submit Report
                                        </Button>
                                    </Modal.Footer>

                                </form>
                            </Surface>

                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}