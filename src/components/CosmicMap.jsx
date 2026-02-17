import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, X, Users, Store, Zap, Youtube,
  Utensils, Anchor, HeartPulse, Home, BookOpen, Star, Landmark,
  Factory, Palette, Cpu, ShoppingBag, Trees, HardHat, HandHeart,
  School, Building2, Coins, Book, Instagram, Facebook,
  Smartphone, Sun, HeartHandshake, Sparkles, Train, ArrowRight
} from 'lucide-react';

// 제물포구 18개 행정동 데이터 (공약 기반 매핑 & 아이콘 & 색상테마)
const districtData = [
  {
    id: 1,
    name: "신포동",
    promise: "청년 공공안심상가 및 K-푸드 스마트 허브 연계",
    features: ["전통시장 내 청년 안심상가 조성", "제물포 코인(지역화폐) 캐시백 15%", "글로벌 관광 클러스터 특화"],
    icon: Utensils,
    emoji: "🐟", keyword: "#K-푸드", color: "bg-orange-100 border-orange-300", text: "text-orange-700", shadow: "shadow-[0_4px_0_#fdba74]"
  },
  {
    id: 2,
    name: "연안동",
    promise: "K-푸드 스마트 허브 구축 및 인천지하철 3호선 연안부두역 신설",
    features: ["스마트 콜드체인 물류 허브 도입", "해양특화 경제자유구역 지정 추진", "인천 3호선(순환선) 조기 착공"],
    icon: Anchor,
    emoji: "🚢", keyword: "#연안부두", color: "bg-blue-100 border-blue-300", text: "text-blue-700", shadow: "shadow-[0_4px_0_#60a5fa]"
  },
  {
    id: 3,
    name: "신흥동",
    promise: "빈 점포 활용 예술가 레지던시 및 맞춤형 헬스케어 확대",
    features: ["문화예술 창작촌(레지던시) 조성", "마음건강 119 의료 안전망 가동", "노후 주거 환경 '안심 家' 정비"],
    icon: HeartPulse,
    emoji: "🎨", keyword: "#예술가", color: "bg-pink-100 border-pink-300", text: "text-pink-700", shadow: "shadow-[0_4px_0_#f472b6]"
  },
  {
    id: 4,
    name: "도원동",
    promise: "역세권 청년 주거 혁신 및 원스톱 통합 돌봄 플랫폼 구축",
    features: ["역세권 청년 올인원 주거 타운", "늘봄학교 연계 틈새 돌봄 강화", "제물포 AI 민원 버스 정기 순회"],
    icon: Home,
    emoji: "🏡", keyword: "#청년주거", color: "bg-emerald-100 border-emerald-300", text: "text-emerald-700", shadow: "shadow-[0_4px_0_#34d399]"
  },
  {
    id: 5,
    name: "율목동",
    promise: "주민 향유형 문화 거점(구민청) 조성 및 숲속 도서관 건립",
    features: ["권역별 제물포 구민청(세대공감) 조성", "율목공원 숲속 도서관 건립", "어르신 스마트 헬스케어 경로당"],
    icon: BookOpen,
    emoji: "📚", keyword: "#숲속도서관", color: "bg-green-100 border-green-300", text: "text-green-700", shadow: "shadow-[0_4px_0_#4ade80]"
  },
  {
    id: 6,
    name: "동인천동",
    promise: "동인천역 북광장 랜드마크화 및 문화야시장 브랜드화",
    features: ["북광장 복합 랜드마크 개발", "제물포 '골든위크' 문화야시장", "상권 르네네상스 프로젝트 가동"],
    icon: Star,
    emoji: "🌟", keyword: "#랜드마크", color: "bg-purple-100 border-purple-300", text: "text-purple-700", shadow: "shadow-[0_4px_0_#c084fc]"
  },
  {
    id: 7,
    name: "개항동",
    promise: "인천역 KTX 시대 개막 및 제물포 웨이(We-sharing) 관광 거점",
    features: ["인천역 KTX 시점 연장 추진", "근대 문화유산 디지털 트윈 복원", "제물포형 로컬 크리에이터 육성"],
    icon: Landmark,
    emoji: "🏛️", keyword: "#KTX인천역", color: "bg-amber-100 border-amber-300", text: "text-amber-700", shadow: "shadow-[0_4px_0_#fbbf24]"
  },
  {
    id: 8,
    name: "만석동",
    promise: "산학융합 테크노-벨트 조성 및 동일방직 부지 문화 재생",
    features: ["기회발전특구 지정(세제 혜택)", "동일방직 부지 복합 문화공간화", "뿌리산업 AI 기술 고도화 지원"],
    icon: Factory,
    emoji: "🏭", keyword: "#테크노벨트", color: "bg-slate-100 border-slate-300", text: "text-slate-700", shadow: "shadow-[0_4px_0_#94a3b8]"
  },
  {
    id: 9,
    name: "화수1·화평동",
    promise: "문화예술 창작촌(레지던시) 조성 및 노후 주거 쾌적화",
    features: ["빈집 활용 예술가 레지던시 공급", "노후 주택 낙상 예방 집수리", "주민 주도 마을 관리소 운영"],
    icon: Palette,
    emoji: "🖌️", keyword: "#문화창작", color: "bg-fuchsia-100 border-fuchsia-300", text: "text-fuchsia-700", shadow: "shadow-[0_4px_0_#e879f9]"
  },
  {
    id: 10,
    name: "화수2동",
    promise: "기회발전특구 지정 추진 및 첨단 뿌리산업 클러스터 조성",
    features: ["산학융합 '마이크로 팩토리' 유치", "제물포 구민청(문화혁신) 조성", "일자리 연계형 청년 주택 공급"],
    icon: Cpu,
    emoji: "💾", keyword: "#첨단산업", color: "bg-indigo-100 border-indigo-300", text: "text-indigo-700", shadow: "shadow-[0_4px_0_#818cf8]"
  },
  {
    id: 11,
    name: "송현1·2동",
    promise: "전통시장 현대화 및 청년 창업 '공공안심상가' 지원",
    features: ["중앙시장 청년 공공안심상가", "시장 연계 문화 관광 상품 개발", "보행자 중심 '걷고 싶은 거리'"],
    icon: ShoppingBag,
    emoji: "🛍️", keyword: "#전통시장", color: "bg-red-100 border-red-300", text: "text-red-700", shadow: "shadow-[0_4px_0_#f87171]"
  },
  {
    id: 12,
    name: "송현3동",
    promise: "산업단지 대개조 및 친환경 녹색 일자리 창출",
    features: ["산업단지 주변 녹지 완충 조성", "햇빛발전협동조합 '에너지 연금'", "친환경 그린 일자리 500개 확보"],
    icon: Trees,
    emoji: "🌳", keyword: "#녹색일자리", color: "bg-lime-100 border-lime-300", text: "text-lime-700", shadow: "shadow-[0_4px_0_#a3e635]"
  },
  {
    id: 13,
    name: "송림1동",
    promise: "신속한 재개발 추진 및 정주 여건 대폭 개선",
    features: ["재개발 사업 신속 행정 지원", "무인 방범 시스템 CCTV 확충", "쓰레기 무단 투기 제로화"],
    icon: HardHat,
    emoji: "🏗️", keyword: "#재개발", color: "bg-teal-100 border-teal-300", text: "text-teal-700", shadow: "shadow-[0_4px_0_#2dd4bf]"
  },
  {
    id: 14,
    name: "송림2동",
    promise: "어르신 '안심 家' 집수리 지원 및 통합 돌봄 센터 확충",
    features: ["낙상 예방 고령친화 집수리", "다함께돌봄센터 확충", "찾아가는 AI 이동 보건소"],
    icon: HandHeart,
    emoji: "❤️", keyword: "#어르신돌봄", color: "bg-rose-100 border-rose-300", text: "text-rose-700", shadow: "shadow-[0_4px_0_#fb7185]"
  },
  {
    id: 15,
    name: "송림3·5동",
    promise: "아동·청소년 안전 통학로 조성 및 교육 특화 거리 육성",
    features: ["스마트 횡단보도 및 안심 통학로", "청소년 진로 체험 '잡 월드' 연계", "마을 도서관 활성화 프로그램"],
    icon: School,
    emoji: "🏫", keyword: "#안심통학로", color: "bg-sky-100 border-sky-300", text: "text-sky-700", shadow: "shadow-[0_4px_0_#38bdf8]"
  },
  {
    id: 16,
    name: "송림4동",
    promise: "송림플라자 '청년 올인원 센터' 및 행정타운 조성",
    features: ["송림플라자 리모델링(청년 창업/주거)", "제물포 행정타운 연계 상권 활성화", "대학 연계 AI 교육 특구 유치"],
    icon: Building2,
    emoji: "🏢", keyword: "#송림플라자", color: "bg-cyan-100 border-cyan-300", text: "text-cyan-700", shadow: "shadow-[0_4px_0_#22d3ee]"
  },
  {
    id: 17,
    name: "송림6동",
    promise: "소상공인 경영안정수당 지급 및 골목상권 활성화",
    features: ["소상공인 경영안정 자금 지원", "골목상권 '브랜드 페스타' 개최", "상가 앞 주차 허용 구간 탄력 운영"],
    icon: Coins,
    emoji: "💰", keyword: "#골목상권", color: "bg-yellow-100 border-yellow-300", text: "text-yellow-700", shadow: "shadow-[0_4px_0_#facc15]"
  },
  {
    id: 18,
    name: "금창동",
    promise: "배다리 역사문화 거리 명소화 및 로컬 크리에이터 육성",
    features: ["배다리 책방 거리 '지식 플랫폼'화", "로컬 크리에이터 100인 육성", "근대 역사 문화 탐방로 조성"],
    icon: Book,
    emoji: "📖", keyword: "#배다리", color: "bg-amber-100 border-amber-300", text: "text-amber-700", shadow: "shadow-[0_4px_0_#fbbf24]"
  }
];

export const CosmicMap = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedId, setFlippedId] = useState(null);

  // 화면 크기 감지 및 반응형 상태 업데이트
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 성능 최적화: 선택된 데이터 안전하게 탐색
  const selectedDistrict = useMemo(() =>
    districtData.find(d => d.id === selectedId), [selectedId]
  );

  return (
    <div className="
      relative w-full bg-[#000814] text-white font-sans
      flex flex-col min-h-[100dvh] pb-40
      md:min-h-screen md:pb-0 w-full md:px-6 lg:px-12
    ">
      {/* 1. 배경 (Fixed) */}
      <div className="fixed inset-0 z-0 bg-slate-950" />
      <img
        src="/futuristic_city_bg.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center opacity-30 z-0 pointer-events-none"
      />

      {/* 2. Navigation Header (Responsive) */}
      <div className="
        fixed top-0 left-0 right-0 z-[60] px-4 py-3 flex justify-center items-center gap-2 shadow-lg
        bg-black/60 backdrop-blur-xl border-b border-white/10
        md:flex-row md:static md:bg-transparent md:border-none md:shadow-none md:py-6 md:justify-center md:gap-8
      ">
        <button
          onClick={() => document.getElementById('section-profile')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="px-4 py-1.5 text-xs font-bold bg-white/10 rounded-full border border-white/10 active:bg-blue-600 active:border-blue-400 transition-all text-white md:text-sm md:px-6 md:py-2 hover:bg-white/20"
        >
          프로필
        </button>
        <button
          onClick={() => document.getElementById('section-pledges')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="px-4 py-1.5 text-xs font-bold bg-white/10 rounded-full border border-white/10 active:bg-blue-600 active:border-blue-400 transition-all text-white md:text-sm md:px-6 md:py-2 hover:bg-white/20"
        >
          7대공약
        </button>
        <button
          onClick={() => document.getElementById('section-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="px-4 py-1.5 text-xs font-bold bg-blue-600/80 rounded-full border border-blue-400/30 shadow-[0_0_10px_rgba(37,99,235,0.4)] active:scale-95 transition-all text-white md:text-sm md:px-6 md:py-2 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
        >
          공약지도
        </button>
      </div>

      {/* Candidate Image - Optimized for Mobile Background Visibility */}
      <div className={`fixed inset-0 z-10 pointer-events-none select-none ${isMobile ? 'bg-fixed bg-[position:30%_center] bg-cover' : ''}`}
        style={isMobile ? { backgroundImage: 'url(/images/campaign_poster.jpg)', opacity: 0.4 } : {}}
      >
        {!isMobile && (
          <img
            src="/images/campaign_poster.jpg"
            alt="Candidate"
            className="fixed left-0 top-0 h-screen w-auto object-cover opacity-90 max-w-[65vw] object-left-top"
            style={{ maskImage: 'linear-gradient(to right, black 40%, transparent 90%)' }}
          />
        )}
      </div>

      {/* Desktop Header */}
      {!isMobile && (
        <header className="relative z-50 pt-16 md:pt-16 pb-4 text-center select-none shrink-0 pointer-events-none px-4 w-full">
          <h1 className="text-7xl font-black tracking-tighter mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500">
              남궁형
            </span>
          </h1>
        </header>
      )}

      {/* Mobile Title Block */}
      {isMobile && (
        <div className="relative z-30 pt-20 px-6 text-center mb-8">
          <h1 className="text-5xl font-black tracking-tighter mb-1 text-white drop-shadow-2xl">
            남궁형
          </h1>
          <p className="text-blue-400 font-bold tracking-widest text-sm uppercase">Next Generation Leader</p>
        </div>
      )}

      {/* Slogan */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className={`z-40 flex flex-col pointer-events-none ${isMobile ? 'relative w-full px-6 mb-12 items-center' : 'absolute top-8 right-10 items-end'}`}
      >
        <h2 className={`font-black tracking-tight text-white drop-shadow-lg mb-2 ${isMobile ? 'text-2xl text-center backdrop-blur-sm bg-black/20 rounded-lg px-2' : 'text-2xl text-right'}`}>
          제물포 민생 대전환
        </h2>
        <h2 className={`
          font-[900] italic transform -skew-x-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600
          ${isMobile ? 'text-6xl drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]' : 'text-7xl text-right'}
        `}>
          1조 원 시대
        </h2>
      </motion.div>

      {/* Main Layout Container: Split View for Desktop - Edge to Edge */}
      <div className="md:flex md:justify-between md:gap-10 lg:gap-20 md:items-start md:mt-12">

        {/* 4. Profile Section - LEFT SIDEBAR */}
        <div id="section-profile" className={`
        z-40 transition-all duration-500
        ${isMobile
            ? 'relative w-full px-4 mb-20 flex flex-col items-center scroll-mt-24'
            : 'md:w-[340px] md:shrink-0 md:sticky md:top-32'
          }
      `}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`
            text-left
            ${isMobile
                ? 'w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl'
                : 'w-full max-w-xl bg-gradient-to-br from-black/20 via-blue-900/5 to-transparent p-8 backdrop-blur-xl rounded-3xl border border-white/5'
              }
          `}
          >
            <h3 className={`text-blue-400 font-black mb-6 flex items-center gap-3 ${isMobile ? 'text-2xl border-b border-white/10 pb-4' : 'text-3xl'}`}>
              <span className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></span>
              걸어온 길
            </h3>
            <ul className={`space-y-3 font-medium ${isMobile ? 'text-sm text-slate-200' : 'text-lg text-slate-200'}`}>
              {[
                "인천대학교 행정대학원 행정학 석사",
                "제8대 인천광역시의회 의원 (청년특별위원장)",
                "대통령 소속 자치분권위원회 정책자문위원",
                "대통령 직속 국가균형발전위 국민소통특별위원",
                "제20대 대선 이재명 후보 선거캠프 실무팀장",
                "더불어민주당 전략기획위원회 부위원장",
                "단국대학교 초빙교수 (현)",
                "더불어민주당 중앙당 부대변인 (현)",
                "(사)제물포정책연구원장 (현)",
                "박찬대 국회의원 정책특별보좌관 (현)"
              ].map((item, i) => (
                <li key={i} className={`flex gap-3 ${item.includes("(현)") ? "text-white font-bold" : ""}`}>
                  <span className={`${item.includes("(현)") ? "text-yellow-400" : "text-blue-500"} min-w-[6px] mt-1.5`}>●</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Pledge Book Download Button */}
            <a
              href="/promise.pdf.pdf"
              download="남궁형_공약집.pdf"
              className={`
              mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl
              bg-blue-600/90 hover:bg-blue-500 text-white font-bold
              border border-white/20 shadow-lg active:scale-95 transition-all
              ${isMobile ? 'text-sm' : 'text-base'}
            `}
            >
              <BookOpen className="w-5 h-5" />
              남궁형 공약집 다운로드
            </a>
          </motion.div>

          {/* Desktop Socials */}
          {!isMobile && (
            <div className="flex gap-4">
              <motion.a href="https://namu.wiki/w/%EB%82%A8%EA%B6%81%ED%98%95" target="_blank" className="bg-black/50 p-3 rounded-full border border-white/20 hover:bg-green-900/50 transition-colors"><Book className="w-6 h-6 text-white" /></motion.a>
              <motion.a href="https://www.instagram.com/namlider123" target="_blank" className="bg-black/50 p-3 rounded-full border border-white/20 hover:bg-pink-900/50 transition-colors"><Instagram className="w-6 h-6 text-white" /></motion.a>
              <motion.a href="https://www.facebook.com/people/%EB%82%A8%EA%B6%81%ED%98%95/100011423920163/" target="_blank" className="bg-black/50 p-3 rounded-full border border-white/20 hover:bg-blue-900/50 transition-colors"><Facebook className="w-6 h-6 text-white" /></motion.a>
            </div>
          )}
        </div>

        {/* RIGHT CONTENT COLUMN */}
        <div className="md:flex-1 md:min-w-0">

          {/* 4.5 Core Pledges Section - Responsive Grid */}
          {isMobile && (
            <div id="section-pledges" className="relative z-40 w-full px-4 mb-20 scroll-mt-24">
              {/* Section Title (Matches Map Section) */}
              <div className="mb-6 flex flex-col items-center gap-1">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-px bg-white/20 flex-1" />
                  <h3 className="text-xl font-black text-white whitespace-nowrap drop-shadow-md">7대 핵심 공약</h3>
                  <div className="h-px bg-white/20 flex-1" />
                </div>
                <p className="text-xs text-blue-300/80 animate-pulse">
                  아이콘을 클릭하면 상세 내용을 볼 수 있습니다
                </p>
              </div>

              {/* 7 Core Pledges Grid (Flip Interaction) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8">
                {[
                  { id: 1, title: "행정", desc: "찾아가는 지능형 밀착 행정", emoji: "🤖", keyword: "#AI_민원버스", color: "bg-blue-100 border-blue-300", shadow: "shadow-[0_4px_0_#60a5fa]", text: "text-blue-700", benefit: "구청까지 가지 마세요.\n버스 한 대가 완벽한 구청이 되어 찾아갑니다!" },
                  { id: 2, title: "주권", desc: "디지털 주민 주권 시대", emoji: "🤝", keyword: "#주민주권", color: "bg-cyan-100 border-cyan-300", shadow: "shadow-[0_4px_0_#22d3ee]", text: "text-cyan-700", benefit: "예산 편성권과 결정권,\n구청장의 권한을 주민 여러분께 돌려드립니다." },
                  { id: 3, title: "에너지", desc: "에너지 연금 도시", emoji: "☀️", keyword: "#에너지연금", color: "bg-yellow-100 border-yellow-300", shadow: "shadow-[0_4px_0_#facc15]", text: "text-yellow-700", benefit: "제물포에 산다는 것만으로도\n'에너지 연금' 혜택을 받습니다." },
                  { id: 4, title: "복지", desc: "제물포 올케어 복지", emoji: "🧸", keyword: "#올케어복지", color: "bg-pink-100 border-pink-300", shadow: "shadow-[0_4px_0_#f472b6]", text: "text-pink-700", benefit: "아프기 전에 미리 챙겨드립니다.\n병원비 걱정 없는 건강 도시를 만듭니다." },
                  { id: 5, title: "경제", desc: "K-푸드 글로벌 명소화", emoji: "🍱", keyword: "#K-푸드", color: "bg-orange-100 border-orange-300", shadow: "shadow-[0_4px_0_#fb923c]", text: "text-orange-700", benefit: "장사가 안 돼서 문 닫는 일이 없도록,\n남궁형이 든든한 버팀목이 되겠습니다." },
                  { id: 6, title: "문화", desc: "문화 마법 도시", emoji: "✨", keyword: "#문화마법", color: "bg-purple-100 border-purple-300", shadow: "shadow-[0_4px_0_#c084fc]", text: "text-purple-700", benefit: "제물포의 역사가 곧 돈이 되고,\n밥이 되는 문화 산업을 만듭니다." },
                  { id: 7, title: "교통", desc: "인천역 KTX & 트램", emoji: "🚄", keyword: "#KTX트램", color: "bg-green-100 border-green-300", shadow: "shadow-[0_4px_0_#4ade80]", text: "text-green-700", benefit: "남궁형의 정치력으로 중앙정부 철도 계획에\n'제물포' 세 글자를 새겨넣겠습니다." },
                ].map((item, idx) => {
                  const borderColor = item.color.split(' ').find(c => c.startsWith('border-')) || 'border-slate-200';

                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square ${idx === 6 ? 'col-span-2 w-1/2 mx-auto sm:col-span-1 sm:w-full sm:col-start-2' : ''}`}
                      style={{ perspective: '1000px' }}
                      onClick={() => setFlippedId(flippedId === item.id ? null : item.id)}
                    >
                      <div
                        className={`w-full h-full relative transition-all duration-500 cursor-pointer`}
                        style={{ transformStyle: 'preserve-3d', transform: flippedId === item.id ? "rotateY(180deg)" : "rotateY(0deg)" }}
                      >
                        {/* Front Face (Cute 3D) */}
                        <div
                          className={`
                      absolute inset-0 flex flex-col items-center justify-center
                      ${item.color} border-2 rounded-3xl ${item.shadow}
                      md:hover:shadow-glow transition-shadow duration-300
                    `}
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="text-4xl drop-shadow-md mb-2 animate-bounce-slow">
                            {item.emoji}
                          </div>
                          <span className={`font-black ${item.text} text-sm mb-1.5 drop-shadow-sm`}>
                            {item.title}
                          </span>
                          {/* Desktop Manifesto Phrase */}
                          <span className="hidden md:block text-[10px] font-bold text-slate-600 mb-1.5 text-center px-2 leading-tight">
                            {item.desc}
                          </span>
                          <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/50 shadow-sm">
                            <span className={`text-[10px] font-extrabold ${item.text} tracking-tight`}>
                              {item.keyword}
                            </span>
                          </div>
                        </div>

                        {/* Back Face (Benefit Text - Brightened) */}
                        <div
                          className={`
                      absolute inset-0 flex flex-col items-center justify-center p-4 text-center
                      bg-white/95 backdrop-blur-xl border-4 ${borderColor} rounded-3xl shadow-xl
                    `}
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <p className={`text-sm font-black ${item.text} leading-relaxed break-keep whitespace-pre-line drop-shadow-sm`}>
                            {item.benefit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Detailed PDF Button - Keep large button but native style */}
              <a
                href="/promise.pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
              flex items-center justify-center gap-2 w-full py-4 rounded-xl
              bg-blue-600/90 hover:bg-blue-500 
              text-white font-bold text-base
              border border-white/20 shadow-[0_0_20px_rgba(37,99,235,0.4)]
              active:scale-95 transition-all
            "
              >
                <BookOpen className="w-5 h-5" />
                남궁형의 1조 원 시대 상세 공약집 보기
              </a>
            </div>
          )}

          {/* 5. Policy Map Section - GRID STYLE */}
          <div id="section-map" className={`relative z-30 w-full ${isMobile ? 'px-4 pb-12 scroll-mt-24' : 'flex-grow h-screen pointer-events-none'}`}>
            {isMobile && (
              <div className="mb-6 flex flex-col items-center gap-1">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-px bg-white/20 flex-1" />
                  <h3 className="text-xl font-black text-white whitespace-nowrap drop-shadow-md">우리 동네 공약</h3>
                  <div className="h-px bg-white/20 flex-1" />
                </div>
                <p className="text-xs text-blue-300/80 animate-pulse">
                  동네 아이콘을 클릭하면 상세 공약이 나타납니다
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5 w-full px-1">
              {districtData.map((district, index) => {
                return (
                  <motion.div
                    key={district.id}
                    onClick={() => setSelectedId(district.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`
                    cursor-pointer group relative 
                    flex flex-col items-center justify-center aspect-square 
                    rounded-2xl border-2 transition-all duration-300
                    ${isMobile ? `${district.color} ${district.shadow}` : 'bg-white/5 border-white/10 hover:border-white/30 hover:shadow-xl hover:-translate-y-1'}
                  `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {isMobile ? (
                      <>
                        {/* Mobile: Cute 3D Emoji */}
                        <div className="text-3xl drop-shadow-md mb-1 animate-bounce-slow">{district.emoji}</div>
                        <span className={`font-black ${district.text} text-xs mb-0.5 text-center`}>{district.name}</span>
                        <div className="bg-white/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-white/40 shadow-sm">
                          <span className={`text-[10px] font-bold ${district.text} tracking-tighter`}>{district.keyword}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop: Professional Pastel Card + Line Icon */}
                        <div className={`
                        absolute inset-0 rounded-2xl opacity-100 transition-all duration-300
                        ${district.color} border-0
                    `} />

                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <div className="p-3 bg-white/40 rounded-full shadow-sm backdrop-blur-md ring-1 ring-white/40">
                            {React.createElement(district.icon || MapPin, {
                              className: `w-8 h-8 ${district.text}`,
                              strokeWidth: 2
                            })}
                          </div>
                          <span className={`text-base font-extrabold ${district.text}`}>{district.name}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div> {/* End Right Content Column */}
      </div> {/* End Main Layout Container */}

      {/* Mobile Sticky Footer */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#020617]/90 backdrop-blur-xl border-t border-white/10 p-3 pb-8 grid grid-cols-3 gap-2">
          <a href="https://namu.wiki/w/%EB%82%A8%EA%B6%81%ED%98%95" target="_blank" className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all">
            <Book className="w-5 h-5 text-green-400 mb-1" />
            <span className="text-[10px] text-slate-400">나무위키</span>
          </a>
          <a href="https://www.instagram.com/namlider123" target="_blank" className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all">
            <Instagram className="w-5 h-5 text-pink-500 mb-1" />
            <span className="text-[10px] text-slate-400">인스타그램</span>
          </a>
          <a href="https://www.facebook.com/people/%EB%82%A8%EA%B6%81%ED%98%95/100011423920163/" target="_blank" className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all">
            <Facebook className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-[10px] text-slate-400">페이스북</span>
          </a>
        </div>
      )}

      {/* 5. 정책 상세 모달: High-End Futuristic Glassmorphism */}
      <AnimatePresence>
        {selectedId && selectedDistrict && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="
                relative w-full max-w-lg overflow-hidden
                bg-[#0f172a]/80 backdrop-blur-xl
                rounded-3xl border border-blue-400/30
                shadow-[0_0_50px_rgba(59,130,246,0.3)]
                p-6 sm:p-8 m-4
              "
            >
              {/* Soft Blue Glowing Edge Effect (Inner Shadow) */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]" />

              {/* Header: Title & Close Button */}
              <div className="flex justify-between items-start mb-4 sm:mb-6 border-b border-blue-500/20 pb-4 relative z-10 w-full">
                <h3
                  className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  {selectedDistrict.name}
                </h3>
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-slate-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                </button>
              </div>

              {/* Content: Promise & Features */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 relative z-10 w-full">
                {/* Main Quote / Promise */}
                <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-4 sm:p-5 rounded-xl border-l-4 border-blue-500 w-full">
                  <p className="text-base sm:text-xl font-medium leading-relaxed italic text-blue-100/90 breakdown-words">
                    "{selectedDistrict.promise}"
                  </p>
                </div>

                {/* Dynamic Features List with Neon Icons */}
                <div className="space-y-2 sm:space-y-3 w-full">
                  {selectedDistrict.features ? (
                    selectedDistrict.features.map((feature, idx) => {
                      const icons = [Zap, Store, Users];
                      const Icon = icons[idx % 3];
                      // Neon colors for icons
                      const iconColors = [
                        "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]",
                        "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]",
                        "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                      ];

                      return (
                        <div key={idx} className="flex items-center gap-3 sm:gap-4 group w-full">
                          <div className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors shrink-0">
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColors[idx % 3]}`} />
                          </div>
                          <span className="text-slate-200 font-bold text-sm sm:text-base tracking-wide group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    // Fallback
                    <>
                      <div className="flex items-center gap-4"><Zap className="w-5 h-5 text-yellow-400" /> 에너지 연금 시범 사업 실시</div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer: Action Button (Vibrant & Pulsing) */}
              <div className="flex flex-col gap-3 items-center relative z-10 w-full">
                <button
                  onClick={() => window.open('https://youtube.com', '_blank')}
                  className="
                    group relative flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto
                    bg-gradient-to-r from-red-600 to-rose-600 
                    hover:from-red-500 hover:to-rose-500
                    rounded-full text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] 
                    transition-all duration-300 transform hover:scale-105
                  "
                >
                  <span className="absolute inset-0 rounded-full animate-pulse bg-red-500/30 blur-md"></span>
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6 z-10 fill-white" />
                  <span className="text-sm sm:text-base font-black tracking-wider uppercase z-10">공약 쇼츠 영상 보기</span>
                </button>
                <span className="text-[10px] text-blue-400/80 font-bold uppercase tracking-[0.2em] mt-3">
                  2026 Future City Project
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
