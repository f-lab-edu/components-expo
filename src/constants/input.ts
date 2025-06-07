export const EMAIL_INPUT = {
  required: '이메일은 필수입니다',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '이메일 형식이 올바르지 않습니다',
  },
};

export const PHONE_INPUT = {
  required: '연락처는 필수입니다',
  pattern: {
    value: /^01[016789]-?\d{3,4}-?\d{4}$/,
    message: '연락처 형식이 올바르지 않습니다',
  },
};
