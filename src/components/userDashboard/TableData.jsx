import React, { useState } from 'react';
import { EditFormUserDashboard } from "@/components/userDashboard/EditFormUserDashboard";
import DeleteButton from "@/components/userDashboard/DeleteButton";
const statusColorMap = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
};
import { Chip, Table, } from "@heroui/react";
import PrivacyEditPage from './PrivacyEditPage';
import { LessonDetails } from '../adminDashboard/LessonAction/LessonDetails';


const UserTableData = ({ lessons }) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "title",
        direction: "ascending",
    });
    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="Table with custom cells"
                    className="min-w-[800px]"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    {/* HEADER */}
                    <Table.Header>
                        <Table.Column allowsSorting isRowHeader className="after:hidden" id="title">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Lesson Title
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>

                        <Table.Column allowsSorting id="category">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Category
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>

                        <Table.Column allowsSorting id="accessLevel">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Access
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>
                        <Table.Column allowsSorting id="description">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Description
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>

                        <Table.Column allowsSorting id="status">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Status
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>
                        <Table.Column allowsSorting id="privacy">
                            {({ sortDirection }) => (
                                <Table.SortableColumnHeader className="text-lg font-bold text-black dark:text-white" sortDirection={sortDirection}>
                                    Privacy
                                </Table.SortableColumnHeader>
                            )}
                        </Table.Column>

                        <Table.Column className="text-lg font-bold text-black dark:text-white"  >Actions</Table.Column>
                    </Table.Header>

                    {/* BODY */}
                    <Table.Body>
                        {lessons.map((lesson) => (
                            <Table.Row key={lesson._id ?? lesson.id} id={lesson._id ?? lesson.id}>

                                {/* checkbox */}


                                {/* TITLE */}
                                <Table.Cell className="font-medium min-w-36 truncate max-w-36">
                                    <div className="flex items-center gap-2">
                                        {lesson.title}
                                    </div>
                                </Table.Cell>

                                {/* CATEGORY */}
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <span className="text-md font-medium">{lesson.category}</span>
                                    </div>
                                </Table.Cell>

                                {/* ACCESS LEVEL */}
                                <Table.Cell className="min-w-10 text-md">
                                    {lesson.accessLevel}
                                </Table.Cell>
                                <Table.Cell className="min-w-36 truncate max-w-36">
                                    {lesson.description}
                                </Table.Cell>

                                {/* STATUS */}
                                <Table.Cell className="min-w-25">
                                    <Chip
                                        color={statusColorMap[lesson.status]}
                                        size="sm"
                                        variant="soft"
                                        className={`text-md`}
                                    >
                                        {lesson.status}
                                    </Chip>
                                </Table.Cell>
                                <Table.Cell className="min-w-25">
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        className={`text-md`}
                                    >
                                        {lesson.privacy}
                                    </Chip>
                                </Table.Cell>

                                {/* ACTIONS */}
                                <Table.Cell>
                                    <div className="flex items-center group gap-3 justify-center text-center">
                                        <span className=" w-7 h-7 rounded-full flex justify-center items-center">
                                            <PrivacyEditPage lesson={lesson} />
                                        </span>
                                        <span className="w-7 h-7 rounded-full flex justify-center items-center">
                                            <LessonDetails data={lesson} />
                                        </span>
                                        <span className="w-7 h-7 rounded-full flex justify-center items-center">
                                            <EditFormUserDashboard lesson={lesson} />
                                        </span>
                                        <span className="pt-1 w-7 h-7 rounded-full flex justify-center items-center">
                                            <DeleteButton lesson={lesson} />
                                        </span>

                                    </div>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
};

export default UserTableData;