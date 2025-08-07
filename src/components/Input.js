import React from 'react';
import PropTypes from 'prop-types';

/**
 * 공통 Input 컴포넌트
 * @param {string} width  - 너비 (예: '100px', '50%')
 * @param {string} height - 높이 (예: '40px', 'auto')
 * @param {object} style  - 추가 스타일
 * @param {object} rest   - 나머지 input 속성
 */
export default function Input({ width = '100%', height = 'auto', style = {}, ...rest }) {
  return (
    <input
      style={{
        boxSizing: 'border-box',
        padding: '6px',
        border: '2px solid #000',
        borderRadius: '10px',
        fontSize: '14px',
        width,
        height,
        ...style,
      }}
      {...rest}
    />
  );
}

Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
};
