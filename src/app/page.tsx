"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/assets/core/logo.svg';
import Artwork from '@/assets/core/artwork.svg';
import styles from './styles.module.css';
export default function Home() {
  const [index, setIndex] = useState(0);

  const messages = [
    "♻️ Smarter Waste Collection & Delivery — On Demand",
    "Say goodbye to waste hassles. Whether you’re disposing or requesting specific waste types, we make it simple, fast, and location-based.",
    "✅ <strong>We Pick Up Waste</strong> – Schedule a pickup from your home, office, or facility.",
    "✅ <strong>We Deliver Waste Resources</strong> – Need compost, recyclable materials, or reusable items? We'll deliver them to your door.",
    "✅ <strong>Real-Time Tracking</strong> – Know exactly when our team is on the way.",
    "✅ <strong>Eco-Friendly Mission</strong> – Every request helps reduce landfill and promote circular sustainability.",
    "📍 <strong>Location-Based Service</strong><br />We serve you wherever you are. Just tell us your address — we’ll handle the rest.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className={styles?.wrapper}>
        <div className='container mx-auto px-4 flex flex-col gap-10 justify-center content-center'>
          <div className={styles?.logoWrapper}>
            <Image className={styles?.logo} src={Logo} alt='main-logo' />
          </div>

          <ul className={styles?.dynamicList}>
            <li
              key={index}
              className={styles.dynamicListItem}
              dangerouslySetInnerHTML={{ __html: messages[index] }}
            />
          </ul>
          <div className={styles?.requestActionBtnWrapper}>
            <button className={styles?.requestActionBtn}>Click here if you need us</button>
          </div>
          <div className={styles?.artworkWrapper}>
            <Image src={Artwork} alt='artwork' className={styles?.artwork} />
          </div>
        </div>
      </section>
    </>
  );
}
