import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/ApiService';

const NewsGridSecond = ({path}) => {
    const [news, setNews] = useState([]);
    const [Logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const loadNewsGrid = async () => {
            try {
                const data = await fetchNews(path);
                setNews(data.data.posts.slice(13,17));
                setLogo(data.data);
            }   catch (error) {
                setError('Failed to load news');
            }   finally {
                setLoading(false);
            }
        };
    
        loadNewsGrid();
    },[path]);

    // Menghitung Waktu yang lalu
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date ();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hour = Math.floor(minutes / 60);
        const day = Math.floor(hour / 24);

        if (seconds < 60) {
            return `${seconds} detik yang lalu`;
        } else if (minutes < 60) {
            return `${minutes} menit yang lalu`;
        } else if (hour < 24) {
            return `${hour} jam yang lalu`;
        } else {
            return `${day} hari yang lalu`;
        }
    };
    
    // Mengambil slice dari index pertama
    const item = news[3];

  return (
    <div className='mt-40'>
        <h1 className='font-semibold text-2xl mb-8'>Must Read</h1>
       <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* Berita Besar Cols 1 */}
            {item && (
                <div className='w-full h-full items-center'>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-64 object-cover rounded-xl"
                        />
                    <div className='mt-5 space-y-3'>
                        <div className='flex space-x-4'>
                            {Logo && (
                                <img src={Logo.image} alt={Logo.title} className='w-5'/>
                            )}
                            <p className='text-sm font-semibold text-gray-500'>{timeAgo(item.pubDate)}</p>
                        </div>
                        <a href={item.link}>
                          <h1 className='font-semibold text-xl text-black/70 mt-5 hover:text-blue-400 duaration-200'>{item.title}</h1>  
                        </a>
                      <p className='text-gray-500 font-semibold'>{item.description}</p>
                    </div>
                </div>  
            )}

            {/* Berita Kedua Cols 2 */}
            <div className=' space-y-6'>
                {news.slice(0, 3).map((item, index) => (
                    <div key={index} className='flex space-x-4'>
                        <img src={item.thumbnail} alt={item.title} className="w-32 lg:w-[250px] h-full object-cover rounded-xl"/>
                        <div className='lg:space-y-4 lg:mt-2'>
                            <div className='flex items-center space-x-3'>
                            {Logo && (
                                <img src={Logo.image} alt={Logo.title} className='w-2 lg:w-5    '/>
                            )}
                            <p className='text-sm font-semibold text-gray-500'>{timeAgo(item.pubDate)}</p>
                            </div>
                            <a href={item.link}>
                              <h1 className='font-semibold text-sm lg:text-lg text-gray-700  hover:text-blue-400 duaration-200  '>{item.title}</h1>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            
       </div>
    </div>
  )
}

export default NewsGridSecond