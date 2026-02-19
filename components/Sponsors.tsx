'use client';

import { palette, fonts } from '@/lib/theme';

export function Sponsors() {
  return (
    <section className="py-20 px-6" style={{ background: palette.black }}>
      <div className="max-w-4xl mx-auto">
        {/* Kicker */}
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.red }}
          >
            Partners
          </span>
        </div>

        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-5xl font-black uppercase mb-5"
            style={{ fontFamily: fonts.heading, color: palette.cream }}
          >
            SPONSORED BY
          </h2>
          <div
            className="w-16 h-1 mx-auto"
            style={{ background: palette.red }}
          />
        </div>

        {/* Logos in white boxes with names */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <a
            href="https://www.samarabrewing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <div
              className="sponsor-box flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                width: '240px',
                height: '140px',
                padding: '12px',
                borderRadius: '7px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samara_logo.png"
                alt="Samara Brewing Co."
                className="object-contain"
                style={{ maxHeight: '110px', maxWidth: '210px' }}
              />
            </div>
            <p
              className="text-center text-sm font-bold uppercase tracking-wider mt-3"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              Samara Brewing Co.
            </p>
          </a>
          <a
            href="https://www.nickel9distillery.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <div
              className="sponsor-box flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                width: '240px',
                height: '140px',
                padding: '20px',
                borderRadius: '7px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nickel9_logo.png"
                alt="Nickel9 Distillery"
                className="object-contain"
                style={{ maxHeight: '90px', maxWidth: '180px' }}
              />
            </div>
            <p
              className="text-center text-sm font-bold uppercase tracking-wider mt-3"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              Nickel 9 Distillery
            </p>
          </a>
          <a
            href="https://www.instagram.com/chefstav.toronto/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <div
              className="sponsor-box flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                width: '240px',
                height: '140px',
                padding: '12px',
                borderRadius: '7px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stavs-corner-logo.svg"
                alt="Stav's Corner"
                className="object-contain"
                style={{ maxHeight: '130px', maxWidth: '220px' }}
              />
            </div>
            <p
              className="text-center text-sm font-bold uppercase tracking-wider mt-3"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              Stav&apos;s Corner
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
