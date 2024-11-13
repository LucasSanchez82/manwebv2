import { prisma } from "@/lib/prisma";
import { mangaSchemaInputServer } from "@/lib/schemas/mangas/mangaSchema";
import { AuthType, createClient } from "webdav";
import { NextRequest, NextResponse } from "next/server";
import { generateRandString } from "@/lib/utils";
import { auth } from "@/lib/auth/auth";
import { parse } from "path";

export async function POST(request: NextRequest) {
  console.log({
    WEBDAV_UPLOAD_PATH: process.env.WEBDAV_UPLOAD_PATH,
    WEBDAV_USER: process.env.WEBDAV_USER,
    WEBDAV_PASSWORD: process.env.WEBDAV_PASS,
    WEBDAV_URL: process.env.WEBDAV_URL,


  })
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const webdav = createClient(
    process.env.WEBDAV_URL!,
    {
      authType: AuthType.Password,
      username: process.env.WEBDAV_USER,
      password: process.env.WEBDAV_PASS,
    }
  );
  
  const formdata = await request.formData();
  const parsedManga = mangaSchemaInputServer.safeParse(Object.fromEntries(formdata.entries()));
  let fullImageName: string;
  let isSelfHosted = false;
  if(!parsedManga.success) return NextResponse.json({ error: parsedManga.error, messsage: "Données recu par le serveur invalides" }, { status: 400 });
  if((parsedManga.data.image instanceof File)) {
    isSelfHosted = true;
    const imageArrayBuffer = await parsedManga.data.image.arrayBuffer();
    webdav.exists(process.env.WEBDAV_UPLOAD_PATH!).then((exists) => {
      if(!exists) {
        webdav.createDirectory(process.env.WEBDAV_UPLOAD_PATH!).then(() => {
          console.log('Directory created');
        }).catch((err) => {
          console.error('Error creating directory:', err);
        })
      }
    }).catch(err => {
      console.error('Error checking if directory exists:', err);
      throw err
    }    
    )
    fullImageName = encodeURIComponent(Number(new Date()) + generateRandString(10) + parsedManga.data.image.type.replace('image/', '.'));
    webdav.putFileContents(process.env.WEBDAV_UPLOAD_PATH + fullImageName, imageArrayBuffer, { onUploadProgress: (e) => {
      console.log(e);
    } }).then(() => {
      console.log('File uploaded');
    }).catch((err) => {
      console.error('Error uploading file:', err);
    })
  }else fullImageName = parsedManga.data.image;

try {
  console.log({
    chapter: parsedManga.data.chapter,
    description: parsedManga.data.description,
    readerUrl: parsedManga.data.readerUrl,
    title: parsedManga.data.title,
    image: fullImageName,
    userId: session.user.id,
    isSelfHosted: isSelfHosted,
  })
  const mangaCreated = await prisma.manga.create({
    data: {
      chapter: parsedManga.data.chapter,
      description: parsedManga.data.description,
      readerUrl: parsedManga.data.readerUrl,
      title: parsedManga.data.title,
      image: fullImageName,
      userId: session.user.id,
      isSelfHosted: isSelfHosted
    }
  })

  const returnedManga = {
    ...mangaCreated,
    id: Number(mangaCreated.id),
  }
  return NextResponse.json(returnedManga, { status: 201 });
} catch (error) {
  console.error('Error uploading file:', error);
  return NextResponse.json({ error: "Error uploading file", message: error instanceof Error ? error.message: "erreur inconny" }, { status: 500 });
}
}
