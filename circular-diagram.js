// Circular diagram for "How it works" section
(function() {
  function createCircularDiagram(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const steps = [
      { id: 1, key: 'step1', color: '#ff6f61', icon: '🔍' },
      { id: 2, key: 'step2', color: '#2bb4a0', icon: '🌿' },
      { id: 3, key: 'step3', color: '#ff6f61', icon: '🌊' },
      { id: 4, key: 'step4', color: '#2bb4a0', icon: '📊' }
    ];

    // Detect mobile screen
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    
    const rectWidth = 360;
    const rectHeight = 320;
    const centerX = 300;
    const centerY = 250; // Moved up to align content to top
    const cornerRadius = 40;
    const transitionDuration = 20000; // 20 seconds per step (slower)
    const coloredSegmentLength = 0.25; // 25% of the path is always colored
    const initialGrowDuration = transitionDuration * coloredSegmentLength; // Same speed as movement (25% of path in 25% of time)

    let activeIndex = 0;
    let progress = 0; // Progress around the rectangle (0 to 1)
    let prevProgress = 0; // Previous progress to detect boundary crossings
    let segmentLengthProgress = 0; // Progress for growing segment from 0 to 1 (0% to 25%)
    let animationFrame = null;
    let intervalId = null;
    let startTime = null;

    function getPosition(index, total) {
      // Position items at corners/edges of rounded rectangle
      const w = rectWidth / 2;
      const h = rectHeight / 2;
      const positions = [
        { x: centerX, y: centerY - h },           // Top center
        { x: centerX + w, y: centerY },           // Right center
        { x: centerX, y: centerY + h },           // Bottom center
        { x: centerX - w, y: centerY }           // Left center
      ];
      const pos = positions[index % total];
      // Calculate angle for arrow direction
      const nextIndex = (index + 1) % total;
      const nextPos = positions[nextIndex % total];
      const angle = Math.atan2(nextPos.y - pos.y, nextPos.x - pos.x);
      return { x: pos.x, y: pos.y, angle };
    }

    function getFullRectanglePath() {
      // Create complete rounded rectangle path
      const w = rectWidth / 2;
      const h = rectHeight / 2;
      const r = cornerRadius;
      
      // Start from top center, go clockwise (closed path)
      const topCenter = getPosition(0, 4);
      
      let path = `M ${topCenter.x} ${topCenter.y} `;
      // Top edge to right corner
      path += `L ${centerX + w - r} ${centerY - h} `;
      path += `A ${r} ${r} 0 0 1 ${centerX + w} ${centerY - h + r} `;
      // Right edge to bottom corner
      path += `L ${centerX + w} ${centerY + h - r} `;
      path += `A ${r} ${r} 0 0 1 ${centerX + w - r} ${centerY + h} `;
      // Bottom edge to left corner
      path += `L ${centerX - w + r} ${centerY + h} `;
      path += `A ${r} ${r} 0 0 1 ${centerX - w} ${centerY + h - r} `;
      // Left edge to top corner
      path += `L ${centerX - w} ${centerY - h + r} `;
      path += `A ${r} ${r} 0 0 1 ${centerX - w + r} ${centerY - h} `;
      // Close path back to start
      path += `Z`;
      
      return path;
    }

    function getPathLength(pathData, svg) {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathData);
      tempPath.style.visibility = 'hidden';
      svg.appendChild(tempPath);
      const length = tempPath.getTotalLength();
      svg.removeChild(tempPath);
      return length || 1000;
    }

    function updateProgress() {
      if (!startTime) startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        
        // Delay BEFORE the colored line starts growing
        const preGrowDelay = transitionDuration / 4;
        
        // First, wait before growing
        if (elapsed < preGrowDelay) {
          segmentLengthProgress = 0;
          progress = 0;
        } else if (elapsed < preGrowDelay + initialGrowDuration) {
          // Grow the segment from 0% to 25%
          segmentLengthProgress = (elapsed - preGrowDelay) / initialGrowDuration;
          progress = 0; // Don't move until segment is fully grown
        } else {
          // After growth is finished, immediately start the circular progress
          segmentLengthProgress = 1;
          const movementElapsed = elapsed - preGrowDelay - initialGrowDuration;
          progress = (movementElapsed / transitionDuration) % 1;
        }
        
        render();
        
        // Determine which item the colored segment is at
        // Switch when the leading edge FIRST touches each item (at the BEGINNING)
        // Only switch after segment has grown a bit (to avoid premature switching)
        if (segmentLengthProgress > 0.9) {
          // Items are positioned at: 0.0, 0.25, 0.5, 0.75
          // Switch when leading edge FIRST reaches each position
          let newActiveIndex;
          if (progress >= 0.75) {
            newActiveIndex = 0; // At or past item 4
          } else if (progress >= 0.50) {
            newActiveIndex = 3; // At or past item 3
          } else if (progress >= 0.25) {
            newActiveIndex = 2; // At or past item 2
          } else if (progress >= 0.0) {
            newActiveIndex = 1; // At or past item 1
          } else {
            newActiveIndex = 0; // Before item 1
          }
          
          // Switch immediately when we enter a new zone
          if (activeIndex !== newActiveIndex) {
            activeIndex = newActiveIndex;
            updateCenterContent();
          }
        }
        
        prevProgress = progress;
        
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
    }

    function render() {
      const svg = container.querySelector('svg');
      if (!svg) return;

      // Clear previous content
      svg.innerHTML = '';

      // Add defs for gradient
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      
      // Create gradient for colored segment
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', 'coloredGradient');
      const currentStep = steps[activeIndex];
      const nextStep = steps[(activeIndex + 1) % steps.length];
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', currentStep.color);
      gradient.appendChild(stop1);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', nextStep.color);
      gradient.appendChild(stop2);
      
      defs.appendChild(gradient);
      svg.appendChild(defs);

      // Get full rectangle path
      const fullPath = getFullRectanglePath();
      const pathLength = getPathLength(fullPath, svg);
      
      // Calculate current segment length (grows from 0% to 25%)
      const currentSegmentLength = pathLength * coloredSegmentLength * segmentLengthProgress;

      // Base gray path (full rectangle)
      const basePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      basePath.setAttribute('d', fullPath);
      basePath.setAttribute('stroke', 'rgba(2,6,23,0.1)');
      basePath.setAttribute('stroke-width', '2');
      basePath.setAttribute('fill', 'none');
      basePath.setAttribute('stroke-linecap', 'round');
      basePath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(basePath);

      // Colored segment (grows from 0% to 25%, then moves around)
      if (currentSegmentLength > 0) {
        const coloredPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        coloredPath.setAttribute('d', fullPath);
        coloredPath.setAttribute('stroke', 'url(#coloredGradient)');
        coloredPath.setAttribute('stroke-width', '3');
        coloredPath.setAttribute('fill', 'none');
        coloredPath.setAttribute('stroke-linecap', 'round');
        coloredPath.setAttribute('stroke-linejoin', 'round');
        // Create dash pattern: colored segment, then gap
        const gapLength = pathLength - currentSegmentLength;
        coloredPath.setAttribute('stroke-dasharray', `${currentSegmentLength} ${gapLength}`);
        // Offset moves the segment around the path
        // When progress=0: offset=pathLength (segment at start)
        // When progress=1: offset=0 (segment has moved full circle)
        coloredPath.setAttribute('stroke-dashoffset', pathLength * (1 - progress));
        svg.appendChild(coloredPath);
      }

      // Step boxes (no borders) - fully circular
      steps.forEach((step, index) => {
        const pos = getPosition(index, steps.length);
        // Make width and height equal for perfect circles
        const rectSize = isMobile ? 120 : 80;
        const rectWidth = rectSize;
        const rectHeight = rectSize;
        const rectX = pos.x - rectWidth / 2;
        const rectY = pos.y - rectHeight / 2;

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.style.cursor = 'pointer';
        group.addEventListener('click', () => {
          // Jump to clicked item - position segment so it starts at this item
          const targetProgress = index / 4;
          progress = targetProgress;
          activeIndex = index;
          segmentLengthProgress = 1; // Ensure segment is fully grown
          startTime = Date.now() - (initialGrowDuration + progress * transitionDuration);
          render();
          updateCenterContent();
          
          if (animationFrame) cancelAnimationFrame(animationFrame);
          // Restart continuous animation
          updateProgress();
        });

        // Calculate border radius for pill-shaped/circular look (half of height)
        const borderRadius = rectHeight / 2;
        
        // Outer glow (subtle, no border)
        const glowRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        glowRect.setAttribute('x', rectX);
        glowRect.setAttribute('y', rectY);
        glowRect.setAttribute('width', rectWidth);
        glowRect.setAttribute('height', rectHeight);
        glowRect.setAttribute('rx', borderRadius);
        glowRect.setAttribute('fill', step.color);
        glowRect.setAttribute('opacity', '0.12');
        group.appendChild(glowRect);

        // Main rectangle with shadow effect
        const mainRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mainRect.setAttribute('x', rectX);
        mainRect.setAttribute('y', rectY);
        mainRect.setAttribute('width', rectWidth);
        mainRect.setAttribute('height', rectHeight);
        mainRect.setAttribute('rx', borderRadius);
        mainRect.setAttribute('fill', step.color);
        mainRect.setAttribute('stroke', 'rgba(255,255,255,0.3)');
        mainRect.setAttribute('stroke-width', '1');
        group.appendChild(mainRect);

        // Label (will be translated via JS after render)
        const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelText.setAttribute('x', pos.x);
        labelText.setAttribute('y', pos.y);
        labelText.setAttribute('text-anchor', 'middle');
        labelText.setAttribute('dominant-baseline', 'middle');
        labelText.setAttribute('fill', '#ffffff');
        labelText.setAttribute('font-size', isMobile ? '18' : '12');
        labelText.setAttribute('font-weight', '600');
        labelText.setAttribute('class', `diagram-label-${step.id}`);
        labelText.setAttribute('data-i18n-key', `about.howItWorks.${step.key}`);
        labelText.textContent = step.key; // Will be updated by translation system
        group.appendChild(labelText);

        svg.appendChild(group);
      });

      // Update center content
      updateCenterContent();
    }

    function updateCenterContent() {
      const centerDiv = container.querySelector('.diagram-center');
      if (!centerDiv) return;

      const activeStep = steps[activeIndex];
      const descEl = centerDiv.querySelector('.center-description');

      // Map of step keys to words to highlight
      const highlightWords = {
        step1: ['assessed', 'dinilai'],
        step2: ['collected', 'dikumpulkan'],
        step3: ['transplanted', 'ditransplantasi'],
        step4: ['monitored', 'dipantau']
      };

      if (descEl) {
        const currentKey = descEl.getAttribute('data-i18n');
        const newKey = `about.howItWorks.${activeStep.key}Desc`;
        
        // Only fade if content is actually changing
        if (currentKey !== newKey) {
          descEl.style.transition = 'opacity 0.3s ease';
          descEl.style.opacity = '0';
          
          // Update content and fade in
          setTimeout(() => {
            descEl.setAttribute('data-i18n', newKey);
            if (typeof translations !== 'undefined') {
              const lang = document.documentElement.lang || 'en';
              const keys = newKey.split('.');
              const text = keys.reduce((obj, k) => obj?.[k], translations[lang]);
              if (text) {
                // Highlight key words
                let highlightedText = text;
                const wordsToHighlight = highlightWords[activeStep.key] || [];
                wordsToHighlight.forEach(word => {
                  // Case-insensitive regex to find and highlight the word
                  const regex = new RegExp(`\\b(${word})\\b`, 'gi');
                  highlightedText = highlightedText.replace(regex, (match) => {
                    return `<strong style="color: ${activeStep.color}; font-weight: 700;">${match}</strong>`;
                  });
                });
                descEl.innerHTML = highlightedText;
              }
            }
            descEl.style.color = '#5b6b84';
            descEl.style.opacity = '1';
          }, 150);
        } else {
          // Re-apply highlighting in case language changed
          if (typeof translations !== 'undefined') {
            const lang = document.documentElement.lang || 'en';
            const keys = newKey.split('.');
            const text = keys.reduce((obj, k) => obj?.[k], translations[lang]);
            if (text) {
              let highlightedText = text;
              const wordsToHighlight = highlightWords[activeStep.key] || [];
              wordsToHighlight.forEach(word => {
                const regex = new RegExp(`\\b(${word})\\b`, 'gi');
                highlightedText = highlightedText.replace(regex, (match) => {
                  return `<strong style="color: ${activeStep.color}; font-weight: 700;">${match}</strong>`;
                });
              });
              descEl.innerHTML = highlightedText;
            }
          }
          descEl.style.opacity = '1';
        }
      }

      // Update SVG labels
      steps.forEach((step, idx) => {
        const svgLabel = container.querySelector(`.diagram-label-${step.id}`);
        if (svgLabel) {
          updateTextContent(svgLabel, `about.howItWorks.${step.key}`);
        }
      });
    }

    function updateTextContent(element, key) {
      if (typeof translations === 'undefined') return;
      const lang = document.documentElement.lang || 'en';
      const keys = key.split('.');
      const text = keys.reduce((obj, k) => obj?.[k], translations[lang]);
      if (text !== undefined) {
        element.textContent = text;
      }
    }

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '600');
    svg.setAttribute('height', isMobile ? '480' : '600');
    svg.setAttribute('viewBox', isMobile ? '0 0 600 480' : '0 0 600 600');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    container.appendChild(svg);

    // Create center content div
    const centerDiv = document.createElement('div');
    centerDiv.className = 'diagram-center';
    if (isMobile) {
      // On mobile, position after SVG (outside diagram)
      centerDiv.style.cssText = 'position: static; text-align: center; width: 100%; max-width: 300px; margin: 4px auto 0; padding: 0; background: transparent; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);';
      container.appendChild(centerDiv);
    } else {
      // On desktop, position absolutely inside diagram
      centerDiv.style.cssText = 'position: absolute; left: 50%; top: 44%; transform: translate(-50%, -50%); text-align: center; width: 220px; padding: 0; background: transparent; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);';
      container.appendChild(centerDiv);
    }

    const descDiv = document.createElement('div');
    descDiv.className = 'center-description';
    descDiv.style.cssText = `font-size: ${isMobile ? '1.1rem' : '1rem'}; color: #5b6b84; line-height: 1.6; opacity: 1;`;
    centerDiv.appendChild(descDiv);

    // Initial render - start with 0% colored
    progress = 0;
    prevProgress = 0;
    segmentLengthProgress = 0;
    startTime = null;
    render();
    
    // Start animation only when diagram enters viewport
    let animationStarted = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          updateProgress();
        }
      });
    }, {
      threshold: 0.1 // Start when 10% of element is visible
    });
    
    observer.observe(container);

    // Update translations when language changes
    const updateTranslations = () => {
      updateCenterContent();
      steps.forEach((step) => {
        const svgLabel = container.querySelector(`.diagram-label-${step.id}`);
        if (svgLabel) {
          updateTextContent(svgLabel, `about.howItWorks.${step.key}`);
        }
      });
    };

    // Listen for translation updates
    const translationObserver = new MutationObserver(updateTranslations);
    translationObserver.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['lang'] 
    });

    // Also update after a short delay to catch initial translation load
    setTimeout(updateTranslations, 200);
    setTimeout(updateTranslations, 500);

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
      translationObserver.disconnect();
    };
  }

  // Initialize when DOM and translations are ready
  function initDiagram() {
    if (typeof translations === 'undefined') {
      setTimeout(initDiagram, 100);
      return;
    }
    createCircularDiagram('howItWorksDiagram');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDiagram);
  } else {
    initDiagram();
  }
})();
