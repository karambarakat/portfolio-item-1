import { useEffect } from "react";
import { useScroll } from "../context";
import uuid from "../uuid";

export default function base(fn) {
  return function useScrollEffect(callback, thresholds) {
    const { dispatch, scrolls } = useScroll();
    console.log(scrolls);
    useEffect(() => {
      /**
       * uuid is used internally to cleanup after useEffect and cleanup callbacks with removeCallback
       */
      const useEffectUuid = uuid();
      const newItems = thresholds.map((threshold, i) => {
        return {
          threshold,
          callback,
          useEffectUuid,
        };
      });

      dispatch({
        type: "addItems",
        dir: "down",
        fn,
        payload: newItems,
      });

      return () => {
        dispatch({ type: "deleteWithUUID", payload: useEffectUuid });
      };
    }, []);
  };
}