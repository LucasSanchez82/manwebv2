import { Manga } from '@prisma/client';
import React from 'react';
import MangaCard from './MangaCard';

const DisplayMangas = ({mangas}: {mangas :Manga[]}) => {
    return (
        <div className='flex flex-wrap justify-center gap-4 w-screen'>
        {
            mangas.map((manga) => (
                <MangaCard 
                    key={manga.id}
                    {...manga}
                />
            ))
        }
        </div>
    );
};

export default DisplayMangas;