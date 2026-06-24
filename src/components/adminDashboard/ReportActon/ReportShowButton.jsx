'use client'

import { Button, Modal, Surface } from "@heroui/react";
import { FaRegEye } from "react-icons/fa";

export function ReportShowButton({ lesson }) {

    const report = {
        reporterId: "6a3958737c066d0ca168d27c",
        reporterName: "Farhana Khan",
        reporterEmail: "farhankhan12421223@gmail.com",
        lessonId: "6a397c76f82b8bd677142ef5",
        lessonTitle: "ed it to make dummy text for Letraset's ",
        reportTitle: "inappropriate",
        reportDescription: "asfd asdf adf",
        reportImage: "https://i.ibb.co/Lh8tH7qZ/484188634-637309962241012-7771909959169094360-n.jpg"
    };

    const {
        reporterId,
        reporterName,
        reporterEmail,
        lessonId,
        lessonTitle,
        reportTitle,
        reportDescription,
        reportImage
    } = report;

    return (
        <Modal>
 
            <Modal.Trigger>
                <Button variant="secondary" className="p-2">
                    <FaRegEye className="size-4" />
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop>
                <Modal.Container placement="center">

                    <Modal.Dialog className="sm:max-w-2xl lg:max-w-4xl">

                        <Modal.CloseTrigger />
 
                        <Modal.Header>
                            <Modal.Heading>
                                Lesson Report Details
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">

                            <Surface>

                                <div className="space-y-6">

                                    {/* Cover Image */}
                                    <div className="relative h-64 w-full rounded-xl overflow-hidden">
                                        <img
                                            src={reportImage}
                                            alt={reportTitle}
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <span className="px-3 py-1 text-xs rounded-full bg-amber-500 text-white">
                                                {reportTitle}
                                            </span>

                                            <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">
                                                {lessonId}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold">
                                        {lessonTitle}
                                    </h2>

                                    {/* Tags */}
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-slate-700">
                                            Report: {reportTitle}
                                        </span>

                                        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-slate-700">
                                            Lesson ID: {lessonId}
                                        </span>

                                        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-slate-700">
                                            Reporter ID: {reporterId}
                                        </span>
                                    </div>

                                    {/* Reporter / Author */}
                                    <div className="flex items-center gap-4 border-t pt-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                                            {reporterName?.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {reporterName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {reporterEmail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Report Description
                                        </h3>

                                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                            {reportDescription}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between text-xs text-gray-500 border-t pt-4">
                                        <span>Lesson: {lessonTitle}</span>
                                    </div>

                                </div>

                            </Surface>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Close
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>

                </Modal.Container>
            </Modal.Backdrop>

        </Modal>
    );
}