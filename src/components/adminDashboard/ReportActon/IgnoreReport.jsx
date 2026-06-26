"use client";

import { SessionClient } from "@/lib/actions/sessionClient";
import { OnlyReportDelete } from "@/lib/api/adminApi/ReportManaging/OnlyReportDelete";
import { AlertDialog, Button } from "@heroui/react";
import { FiSlash } from "react-icons/fi";
import { toast } from "react-toastify";

export function IgnoreReport({ lessonId, token }) {
    const data = '';
    const HandleIgnore = async () => {
        try {
            await OnlyReportDelete(lessonId, data, token)
        } catch (error) {
            toast.error("Fail to Delete for invalid reason!")
        } finally {
            toast.success("Delete report successful!")
            window.location.reload();
        }
    }
    return (
        <AlertDialog>
            <Button variant="secondary" className={`size-10`}> <FiSlash /></Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Confirmation?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete Report <strong>Are you sure to delete?</strong>
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={HandleIgnore} slot="close" variant="danger">
                                Delete Report only
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}