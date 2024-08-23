// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/ApiService';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import NewsGridSection from './NewsGridSection';

const NewsList = ({ path }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews(path);
        setNews(data.data.posts.slice(0, 5)); // Ambil hanya 4 berita
      } catch (error) {
        setError('Failed to load news.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [path]);

  // Menghitung Waktu yang lalu
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) {
      return `${seconds} detik yang lalu`;
    } else if (minutes < 60) {
      return `${minutes} Menit yang lalu`;
    } else if (hours < 24) {
      return `${hours} Jam yang lalu`;
    } else {
      return `${days} Hari yang lalu`;
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  } else {
    console.log(error)
  }

  return (
      <div className="container mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Berita Besar */}
            <div className='relative '>
                  <img src={news[0].thumbnail} alt="news" className="w-full h-full  rounded-lg object-cover" />
                <div className='absolute bottom-0 left-0 right-0 p-4 space-y-2 w-full bg-gradient-to-t from-black to-transparent rounded-lg'>
                    <h1 className='font-bold text-white text-xl'>{news[0].title}</h1>
                    <div className='flex justify-between items-center'>
                      <p className='font-semibold text-white/70 text-sm'>{timeAgo(news[0].pubDate)}</p>
                      <a href={news[0].link}>
                        <IoArrowForwardCircleOutline className='text-white/80 text-2xl hover:transition-all hover:scale-125 duration-300'/>
                      </a>
                    </div>
                </div>
            </div>

            {/* Berita kecil */}
            <div>
              {news.slice(1).map((item, index) => (
                <div key={index} className='mt-5'>
                  <div className='flex gap-5'>
                      <img src={item.thumbnail} alt="news" className="w-32 h-auto rounded-lg object-cover" />
                      <div>
                      <a href={item.link}>
                        <h1 className='font-semibold text-black/70 text-sm lg:text-xl md:text-xl hover:text-blue-400 duration-100 cursor-pointer'>{item.title}</h1>
                      </a>
                        <p className='font-semibold text-gray-500/70 text-sm'>{timeAgo(item.pubDate)}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>


          </div>

          {/*Other News Grid  */}
        <NewsGridSection path={path}/>

      </div>

  );
};

export default NewsList;
