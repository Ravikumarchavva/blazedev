import { db } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const tasks = await db.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newTask = await db.task.create({
        data: {
            title: body.title,
            lead: body.lead,
            status: 'Not Started'
        }
        });
        return NextResponse.json(newTask, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
    
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const updatedTask = await db.task.update({
        where: {
            id: body.id
        },
        data: {
            status: body.status
        }
        });
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const task = await db.task.delete({
        where: {
            id: body.id
        }
        });
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}
