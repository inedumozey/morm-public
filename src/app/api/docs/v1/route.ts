import { NextResponse } from "next/server";
import { MormDocs } from "../../mormDocs";
const mormDocs = new MormDocs();

export async function GET(req: Request) {
  try {
    // fetch docs
    const data = await mormDocs.getDocs();

    return NextResponse.json({
      success: true,
      message: "Fetched successfully",
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
