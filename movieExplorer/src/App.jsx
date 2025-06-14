// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';

// import HomePage from './components/HomePage';
// import MovieDetailsPage from './components/MovieDetailsPage';

// function App() {
//     const [selectedMovieId, setSelectedMovieId] = useState(null);
//     const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'details'

//     const handleSelectMovie = (movieId) => {
//         setSelectedMovieId(movieId);
//         setCurrentPage('details');
//     };

//     const handleBackToHome = () => {
//         setSelectedMovieId(null);
//         setCurrentPage('home');
//     };

//     // Main application layout
//     return (
//         <Router>


//             <div className="min-h-screen bg-gray-900 font-inter text-gray-100">
//                 <Header></Header>

//                 <Routes>
//                 <Route path="/" element={<HomePage />}></Route>
//                 <Route path="/id" element={<MovieDetailsPage />}></Route>
//                 </Routes>

//                 <main className="py-8">
//                     {/* Simple routing logic using switch-case */}
//                     {(() => {
//                         switch (currentPage) {
//                             case 'home':
//                                 return <HomePage onSelectMovie={handleSelectMovie} />;
//                             case 'details':
//                                 return (
//                                     <MovieDetailsPage
//                                         movieId={selectedMovieId}
//                                         onBack={handleBackToHome}
//                                     />
//                                 );
//                             default:
//                                 return <HomePage onSelectMovie={handleSelectMovie} />;
//                         }
//                     })()}
//                 </main>

//                 <Footer></Footer>
//             </div>
//         </Router>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-900 font-inter text-gray-100 flex flex-col">
                <Header />
                <main className="flex-grow py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movie/:id" element={<MovieDetailsPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;