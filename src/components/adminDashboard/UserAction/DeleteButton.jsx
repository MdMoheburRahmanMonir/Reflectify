"use client";

import { DeleteUserFormAdmin } from "@/lib/api/adminApi/UserManaging/DeleteUserIdFromServerByAdmin";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButton = ({ clientId, token }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await DeleteUserFormAdmin(clientId, token); 
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
                <span className="inline-flex items-center justify-center cursor-pointer  ">
                    <FiTrash2 className="h-5 w-5" />
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
                                Delete this User?
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

export default DeleteButton;