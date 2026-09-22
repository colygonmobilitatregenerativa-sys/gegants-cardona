import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
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
import MobileBottomNav from './components/MobileBottomNav';
import GlobalSearch from './components/GlobalSearch';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#faf8f5] overflow-x-hidden w-full max-w-full">
          <Navbar />
          <main className="flex-grow w-full max-w-full overflow-x-hidden">
            <Hero />
            <FiguresCatalog />
            <VideoGallery />
            <AudioPlayer />
            <Grallers />
            <HistoryTimeline />
            <RouteMap />
            <EventsCalendar />
            <CulturalQuiz />
            <Shop />
            <Gallery />
            <JoinUsForm />
          </main>
          <Footer />
          <MobileBottomNav />
          <GlobalSearch />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
