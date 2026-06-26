"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Table } from "@heroui/react";
import { TotalReportData } from "@/lib/api/adminApi/ReportManaging/TotalReportData";

export function ReportTable({ lessonId, session, token }) {

    const [reports, setReport] = useState([]);


    const handleTable = async () => {
        const data = await TotalReportData(lessonId, session, token);  
        setReport(data)
    }

    const [sortDescriptor, setSortDescriptor] = useState({
        column: "reportTitle",
        direction: "ascending",
    });

    const sortedReports = useMemo(() => {
        return [...reports].sort((a, b) => {
            const first = String(a[sortDescriptor.column] || "");
            const second = String(b[sortDescriptor.column] || "");

            let compare = first.localeCompare(second);

            if (sortDescriptor.direction === "descending") {
                compare *= -1;
            }

            return compare;
        });
    }, [reports, sortDescriptor]);

    return (
        <Modal>
            <Button onClick={handleTable} color="danger">View Reports</Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="max-w-7xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Reported Lessons</Modal.Heading>
                            <p className="text-sm text-muted">
                                All reports submitted by users.
                            </p>
                        </Modal.Header>

                        <Modal.Body>
                            <Table>
                                <Table.ScrollContainer>
                                    <Table.Content
                                        aria-label="Reports Table"
                                        className="min-w-[1200px]"
                                        sortDescriptor={sortDescriptor}
                                        onSortChange={setSortDescriptor}
                                    >
                                        <Table.Header>
                                            <Table.Column
                                                id="reportTitle"
                                                allowsSorting
                                                isRowHeader
                                            >
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader
                                                        sortDirection={sortDirection}
                                                    >
                                                        Report Type
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>

                                            <Table.Column
                                                id="reporterName"
                                                allowsSorting
                                            >
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader
                                                        sortDirection={sortDirection}
                                                    >
                                                        Reporter
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>

                                            <Table.Column
                                                id="lessonTitle"
                                                allowsSorting
                                            >
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader
                                                        sortDirection={sortDirection}
                                                    >
                                                        Lesson
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>

                                            <Table.Column>Description</Table.Column>
                                            <Table.Column>Image</Table.Column>
                                        </Table.Header>

                                        <Table.Body>
                                            {reports.map((report) => (
                                                <Table.Row
                                                    key={report._id}
                                                    id={report._id}
                                                >
                                                    <Table.Cell >
                                                        {report.reportTitle}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div>
                                                            <p>{report.reporterName}</p>
                                                            <p className="text-xs text-muted">
                                                                {report.reporterEmail}
                                                            </p>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        {report.lessonTitle}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <p className="max-w-xs truncate">
                                                            {report.reportDescription}
                                                        </p>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <img
                                                            src={report.reportImage}
                                                            alt="report"
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
                                                    </Table.Cell>

                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table.Content>
                                </Table.ScrollContainer>
                            </Table>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                slot="close"
                                variant="secondary"
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}