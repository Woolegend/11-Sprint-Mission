import { useCallback } from "react";
import { useState } from "react";

/**
 * API의 비동기 처리를 돕는 커스텀 훅
 * @param {function} asyncFunction 랩핑할 API 함수
 * @returns {[pending: boolean, error : object, wrappedFunction : function]}
 * @todo 반환 타입 object로 변경하기
 */
function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (err) {
        setError(err);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
