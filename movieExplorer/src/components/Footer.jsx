import React from 'react'


export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Movie Explorer. Built with ❤️ using TMDB API.
          </p>
          <p className="mt-2">
            <a
              href="https://developer.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              TMDB API Docs
            </a>
          </p>
        </div>
      </footer>
    );
  }
  