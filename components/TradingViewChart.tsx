import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const TradingViewChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
        },
      });

      const lineSeries = chart.addLineSeries({ color: '#2962FF' });
      lineSeries.setData([
        { time: '2023-01-01', value: 100 },
        { time: '2023-02-01', value: 120 },
        { time: '2023-03-01', value: 110 },
        { time: '2023-04-01', value: 130 },
        { time: '2023-05-01', value: 150 },
      ]);

      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, []);

  return <div ref={chartContainerRef} />;
};

export default TradingViewChart;