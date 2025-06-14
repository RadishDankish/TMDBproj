// // src/pages/MovieDetailsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { getMovieDetails, getImageUrl } from '../tmdb';
// import { ArrowLeft } from 'lucide-react';

// const MovieDetailsPage = ({ movieId, onBack }) => {
//     const [movie, setMovie] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDetails = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const details = await getMovieDetails(movieId);
//                 if (details) {
//                     setMovie(details);
//                 } else {
//                     setError("Movie details not found.");
//                 }
//             } catch (err) {
//                 setError("Failed to load movie details. Please try again.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (movieId) {
//             fetchDetails();
//         }
//     }, [movieId]);

//     const posterUrl = getImageUrl(movie.poster_path);
//     const backdropUrl = getImageUrl(movie.backdrop_path);
//     const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A';
//     const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A';
//     const runtime = movie.runtime ? `${movie.runtime} minutes` : 'N/A';
//     const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A';
//     const cast = movie.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';
//     const trailer = movie.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');

//     return (
//         <div className="relative min-h-screen bg-gray-900 text-white">
//             {/* Backdrop Image */}
//             {backdropUrl && (
//                 <div
//                     className="absolute inset-0 bg-cover bg-center opacity-20"
//                     style={{ backgroundImage: `url(${backdropUrl})` }}
//                 ></div>
//             )}

//             <div className="relative z-10 container mx-auto p-4 py-8">
//                 <button
//                     onClick={onBack}
//                     className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-200"
//                 >
//                     <ArrowLeft size={20} className="mr-2" /> Back to Movies
//                 </button>

//                 <div className="flex flex-col md:flex-row gap-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl p-6">
//                     <div className="flex-shrink-0">
//                         <img
//                             src={posterUrl}
//                             alt={movie.title}
//                             className="w-64 h-auto rounded-lg shadow-lg object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
//                             }}
//                         />
//                     </div>
//                     <div className="flex-grow">
//                         <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
//                         <p className="text-gray-400 text-lg mb-4 italic">{movie.tagline}</p>

//                         <div className="flex items-center text-lg mb-4">
//                             <span className="bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full mr-3">
//                                 {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
//                             </span>
//                             <span className="text-gray-300">({movie.vote_count} votes)</span>
//                         </div>

//                         <p className="text-gray-300 mb-4">{movie.overview}</p>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-lg mb-6">
//                             <p><strong className="text-indigo-300">Genre:</strong> {genres}</p>
//                             <p><strong className="text-indigo-300">Release Date:</strong> {releaseDate}</p>
//                             <p><strong className="text-indigo-300">Runtime:</strong> {runtime}</p>
//                             <p><strong className="text-indigo-300">Director:</strong> {director}</p>
//                             <p className="col-span-1 sm:col-span-2"><strong className="text-indigo-300">Cast:</strong> {cast}</p>
//                         </div>

//                         {trailer && (
//                             <div className="mt-8">
//                                 <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
//                                 <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
//                                     <iframe
//                                         className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
//                                         src={`https://www.youtube.com/embed/${trailer.key}`}
//                                         title={`${movie.title} Trailer`}
//                                         frameBorder="0"
//                                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                         allowFullScreen
//                                     ></iframe>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieDetailsPage;


// src/components/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../tmdb';
import { ArrowLeft } from 'lucide-react';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await getMovieDetails(id);
                if (details) setMovie(details);
                else setError("Movie not found");
            } catch {
                setError("Failed to load movie.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    const posterUrl = getImageUrl(movie.poster_path);
    const backdropUrl = getImageUrl(movie.backdrop_path);
    const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';
    const releaseDate = movie.release_date || 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} minutes` : 'N/A';
    const director = movie.credits?.crew?.find(p => p.job === 'Director')?.name || 'N/A';
    const cast = movie.credits?.cast?.slice(0, 5).map(a => a.name).join(', ') || 'N/A';
    const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

    return (
        <div className="relative min-h-screen bg-gray-900 text-white">
            {backdropUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                />
            )}
            <div className="relative z-10 container mx-auto p-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Movies
                </button>

                {/* Movie Content */}
                <div className="flex flex-col md:flex-row gap-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl p-6">
                    <div>
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-64 rounded shadow-lg"
                            onError={(e) => (e.target.src = 'https://placehold.co/500x750?text=No+Image')}
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                        <p className="italic text-gray-400 mb-4">{movie.tagline}</p>
                        <div className="text-lg mb-4">
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full mr-3">
                                {movie.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                            <span>({movie.vote_count} votes)</span>
                        </div>
                        <p className="mb-4">{movie.overview}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-lg mb-6">
                            <p><strong>Genre:</strong> {genres}</p>
                            <p><strong>Release Date:</strong> {releaseDate}</p>
                            <p><strong>Runtime:</strong> {runtime}</p>
                            <p><strong>Director:</strong> {director}</p>
                            <p className="col-span-2"><strong>Cast:</strong> {cast}</p>
                        </div>
                        {trailer && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title={`${movie.title} Trailer`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
