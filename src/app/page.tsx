"use client";

import {useState,useEffect} from 'react';
import Image from 'next/image';
import Logo from '@/assets/core/logo.svg';
import styles from './styles.module.css';
export default function Home() {

  useEffect(()=>{
    console.log("Testing client");
  },[]);

  return (
    <>
      <section className='mx-auto px-4'>
        <div className='container mx-auto px-4'>
          <Image className={styles?.logo} src={Logo} alt='main-logo' />
          <ul className={styles?.dynamicList}>
            <li>♻️ Smarter Waste Collection & Delivery — On Demand</li>

            <li>Say goodbye to waste hassles. Whether you’re disposing or requesting specific waste types, we make it simple, fast, and location-based.</li>

            <li>✅ <strong>We Pick Up Waste</strong> – Schedule a pickup from your home, office, or facility.</li>
            <li>✅ <strong>We Deliver Waste Resources</strong> – Need compost, recyclable materials, or reusable items? We'll deliver them to your door.</li>
            <li>✅ <strong>Real-Time Tracking</strong> – Know exactly when our team is on the way.</li>
            <li>✅ <strong>Eco-Friendly Mission</strong> – Every request helps reduce landfill and promote circular sustainability.</li>

            <li>📍 <strong>Location-Based Service</strong><br />
              We serve you wherever you are. Just tell us your address — we’ll handle the rest.</li>

          </ul>
          <button className={styles?.requestActionBtn}></button>
        </div>
      </section>
    </>
  );
}
