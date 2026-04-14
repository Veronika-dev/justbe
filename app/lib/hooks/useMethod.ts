import {useMemo} from "react";
import {useTranslations} from "next-intl";

export function useMethod(method: Activity): { methodData: MethodData | null } {
  const t = useTranslations('Method')

  const methodData: MethodData | null = useMemo(() => {
    return getMethod() || null
  }, [method]);

  function getMethod() {
    return {
      id: method,
      title: t(method),
      description: t(`${method}Description`),
    }
  }

  return {
    methodData,
  }
}
