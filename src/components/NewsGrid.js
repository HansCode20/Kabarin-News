import React, {useState, useEffect} from 'react';
import { fetchNews } from '../services/ApiService';

const NewsGrid = ({path}) => {
    const [news, setNews] = useState([]);
    const [Logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        useEffect (() => {
            const loadNewsGrid = async () => {
                try {
                    const data = await fetchNews(path);
                    setNews(data.data.posts.slice(7,13));
                    setLogo(data.data);
                } catch (error) {
                    setError('Failed to load news');
                } finally {
                    setLoading(false);
                }
            };

        loadNewsGrid();
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
            return `${minutes} menit yang lalu`;
        } else if (hours < 24) {
            return `${hours} jam yang lalu`;
        } else {
            return `${days} hari yang lalu`;
        }
    };


  return (
    <div className='mt-20'>
            <h1 className='font-semibold text-2xl mb-5'>Other Post</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {news.map((news, index) => (
                <a href={news.link}>
                    <div key={index} className='p-5 shadow-md h-full'>
                            <img src={news.thumbnail} alt='news' className='w-full h-40 lg:h-50 md:h-40 object-cover rounded-lg hover:scale-105 duration-200'/>
                        <div className='mt-5 w-full items-center '>
                            {/* State Logo image */}
                            <div className='flex space-x-4'>
                                {Logo && (
                                    <img src={Logo.image} className='w-5 mb-5' />
                                )}
                                <p className='text-sm font-semibold text-gray-500'>{timeAgo(news.pubDate)}</p>
                            </div>
                            <h1 className='font-bold mb-2 '>{news.title}</h1>
                            <p className='text-base font-semibold text-gray-400'>{news.description}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    </div>
  )
}

export default NewsGrid;