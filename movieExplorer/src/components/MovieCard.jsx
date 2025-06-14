// import React from 'react';
// import { getImageUrl } from '../tmdb';

// function MovieCard({ movie, onClick }) {
//     const imageUrl = getImageUrl(movie.poster_path);
//     const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

//     return (
//         <div
//             className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
//             onClick={() => onClick(movie.id)}
//         >
//             <img
//                 src={imageUrl}
//                 alt={movie.title}
//                 className="w-full h-64 object-cover"
//                 onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
//                 }}
//             />
//             <div className="p-4">
//                 <h3 className="text-xl font-semibold text-white truncate">{movie.title}</h3>
//                 <p className="text-gray-400 text-sm mt-1">Release Year: {releaseYear}</p>
//                 <p className="text-gray-300 text-sm mt-2 line-clamp-3">{movie.overview}</p>
//             </div>
//         </div>
//     );
// }

// export default MovieCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../tmdb';

function MovieCard({ movie }) {
    const imageUrl = getImageUrl(movie.poster_path);
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <Link to={`/movie/${movie.id}`}>
            <div
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
                    }}
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-white truncate">{movie.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">Release Year: {releaseYear}</p>
                    <p className="text-gray-300 text-sm mt-2 line-clamp-3">{movie.overview}</p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
