import React from 'react'
import NewsGrid from './NewsGrid'
import NewsGridSecond from './NewsGridSecond'
import NewsGridThird from './NewsGridThird'

const NewsGridSection = ({children, path}) => {
    return (
        <div>
            <NewsGrid path={path}/>
            <NewsGridSecond path={path}/>
            <NewsGridThird path={path}/>
            {children}
        </div>
     )
}

    export default NewsGridSection;