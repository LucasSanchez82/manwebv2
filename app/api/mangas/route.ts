import { getSession } from "@/lib/auth/getsession";
import convertBigIntToNumber from "@/lib/helpers/convertBigIntToNumber";
import { prisma } from "@/lib/prisma";
import { mangaSchemaInputServer } from "@/lib/schemas/mangas/mangaSchema";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const objectData = await request.json();
  try {
    const parsedManga = mangaSchemaInputServer.parse(objectData);
    
    
    const addedManga = await prisma.manga.create({
      data: { ...parsedManga, userId: session.user.id },
    });
    const serializedManga = convertBigIntToNumber(addedManga);
    revalidatePath('/(connected)/home/');
    return NextResponse.json({
      data: {
        ...serializedManga,
        image: addedManga.image!,
      }
    });
  } catch (err) {
    console.error("Error adding manga:", err);
    return NextResponse.json({ error: err, received: objectData }, { status: 400 });
  }
}
