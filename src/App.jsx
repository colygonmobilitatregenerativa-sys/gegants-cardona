import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AudioPlayer from './components/AudioPlayer';
import Grallers from './components/Grallers';
import FiguresCatalog from './components/FiguresCatalog';
import HistoryTimeline from './components/HistoryTimeline';
import RouteMap from './components/RouteMap';
import EventsCalendar from './components/EventsCalendar';
import CulturalQuiz from './components/CulturalQuiz';
import Shop from './components/Shop';
import Gallery from './components/Gallery';
import VideoGallery from './components/VideoGallery';
import JoinUsForm from './components/JoinUsForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#faf8f5]">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FiguresCatalog />
          <AudioPlayer />
          <Grallers />
          <HistoryTimeline />
          <RouteMap />
          <EventsCalendar />
          <CulturalQuiz />
          <Shop />
          <Gallery />
          <VideoGallery />
          <JoinUsForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
