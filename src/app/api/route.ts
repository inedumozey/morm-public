import { NextResponse } from "next/server";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/docs/v1" || "";

export async function GET(req: Request) {
  try {
    const { data } = await axios.get(API_URL);
    return NextResponse.json({
      success: true,
      message: "Fetched successfully",
      data: data.data,
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
