"use client";
 
import { SessionClient } from "@/lib/actions/sessionClient";
import { UpdateUserPlan } from "@/lib/api/adminApi/UserManaging/UpdateUserPlan";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { IoIosPricetags, IoMdPricetags } from "react-icons/io"; 

const PlanUpdateByAdmin = ({ clientId }) => {
    const [loading, setLoading] = useState(false);
    const session = SessionClient();
    const myId = session?.user?.id;


    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const RoleData = Object.fromEntries(formData.entries());
        console.log("Role Data is: ", RoleData);

        const data = { userId: clientId, plan: RoleData.plan, myId: myId };


        try {
            setLoading(true);
            const res = await UpdateUserPlan(data);
            console.log("Deleted:", res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            window.location.reload()
        }

    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <span className="inline-flex items-center justify-center cursor-pointer   ">
                    <IoMdPricetags className="size-5 mt-1" />
                </span>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[420px]">

                        <AlertDialog.CloseTrigger />

                        {/* HEADER */}
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="success">
                                <IoMdPricetags className="size-5" />
                            </AlertDialog.Icon>

                            <AlertDialog.Heading>
                                Change the users Plan?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <form onSubmit={handelSubmit}>
                            {/* BODY */}
                            <AlertDialog.Body>
                                <p className="text-sm text-gray-600">
                                    This action will make a user free to pro or pro to free.
                                    <span className="text-green-600 font-medium">
                                        {" "}Are you sure?
                                    </span>
                                </p>

                                {/* Visibility or Privacy */}
                                <select
                                    name="plan"
                                    // defaultValue={`${ ?.role || ''}`}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border"
                                >
                                    <option value="free">User Free</option>
                                    <option value="user_pro">User Premium</option>
                                </select>

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
                                    Update User
                                </Button>
                            </AlertDialog.Footer>
                        </form>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default PlanUpdateByAdmin;