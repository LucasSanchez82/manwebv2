import { prisma } from "@/lib/prisma";
import {
  mangaSchemaInputServer,
  mangaSchemaInputServerWithId,
} from "@/lib/schemas/mangas/mangaSchema";
import { NextRequest, NextResponse } from "next/server";
import { generateRandString } from "@/lib/utils";
import { auth } from "@/lib/auth/auth";
import { webdav } from "@/lib/webdav";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formdata = await request.formData();
  const parsedManga = mangaSchemaInputServer.safeParse(
    Object.fromEntries(formdata.entries())
  );
  let fullImageName: string;
  let isImageAFile: boolean;
  if (!parsedManga.success) {
    return NextResponse.json(
      {
        error: parsedManga.error,
        messsage: "Données recu par le serveur invalides",
      },
      { status: 400 }
    );
  }

  if ((isImageAFile = parsedManga.data.image instanceof File)) {
    const imageArrayBuffer = await parsedManga.data.image.arrayBuffer();

    fullImageName = encodeURIComponent(
      Number(new Date()) +
        generateRandString(10) +
        parsedManga.data.image.type.replace("image/", ".")
    );

    webdav
      .putFileContents(
        process.env.WEBDAV_UPLOAD_PATH + fullImageName,
        imageArrayBuffer,
        {
          onUploadProgress: (e) => {
            console.log(e);
          },
        }
      )
      .then(() => {
        console.log("File uploaded");
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        return NextResponse.json(
          { error: "Error uploading file" },
          { status: 500 }
        );
      });
  } else fullImageName = parsedManga.data.image;

  try {
    const mangaCreated = await prisma.manga.create({
      data: {
        chapter: parsedManga.data.chapter,
        description: parsedManga.data.description,
        readerUrl: parsedManga.data.readerUrl,
        title: parsedManga.data.title,
        image: fullImageName,
        userId: session.user.id,
        isSelfHosted: isImageAFile,
      },
    });

    const returnedManga = {
      ...mangaCreated,
      id: Number(mangaCreated.id),
    };
    return NextResponse.json(returnedManga, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        error: "Error uploading file",
        message: error instanceof Error ? error.message : "erreur inconny",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formdata = await request.formData();
  const parsedManga = mangaSchemaInputServerWithId
    .partial()
    .safeParse(Object.fromEntries(formdata.entries()));
  let fullImageName: string | undefined;
  let isImageAFile: boolean | undefined;

  if (!parsedManga.success)
    return NextResponse.json(
      {
        error: parsedManga.error,
        message: "Données reçues par le serveur invalides",
      },
      { status: 400 }
    );
  const currentManga = await prisma.manga.findUnique({
    where: { id: parsedManga.data.id, userId: session.user.id },
  });
  if (!currentManga) {
    return NextResponse.json(
      {
        error: "Current manga not found",
        message: "Le manga existant n'a pas été trouvé",
      },
      { status: 404 }
    );
  }
  isImageAFile = parsedManga.data.image instanceof File || undefined;
  if (parsedManga.data.image instanceof File) {
    const imageArrayBuffer = await parsedManga.data.image.arrayBuffer();

    fullImageName = encodeURIComponent(
      Number(new Date()) +
        generateRandString(10) +
        parsedManga.data.image.type.replace("image/", ".")
    );

    if (
      parsedManga.data.image &&
      !(parsedManga.data.image instanceof File) &&
      currentManga.image === parsedManga.data.image &&
      currentManga.isSelfHosted
    ) {
      webdav
        .deleteFile(process.env.WEBDAV_UPLOAD_PATH! + currentManga.image)
        .then(() => {
          console.log("Old file deleted");
        })
        .catch((err) => {
          console.error("Error deleting old file:", err);
        });
    }

    webdav
      .putFileContents(
        process.env.WEBDAV_UPLOAD_PATH + fullImageName,
        imageArrayBuffer,
        {
          onUploadProgress: (e) => {
            console.log(e);
          },
        }
      )
      .then(() => {
        console.log("File uploaded");
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  } else fullImageName = parsedManga.data.image;

  try {
    const updatedManga = await prisma.manga.update({
      where: { id: parsedManga.data.id, userId: session.user.id },
      data: {
        chapter: parsedManga.data.chapter,
        description: parsedManga.data.description,
        readerUrl: parsedManga.data.readerUrl,
        title: parsedManga.data.title,
        image: fullImageName,
        isSelfHosted: parsedManga.data.image instanceof File || undefined,
      },
    });

    const returnedManga = {
      ...updatedManga,
      id: Number(updatedManga.id),
    };
    return NextResponse.json(returnedManga, { status: 200 });
  } catch (error) {
    console.error("Error updating manga:", error);
    return NextResponse.json(
      {
        error: "Error updating manga",
        message: error instanceof Error ? error.message : "erreur inconnue",
      },
      { status: 500 }
    );
  }
}
