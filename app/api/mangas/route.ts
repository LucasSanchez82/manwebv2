import { prisma } from "@/lib/prisma";
import {
  mangaSchemaInputServer,
  mangaSchemaInputServerWithId,
} from "@/lib/schemas/mangas/mangaSchema";
import { NextRequest, NextResponse } from "next/server";
import { generateRandString } from "@/lib/utils";
import { auth } from "@/lib/auth/auth";
import { webdav } from "@/lib/webdav";
import { unstable_expireTag as expireTag } from "next/cache";
import { cacheTagEnum } from "@/lib/cachedRequests/cacheTagEnum";
import { deleteOldFile } from "@/lib/actions/mangas.actions";
import { contentTypes } from "@/prisma/constant";

// Types
type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  message?: string;
};

// Constants
const WEBDAV_UPLOAD_PATH = process.env.WEBDAV_UPLOAD_PATH!;

// Helper functions
const generateImageName = (file: File): string => {
  return encodeURIComponent(
    `${Date.now()}${generateRandString(10)}${file.type.replace("image/", ".")}`
  );
};

const handleFileUpload = async (
  file: File,
  imageName: string
): Promise<void> => {
  const imageArrayBuffer = await file.arrayBuffer();

  try {
    await webdav.putFileContents(
      WEBDAV_UPLOAD_PATH + imageName,
      imageArrayBuffer,
      {
        onUploadProgress: (e) => console.log("Upload progress:", e),
      }
    );
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

// Auth middleware
const authenticateRequest = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
};

// API handlers
export async function POST(request: NextRequest) {
  try {
    const userId = await authenticateRequest();
    const formData = await request.formData();
    const parsedData = mangaSchemaInputServer.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!parsedData.success) {
      return NextResponse.json<ApiResponse>(
        {
          error:
            "Echouée, les données reçues par le serveur sont invalides, si cela se reproduit, veuillez contacter le support.",
          message: "Données reçues par le serveur invalides",
        },
        { status: 400 }
      );
    }

    const { image, ...mangaData } = parsedData.data;
    const isImageFile = image instanceof File;
    const imageName = isImageFile ? generateImageName(image) : image;

    if (isImageFile) {
      await handleFileUpload(image, imageName);
    }

    const mangaCreated = await prisma.content.create({
      data: {
        ...mangaData,
        image: imageName,
        userId,
        isSelfHosted: isImageFile,
        typeId: contentTypes.manga.id,
      },
    });

    expireTag(cacheTagEnum.GET_PERSONNAL_MANGAS);

    return NextResponse.json(
      {
        data: {
          ...mangaCreated,
          id: Number(mangaCreated.id),
          message: "Manga ajouté avec succès",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    expireTag(cacheTagEnum.GET_PERSONNAL_MANGAS);
    return NextResponse.json<ApiResponse>(
      {
        error:
          "Erreur serveur interne imprévue 🫠, si cela se reproduit, veuillez contacter le support.",
        message: error instanceof Error ? error.message : "Erreur inconnue",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await authenticateRequest();
    const formData = await request.formData();
    const parsedData = mangaSchemaInputServerWithId
      .partial()
      .safeParse(Object.fromEntries(formData.entries()));

    if (!parsedData.success) {
      return NextResponse.json<ApiResponse>(
        {
          error: "Validation Error",
          message: "Données reçues par le serveur invalides",
        },
        { status: 400 }
      );
    }

    const currentManga = await prisma.content.findUnique({
      where: { id: parsedData.data.id, userId },
    });

    if (!currentManga) {
      return NextResponse.json<ApiResponse>(
        {
          error: "Not Found",
          message: "Le manga existant n'a pas été trouvé",
        },
        { status: 404 }
      );
    }

    const { image, ...updateData } = parsedData.data;
    let imageName;
    let isImageFile = false;

    if (image instanceof File) {
      isImageFile = true;
      imageName = generateImageName(image);

      // Delete old file if it was self-hosted
      if (currentManga.isSelfHosted && currentManga.image) {
        await deleteOldFile(currentManga.image);
      }

      await handleFileUpload(image, imageName);
    }

    const updatedManga = await prisma.content.update({
      where: { id: parsedData.data.id, userId },
      data: {
        ...updateData,
        image: imageName,
        isSelfHosted: isImageFile || undefined,
      },
    });

    expireTag(cacheTagEnum.GET_PERSONNAL_MANGAS);

    return NextResponse.json(
      {
        data: { ...updatedManga, id: Number(updatedManga.id) },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json<ApiResponse>(
      {
        error: "Server Error",
        message: error instanceof Error ? error.message : "Erreur inconnue",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      }
    );
  }
}
