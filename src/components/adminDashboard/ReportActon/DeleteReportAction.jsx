"use client";

import { SessionClient } from "@/lib/actions/sessionClient";
import { ReportDeletePermanently } from "@/lib/api/adminApi/ReportManaging/ReportDeletePermanently";
import { AlertDialog, Button } from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
export function DeleteReportAction({ lessonId }) {
    const session = SessionClient()
    const data = { role: session?.user?.role };
    const HandleDelete = async () => {
        try {
            await ReportDeletePermanently(lessonId, data)
        } catch (error) {
            toast.error("Fail to Delete for invalid reason!")
        } finally {
            toast.success("Delete report and lesson both successful!")
            window.location.reload();
        }


    }
    return (
        <AlertDialog>
            <Button variant="danger" className={`size-10`}> <MdDelete /></Button>
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
                                This will permanently delete <strong>Are you sure to delete?</strong>
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={HandleDelete} slot="close" variant="danger">
                                Delete Report
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}