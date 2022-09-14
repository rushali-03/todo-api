import { useMemo} from 'react';

import { getToken, isPresent } from '../utils/helper';

export default function useAuthToken() {
  const authToken = getToken();
  const isAuthTokenPresent = useMemo (()=> isPresent(authToken),[authToken]);
  return isAuthTokenPresent
}