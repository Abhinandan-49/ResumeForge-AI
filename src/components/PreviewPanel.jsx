import React, { useEffect, useRef } from 'react';

export default function PreviewPanel({
  template,
  templateHtml,
  zoomMode,
  previewScale,
  onScaleChange,
  fitSinglePage,
  resumeFont
}) {
  const wrapperRef = useRef(null);
  const viewportRef = useRef(null);
  const containerRef = useRef(null);
  const previewRef = useRef(null);

  const applyScale = () => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!wrapper || !viewport || !container) return;

    const wrapperWidth = wrapper.clientWidth;
    const computedStyle = window.getComputedStyle(wrapper);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const availableWidth = Math.max(200, wrapperWidth - paddingLeft - paddingRight - 8);

    let scale;
    if (zoomMode === 'auto') {
      scale = Math.min(1.0, availableWidth / 794);
      if (scale < 0.2) scale = 0.2;
    } else {
      scale = previewScale;
    }

    container.style.transform = `scale(${scale})`;
    viewport.style.width = `${794 * scale}px`;

    // Dynamic page bounds computation
    const contentHeight = preview ? preview.scrollHeight : 1123;
    const finalHeight = Math.max(1123, contentHeight);

    viewport.style.height = `${finalHeight * scale}px`;
    container.style.height = `${finalHeight}px`;
  };

  // Recalculate scale whenever state or layout triggers
  useEffect(() => {
    applyScale();
    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
  }, [zoomMode, previewScale, template, templateHtml, fitSinglePage, resumeFont]);

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <span>Live Preview</span>
        <div className="preview-actions">
          <button
            className={`preview-btn ${zoomMode === 'auto' ? 'active' : ''}`}
            onClick={() => onScaleChange('auto', 0.7)}
          >
            Auto Fit
          </button>
          <button
            className={`preview-btn ${zoomMode === 'manual' && previewScale === 0.7 ? 'active' : ''}`}
            onClick={() => onScaleChange('manual', 0.7)}
          >
            70%
          </button>
          <button
            className={`preview-btn ${zoomMode === 'manual' && previewScale === 0.85 ? 'active' : ''}`}
            onClick={() => onScaleChange('manual', 0.85)}
          >
            85%
          </button>
          <button
            className={`preview-btn ${zoomMode === 'manual' && previewScale === 1 ? 'active' : ''}`}
            onClick={() => onScaleChange('manual', 1)}
          >
            100%
          </button>
        </div>
      </div>
      <div className="preview-wrapper" id="previewWrapper" ref={wrapperRef}>
        <div className="preview-viewport" id="previewViewport" ref={viewportRef}>
          <div className="preview-scale-container" id="previewScaleContainer" ref={containerRef}>
            <div
              className={`resume-preview ${fitSinglePage ? 'fit-single-page' : ''}`}
              id="resumePreview"
              ref={previewRef}
              style={{ '--resume-font': resumeFont || undefined }}
              dangerouslySetInnerHTML={{ __html: templateHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
