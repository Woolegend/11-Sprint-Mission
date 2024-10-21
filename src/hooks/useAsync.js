import { useCallback } from "react";
import { useState } from "react";

/**
 * API의 비동기 처리를 돕는 커스텀 훅
 * @param {function} asyncFunction 랩핑할 API 함수
 * @returns {{pending: boolean, error : object, execute : function}}
 */
function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setPending(true);
        setError(null);
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

  return { pending, error, execute };
}

export default useAsync;
