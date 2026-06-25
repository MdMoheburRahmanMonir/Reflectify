'use client';

import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const GrowthChart = ({ data , title, heading}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const getTheme = () => document.documentElement.classList.contains('dark');
    setIsDark(getTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setIsDark(getTheme());
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const chartTheme = isDark
    ? {  
        gridStroke: '#334155',
        tickColor: '#cbd5e1',
        tooltipBg: '#020617',
        tooltipColor: '#f8fafc',
        tooltipBorder: '1px solid rgba(148,163,184,0.25)',
        areaStroke: '#c4b5fd',
        gradientStart: '#c4b5fd',
        gradientEnd: '#4f46e5',
      }
    : {  
        gridStroke: '#e2e8f0',
        tickColor: '#475569',
        tooltipBg: '#ffffff',
        tooltipColor: '#0f172a',
        tooltipBorder: '1px solid rgba(148,163,184,0.6)',
        areaStroke: '#7c3aed',
        gradientStart: '#8b5cf6',
        gradientEnd: '#c4b5fd',
      };

  return (
    <div className="rounded-3xl h-[400px] p-4 shadow-sm shadow-slate-200 dark:shadow-slate-950/30 bg-white dark:bg-black"  >
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-black dark:text-white " >{title}</p>
        <h2 className="text-lg font-semibold text-black dark:text-white " >{heading}</h2>
      </div>

      <div style={{ width: '100%', aspectRatio: '1.618', maxWidth: 600, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lessonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartTheme.gradientStart} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartTheme.gradientEnd} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
            <XAxis dataKey="date" tick={{ fill: chartTheme.tickColor, fontSize: 12 }} />
            <YAxis tick={{ fill: chartTheme.tickColor, fontSize: 12 }} />
            <Tooltip
              wrapperStyle={{
                borderRadius: 12,
                border: chartTheme.tooltipBorder,
                backgroundColor: chartTheme.tooltipBg,
                color: chartTheme.tooltipColor,
              }}
            />
            <Area type="monotone" dataKey="count" stroke={chartTheme.areaStroke} fill="url(#lessonGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;
