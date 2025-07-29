import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTask = await db.task.create({
      data: {
        title: body.title,
        lead: body.lead,
        status: "NOTSTARTED",
        description: body.description,
      },
    });
    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while creating a task" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedTask = await db.task.update({
      where: { id: body.id },
      data: { status: body.status, description: body.description },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the task" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    await db.task.delete({
      where: { id: body.id },
    });
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the task" },
      { status: 500 },
    );
  }
}
