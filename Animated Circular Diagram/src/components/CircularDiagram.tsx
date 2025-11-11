import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react";

interface DataPoint {
  id: number;
  label: string;
  value: number;
  color: string;
  icon: React.ElementType;
  description: string;
}

const dataPoints: DataPoint[] = [
  { 
    id: 1, 
    label: "Revenue", 
    value: 85, 
    color: "#93c5fd", 
    icon: DollarSign,
    description: "Track your total revenue and monitor financial growth across all channels"
  },
  { 
    id: 2, 
    label: "Users", 
    value: 72, 
    color: "#c4b5fd", 
    icon: Users,
    description: "Monitor active user base and engagement metrics in real-time"
  },
  { 
    id: 3, 
    label: "Sales", 
    value: 93, 
    color: "#f9a8d4", 
    icon: ShoppingCart,
    description: "Analyze sales performance and conversion rates for better insights"
  },
  { 
    id: 4, 
    label: "Growth", 
    value: 68, 
    color: "#fcd34d", 
    icon: TrendingUp,
    description: "Measure overall business growth and identify expansion opportunities"
  },
];

export function CircularDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const radius = 200;
  const centerX = 300;
  const centerY = 300;
  const transitionDuration = 6000; // 6 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % dataPoints.length);
      setProgress(0);
    }, transitionDuration);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset progress when active index changes
    setProgress(0);
    
    // Animate progress from 0 to 1 over the transition duration
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / transitionDuration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [activeIndex]);

  const getPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle };
  };

  const getCurvedArrowPath = (startIndex: number, total: number) => {
    const start = getPosition(startIndex, total);
    const end = getPosition((startIndex + 1) % total, total);
    
    // Calculate control point for curved path (arc following the circle)
    const midAngle = ((startIndex + 0.5) * 2 * Math.PI) / total - Math.PI / 2;
    const arcRadius = radius + 30;
    const controlX = centerX + arcRadius * Math.cos(midAngle);
    const controlY = centerY + arcRadius * Math.sin(midAngle);
    
    // Create quadratic bezier curve
    const curvePath = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
    
    return curvePath;
  };

  const getArrowHeadPath = (startIndex: number, total: number) => {
    const end = getPosition((startIndex + 1) % total, total);
    const nextAngle = ((startIndex + 1) * 2 * Math.PI) / total - Math.PI / 2;
    
    // Position the arrow head closer to the end point
    const arrowLength = 15;
    const arrowWidth = 8;
    
    // Tip of the arrow points toward the next box
    const tipX = end.x - 55 * Math.cos(nextAngle);
    const tipY = end.y - 55 * Math.sin(nextAngle);
    
    // Calculate the base points perpendicular to the direction
    const baseX = tipX - arrowLength * Math.cos(nextAngle);
    const baseY = tipY - arrowLength * Math.sin(nextAngle);
    
    const leftX = baseX - arrowWidth * Math.sin(nextAngle);
    const leftY = baseY + arrowWidth * Math.cos(nextAngle);
    
    const rightX = baseX + arrowWidth * Math.sin(nextAngle);
    const rightY = baseY - arrowWidth * Math.cos(nextAngle);
    
    return `M ${tipX} ${tipY} L ${leftX} ${leftY} L ${rightX} ${rightY} Z`;
  };

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h1 className="text-slate-800 mb-2">Performance Metrics</h1>
        <p className="text-slate-600">Interactive circular data visualization</p>
      </div>

      <svg width="600" height="600" className="mx-auto">

        {/* Inner circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.6}
          fill="none"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />

        {/* Curved arrows between points */}
        {dataPoints.map((point, index) => {
          const isActive = index === activeIndex;
          const pathData = getCurvedArrowPath(index, dataPoints.length);
          
          return (
            <g key={`arrow-${point.id}`}>
              {/* Gray base path */}
              <path
                d={pathData}
                stroke="rgba(148, 163, 184, 0.4)"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Colored path that progressively reveals */}
              {isActive && (
                <motion.path
                  d={pathData}
                  stroke={point.color}
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress }}
                  transition={{ duration: 0, ease: "linear" }}
                />
              )}
              
              {/* Arrow head triangle - only show when active and near completion */}
              {isActive && progress > 0.85 && (
                <path
                  d={getArrowHeadPath(index, dataPoints.length)}
                  fill={point.color}
                />
              )}
            </g>
          );
        })}

        {/* Lines from center to each point */}
        {dataPoints.map((point, index) => {
          const pos = getPosition(index, dataPoints.length);
          return (
            <motion.line
              key={`center-line-${point.id}`}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
              opacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            />
          );
        })}

        {/* Center pulse circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={20}
          fill="rgba(148, 163, 184, 0.2)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1] }}
          transition={{ duration: 1 }}
        />

        {/* Data point rounded rectangles */}
        {dataPoints.map((point, index) => {
          const pos = getPosition(index, dataPoints.length);
          const isActive = index === activeIndex;
          const rectWidth = 100;
          const rectHeight = 60;
          const rectX = pos.x - rectWidth / 2;
          const rectY = pos.y - rectHeight / 2;
          
          return (
            <g 
              key={`point-${point.id}`}
              onClick={() => setActiveIndex(index)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer glow */}
              <motion.rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={12}
                fill={point.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive ? 0.3 : 0.15,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              {/* Main rectangle */}
              <motion.rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={12}
                fill={point.color}
                stroke={isActive ? "white" : "transparent"}
                strokeWidth={isActive ? "2" : "0"}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.08 }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              {/* Text label */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1e293b"
                fontSize="14"
                fontWeight="600"
                pointerEvents="none"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>



      {/* Center content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              className="p-4 rounded-xl bg-white shadow-lg"
              style={{
                border: `2px solid ${dataPoints[activeIndex].color}`,
              }}
              animate={{
                boxShadow: `0 10px 40px ${dataPoints[activeIndex].color}40`
              }}
            >
              {(() => {
                const Icon = dataPoints[activeIndex].icon;
                return <Icon size={36} color={dataPoints[activeIndex].color} strokeWidth={2} />;
              })()}
            </motion.div>
            <div>
              <div className="text-slate-800 mb-3">{dataPoints[activeIndex].label}</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {dataPoints[activeIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
