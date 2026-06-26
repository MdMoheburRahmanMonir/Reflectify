'use client'
import { SessionClient } from "@/lib/actions/sessionClient";
import { UpdateUserLesson } from "@/lib/api/userapi/updatelesson";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaCloudUploadAlt, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export function EditFormUserDashboard({ lesson, token }) {
    const [image, setImage] = useState(`${lesson?.lessonPhoto}`);
    const session = SessionClient();




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
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries());
        data.productId = lesson._id;
        data.userId = session?.user?.id;
        data.lessonPhoto = image || lesson.lessonPhoto;



        const res = await UpdateUserLesson(data, token);
        if (res.matchedCount) {
            toast.success('Lesson Update Successfully!')
            window.location.reload();
        }
        if (!res.matchedCount) {
            toast.error('Something Wrong!')
        }

        console.log(res);

    }



    return (
        <Modal>
            <Button variant="secondary" className={`p-0 m-0 h-2 w-2`}><FaRegEdit className="size-5" /></Button>
            <Modal.Backdrop >
                <Modal.Container placement="auto" >
                    <Modal.Dialog className="sm:max-w-md lg:max-w-3xl ">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Edit Lessons</Modal.Heading>

                        </Modal.Header>
                        <Modal.Body className="p-6  ">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-3xl shadow-xl p-8 space-y-5"  >
                                    {/* Title */}
                                    <label >Title </label>
                                    <input
                                        name="title"
                                        defaultValue={`${lesson.title}`}
                                        placeholder="Lesson Title"
                                        className="w-full px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-slate-800 border outline-none focus:ring-2 focus:ring-indigo-400"
                                    />

                                    {/* Description */}
                                    <label >Description <p className="text-xs text-red-500">{session?.user?.plan === 'free' ? '(As a free user you can write 500 word at a time) upgrade to pro!' : ''} </p></label>
                                    <textarea
                                        name="description"
                                        placeholder="Write your life lesson..."
                                        defaultValue={`${lesson.description}`}
                                        rows={5}
                                        maxLength={session?.user?.plan === 'free' ? 500 : 10000}
                                        className="w-full px-4  py-3 rounded-2xl bg-indigo-50 dark:bg-slate-800 border  outline-none focus:ring-2 focus:ring-indigo-400"
                                    />

                                    {/* Category + Emotion */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label >Select Category </label>
                                            <select
                                                name="category"
                                                defaultValue={`${lesson.category}`}
                                                className="px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-slate-800 border"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="personal_Growth">Personal Growth</option>
                                                <option value="career">Career</option>
                                                <option value="relationships">Relationships</option>
                                                <option value="mindset">Mindset</option>
                                                <option value="mistakes_Learned">Mistakes Learned</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col ">
                                            <label >Select Tune</label>
                                            <select
                                                name="emotionalTone"
                                                defaultValue={`${lesson.emotionalTone}`}
                                                className="px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-slate-800 border"
                                            >
                                                <option value="">Select A Tone</option>
                                                <option value="motivational">Motivational</option>
                                                <option value="sad">Sad</option>
                                                <option value="realization">Realization</option>
                                                <option value="gratitude">Gratitude</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Access Level */}
                                    <div className="p-4 rounded-2xl border bg-indigo-50 dark:bg-slate-800">
                                        <p className="text-sm font-semibold mb-2">Access Level</p>

                                        <select
                                            name="accessLevel"
                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border"
                                        >
                                            <option value="free">Free</option>
                                            {
                                                session?.user?.plan === 'free' ?
                                                    <option disabled value="premium">Premium  (Go Premium to show premium user) </option>
                                                    : <option value="premium">Premium</option>
                                            }
                                        </select>

                                        {session?.user?.plan === 'free' ? <p className="text-xs text-red-500  mt-2">
                                            Free users can only select Free. Premium required for paid lessons.
                                        </p> : ''}
                                    </div>

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

                                    {/* Image Upload */}
                                    <div className="p-4 rounded-2xl flex justify-between border bg-indigo-50 dark:bg-slate-800">
                                        <label htmlFor="imageUpload" className="flex   border-r-2 border-r-gray-500 pr-4 gap-3 items-center text-sm font-medium mb-2">
                                            Upload Image (Optional)
                                            <FaCloudUploadAlt className="text-3xl" />
                                        </label>
                                        {image ? <div className={`h-20 w-20 bg-cover rounded-2xl`} style={{
                                            backgroundImage: `url(${image})`,
                                        }} ></div> :
                                            <div className="h-20 w-20 text-[12px] px-2 text-center justify-center text-white font-bold flex pt-2 bg-cover rounded-2xl bg-gradient-to-l from-blue-600 to-purple-600  "> Please wait for upload your photo </div>
                                        }
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            onChange={handleFile}
                                            className="w-full top-0 left-0 absolute hidden px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-dashed"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit">Update Now</Button>
                                    </Modal.Footer>

                                </form >
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}