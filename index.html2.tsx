import React, { useState, useEffect } from 'react';
import { 
  Sun, Cloud, CloudRain, Wind, Droplets, 
  Thermometer, MapPin, Navigation, Calendar,
  AlertCircle, ChevronRight
} from 'lucide-react';

// --- Mock Data ---
const WEATHER_TYPES = {
  CLEAR: { label: '맑음', icon: Sun, color: 'text-orange-500' },
  CLOUDY: { label: '구름많음', icon: Cloud, color: 'text-gray-400' },
  RAIN: { label: '비', icon: CloudRain, color: 'text-blue-500' },
};

const REGIONS = {
  jeju: { 
    id: 'jeju', name: '제주시 (북부)', 
    pos: { top: '25%', left: '50%' },
    current: { temp: 26, type: 'CLEAR', humidity: 65, wind: 3.2, dust: '좋음' },
    hourly: [
      { time: '14:00', temp: 26, type: 'CLEAR' },
      { time: '15:00', temp: 27, type: 'CLEAR' },
      { time: '16:00', temp: 26, type: 'CLOUDY' },
      { time: '17:00', temp: 25, type: 'CLOUDY' },
      { time: '18:00', temp: 24, type: 'CLOUDY' },
    ],
    weekly: [
      { day: '월', tempMin: 22, tempMax: 28, pop: 10 },
      { day: '화', tempMin: 23, tempMax: 29, pop: 20 },
      { day: '수', tempMin: 24, tempMax: 30, pop: 0 },
      { day: '목', tempMin: 23, tempMax: 27, pop: 60 },
      { day: '금', tempMin: 21, tempMax: 25, pop: 80 },
      { day: '토', tempMin: 21, tempMax: 26, pop: 30 },
      { day: '일', tempMin: 22, tempMax: 27, pop: 10 },
    ]
  },
  seogwipo: { 
    id: 'seogwipo', name: '서귀포시 (남부)', 
    pos: { top: '75%', left: '50%' },
    current: { temp: 28, type: 'CLOUDY', humidity: 70, wind: 2.1, dust: '보통' },
    hourly: [
      { time: '14:00', temp: 28, type: 'CLOUDY' },
      { time: '15:00', temp: 28, type: 'CLOUDY' },
      { time: '16:00', temp: 27, type: 'CLEAR' },
      { time: '17:00', temp: 26, type: 'CLEAR' },
      { time: '18:00', temp: 25, type: 'CLEAR' },
    ],
    weekly: [
      { day: '월', tempMin: 24, tempMax: 30, pop: 20 },
      { day: '화', tempMin: 24, tempMax: 31, pop: 10 },
      { day: '수', tempMin: 25, tempMax: 31, pop: 10 },
      { day: '목', tempMin: 24, tempMax: 28, pop: 70 },
      { day: '금', tempMin: 23, tempMax: 26, pop: 90 },
      { day: '토', tempMin: 23, tempMax: 27, pop: 40 },
      { day: '일', tempMin: 24, tempMax: 28, pop: 20 },
    ]
  },
  seongsan: { 
    id: 'seongsan', name: '성산 (동부)', 
    pos: { top: '45%', left: '85%' },
    current: { temp: 25, type: 'RAIN', humidity: 85, wind: 6.5, dust: '좋음' },
    hourly: [
      { time: '14:00', temp: 25, type: 'RAIN' },
      { time: '15:00', temp: 25, type: 'RAIN' },
      { time: '16:00', temp: 24, type: 'RAIN' },
      { time: '17:00', temp: 24, type: 'CLOUDY' },
      { time: '18:00', temp: 23, type: 'CLOUDY' },
    ],
    weekly: [
      { day: '월', tempMin: 21, tempMax: 26, pop: 80 },
      { day: '화', tempMin: 22, tempMax: 27, pop: 60 },
      { day: '수', tempMin: 23, tempMax: 28, pop: 30 },
      { day: '목', tempMin: 22, tempMax: 26, pop: 80 },
      { day: '금', tempMin: 21, tempMax: 24, pop: 100 },
      { day: '토', tempMin: 21, tempMax: 25, pop: 60 },
      { day: '일', tempMin: 21, tempMax: 26, pop: 20 },
    ]
  },
  gosan: { 
    id: 'gosan', name: '고산 (서부)', 
    pos: { top: '45%', left: '15%' },
    current: { temp: 24, type: 'CLEAR', humidity: 60, wind: 5.0, dust: '나쁨' },
    hourly: [
      { time: '14:00', temp: 24, type: 'CLEAR' },
      { time: '15:00', temp: 25, type: 'CLEAR' },
      { time: '16:00', temp: 25, type: 'CLEAR' },
      { time: '17:00', temp: 24, type: 'CLEAR' },
      { time: '18:00', temp: 23, type: 'CLEAR' },
    ],
    weekly: [
      { day: '월', tempMin: 22, tempMax: 26, pop: 0 },
      { day: '화', tempMin: 23, tempMax: 27, pop: 0 },
      { day: '수', tempMin: 23, tempMax: 28, pop: 0 },
      { day: '목', tempMin: 22, tempMax: 26, pop: 40 },
      { day: '금', tempMin: 21, tempMax: 24, pop: 60 },
      { day: '토', tempMin: 21, tempMax: 25, pop: 20 },
      { day: '일', tempMin: 22, tempMax: 26, pop: 0 },
    ]
  },
  hallasan: { 
    id: 'hallasan', name: '한라산 (산간)', 
    pos: { top: '50%', left: '50%' },
    current: { temp: 18, type: 'RAIN', humidity: 95, wind: 8.5, dust: '좋음' },
    hourly: [
      { time: '14:00', temp: 18, type: 'RAIN' },
      { time: '15:00', temp: 17, type: 'RAIN' },
      { time: '16:00', temp: 17, type: 'RAIN' },
      { time: '17:00', temp: 16, type: 'RAIN' },
      { time: '18:00', temp: 15, type: 'RAIN' },
    ],
    weekly: [
      { day: '월', tempMin: 12, tempMax: 18, pop: 90 },
      { day: '화', tempMin: 13, tempMax: 19, pop: 80 },
      { day: '수', tempMin: 14, tempMax: 20, pop: 40 },
      { day: '목', tempMin: 13, tempMax: 17, pop: 100 },
      { day: '금', tempMin: 11, tempMax: 15, pop: 100 },
      { day: '토', tempMin: 11, tempMax: 16, pop: 70 },
      { day: '일', tempMin: 12, tempMax: 18, pop: 40 },
    ]
  },
};

export default function App() {
  const [selectedId, setSelectedId] = useState('jeju');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const region = REGIONS[selectedId];
  const WeatherIcon = WEATHER_TYPES[region.current.type].icon;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              <CloudRain size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">제주특별자치도 기상정보</h1>
              <p className="text-xs text-slate-500">KMA 제주지방기상청 데이터 기반</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            <Calendar size={16} className="mr-2" />
            {formatDate(currentTime)} 기준
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Map & Weekly Stats */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Interactive Map Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin size={20} className="text-blue-500" />
                  지역별 현재 실황
                </h2>
                <span className="text-xs text-slate-400">지도의 마커를 클릭하여 상세 정보를 확인하세요</span>
              </div>
              
              <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-blue-50/50 p-4 sm:p-8 flex items-center justify-center">
                {/* Stylized Jeju Island Background */}
                <div className="relative w-[90%] h-[70%] bg-gradient-to-br from-green-100 to-emerald-200 rounded-[100px_100px_100px_100px] shadow-inner border border-green-300/50">
                  
                  {/* Grid overlay for tech feel */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50 rounded-[100px_100px_100px_100px]"></div>
                  
                  {/* Region Markers */}
                  {Object.values(REGIONS).map((r) => {
                    const isSelected = selectedId === r.id;
                    const RIcon = WEATHER_TYPES[r.current.type].icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all duration-300 z-10 ${
                          isSelected ? 'scale-110 z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ top: r.pos.top, left: r.pos.left }}
                      >
                        <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg whitespace-nowrap border-2 ${
                          isSelected ? 'bg-blue-600 text-white border-blue-200' : 'bg-white text-slate-700 border-transparent hover:border-blue-300'
                        }`}>
                          <RIcon size={16} className={isSelected ? 'text-white' : WEATHER_TYPES[r.current.type].color} />
                          <span className="font-bold">{r.current.temp}°</span>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded shadow-sm ${
                          isSelected ? 'bg-slate-800 text-white' : 'bg-white/80 text-slate-600'
                        }`}>
                          {r.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Weekly Statistics Chart */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Thermometer size={20} className="text-orange-500" />
                  {region.name} 주간 기온 및 강수 확률
                </h2>
              </div>
              
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px] h-64 relative flex items-end justify-between pt-10 pb-6 px-4">
                  {region.weekly.map((data, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 relative group">
                      
                      {/* Tooltip for Temp */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        최고 {data.tempMax}° / 최저 {data.tempMin}°
                      </div>

                      {/* Temperature Range Bar */}
                      <div className="w-4 bg-slate-100 rounded-full relative h-32 flex flex-col justify-end overflow-hidden">
                        {/* Fake representation of temp min/max for visual effect */}
                        <div 
                          className="w-full bg-gradient-to-t from-blue-400 to-orange-400 rounded-full absolute bottom-0 transition-all duration-500"
                          style={{ height: `${(data.tempMax / 35) * 100}%` }}
                        ></div>
                        <div 
                          className="w-full bg-slate-100 absolute bottom-0 transition-all duration-500"
                          style={{ height: `${(data.tempMin / 35) * 100}%` }}
                        ></div>
                      </div>

                      {/* POP (Probability of Precipitation) */}
                      <div className="mt-3 flex flex-col items-center gap-1">
                        <div className="flex items-center text-xs text-blue-500 font-medium">
                          <Droplets size={12} className="mr-0.5"/> {data.pop}%
                        </div>
                        <span className={`text-sm font-bold ${idx === 0 || idx === 6 ? 'text-red-500' : 'text-slate-600'}`}>
                          {data.day}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Detailed View */}
          <div className="space-y-6">
            
            {/* Current Selected Region Highlight */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <WeatherIcon size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 font-medium">{region.name}</p>
                    <h3 className="text-5xl font-bold mt-2 tracking-tighter">
                      {region.current.temp}<span className="text-3xl font-normal text-blue-200">°C</span>
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <WeatherIcon size={40} className="text-white" />
                    <span className="text-lg font-medium">{WEATHER_TYPES[region.current.type].label}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-blue-500/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/30 rounded-lg"><Droplets size={20} className="text-blue-100"/></div>
                    <div>
                      <p className="text-xs text-blue-200">습도</p>
                      <p className="font-semibold">{region.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/30 rounded-lg"><Wind size={20} className="text-blue-100"/></div>
                    <div>
                      <p className="text-xs text-blue-200">풍속</p>
                      <p className="font-semibold">{region.current.wind} m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Indicators (Air Quality, etc) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">생활 기상 지수</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${region.current.dust === '좋음' ? 'bg-green-500' : region.current.dust === '보통' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-xs text-slate-500">미세먼지</p>
                      <p className="font-bold text-slate-700">{region.current.dust}</p>
                    </div>
                  </div>
                  <AlertCircle size={20} className={region.current.dust === '좋음' ? 'text-green-500' : region.current.dust === '보통' ? 'text-yellow-500' : 'text-red-500'} />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full bg-orange-500"></div>
                    <div>
                      <p className="text-xs text-slate-500">자외선 지수</p>
                      <p className="font-bold text-slate-700">높음</p>
                    </div>
                  </div>
                  <Sun size={20} className="text-orange-500" />
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-800">시간대별 예보</h3>
                <button className="text-xs text-blue-600 hover:underline flex items-center">
                  더보기 <ChevronRight size={14} />
                </button>
              </div>
              <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                {region.hourly.map((h, idx) => {
                  const HIcon = WEATHER_TYPES[h.type].icon;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-slate-50 transition-colors min-w-[60px]">
                      <span className="text-xs text-slate-500 mb-2">{h.time}</span>
                      <HIcon size={24} className={`${WEATHER_TYPES[h.type].color} mb-2`} />
                      <span className="font-bold text-slate-800">{h.temp}°</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Special Notice */}
            {region.id === 'hallasan' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-red-800 mb-1">기상 특보 발효 중</h4>
                  <p className="text-xs text-red-600 leading-relaxed">
                    한라산 산간 지역 호우주의보가 발효 중입니다. 등산객 및 야영객은 안전사고에 각별히 유의하시기 바랍니다.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}