import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/ApiService';
import "../features/Loading.css";
import "../features/Button.css";

const NewsGridThird = ({path}) => {
    const [news, setNews] = useState([]);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(8);
    const [totalItems, setTotalItems] = useState(0);
    

    useEffect(() => {
        const loadNewsGrid = async () => {
                try {
                    const data = await fetchNews(path);
                    setNews(data.data.posts.slice(0, limit));
                    setLogo(data.data);
                    setTotalItems(data.data.posts.length);
                }
                catch (error) {
                    setError('Failed to load news')
                }
                finally {
                    setLoading(false)
                }
        }
        loadNewsGrid();
    }, [path, limit]);

    const loadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setLimit(limit + 4);
            setLoadingMore(false);
        }, 1000);
    }

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const day = Math.floor(hours / 24);

        if (seconds < 60 ) {
            return `${seconds} detik yan lalu`;
        } else if (minutes < 60 ) {
            return `${minutes} menit yang lalu`;
        } else if (hours < 24 ) {
            return `${hours} jam yang lalu`;
        } else {
            return `${day} hari yang lalu`;
        }
    };

  return (
    <div className='mt-20'>
        <h1 className='text-2xl font-semibold mb-8'>All News Post</h1>
       <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-3'>
        {news.map((item, index) => (
            <div key={index} className='p-4 shadow-md rounded-lg space-y-4'>
                <img src={item.thumbnail} alt={item.title} className='w-full h-50 rounded-lg object-cover'/>
               <div className='mt-4 flex items-center space-x-4 '>
                    { logo && (
                        <img src={logo.image} alt={logo.title} className='w-5'/>
                    )}
                    <p className='text-sm text-gray-500 font-semibold'>{timeAgo(item.pubDate)}</p>
               </div>
                <h1 className='text-md font-bold mt-2'>{item.title}</h1>
                <p className='text-gray-400 font-semibold text-sm mt-2'>{item.description}</p>
            </div>
        ))}
       </div>
       {limit < totalItems && (
        <div className='mt-10 flex justify-center'>
            {loadingMore ? (
                <span class="loader"></span>
            ) : (
                <button onClick={loadMore} class='button-86' >Load More</button>
            )}
        </div>
       )}
    </div>
  )
}

export default NewsGridThird