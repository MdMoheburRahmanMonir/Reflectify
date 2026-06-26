"use client";

import { AdminViewOrNot } from "@/lib/api/adminApi/LessonManaging/AdminViewOrNot";
import { DeleteLessonFormAdmin } from "@/lib/api/adminApi/LessonManaging/DeleteLessonFormAdmin";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButtonLesson = ({ data, token }) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => { 
        try {
            setLoading(true);
            const res = await DeleteLessonFormAdmin(data, token); 
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            window.location.reload()
        }
    };
    const viewHandling = async () => {
        await AdminViewOrNot(data, token)
    }
    return (
        <AlertDialog>
            <AlertDialog.Trigger onClick={viewHandling}>
                <span className="inline-flex items-center justify-center cursor-pointer  ">
                    <FiTrash2 className="h-4 w-4 mt-1" />
                </span>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[420px]">

                        <AlertDialog.CloseTrigger />

                        {/* HEADER */}
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger">
                                <TrashBin className="size-5" />
                            </AlertDialog.Icon>

                            <AlertDialog.Heading>
                                Delete this lesson?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        {/* BODY */}
                        <AlertDialog.Body>
                            <p className="text-sm ">
                                This action cannot be undone. The user will be permanently deleted.
                                <span className="text-red-600 font-medium">
                                    {" "}Are you sure?
                                </span>
                            </p>
                        </AlertDialog.Body>

                        {/* FOOTER */}
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                onClick={handleDelete}
                                variant="danger"
                                isLoading={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteButtonLesson;