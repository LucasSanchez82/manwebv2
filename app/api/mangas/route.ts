import { getSession } from "@/lib/auth/getsession";
import convertBigIntToNumber from "@/lib/helpers/convertBigIntToNumber";
import { prisma } from "@/lib/prisma";
import { mangaSchemaInputServer } from "@/lib/schemas/mangas/mangaSchema";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';
import { AuthType, createClient } from "webdav";

import { NextRequest, NextResponse } from "next/server";
import { log } from "console";
import { generateRandString } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const webdav = createClient(
    "https://cloud-sanchez.fr/remote.php/dav/files/Manweb/",
    {
      authType: AuthType.Password,
      username: process.env.WEBDAV_USER,
      password: process.env.WEBDAV_PASSWORD,
    }
  );
  
  const session = await getSession();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formdata = await request.formData();
  const image = formdata.get('image')
  console.log(image);
  if(!(image instanceof File)) return NextResponse.json({ error: "No image provided" }, { status: 400 });
  const parsedManga = mangaSchemaInputServer.safeParse(Object.fromEntries(formdata.entries()));
  if(!parsedManga.success) return NextResponse.json({ error: parsedManga.error, messsage: "Données recu par le serveur invalides" }, { status: 400 });
  
  const imageArrayBuffer = await image.arrayBuffer();
  webdav.exists('/uploads').then((exists) => {
    if(!exists) {
      webdav.createDirectory('/uploads').then(() => {
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
  const fullImageName = encodeURIComponent(Number(new Date()) + generateRandString(10) + image.type.replace('image/', '.'));
  webdav.putFileContents(process.env.WEBDAV_UPLOAD_PATH + fullImageName, imageArrayBuffer, { onUploadProgress: (e) => {
    console.log(e);
  } }).then(() => {
    console.log('File uploaded');
  }).catch((err) => {
    console.error('Error uploading file:', err);
  })
try {
  const mangaCreated = await prisma.manga.create({
    data: {
      chapter: parsedManga.data.chapter,
      description: parsedManga.data.description,
      readerUrl: parsedManga.data.readerUrl,
      title: parsedManga.data.title,
      image: fullImageName,
      userId: session.user.id,
    }
  })
  console.log('Manga created:', mangaCreated);
  // console.log(parsedManga.data);
  // return NextResponse.json("mangaCreated");
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
